import React, { useState, useContext } from 'react';
import axios from 'axios';
import { assets } from '../assets/frontend-assets/assets';
import Navbar from '../layout/navbar';
import { PlayerContext } from '../context/playercontext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    //const url = 'https://spotify-clone-1-goal.onrender.com';
    const url = 'http://localhost:4000';

    const { playWithId } = useContext(PlayerContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('all');
    const [searchResults, setSearchResults] = useState({ songs: [], radios: [] });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            let songRes = { data: { songs: [] } };
            let radioRes = { data: { radios: [] } };

            if (searchType === 'all' || searchType === 'song') {
                songRes = await axios.get(`${url}/api/search/song?query=${searchQuery}`);
            }
            if (searchType === 'all' || searchType === 'radio') {
                radioRes = await axios.get(`${url}/api/search/radio?query=${searchQuery}`);
            }

            setSearchResults({
                songs: songRes.data.songs,
                radios: radioRes.data.radios,
            });
        } catch (error) {
            console.error('Lỗi tìm kiếm:', error);
        }
    };

    const handleTypeClick = (type) => {
        setSearchType(type);
        if (searchQuery.trim()) {
            handleSearch({ preventDefault: () => {} });
        }
    };

    return (
        <>
            <Navbar />
            <div className="px-64 mt-10 mb-5 flex">
                <form className="w-full relative" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Bạn muốn phát nội dung gì?"
                        className="h-14 w-full py-2 px-12 text-xl text-white bg-[#242424] border-0 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white hover:ring-1 hover:ring-[#5d5d5d]"
                    />
                    <img
                        src={assets.search_icon}
                        alt="Search"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                        onClick={handleSearch}
                    />
                </form>
            </div>
            <div className="flex items-center gap-2 mt-4 ml-64">
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        searchType === 'all' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => handleTypeClick('all')}
                >
                    Tất cả
                </p>
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        searchType === 'song' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => handleTypeClick('song')}
                >
                    Nhạc
                </p>
                <p
                    className={`px-4 py-1 rounded-2xl cursor-pointer font-bold ${
                        searchType === 'radio' ? 'bg-white text-black' : 'bg-[#FFFFFF1A] text-white'
                    }`}
                    onClick={() => handleTypeClick('radio')}
                >
                    Radio
                </p>
                <p className="bg-[#FFFFFF1A] text-white px-4 py-1 rounded-2xl cursor-pointer font-bold">Podcast</p>
            </div>

            {/* Hiển thị kết quả tìm kiếm */}
            {(searchType === 'all' || searchType === 'song') &&
                searchResults.songs &&
                searchResults.songs.length > 0 && (
                    <div>
                        {searchResults.songs.map((song, index) => (
                            <div
                                onClick={() => playWithId(song._id)}
                                key={song._id}
                                className="grid grid-cols-3 mt-5 sm:grid-cols-[1fr_0.5fr_0.5fr_0.5fr] gap-2 p-2 items-center text-[#B3B3B3] hover:bg-[#ffffff26] cursor-pointer"
                            >
                                <p className="text-white">
                                    <b className="mr-4 text-[#B3B3B3]">{index + 1}</b>
                                    <img className="inline w-10 mr-5 rounded" src={song.image} alt="" />
                                    <b className="overflow-hidden">{song.name}</b>
                                </p>
                                <p className="text-[15px] m-auto">{song.radio}</p>
                                <p className="m-auto text-[15px] hidden sm:block text-center ">{song.plays}</p>
                                <p className="text-[15px] text-center">{song.duration}</p>
                            </div>
                        ))}
                    </div>
                )}

            {(searchType === 'all' || searchType === 'radio') &&
                searchResults.radios &&
                searchResults.radios.length > 0 && (
                    <div className="grid grid-cols-6 - overflow-auto mt-5">
                        {searchResults.radios.map((radio, index) => (
                            <div
                                onClick={() => navigate(`/radio/${radio._id}`)}
                                key={radio._id}
                                className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
                            >
                                <img className="rounded w-[150px]" src={radio.image} alt="" />
                                <p className="font-bold mt-2 mb-1 overflow-hidden line-clamp-1">{radio.name}</p>
                                <p className="text-slate-200 text-sm overflow-hidden line-clamp-1">{radio.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
        </>
    );
};

export default Search;
