import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../layout/navbar';
import { artistsData } from '../assets/frontend-assets/assets';
import Radioitem from './radioitem';
import Artistitem from './artistitem';
import { PlayerContext } from '../context/playercontext';
import SongItem from './songitem';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
const displayHome = () => {
    const navigate = useNavigate();
    const { playWithId, songsData, radiosData } = useContext(PlayerContext);
    const [youtubeContent, setYoutubeContent] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [randomContent, setRandomContent] = useState([]);

    useEffect(() => {
        fetchYoutubeContent();
    }, []);

    useEffect(() => {
        if (songsData && youtubeContent.length > 0) {
            generateRandomContent();
        }
    }, [songsData, youtubeContent]);

    const fetchYoutubeContent = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/api/youtube/list');
            setYoutubeContent(response.data.content || []);
        } catch (error) {
            console.error('Error fetching YouTube content:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateRandomContent = () => {
        const allContent = [
            ...(songsData || []).map((item) => ({ ...item, type: 'song' })),
            ...(youtubeContent || []).map((item) => ({ ...item, type: 'youtube' })),
        ];

        console.log('All content before shuffle:', allContent);

        const shuffled = allContent.sort(() => Math.random() - 0.5).slice(0, 10);
        setRandomContent(shuffled);
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center gap-2 mt-4">
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        activeFilter === 'all' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => setActiveFilter('all')}
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
            <div className="mb-4">
                <div className="flex items-center">
                    <h1 className="my-5 font-bold text-2xl">Hôm nay nghe gì</h1>
                    <p className="text-[14px] text-[#B3B3B3] font-bold ml-auto cursor-pointer hover:underline">
                        Hiện tất cả
                    </p>
                </div>
                <div className="flex - overflow-auto">
                    {randomContent.map((item, index) =>
                        item.type === 'song' ? (
                            <SongItem key={index} song={item} />
                        ) : (
                            <div
                                key={index}
                                className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
                                onClick={() => setSelectedVideo(item)}
                            >
                                <img src={item.thumbnail} alt={item.name} className="rounded w-[150px]" />
                                <p className="font-bold mt-2 mb-1 overflow-hidden line-clamp-1">{item.name}</p>
                                <p className="text-slate-200 text-sm overflow-hidden line-clamp-1">{item.desc}</p>
                            </div>
                        ),
                    )}
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center">
                    <h1 className="my-5 font-bold text-2xl">Nghệ sĩ phổ biến</h1>
                    <p className="text-[14px] text-[#B3B3B3] font-bold ml-auto cursor-pointer hover:underline">
                        Hiện tất cả
                    </p>
                </div>
                <div className="flex - overflow-auto ">
                    {artistsData.map((item, index) => (
                        <Artistitem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center">
                    <h1 className="my-5 font-bold text-2xl">Radio phổ biến</h1>
                    <p className="text-[14px] text-[#B3B3B3] font-bold ml-auto cursor-pointer hover:underline">
                        Hiện tất cả
                    </p>
                </div>
                <div className="flex - overflow-auto">
                    {radiosData.map((item, index) => (
                        <Radioitem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id} />
                    ))}
                </div>
            </div>
            <br />

            <br />
            <div className="mb-4">
                <div className="flex items-center">
                    <h1 className="my-5 font-bold text-2xl">Bài hát phổ biến</h1>
                    <p className="text-[14px] text-[#B3B3B3] font-bold ml-auto cursor-pointer hover:underline">
                        Hiện tất cả
                    </p>
                </div>
                <div className="flex - overflow-auto">
                    <SongItem />
                </div>
            </div>
            <br />
            <div className="mb-4">
                <div className="flex items-center">
                    <h1 className="my-5 font-bold text-2xl">Podcast đáng để thử!</h1>
                    <p className="text-[14px] text-[#B3B3B3] font-bold ml-auto cursor-pointer hover:underline">
                        Hiện tất cả
                    </p>
                </div>
                <div className="flex - overflow-auto">
                    {radiosData.map((item, index) => (
                        <Radioitem key={index} image={item.image} name={item.name} desc={item.desc} id={item._id} />
                    ))}
                </div>
            </div>
            {/* YouTube Section */}
            <div className="mb-4">
                <div className="flex items-center">
                    <h1 className="my-5 font-bold text-2xl">English Daily Listening</h1>
                    <p
                        onClick={() => navigate(`/youtube`)}
                        className="text-[14px] text-[#B3B3B3] font-bold ml-auto cursor-pointer hover:underline"
                    >
                        Hiện tất cả
                    </p>
                </div>
                <div className="flex - overflow-auto">
                    {youtubeContent.map((item) => (
                        <div
                            key={item._id}
                            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
                            onClick={() => setSelectedVideo(item)}
                        >
                            <img src={item.thumbnail} alt={item.name} className="rounded w-[150px]" />

                            <p className="font-bold mt-2 mb-1 overflow-hidden line-clamp-1">{item.name}</p>
                            <p className="text-slate-200 text-sm overflow-hidden line-clamp-1">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* YouTube Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
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
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default displayHome;
