import express from "express"
import { createNewContactQuery, getAllContactQueries } from '../controller/contactController.js'
import auth from "../middleware/auth.js";

const router = express.Router()

router.get('/', auth, getAllContactQueries);
router.post('/', createNewContactQuery);

export default router;