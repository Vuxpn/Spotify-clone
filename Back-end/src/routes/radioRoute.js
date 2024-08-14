import express from 'express';
import { addRadio, listRadio, removeRadio } from '../controllers/radiocontroller.js';
import upload from '../middleware/multer.js';

const radioRouter = express.Router();

radioRouter.post('/add', upload.single('image'), addRadio);
radioRouter.get('/list', listRadio);
radioRouter.post('/remove', removeRadio);

export default radioRouter;
