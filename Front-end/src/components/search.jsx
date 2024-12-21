import React, { useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/playercontext';
import Navbar from '../layout/navbar';
import { API_URL } from '../config.js';

const Search = () => {
    const { playWithId } = useContext(PlayerContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('all');
    const [searchResults, setSearchResults] = useState({
        songs: [],
        videos: [],
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${API_URL}/api/search/${searchType}`, {
                params: { query: searchQuery },
            });

            if (searchType === 'all') {
                setSearchResults({
                    songs: response.data.songs || [],
                    videos: response.data.videos || [],
                    total: response.data.total || 0,
                });
            } else if (searchType === 'audio') {
                setSearchResults({
                    songs: response.data.songs || [],
                    videos: [],
                    total: response.data.total || 0,
                });
            } else if (searchType === 'video') {
                setSearchResults({
                    songs: [],
                    videos: response.data.videos || [],
                    total: response.data.total || 0,
                });
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi tìm kiếm');
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-4">
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="flex-1 p-2 rounded-lg bg-[#FFFFFF1A] text-white"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1ed760]"
                    >
                        Tìm kiếm
                    </button>
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                            searchType === 'all' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                        }`}
                        onClick={() => setSearchType('all')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                            searchType === 'audio' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                        }`}
                        onClick={() => setSearchType('audio')}
                    >
                        Audio
                    </button>
                    <button
                        className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                            searchType === 'video' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                        }`}
                        onClick={() => setSearchType('video')}
                    >
                        Video
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1DB954]"></div>
                    </div>
                )}

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults.songs?.map((song) => (
                        <div
                            key={song._id}
                            className="cursor-pointer bg-[#181818] rounded-lg overflow-hidden hover:bg-[#282828] transition-all"
                            onClick={() => playWithId(song._id)}
                        >
                            <img src={song.image} alt={song.name} className="w-full aspect-video object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-white text-lg line-clamp-2">{song.name}</h3>
                                <p className="text-sm text-[#B3B3B3] mt-2 line-clamp-2">{song.desc}</p>
                                <p className="text-sm text-[#B3B3B3] mt-1">Duration: {song.duration}</p>
                            </div>
                        </div>
                    ))}

                    {searchResults.videos?.map((video) => (
                        <div
                            key={video._id}
                            className="cursor-pointer bg-[#181818] rounded-lg overflow-hidden hover:bg-[#282828] transition-all"
                            onClick={() => setSelectedVideo(video)}
                        >
                            <img src={video.thumbnail} alt={video.name} className="w-full aspect-video object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-white text-lg line-clamp-2">{video.name}</h3>
                                <p className="text-sm text-[#B3B3B3] mt-2 line-clamp-2">{video.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && !error && searchResults.total === 0 && (
                    <div className="text-center text-[#B3B3B3]">Không tìm thấy kết quả nào</div>
                )}

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
                                    className="px-4 py-2 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760]"
                                    onClick={() => setSelectedVideo(null)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
