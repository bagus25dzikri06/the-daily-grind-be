import {Router} from "express"
import {
    addBank,
    getAllBank,
    updateBank,
    deleteBank
} from "../controllers/bank.controller"
import { authenticate } from "../middlewares/auth.middleware"

const router = Router()

router.post('/', authenticate, addBank)
router.put('/:id', authenticate, updateBank)
router.delete('/:id', authenticate, deleteBank)
router.get('/', getAllBank)

export default router