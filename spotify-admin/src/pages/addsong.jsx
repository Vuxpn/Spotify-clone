import React from 'react';
import { assetsadmin } from '../assets/admin-assets/assetsadmin';
import { useState } from 'react';

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
    };

    return loading ? (
        <div className="grid place-items-center min-h-[80vh]">
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
    ) : (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-800">
            <div className="flex gap-8 ">
                <div className="flex flex-col gap-4">
                    <p className="text-white">Tải bài hát</p>
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
                    <p className="text-white">Tải hình ảnh</p>
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
                <p className="text-white">Tên bài hát</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white "
                    type="text"
                    placeholder="Nhập tên bài hát"
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white">Mô tả bài hát</p>
                <input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[max(40vw,250px)] rounded text-white"
                    type="text"
                    placeholder="Nhập mô tả bài hát"
                />
            </div>
            <div className="flex flex-col gap-2.5">
                <p className="text-white">Radio</p>
                <select
                    onChange={(e) => setRadio(e.target.value)}
                    value={radio}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[150px] rounded text-white "
                >
                    <option className="text-white" value="none">
                        None
                    </option>
                </select>
            </div>

            <button className="text-base bg-white text-black py-2.5 px-14 cursor-pointer" type="submit">
                Xác nhận
            </button>
        </form>
    );
};

export default AddSong;
