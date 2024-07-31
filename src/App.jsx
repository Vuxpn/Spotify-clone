import React from 'react';
import Sidebar from './layout/sidebar';
import Player from './components/player';
import Display from './components/display';

const App = () => {
    return (
        <div className="bg-black h-screen">
            <div className="h-[90%] flex">
                <Sidebar />
                <Display />
            </div>
            <Player />
        </div>
    );
};

export default App;
