import React, { useEffect } from 'react';
import { assetsadmin } from '../assets/admin-assets/assetsadmin';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddSong = () => {
    const [image, setImage] = useState(false);
    const [song, setSong] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [radio, setRadio] = useState('none');
    const [loading, setLoading] = useState(false);
    const [radioData, setRadioData] = useState([]);

    const onSubmitHandler = async (e) => {
        //ngan ko cho tai lai trang
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('audio', song);
            formData.append('image', image);
            formData.append('radio', radio);

            const response = await axios.post(`${url}/api/song/add`, formData);
            if (response.data.success) {
                toast.success('Bài hát đã được thêm thành công');
                setName('');
                setDesc('');
                setImage(false);
                setSong(false);
                setRadio('none');
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
        setLoading(false);
    };

    const loadRadioData = async () => {
        try {
            const response = await axios.get(`${url}/api/radio/list`);
            if (response.data.success) {
                setRadioData(response.data.radios);
            } else {
                toast.error('Không thể lấy danh sách radio');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    useEffect(() => {
        loadRadioData();
    }, []);

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-800">
            <div className="flex gap-8 ">
                <div className="flex flex-col gap-4">
                    <p className="text-white font-semibold">Tải bài hát</p>
                    <input onChange={(e) => setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden />
                    <label htmlFor="song">
                        <img
                            src={song ? assetsadmin.upload_added : assetsadmin.upload_song}
                            className="w-24 cursor-pointer"
                            alt=""
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-white font-semibold">Tải hình ảnh</p>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                    />
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assetsadmin.upload_area}
                            className="w-24 cursor-pointer"
                            alt=""
                        />
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Tên bài hát</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white "
                    type="text"
                    placeholder="Nhập tên bài hát"
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Mô tả bài hát</p>
                <input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="text"
                    placeholder="Nhập mô tả bài hát"
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white font-semibold">Radio</p>
                <select
                    onChange={(e) => setRadio(e.target.value)}
                    value={radio}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[150px] rounded text-white "
                >
                    <option className="text-black" value="none">
                        Không
                    </option>
                    {radioData.map((item, index) => {
                        return (
                            <option key={index} className="text-black" value={item.name}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
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

export default AddSong;
