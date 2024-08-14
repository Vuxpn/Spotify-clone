import React, { useContext } from 'react';
import Sidebar from './layout/sidebar';
import Player from './components/player';
import Display from './components/display';
import { PlayerContext } from './context/playercontext';

const App = () => {
    const { audioRef, track, songsData } = useContext(PlayerContext);
    return (
        <div className="bg-black h-screen">
            {songsData.length !== 0 ? (
                <>
                    <div className="h-[90%] flex">
                        <Sidebar />
                        <Display />
                    </div>
                    <Player />
                </>
            ) : null}
            <audio ref={audioRef} src={track ? track.file : ''} preload="auto"></audio>
        </div>
    );
};

export default App;
