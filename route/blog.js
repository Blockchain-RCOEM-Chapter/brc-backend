import express from 'express';
import {uploadImages} from '../middleware/multer.js';
import { handleCreateBlog, handleGetAllBlog, handleGetBlogById, handleDeleteBlog, handleUpdateBlog } from '../controller/blogController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/',handleGetAllBlog);

router.get('/:id', handleGetBlogById);

router.post('/', auth, uploadImages, handleCreateBlog);
router.delete('/:id', auth, handleDeleteBlog);

router.patch('/:id', auth, handleUpdateBlog);
export default router;









