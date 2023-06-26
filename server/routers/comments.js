import express from 'express';
import { getComments, createComment, updateComment } from '../controllers/comments.js';

const router = express.Router();
//http://localhost:5000/comments

router.get('/', getComments);

router.post('/', createComment);

router.post('/update', updateComment);

export default router;
