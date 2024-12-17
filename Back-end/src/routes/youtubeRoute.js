import express from 'express';
import { addYoutubeContent, getYoutubeContent, removeYoutubeContent } from '../controllers/youtubeController.js';

const youtubeRouter = express.Router();

youtubeRouter.post('/add', addYoutubeContent);
youtubeRouter.get('/list', getYoutubeContent);
youtubeRouter.post('/remove', removeYoutubeContent);

export default youtubeRouter;
