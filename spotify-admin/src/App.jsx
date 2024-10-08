import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import AddSong from './pages/addsong';
import AddRadio from './pages/addradio';
import ListRadio from './pages/listradio';
import ListSong from './pages/listsong';
import Sidebar from './layout/sidebar';
import Navbar from './layout/navbar';

export const url = 'https://spotify-clone-1-goal.onrender.com';
//export const url = 'http://localhost:4000';
const App = () => {
    return (
        <div className="flex h-screen bg-black ">
            <Sidebar />
            <ToastContainer />
            <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
                <Navbar />
                <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
                    <Routes>
                        <Route path="/list-radio" element={<ListRadio />} />
                        <Route path="/list-song" element={<ListSong />} />
                        <Route path="/add-radio" element={<AddRadio />} />
                        <Route path="/add-song" element={<AddSong />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
