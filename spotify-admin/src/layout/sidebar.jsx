import React from 'react';
import { assets } from '../assets/frontend-assets/assets';
import { assetsadmin } from '../assets/admin-assets/assetsadmin';
import { NavLink } from 'react-router-dom';

const sidebar = () => {
    return (
        <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-[20%] rounded flex flex-col justify-around">
                <div className="flex items-center gap-3 pl-4 cursor-pointer">
                    <img className="w-6" src={assets.logo_icon} alt="" />
                    <p className="font-bold">Spotify-Admin</p>
                </div>
                <div className="flex items-center gap-3 pl-4 cursor-pointer ">
                    <img className="w-6" src={assets.home_icon} alt="" />
                    <p className="font-bold text-[#B3B3B3] hover:text-white">Trang chủ</p>
                </div>
                <div className="flex items-center gap-3 pl-4 cursor-pointer ">
                    <img className="w-6" src={assets.search_icon} alt="" />
                    <p className="font-bold text-[#B3B3B3] hover:text-white">Tìm kiếm</p>
                </div>
            </div>
            <div className="bg-[#121212] h-[80%] rounded ">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img className="w-8" src={assets.stack_icon} alt="" />
                        <p className="font-bold text-[#B3B3B3]">Thư viện</p>
                    </div>
                    <div className="flex items-center gap-3 ">
                        <img className="w-5" src={assets.plus_icon} alt="" />
                        <img className="w-5" src={assets.arrow_icon} alt="" />
                    </div>
                </div>
                <div className="flex flex-col gap-5 mt-10">
                    {/* Thêm bài hát */}
                    <NavLink
                        to="/add-song"
                        className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-2 text-[18px] rounded mt-4 cursor-pointer
                        ${isActive ? 'bg-[#ffffff26]' : 'hover:bg-[#ffffff26]'}
                    `}
                    >
                        <img className="w-10 p-1 bg-white rounded" src={assetsadmin.add_song} alt="" />
                        <p className="hidden sm:block font-semibold">Thêm bài hát</p>
                        <img className="w-5 ml-auto" src={assets.arrow_icon} alt="" />
                    </NavLink>

                    {/* Hiển thị bài hát */}
                    <NavLink
                        to="/list-song"
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-2 text-[18px] rounded mt-4 cursor-pointer
                            ${isActive ? 'bg-[#ffffff26]' : 'hover:bg-[#ffffff26]'}
                        `}
                    >
                        <img className="w-10 p-1 bg-white rounded" src={assetsadmin.list_song} alt="" />
                        <p className="hidden sm:block font-semibold">Hiển thị bài hát</p>
                        <img className="w-5 ml-auto" src={assets.arrow_icon} alt="" />
                    </NavLink>

                    {/* Thêm vào radio */}
                    <NavLink
                        to="/add-radio"
                        className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-2 text-[18px] rounded mt-4 cursor-pointer
                        ${isActive ? 'bg-[#ffffff26]' : 'hover:bg-[#ffffff26]'}
                    `}
                    >
                        <img className="w-10 p-1 bg-white rounded" src={assetsadmin.add_radio} alt="" />
                        <p className="hidden sm:block font-semibold">Thêm vào radio</p>
                        <img className="w-5 ml-auto" src={assets.arrow_icon} alt="" />
                    </NavLink>

                    {/* Hiển thị radio bài hát */}
                    <NavLink
                        to="/list-radio"
                        className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-2 text-[18px] rounded mt-4 cursor-pointer
                        ${isActive ? 'bg-[#ffffff26]' : 'hover:bg-[#ffffff26]'}
                    `}
                    >
                        <img className="w-10 p-1 bg-white rounded" src={assetsadmin.list_radio} alt="" />
                        <p className="hidden sm:block font-semibold">Hiển thị radio bài hát</p>
                        <img className="w-5 ml-auto" src={assets.arrow_icon} alt="" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default sidebar;
