import React from 'react';
import Navbar from '../layout/navbar';

import { artistsData } from '../assets/frontend-assets/assets';
import { radiosData } from '../assets/frontend-assets/assets';
import Radioitem from './radioitem';
import Artistitem from './artistitem';

const displayHome = () => {
    return (
        <div>
            <Navbar />
            <div className="flex items-center gap-2 mt-4">
                <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer font-bold">Tất cả</p>
                <p className="bg-[#FFFFFF1A] text-white px-4 py-1 rounded-2xl cursor-pointer font-bold">Nhạc</p>
                <p className="bg-[#FFFFFF1A] text-white px-4 py-1 rounded-2xl cursor-pointer font-bold">Podcast</p>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Radio phổ biến</h1>
                <div className="flex - overflow-auto">
                    {radiosData.map((item, index) => (
                        <Radioitem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Nghệ sĩ phổ biến</h1>
                <div className="flex - overflow-auto">
                    {artistsData.map((item, index) => (
                        <Artistitem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default displayHome;
