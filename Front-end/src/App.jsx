import React, { useContext } from 'react';
import Sidebar from './layout/sidebar';
import Player from './components/player';
import Display from './components/display';
import { PlayerContext } from './context/playercontext';

const App = () => {
    const { audioRef, track } = useContext(PlayerContext);
    return (
        <div className="bg-black h-screen">
            <div className="h-[90%] flex">
                <Sidebar />
                <Display />
            </div>
            <Player />
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
        </div>
    );
};

export default App;
