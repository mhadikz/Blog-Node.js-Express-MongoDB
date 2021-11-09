import express from 'express'
import authRouter from './auth.router'
import contentRouter from './content.router'
const router = express.Router()

router.use('/auth', authRouter)
router.use('/content', contentRouter)

export default router