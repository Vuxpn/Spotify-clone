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
    const [type, setType] = useState('daily');
    const [loading, setLoading] = useState(false);
    const [lyrics, setLyrics] = useState([]);
    const [currentLyricTime, setCurrentLyricTime] = useState('');
    const [currentLyricText, setCurrentLyricText] = useState('');

    const addLyricLine = () => {
        if (currentLyricTime && currentLyricText) {
            setLyrics([
                ...lyrics,
                {
                    time: parseFloat(currentLyricTime),
                    text: currentLyricText,
                },
            ]);
            setCurrentLyricTime('');
            setCurrentLyricText('');
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('audio', song);
            formData.append('image', image);
            formData.append('type', type);
            formData.append('lyrics', JSON.stringify(lyrics));

            const response = await axios.post(`${url}/api/song/add`, formData);
            if (response.data.success) {
                toast.success('Bài hát đã được thêm thành công');
                setName('');
                setDesc('');
                setImage(false);
                setSong(false);
                setType('daily');
            } else {
                toast.error('Có lỗi xảy ra');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
        setLoading(false);
    };

    const handleLyricFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Clear existing lyrics before loading new file
        setLyrics([]);

        // Check if it's a text file
        if (!file.type.includes('text')) {
            toast.error('Please upload a text file');
            e.target.value = ''; // Reset file input
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const lines = event.target.result.split('\n');
                const parsedLyrics = lines
                    .filter((line) => line.trim())
                    .map((line) => {
                        const [timeStr, ...textParts] = line.split(' ');
                        const text = textParts.join(' ').trim();

                        // Convert MM:SS to seconds
                        const [mins, secs] = timeStr.split(':');
                        const totalSeconds = parseInt(mins) * 60 + parseInt(secs);

                        return {
                            time: totalSeconds,
                            text: text,
                        };
                    })
                    .sort((a, b) => a.time - b.time);

                setLyrics(parsedLyrics);
                toast.success('Lyrics file uploaded successfully');
            } catch (error) {
                toast.error('Invalid file format');
                console.error('Error parsing lyrics file:', error);
            }
            e.target.value = ''; // Reset file input after successful upload
        };

        reader.onerror = () => {
            toast.error('Error reading file');
            e.target.value = ''; // Reset file input on error
        };

        reader.readAsText(file);
    };

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
                <p className="text-white font-semibold">Type</p>
                <select
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[150px] rounded text-white"
                >
                    <option className="text-black" value="daily">
                        Daily
                    </option>
                    <option className="text-black" value="toeic">
                        TOEIC
                    </option>
                    <option className="text-black" value="ielts">
                        IELTS
                    </option>
                </select>
            </div>
            <div className="flex flex-col gap-4">
                <p className="text-white font-semibold">Lyrics</p>

                {/* File upload for lyrics */}
                <div className="flex flex-col gap-2">
                    <p className="text-white text-sm">Upload lyrics file (optional)</p>
                    <input type="file" accept=".txt,.lrc" onChange={handleLyricFileUpload} className="text-white" />
                    <p className="text-gray-400 text-sm">Format: MM:SS Text (Example: "00:04 First line")</p>
                </div>

                {/* Manual lyrics input */}
                <div className="flex gap-2">
                    <input
                        type="number"
                        step="0.1"
                        value={currentLyricTime}
                        onChange={(e) => setCurrentLyricTime(e.target.value)}
                        placeholder="Time (seconds)"
                        className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 rounded text-white"
                    />
                    <input
                        type="text"
                        value={currentLyricText}
                        onChange={(e) => setCurrentLyricText(e.target.value)}
                        placeholder="Lyric text"
                        className="bg-transparent outline-white-600 border-2 border-gray-600 p-2.5 w-[300px] rounded text-white"
                    />
                    <button type="button" onClick={addLyricLine} className="bg-white text-black px-4 rounded">
                        Add Line
                    </button>
                </div>

                {/* Display lyrics */}
                <div className="max-h-[200px] overflow-y-auto">
                    {lyrics.map((lyric, index) => (
                        <div key={index} className="text-white">
                            {lyric.time.toFixed(3)}s: {lyric.text}
                        </div>
                    ))}
                </div>
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
