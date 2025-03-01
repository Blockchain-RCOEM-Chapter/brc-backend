import express from 'express';
import {uploadImages} from '../middleware/multer.js';
import { handleCreateBlog, handleGetAllBlog, handleGetBlogById, handleDeleteBlog, handleUpdateBlog } from '../controller/blogController.js';

const router = express.Router();

router.post('/', uploadImages, handleCreateBlog);

router.get('/',handleGetAllBlog);

router.get('/:id', handleGetBlogById);

router.delete('/:id', handleDeleteBlog);

router.patch('/:id', handleUpdateBlog);
export default router;









