import {Router} from "express"
import {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategoryByID
} from "../controllers/category.controller"
import {upload} from "../middlewares/upload.middleware"
import { authenticate } from "../middlewares/auth.middleware"

const router = Router()

router.post('/', authenticate, upload.single('image'), addCategory)
router.put('/:id', authenticate, upload.single('image'), updateCategory)
router.delete('/:id', authenticate, deleteCategory)
router.get('/', getAllCategory)
router.get('/:id', getCategoryByID)

export default router