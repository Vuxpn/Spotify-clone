// Front-end/src/components/YoutubeListing.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../config.js';

const YoutubeListing = () => {
    const navigate = useNavigate();
    const [youtubeContent, setYoutubeContent] = useState([]); // Khởi tạo là mảng rỗng
    const [selectedType, setSelectedType] = useState('daily');
    const [activeFilter, setActiveFilter] = useState('video');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm state loading
    const [error, setError] = useState(null); // Thêm state error

    useEffect(() => {
        fetchYoutubeContent();
    }, [selectedType]);

    const fetchYoutubeContent = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/youtube/list?type=${selectedType}`);
            setYoutubeContent(response.data.content || []); // Đảm bảo luôn có mảng
        } catch (error) {
            console.error('Error fetching YouTube content:', error);
            setError('Failed to fetch content');
        } finally {
            setLoading(false);
        }
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center gap-2 mt-4">
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        activeFilter === 'all' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => {
                        setActiveFilter('all');
                        navigate('/');
                    }}
                >
                    Tất cả
                </p>
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        activeFilter === 'video' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => {
                        setActiveFilter('video');
                        navigate('/video');
                    }}
                >
                    Video
                </p>
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        activeFilter === 'audio' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => {
                        setActiveFilter('audio');
                        navigate('/audio');
                    }}
                >
                    Audio
                </p>
            </div>
            <div className="">
                <div className="flex items-center gap-2 mt-4">
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold  ${
                            selectedType === 'daily' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                        }`}
                        onClick={() => setSelectedType('daily')}
                    >
                        Daily Listening
                    </button>
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold  ${
                            selectedType === 'toeic'
                                ? 'bg-white text-black'
                                : 'bg-[#FFFFFF1A] text-white hover:bg-[#282828]'
                        }`}
                        onClick={() => setSelectedType('toeic')}
                    >
                        TOEIC Listening
                    </button>
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold  ${
                            selectedType === 'ielts'
                                ? 'bg-white text-black'
                                : 'bg-[#FFFFFF1A] text-white hover:bg-[#282828]'
                        }`}
                        onClick={() => setSelectedType('ielts')}
                    >
                        IELTS Listening
                    </button>
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold  ${
                            selectedType === 'podcast'
                                ? 'bg-white text-black'
                                : 'bg-[#FFFFFF1A] text-white hover:bg-[#282828]'
                        }`}
                        onClick={() => setSelectedType('podcast')}
                    >
                        Podcast Listening
                    </button>
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold  ${
                            selectedType === 'film'
                                ? 'bg-white text-black'
                                : 'bg-[#FFFFFF1A] text-white hover:bg-[#282828]'
                        }`}
                        onClick={() => setSelectedType('film')}
                    >
                        Film Listening
                    </button>
                </div>

                {/* Loading and Error states */}
                {loading && (
                    <div className="flex items-center justify-center h-[50vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
                    </div>
                )}

                {error && <div className="p-4 text-red-500 text-center">{error}</div>}

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                    {!loading && !error && youtubeContent.length > 0
                        ? youtubeContent.map((item) => (
                              <div
                                  key={item._id}
                                  className="cursor-pointer bg-[#181818] rounded-lg overflow-hidden hover:bg-[#282828] transition-all"
                                  onClick={() => handleVideoClick(item)}
                              >
                                  <img
                                      src={item.thumbnail}
                                      alt={item.name}
                                      className="w-full aspect-video object-cover"
                                  />
                                  <div className="p-4">
                                      <h3 className="font-bold text-white text-lg line-clamp-2">{item.name}</h3>
                                      <p className="text-sm text-[#B3B3B3] mt-2 line-clamp-2">{item.desc}</p>
                                  </div>
                              </div>
                          ))
                        : !loading &&
                          !error && (
                              <div className="col-span-full text-center text-[#B3B3B3] py-10">
                                  No content available for this category
                              </div>
                          )}
                </div>

                {/* Modal - keeping the existing modal code */}
                {selectedVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 ">
                        <div className="bg-[#282828] rounded-lg p-4 w-full max-w-4xl">
                            <div className="relative pt-[56.25%]">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={selectedVideo.youtubeUrl}
                                    title={selectedVideo.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{selectedVideo.name}</h3>
                                    <p className="text-[#B3B3B3]">{selectedVideo.desc}</p>
                                </div>
                                <button
                                    className="px-4 py-2 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-colors duration-300"
                                    onClick={() => setSelectedVideo(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YoutubeListing;
