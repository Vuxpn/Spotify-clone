import mongoose from 'mongoose';

const radioSchema = new mongoose.Schema({
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
        trim: true,
    },
    bgColor: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true,
    },
});

const radioModel = mongoose.models.album || mongoose.model('radio', radioSchema);
export default radioModel;
