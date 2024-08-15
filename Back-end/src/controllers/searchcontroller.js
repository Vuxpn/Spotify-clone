import songModel from '../models/songmodel.js';
import radioModel from '../models/radiomodel.js';

const searchSong = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Cần có từ khóa tìm kiếm' });
        }

        // Tìm kiếm bài hát
        const songs = await songModel
            .find({
                $or: [{ name: { $regex: query, $options: 'i' } }, { desc: { $regex: query, $options: 'i' } }],
            })
            .select('name desc image radio plays duration');

        // Tìm kiếm đài radio

        res.status(200).json({
            songs,
            totalResults: songs.length,
        });
    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' });
    }
};
const searchRadio = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Cần có từ khóa tìm kiếm' });
        }

        // Tìm kiếm đài radio
        const radios = await radioModel
            .find({
                $or: [{ name: { $regex: query, $options: 'i' } }, { desc: { $regex: query, $options: 'i' } }],
            })
            .select('name desc image');

        res.status(200).json({
            radios,
            totalResults: radios.length,
        });
    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' });
    }
};

export { searchSong, searchRadio };
