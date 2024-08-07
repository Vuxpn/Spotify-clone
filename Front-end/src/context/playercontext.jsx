import { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/frontend-assets/assets';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volumeRef = useRef();
    const volumeBar = useRef();
    const [volume, setVolume] = useState(50);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [repeatSong, setRepeatSong] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        },
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const seekSong = async (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    };

    const loopSong = () => {
        setRepeatSong((state) => !state);
        audioRef.current.loop = !repeatSong;
    };

    const volumeChange = (e) => {
        if (volumeRef.current) {
            const rect = volumeRef.current.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newVolume = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);

            setVolume(newVolume);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        if (volumeBar.current) {
            volumeBar.current.style.width = `${volume}%`;
        }
    }, [volume]);

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;
                setTime({
                    currentTime: {
                        second: padWithZero(Math.floor(audioRef.current.currentTime % 60)),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: padWithZero(Math.floor(audioRef.current.duration % 60)),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }, 1000);
    }, [audioRef]);

    // Helper function to pad single-digit numbers with a leading zero
    function padWithZero(number) {
        return number.toString().padStart(2, '0');
    }

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        volumeRef,
        volumeBar,
        volume,
        setVolume,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        repeatSong,
        setRepeatSong,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        loopSong,
        volumeChange,
    };
    return <PlayerContext.Provider value={contextValue}>{props.children}</PlayerContext.Provider>;
};
export default PlayerContextProvider;
