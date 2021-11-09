import { BaseController } from './base.controller'
import { Request, Response } from 'express'
import Post from '../models/post.model'
import User from '../models/user.model'

export class ContentController extends BaseController {
   constructor() {
      super()
   }

   async addPost(req: Request | any, res: Response) {
      const username = req.user.username
      const { title, body, tags, categories } = req.body

      try {
         if (!username || !title || !body || !tags || !categories) return super.badRequest(res)

         const user = await User.findOne({ username })

         if (!user) return super.forbidden(res)

         await Post.create({
            userId: user.userId,
            title: title,
            body: body,
            author: user.name ? user.name : user.username,
            tags: tags,
            categories: categories
         })

         return super.ok(res, 'Post saved')
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }

   async getAllPosts(req: Request | any, res: Response) {
      try {
         const posts = await Post.find({}).sort({publisheddAt: 'descending'}).select('-userId').select('-__v')

         return super.ok(res, 'Posts are ready', posts)
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }
}
