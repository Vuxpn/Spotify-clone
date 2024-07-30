import React from 'react';
import Sidebar from './components/sidebar';
import Player from './components/player';

const App = () => {
    return (
        <div className="bg-black h-screen">
            <div className="h-[90%] flex">
                <Sidebar />
            </div>
            <Player />
        </div>
    );
};

export default App;
