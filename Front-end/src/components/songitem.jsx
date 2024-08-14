import React, { useContext } from 'react';
import { PlayerContext } from '../context/playercontext';

const SongItem = () => {
    const { playWithId, songsData } = useContext(PlayerContext);

    return (
        <>
            {songsData.map((item, index) => (
                <div
                    onClick={() => playWithId(item._id)}
                    key={index}
                    className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
                >
                    <img className="rounded w-[150px]" src={item.image} alt={item.name} />
                    <p className="font-bold mt-2 mb-1 overflow-hidden line-clamp-1">{item.name}</p>
                    <p className="text-slate-200 text-sm overflow-hidden line-clamp-1">{item.desc}</p>
                </div>
            ))}
        </>
    );
};

export default SongItem;
