import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //bat buoc
        trim: true, //tu dong loai bo khoang trang dau va cuoi
        unique: true, //dam bao moi ten bai hat la duy nhat
        minLength: [3, 'Song name must be more that 3 characters'],
        maxLength: [30, 'Song name must be at most 30 characters'],
    },
    desc: {
        type: String,
        required: true,
    },
    radio: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    plays: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const songModel = mongoose.models.song || mongoose.model('song', songSchema);

export default songModel;
