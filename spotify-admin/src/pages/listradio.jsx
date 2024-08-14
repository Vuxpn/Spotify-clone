import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ListRadio = () => {
    const [data, setData] = useState([]);
    const fetchRadios = async () => {
        try {
            const response = await axios.get(`${url}/api/radio/list`);
            if (response.data.success) {
                setData(response.data.radios);
            } else {
                console.error('Failed to fetch radios:', response.data.message);
                toast.error('Không thể lấy danh sách radio');
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };
    const removeRadio = async (id) => {
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
            try {
                const response = await axios.post(`${url}/api/radio/remove`, { id });
                if (response.data.success) {
                    Swal.fire('Đã xóa!', 'Radio đã được xóa thành công.', 'success');
                    await fetchRadios();
                }
            } catch (error) {
                Swal.fire('Lỗi!', 'Có lỗi xảy ra khi xóa bài hát.', 'error');
            }
        }
    };
    useEffect(() => {
        fetchRadios();
    }, []);

    return (
        <div>
            <p className="text-center font-bold text-lg">Tất cả radio</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_1fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 text-black">
                    <b>Hình Ảnh</b>
                    <b>Tên Radio</b>
                    <b>Mô tả</b>
                    <b>Màu nền</b>
                    <b>Tuỳ chọn</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm "
                        >
                            <img className="w-12" src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input className="items-center m-auto" type="color" value={item.bgColor} />
                            <p
                                onClick={() => {
                                    removeRadio(item._id);
                                }}
                                className="pl-7 cursor-pointer"
                            >
                                x
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListRadio;
