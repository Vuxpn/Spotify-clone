import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songmodel.js';

const addSong = async (req, res) => {
    try {
        // Lấy thông tin từ body request
        const { name, desc, type } = req.body;

        // Validate required fields
        if (!name || !desc || !type) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        // Validate type enum
        if (!['daily', 'toeic', 'ielts', 'song', 'podcast'].includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid type value',
            });
        }

        // Lấy đường dẫn file đã upload
        if (!req.files?.audio?.[0] || !req.files?.image?.[0]) {
            return res.status(400).json({
                success: false,
                message: 'Audio and image files are required',
            });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        // Upload files to cloudinary
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        // Calculate duration in MM:SS format
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)
            .toString()
            .padStart(2, '0')}`;

        // Parse lyrics if provided
        let lyrics = [];
        if (req.body.lyrics) {
            lyrics = JSON.parse(req.body.lyrics);
        }

        const songData = {
            name,
            desc,
            type,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration,
            lyrics,
            plays: 0, // Using default from schema
            createdAt: Date.now(),
        };

        const song = new songModel(songData);
        await song.save();

        res.status(201).json({
            success: true,
            message: 'Song added successfully',
            song: song,
        });
    } catch (error) {
        console.error('Full error:', error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
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
