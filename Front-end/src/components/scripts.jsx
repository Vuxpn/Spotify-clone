import React, { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../context/playercontext';
import Navbar from '../layout/navbar';

const Scripts = () => {
    const { track, audioRef, time } = useContext(PlayerContext);
    const [activeLyricIndex, setActiveLyricIndex] = useState(0);
    const lyricsContainerRef = useRef(null);
    const lyricLineRefs = useRef([]);

    useEffect(() => {
        if (!audioRef.current) return;

        const handleTimeUpdate = () => {
            const currentTime = audioRef.current.currentTime;
            const newIndex = track?.lyrics?.findIndex((lyric, index, arr) => {
                const nextTime = arr[index + 1]?.time || Infinity;
                return currentTime >= lyric.time && currentTime < nextTime;
            });

            if (newIndex !== -1 && newIndex !== activeLyricIndex) {
                setActiveLyricIndex(newIndex);
                scrollToLyric(newIndex);
            }
        };

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [track, activeLyricIndex]);

    const scrollToLyric = (index) => {
        if (lyricLineRefs.current[index]) {
            lyricLineRefs.current[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    const handleLyricClick = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">{track?.name || 'No song playing'}</h2>

                <div
                    ref={lyricsContainerRef}
                    className="lyrics-content max-h-[75vh] overflow-y-auto px-6
                        scrollbar-thin scrollbar-track-transparent 
                        scrollbar-thumb-gray-400/50 scrollbar-thumb-rounded-full
                        max-w-3xl mx-auto"
                >
                    {track?.lyrics?.map((lyric, index) => (
                        <div
                            key={index}
                            ref={(el) => (lyricLineRefs.current[index] = el)}
                            onClick={() => handleLyricClick(lyric.time)}
                            className={`py-4 px-6 my-3 cursor-pointer transition-all duration-300 rounded-lg
                                text-lg font-medium tracking-wide
                                ${
                                    activeLyricIndex === index
                                        ? 'bg-blue-500 text-white scale-105 shadow-lg'
                                        : 'hover:bg-gray-100 hover:scale-102 hover:text-black'
                                }`}
                        >
                            {lyric.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Scripts;
