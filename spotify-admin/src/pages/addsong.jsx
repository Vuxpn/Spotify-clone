import React from 'react';
import { assetsadmin } from '../assets/admin-assets/assetsadmin';

const AddSong = () => {
    return (
        <form className="flex flex-col items-start gap-8 text-gray-800">
            <div className="flex gap-8 ">
                <div className="flex flex-col gap-4">
                    <p className="text-white">Tải bài hát</p>
                    <input type="file" id="song" accept="audio/*" hidden />
                    <label htmlFor="song">
                        <img src={assetsadmin.upload_song} className="w-24 cursor-pointer" alt="" />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-white">Tải hình ảnh</p>
                    <input type="file" id="image" accept="image/*" hidden />
                    <label htmlFor="image">
                        <img src={assetsadmin.upload_area} className="w-24 cursor-pointer" alt="" />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white">Tên bài hát</p>
                <input
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white "
                    type="text"
                    placeholder="Nhập tên bài hát"
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white">Mô tả bài hát</p>
                <input
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="text"
                    placeholder="Nhập mô tả bài hát"
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white">Radio</p>
                <select className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[150px] rounded text-white ">
                    <option className="text-white" value="none">
                        None
                    </option>
                </select>
            </div>

            <button className="text-base bg-white text-black py-2.5 px-14 cursor-pointer" type="submit">
                Xác nhận
            </button>
        </form>
    );
};

export default AddSong;
