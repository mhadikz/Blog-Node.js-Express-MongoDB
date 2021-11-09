import express from 'express'
import { ContentController } from '../controllers/content.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()
const contentController = new ContentController()
const authMiddleware = new AuthMiddleware()

router.post('/add-post', authMiddleware.loginRequired, contentController.addPost)

export default router
