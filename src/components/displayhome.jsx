import React from 'react';
import Navbar from '../layout/navbar';
import { artistsData } from '../assets/frontend-assets/assets';
import { radiosData } from '../assets/frontend-assets/assets';
import Radioitem from './radioitem';
import Artistitem from './artistitem';

const displayHome = () => {
    return (
        <div>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Radio phổ biến</h1>
                <div className="flex - overflow-auto">
                    {radiosData.map((item, index) => (
                        <Radioitem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Nghệ sĩ phổ biến</h1>
                <div className="flex - overflow-auto">
                    {artistsData.map((item, index) => (
                        <Artistitem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default displayHome;
