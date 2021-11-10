import express from 'express'
import { ContentController } from '../controllers/content.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()
const contentController = new ContentController()
const authMiddleware = new AuthMiddleware()

router.post('/add-post', authMiddleware.loginRequired, contentController.addPost)
router.get('/posts', contentController.getAllPosts)

router.get('/post/:id', contentController.getPost)
router.put('/post/:id', authMiddleware.loginRequired, contentController.updatePost)
 router.delete('/post/:id', authMiddleware.loginRequired, contentController.deletePost)

export default router
