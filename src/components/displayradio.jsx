import React, { useContext } from 'react';
import Navbar from '../layout/navbar';
import { useParams } from 'react-router-dom';
import { assets, radiosData, songsData } from '../assets/frontend-assets/assets';
import { PlayerContext } from '../context/playercontext';
const displayalbum = () => {
    const { id } = useParams();
    const radioData = radiosData[id];
    const { playWithId } = useContext(PlayerContext);

    return (
        <>
            <Navbar />
            <div className="flex mt-10 gap-8 flex-col md:flex-row md:items-end ">
                <img className="w-40 rounded" src={radioData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-6xl">{radioData.name}</h2>
                    <h4>{radioData.desc}</h4>
                    <p className="mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                        <b> Spotify</b> • 3000 lượt lưu • <b>50 bài hát, </b>
                        khoảng 2 giờ 45 phút
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#B3B3B3]">
                <p>
                    <b className="mr-4">#</b>Tiêu đề
                </p>
                <p>Album</p>
                <p className="m-auto hidden sm:block">Ngày thêm</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr className="opacity-30" />

            {songsData.map((item, index) => (
                <div
                    onClick={() => playWithId(item.id)}
                    key={index}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#B3B3B3] hover:bg-[#ffffff26] cursor-pointer"
                >
                    <p className="text-white">
                        <b className="mr-4 text-[#B3B3B3]">{index + 1}</b>
                        <img className="inline w-10 mr-5 rounded" src={item.image} alt="" />
                        <b className="overflow-hidden">{item.name}</b>
                    </p>
                    <p className="text-[15px]">{radioData.name}</p>
                    <p className="m-auto text-[15px] hidden sm:block text-center">5 ngày trước</p>
                    <p className="text-[15px] text-center">{item.duration}</p>
                </div>
            ))}
        </>
    );
};

export default displayalbum;
