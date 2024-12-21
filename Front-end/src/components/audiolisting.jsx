import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../layout/navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/playercontext';
import { API_URL } from '../config.js';

const AudioListing = () => {
    const { playWithId } = useContext(PlayerContext);
    const navigate = useNavigate();
    const [audioContent, setAudioContent] = useState([]);
    const [selectedType, setSelectedType] = useState('daily');
    const [activeFilter, setActiveFilter] = useState('audio');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAudioContent = async (type) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_URL}/api/song/list`, {
                params: { type },
            });
            console.log('Fetched data for type:', type, response.data);
            setAudioContent(response.data.songs || []);
        } catch (error) {
            console.error('Error fetching audio content:', error);
            setError('Failed to fetch content');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudioContent(selectedType);
    }, [selectedType]);

    const handleTypeChange = (type) => {
        setSelectedType(type);
        fetchAudioContent(type);
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
                    onClick={() => setActiveFilter('audio')}
                >
                    Audio
                </p>
            </div>
            <div className="">
                <div className="flex items-center gap-2 mt-4">
                    {['daily', 'toeic', 'ielts', 'podcast', 'song'].map((type) => (
                        <button
                            key={type}
                            className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                                selectedType === type
                                    ? 'bg-white text-black'
                                    : 'bg-[#FFFFFF1A] text-white hover:bg-[#282828]'
                            }`}
                            onClick={() => handleTypeChange(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)} Listening
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex items-center justify-center h-[50vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
                    </div>
                )}

                {/* Error state */}
                {error && <div className="p-4 text-red-500 text-center">{error}</div>}

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
                    {!loading && !error && audioContent.length > 0
                        ? audioContent.map((item) => (
                              <div
                                  key={item._id}
                                  className="cursor-pointer bg-[#181818] rounded-lg overflow-hidden hover:bg-[#282828] transition-all"
                                  onClick={() => playWithId(item._id)}
                              >
                                  <img src={item.image} alt={item.name} className="w-full aspect-video object-cover" />
                                  <div className="p-4">
                                      <h3 className="font-bold text-white text-lg line-clamp-2">{item.name}</h3>
                                      <p className="text-sm text-[#B3B3B3] mt-2 line-clamp-2">{item.desc}</p>
                                      <p className="text-sm text-[#B3B3B3] mt-1">Duration: {item.duration}</p>
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
            </div>
        </div>
    );
};

export default AudioListing;
