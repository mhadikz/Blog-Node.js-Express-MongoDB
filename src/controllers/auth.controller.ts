import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { hashPassword, isPasswordValid } from '../utils/auth.util'
import { generateUserId } from '../utils/uuid.util'
import { BaseController } from './base.controller'
import { jwtKey } from '../configs/env'

export class AuthController extends BaseController {
   constructor() {
      super()
   }

   async registerUser(req: Request, res: Response) {
      const username = req.body.username
      const password = req.body.password
      const email = req.body.email
      try {
         if (!username || !password || !email) return super.badRequest(res)

         const user = await createUserObj(username, password, email)

         await user
            .save()
            .then((result: typeof User) => {
               return super.ok(res, 'User account was created')
            })
            .catch((error: any) => {
               return super.fail(res, error.toString())
            })
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }

   async loginUser(req: Request, res: Response) {
      const username = req.body.username
      const password = req.body.password
      try {
         if (!username || !password) return super.badRequest(res)

         const user = await User.findOne({ username })

         if (!user) return super.notFound(res, 'User not found')

         if (!(await isPasswordValid(password, user.password))) return super.unauthorized(res)

         const token = {
            token: jwt.sign(
               {
                  exp: Math.floor(Date.now() / 1000) + 60 * 60,
                  username: username,
                  userId: user.userId
               },
               jwtKey()
            )
         }

         return super.ok(res, 'Token is ready', token)
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }
}

async function createUserObj(username: string, password: string, email: string) {
   return new User({
      username: username,
      password: await hashPassword(password, 10),
      email: email,
      userId: generateUserId()
   })
}
