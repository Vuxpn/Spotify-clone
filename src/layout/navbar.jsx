import React from 'react';
import { assets } from '../assets/frontend-assets/assets';
import { useNavigate } from 'react-router-dom';

const navbar = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img
                        onClick={() => navigate(-1)}
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
                        src={assets.arrow_left}
                        alt=""
                    />
                    <img
                        onClick={() => navigate(1)}
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
                        src={assets.arrow_right}
                        alt=""
                    />
                </div>
                <div className="flex items-center gap-4">
                    <p className="bg-white text-black text-[15px] font-bold px-4 py-1 rounded-2xl hidden md:block cursor-pointer transition-transform duration-300 hover:scale-105">
                        Khám phá Premium
                    </p>
                    <p className="bg-black text-white text-[15px] font-bold px-4 py-1 rounded-2xl hidden md:block cursor-pointer transition-transform duration-300 hover:scale-105">
                        Cài đặt Ứng dụng
                    </p>
                    <div className="bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                        <img className="px-1 py-1" src={assets.bell_icon} alt="" />
                    </div>
                    <div className="bg-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110">
                        <img className="rounded-full px-1 py-1" src={assets.ava_icon} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default navbar;
