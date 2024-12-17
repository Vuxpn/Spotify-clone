import React, { useContext } from 'react';
import { PlayerContext } from '../context/playercontext';
import Navbar from '../layout/navbar';

const Scripts = () => {
    const { currentSong } = useContext(PlayerContext);

    return (
        <div>
            <Navbar />
            <div className="min-h-screen p-4">
                <h2 className="text-2xl font-bold mb-4">{currentSong?.title || 'No song playing'}</h2>
                <div className="lyrics-content">
                    {/* Hiển thị lyrics ở đây */}
                    {currentSong?.lyrics || 'Lyrics not available'}
                </div>
            </div>
        </div>
    );
};

export default Scripts;
