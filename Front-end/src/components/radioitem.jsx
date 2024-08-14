import React from 'react';
import { useNavigate } from 'react-router-dom';

const radioitem = ({ image, name, desc, id }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/radio/${id}`)}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
        >
            <img className="rounded w-[150px]" src={image} alt="" />
            <p className="font-bold mt-2 mb-1 overflow-hidden line-clamp-1">{name}</p>
            <p className="text-slate-200 text-sm overflow-hidden line-clamp-1">{desc}</p>
        </div>
    );
};

export default radioitem;
