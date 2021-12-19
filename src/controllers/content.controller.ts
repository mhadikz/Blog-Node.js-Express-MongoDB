import { BaseController } from './base.controller'
import { Request, Response } from 'express'
import Post from '../database/models/post.model'
import User from '../database/models/user.model'

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

   async getAllPosts(req: Request, res: Response) {
      try {
         const posts = await Post.find({})
            .sort({ publisheddAt: 'descending' })
            .select('-userId')
            .select('-__v')

         return super.ok(res, 'Posts are ready', posts)
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }

   async getPost(req: Request, res: Response) {
      const postId = req.params.id

      try {
         const post = await Post.findOne({ _id: postId })

         if (!post) return super.notFound(res)

         return super.ok(res, 'Post is ready', post)
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }

   async updatePost(req: Request | any, res: Response) {
      const username = req.user.username
      const { title, body, tags, categories } = req.body
      const postId = req.params.id

      try {
         if (!username || !title || !body || !tags || !categories) return super.badRequest(res)

         const user = await User.findOne({ username })
         const post = await Post.findOne({ _id: postId })

         if (!user || !post) return super.notFound(res)
         if (post.userId != user.userId) return super.forbidden(res)

         const updatedPost = await Post.updateOne({
            title: title,
            body: body,
            tags: tags,
            categories: categories
         })

         return super.ok(res, 'Post updated', updatedPost)
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }

   async deletePost(req: Request | any, res: Response) {
      const username = req.user.username
      const postId = req.params.id

      try {
         if (!username) return super.unauthorized(res)

         const user = await User.findOne({ username })
         const post = await Post.findOne({ _id: postId })

         if (!user || !post) return super.notFound(res)
         if (post.userId != user.userId) return super.forbidden(res)

         const deletedPost = await Post.deleteOne({ _id: postId })

         return super.ok(res, 'Post deleted', deletedPost)
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }
}
