import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddYoutube = () => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        type: 'song',
        thumbnail: '',
        youtubeUrl: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/youtube/add', formData);
            toast.success('YouTube content added successfully');
            setFormData({
                name: '',
                desc: '',
                type: 'song',
                thumbnail: '',
                youtubeUrl: '',
            });
        } catch (error) {
            toast.error('Error adding YouTube content');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 rounded text-black"
                    required
                />
            </div>
            {/* Add other form fields similarly */}
            <button type="submit" className="bg-green-500 px-4 py-2 rounded">
                Add YouTube Content
            </button>
        </form>
    );
};

export default AddYoutube;
