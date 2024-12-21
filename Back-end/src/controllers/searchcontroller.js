import songModel from '../models/songmodel.js';
import youtubeModel from '../models/youtubeModel.js';

const searchAll = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Cần có từ khóa tìm kiếm' });
        }

        // Tìm kiếm song
        const songs = await songModel
            .find({
                $or: [{ name: { $regex: query, $options: 'i' } }, { desc: { $regex: query, $options: 'i' } }],
            })
            .select('name desc image type duration');

        // Tìm kiếm video
        const videos = await youtubeModel
            .find({
                $or: [{ name: { $regex: query, $options: 'i' } }, { desc: { $regex: query, $options: 'i' } }],
            })
            .select('name desc thumbnail type youtubeUrl');

        // Sửa lại cấu trúc response
        res.status(200).json({
            success: true,
            songs, // Trả về trực tiếp songs
            videos, // Trả về trực tiếp videos
            total: songs.length + videos.length,
        });
    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' });
    }
};

const searchAudio = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Cần có từ khóa tìm kiếm' });
        }

        const songs = await songModel
            .find({
                $or: [{ name: { $regex: query, $options: 'i' } }, { desc: { $regex: query, $options: 'i' } }],
            })
            .select('name desc image type duration');

        res.status(200).json({
            success: true,
            songs,
            total: songs.length,
        });
    } catch (error) {
        console.error('Lỗi tìm kiếm audio:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' });
    }
};

const searchVideo = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Cần có từ khóa tìm kiếm' });
        }

        const videos = await youtubeModel
            .find({
                $or: [{ name: { $regex: query, $options: 'i' } }, { desc: { $regex: query, $options: 'i' } }],
            })
            .select('name desc thumbnail type youtubeUrl');

        res.status(200).json({
            success: true,
            videos,
            total: videos.length,
        });
    } catch (error) {
        console.error('Lỗi tìm kiếm video:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' });
    }
};

export { searchAll, searchAudio, searchVideo };
