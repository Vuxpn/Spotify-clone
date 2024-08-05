import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './displayhome';
import DisplayRadio from './displayradio';
import DisplayArtist from './displayartist';
import Search from './search';
import { radiosData } from '../assets/frontend-assets/assets';

const display = () => {
    const displayRef = useRef();
    const location = useLocation();
    const isRadio = location.pathname.includes('radio');
    const radioId = isRadio ? location.pathname.slice(-1) : '';
    const bgColor = radiosData[Number(radioId)].bgColor;

    useEffect(() => {
        if (isRadio) {
            displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
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
                <Route path="/radio/:id" element={<DisplayRadio />} />
                <Route path="/search" element={<Search />} />
                <Route path="/artist/:id" element={<DisplayArtist />} />
            </Routes>
        </div>
    );
};

export default display;
