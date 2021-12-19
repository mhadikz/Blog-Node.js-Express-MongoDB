import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../database/models/user.model'
import { hashPassword, isPasswordValid } from '../utils/auth.util'
import { generateUserId } from '../utils/uuid.util'
import { BaseController } from './base.controller'
import { jwtKey } from '../configs/env'
import { plainToInstance } from 'class-transformer'
import UserDTO from '../database/dtos/user.dto'
import { validate } from 'class-validator'

export class AuthController extends BaseController {
   constructor() {
      super()
   }

   async registerUser(req: Request, res: Response) {
      const { username, password, email, name } = req.body

      try {
         const usetDto = plainToInstance(UserDTO, req.body)

         await validate(usetDto).then(errors => {
            if (errors.length > 0) return super.badRequest(res, errors)
         })

         const user = await new User({
            username: username,
            password: await hashPassword(password, 10),
            email: email,
            name: name,
            userId: generateUserId()
         })

         const result = await user.save()
         if (!result) return super.fail(res, result)

         return super.ok(res, 'User account was created')
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
