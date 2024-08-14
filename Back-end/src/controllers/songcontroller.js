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
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)
            .toString()
            .padStart(2, '0')}`;

        const songData = {
            name,
            desc,
            radio,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
        };

        const song = new songModel(songData);
        await song.save();
        res.status(201).json({ success: true, message: 'Song added successfully', song: song });
    } catch (error) {
        console.error('Full error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const listSong = async (req, res) => {
    try {
        const allSong = await songModel.find({});
        res.status(200).json({ success: true, songs: allSong });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Song deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export { addSong, listSong, removeSong };
