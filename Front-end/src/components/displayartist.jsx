import React from 'react';
import Navbar from '../layout/navbar';
import { artistsData } from '../assets/frontend-assets/assets';
import { useParams } from 'react-router-dom';

const displayartist = () => {
    const { id } = useParams();
    const artistData = artistsData[id];

    return (
        <>
            <Navbar />
            <div className="flex mt-10 gap-8 flex-col md:flex-row md:items-end">
                <img className="w-40 rounded" src={artistData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-6xl">{artistData.name}</h2>
                    <h4>{artistData.desc}</h4>
                    <p className="mt-1">1.778.567 người nghe hằng tháng</p>
                </div>
            </div>
        </>
    );
};

export default displayartist;
