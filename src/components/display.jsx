import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayHome from './displayhome';
import DisplayRadio from './displayradio';
import Search from './search';

const display = () => {
    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayRadio />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    );
};

export default display;
