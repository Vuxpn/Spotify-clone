import express from 'express';
import { searchAll, searchAudio, searchVideo } from '../controllers/searchcontroller.js';

const searchRouter = express.Router();

searchRouter.get('/all', searchAll);
searchRouter.get('/audio', searchAudio);
searchRouter.get('/video', searchVideo);

export default searchRouter;
