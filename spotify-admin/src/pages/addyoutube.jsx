import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
import { assetsadmin } from '../assets/admin-assets/assetsadmin';

const AddYoutube = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        type: 'daily',
        thumbnail: '',
        youtubeUrl: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${url}/api/youtube/add`, formData);
            if (response.data.success) {
                toast.success('Video đã được thêm thành công');
                setFormData({
                    name: '',
                    desc: '',
                    type: 'daily',
                    thumbnail: '',
                    youtubeUrl: '',
                });
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Có lỗi xảy ra khi thêm video');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-8 text-gray-800">
            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Tên Video</p>
                <input
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="text"
                    placeholder="Nhập tên video"
                    required
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Mô tả</p>
                <input
                    name="desc"
                    onChange={handleChange}
                    value={formData.desc}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="text"
                    placeholder="Nhập mô tả video"
                    required
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Loại</p>
                <select
                    name="type"
                    onChange={handleChange}
                    value={formData.type}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[150px] rounded text-white"
                    required
                >
                    <option className="text-black" value="daily">
                        Daily
                    </option>
                    <option className="text-black" value="film">
                        Film
                    </option>
                    <option className="text-black" value="podcast">
                        Podcast
                    </option>
                    <option className="text-black" value="toeic">
                        TOEIC
                    </option>
                    <option className="text-black" value="ielts">
                        IELTS
                    </option>
                </select>
            </div>

            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Thumbnail URL</p>
                <input
                    name="thumbnail"
                    onChange={handleChange}
                    value={formData.thumbnail}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="url"
                    placeholder="Nhập URL hình thumbnail"
                    required
                />
            </div>

            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">YouTube URL</p>
                <input
                    name="youtubeUrl"
                    onChange={handleChange}
                    value={formData.youtubeUrl}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="url"
                    placeholder="Nhập URL video YouTube"
                    required
                />
            </div>

            <button
                className="text-base bg-white text-black py-2.5 px-14 cursor-pointer font-bold rounded"
                type="submit"
            >
                Xác nhận
            </button>
        </form>
    );
};

export default AddYoutube;
