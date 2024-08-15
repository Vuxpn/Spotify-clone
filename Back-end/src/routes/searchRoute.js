import express from 'express';
import { searchSong, searchRadio } from '../controllers/searchcontroller.js';

const searchRouter = express.Router();

searchRouter.get('/song', searchSong);
searchRouter.get('/radio', searchRadio);

export default searchRouter;
