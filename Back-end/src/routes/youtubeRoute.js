import express from 'express';
import { addYoutubeContent, getYoutubeContent } from '../controllers/youtubeController.js';

const youtubeRouter = express.Router();

youtubeRouter.post('/add', addYoutubeContent);
youtubeRouter.get('/list', getYoutubeContent);

export default youtubeRouter;
