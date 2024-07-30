import React from 'react';
import { assets } from '../assets/frontend-assets/assets';

const sidebar = () => {
    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
                <div className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img src={assets.home_icon} alt="" />
                </div>
            </div>
        </div>
    );
};

export default sidebar;
