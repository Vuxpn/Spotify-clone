import React, { useState } from 'react';
import { assetsadmin } from '../assets/admin-assets/assetsadmin';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddRadio = () => {
    const [image, setImage] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [bgcolor, setBgcolor] = useState('#121212');
    const [loading, setLoading] = useState(false);

    const onSummitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('bgColor', bgcolor);
            const response = await axios.post(`${url}/api/radio/add`, formData);

            if (response.data.success) {
                toast.success('Radio đã được thêm thành công');
                setName('');
                setDesc('');
                setImage(false);
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra1');
        }
        setLoading(false);
    };

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={onSummitHandler} className="flex flex-col items-start gap-8 text-gray-800">
            <div className="flex flex-col gap-4">
                <p className="text-white font-semibold">Tải hình ảnh</p>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="iamge/*" hidden />
                <label htmlFor="image">
                    <img
                        src={image ? URL.createObjectURL(image) : assetsadmin.upload_area}
                        className="w-24 cursor-pointer"
                        alt=""
                    />
                </label>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-white font-semibold">Tên radio</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white "
                    type="text"
                    placeholder="Nhập tên radio"
                />
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-white font-semibold">Mô tả radio</p>
                <input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white "
                    type="text"
                    placeholder="Nhập mô tả radio"
                />
            </div>
            <div className="flex flex-col gap-4 ">
                <p className="text-white font-semibold">Màu nền</p>
                <input onChange={(e) => setBgcolor(e.target.value)} value={bgcolor} type="color" />
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

export default AddRadio;
