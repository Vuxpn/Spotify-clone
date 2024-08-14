import React from 'react';
import { assets, songsData } from '../assets/frontend-assets/assets';
import { useContext } from 'react';
import { PlayerContext } from '../context/playercontext';

const player = () => {
    const {
        track,
        seekBg,
        seekBar,
        volumeRef,
        volumeBar,
        playStatus,
        pause,
        play,
        time,
        previous,
        next,
        seekSong,
        loopSong,
        volumeChange,
    } = useContext(PlayerContext);
    return track ? (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4 w-[25%]">
                <img className="w-12" src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className=" flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
                    <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                    <div>
                        {playStatus ? (
                            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="" />
                        ) : (
                            <img onClick={play} className="w-4 cursor-pointer " src={assets.play_icon} alt="" />
                        )}
                    </div>
                    <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                    <img onClick={loopSong} className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
                </div>
                <div className=" flex items-center gap-5 ">
                    <p>
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-[#5D5D5D] rounded-full cursor-pointer"
                    >
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-white  rounded-full" />
                    </div>
                    <p>
                        {time.totalTime.minute}:{time.totalTime.second}
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 ">
                <img className="w-4" src={assets.plays_icon} alt="" />
                <img className="w-4" src={assets.mic_icon} alt="" />
                <img className="w-4" src={assets.queue_icon} alt="" />
                <img className="w-4" src={assets.speaker_icon} alt="" />
                <img className="w-4" src={assets.volume_icon} alt="" />
                <div
                    ref={volumeRef}
                    onClick={volumeChange}
                    className="w-20 bg-[#5D5D5D] h-1 rounded-full cursor-pointer"
                >
                    <hr ref={volumeBar} className="w-0 bg-white h-1 rounded-full" />
                </div>

                <img className="w-4" src={assets.mini_player_icon} alt="" />
                <img className="w-4" src={assets.zoom_icon} alt="" />
            </div>
        </div>
    ) : null;
};

export default player;
