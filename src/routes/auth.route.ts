import {Router} from "express"
import { initiateAdmin, signIn } from "../controllers/auth.controller"

const router = Router()

router.post('/signin', signIn)
router.post('/initiate-admin-user', initiateAdmin)

export default router