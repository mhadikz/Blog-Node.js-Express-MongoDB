import { Request, Response } from 'express'
import User from '../models/user.model'
import { hashPassword } from '../utils/auth.util'
import { generateUserId } from '../utils/uuid.util'
import { BaseController } from './base.controller'

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
               return super.ok(res, 'User account was created', result)
            })
            .catch((error: any) => {
               return super.fail(res, error.toString())
            })
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

