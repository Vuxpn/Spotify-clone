import React, { useContext, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './displayhome';
import DisplayRadio from './displayradio';
import DisplayArtist from './displayartist';
import Search from './search';
import { PlayerContext } from '../context/playercontext';
import SongItem from './songitem';

const display = () => {
    const { radiosData } = useContext(PlayerContext);

    const displayRef = useRef();
    const location = useLocation();
    const isRadio = location.pathname.includes('radio');
    const radioId = isRadio ? location.pathname.split('/').pop() : '';
    const bgColor = isRadio ? radiosData.find((x) => x._id == radioId).bgColor : '#121212';

    useEffect(() => {
        if (isRadio) {
            displayRef.current.style.background = `linear-gradient(${bgColor} 0%, #121212 50%, #121212 100%)`;
        } else {
            displayRef.current.style.background = `#121212`;
        }
    });
    return (
        <div
            ref={displayRef}
            className=" w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
        >
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/radio/:id" element={<DisplayRadio radio={radiosData.find((x) => x._id == radioId)} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/artist/:id" element={<DisplayArtist />} />
            </Routes>
        </div>
    );
};

export default display;
