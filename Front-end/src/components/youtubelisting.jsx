// Front-end/src/components/YoutubeListing.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YoutubeListing = () => {
    const [youtubeContent, setYoutubeContent] = useState([]); // Khởi tạo là mảng rỗng
    const [selectedType, setSelectedType] = useState('song');
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
            const response = await axios.get(`http://localhost:4000/api/youtube/list?type=${selectedType}`);
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

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <button
                    className={`mr-4 px-4 py-2 rounded ${selectedType === 'song' ? 'bg-green-500' : 'bg-gray-500'}`}
                    onClick={() => setSelectedType('song')}
                >
                    Songs
                </button>
                <button
                    className={`px-4 py-2 rounded ${selectedType === 'radio' ? 'bg-green-500' : 'bg-gray-500'}`}
                    onClick={() => setSelectedType('radio')}
                >
                    Radio
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {youtubeContent && youtubeContent.length > 0 ? (
                    youtubeContent.map((item) => (
                        <div
                            key={item._id}
                            className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden"
                            onClick={() => handleVideoClick(item)}
                        >
                            <img src={item.thumbnail} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-500">No content available</div>
                )}
            </div>

            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-lg p-4 w-full max-w-4xl">
                        <iframe
                            width="100%"
                            height="480"
                            src={selectedVideo.youtubeUrl}
                            title={selectedVideo.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-white">{selectedVideo.name}</h3>
                                <p className="text-gray-400">{selectedVideo.desc}</p>
                            </div>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => setSelectedVideo(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoutubeListing;
