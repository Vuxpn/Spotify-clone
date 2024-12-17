import youtubeModel from '../models/youtubeModel.js';

const addYoutubeContent = async (req, res) => {
    try {
        const { name, desc, type, thumbnail, youtubeUrl } = req.body;

        const youtubeContent = new youtubeModel({
            name,
            desc,
            type,
            thumbnail,
            youtubeUrl,
        });

        await youtubeContent.save();
        res.status(201).json({ success: true, message: 'YouTube content added successfully', content: youtubeContent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getYoutubeContent = async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {};
        const content = await youtubeModel.find(query);
        res.status(200).json({ success: true, content });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const removeYoutubeContent = async (req, res) => {
    try {
        await youtubeModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'YouTube content removed successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export { addYoutubeContent, getYoutubeContent, removeYoutubeContent };
