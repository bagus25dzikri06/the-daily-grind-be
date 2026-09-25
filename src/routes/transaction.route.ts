import {Router} from "express"
import {
    createTransaction,
    updateTransaction,
    getAllTransaction,
    getTransactionByID
} from "../controllers/transaction.controller"
import { upload } from "../middlewares/upload.middleware"
import { authenticate } from "../middlewares/auth.middleware"

const router = Router()

router.post('/checkout', upload.single('image'), createTransaction)
router.get('/', authenticate, getAllTransaction)
router.get('/:id', getTransactionByID)
router.put('/:id', authenticate, upload.none(), updateTransaction)

export default router