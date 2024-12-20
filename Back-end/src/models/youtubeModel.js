import mongoose from 'mongoose';

const youtubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['film', 'podcast', 'toeic', 'ielts', 'daily'],
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    youtubeUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const youtubeModel = mongoose.models.youtube || mongoose.model('youtube', youtubeSchema);
export default youtubeModel;
