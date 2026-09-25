import {Router} from "express"
import {
    addMenu,
    updateMenu,
    deleteMenu,
    getAllMenu,
    getMenuByID
} from "../controllers/menu.controller"
import { authenticate } from "../middlewares/auth.middleware"
import { upload } from "../middlewares/upload.middleware"

const router = Router()

router.post('/', authenticate, upload.single('image'), addMenu)
router.put('/:id', authenticate, upload.single('image'), updateMenu)
router.delete('/:id', authenticate, deleteMenu)
router.get('/', getAllMenu)
router.get('/:id', getMenuByID)

export default router