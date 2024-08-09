import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songmodel.js';

const addSong = async (req, res) => {
    try {
        // Lấy thông tin từ body request
        const name = req.body.name;
        const desc = req.body.desc;
        const radio = req.body.radio;
        // Lấy đường dẫn file đã upload
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        //su dung cloudinary de upload file
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        console.log(name, desc, radio, audioUpload, imageUpload);
    } catch (error) {}
};

const listSong = async (req, res) => {};

export { addSong, listSong };
