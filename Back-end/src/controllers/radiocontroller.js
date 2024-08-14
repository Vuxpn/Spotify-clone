import { v2 as cloudinary } from 'cloudinary';
import radioModel from '../models/radiomodel.js';

const addRadio = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const radioData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url,
        };
        const radio = new radioModel(radioData);
        await radio.save();
        res.status(200).json({ success: true, message: 'Radio added successfully', radio: radio });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const listRadio = async (req, res) => {
    try {
        const allRadios = await radioModel.find();
        res.status(200).json({ success: true, radios: allRadios });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const removeRadio = async (req, res) => {
    try {
        await radioModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Radio removed successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export { addRadio, listRadio, removeRadio };
