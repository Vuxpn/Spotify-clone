import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const Listvideo = () => {
    const [data, setData] = useState([]);
    const fetchVideo = async () => {
        try {
            const response = await axios.get(`${url}/api/youtube/list`);
            console.log('API Response:', response.data);

            if (response.data && response.data.content) {
                setData(response.data.content);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            toast.error('Có lỗi xảy ra khi tải danh sách video');
        }
    };
    const removeVideo = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: 'Bạn sẽ không thể hoàn tác hành động này!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });

            if (result.isConfirmed) {
                const response = await axios.post(`${url}/api/youtube/remove`, { id });
                if (response.data.success) {
                    await fetchVideo();
                    Swal.fire('Đã xóa!', 'Video đã được xóa thành công.', 'success');
                } else {
                    throw new Error('Xóa video không thành công');
                }
            }
        } catch (error) {
            console.error('Error removing video:', error);
            Swal.fire('Lỗi!', 'Có l��i xảy ra khi xóa video.', 'error');
        }
    };
    useEffect(() => {
        fetchVideo();
    }, []);
    useEffect(() => {
        console.log('Current data:', data);
    }, [data]);
    return (
        <div>
            <p className="text-center font-bold text-lg">Tất cả video</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 text-black">
                    <b>Hình Ảnh</b>
                    <b>Tên Video</b>
                    <b>Loại</b>
                    <b>Mô tả</b>
                    <b>Tuỳ chọn</b>
                </div>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm "
                        >
                            <img className="w-12" src={item.thumbnail} alt="" />
                            <p>{item.name}</p>
                            <p>{item.type}</p>
                            <p className="pl-6">{item.desc}</p>
                            <p onClick={() => removeVideo(item._id)} className="pl-7 cursor-pointer">
                                x
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-4">Không có video nào</p>
                )}
            </div>
        </div>
    );
};

export default Listvideo;
