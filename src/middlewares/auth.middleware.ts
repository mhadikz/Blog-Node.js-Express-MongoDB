import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../configs/env'
import { BaseMiddleware } from './base.middleware'

export class AuthMiddleware extends BaseMiddleware {
   constructor() {
      super()
   }

   loginRequired(req: Request | any, res: Response, next: NextFunction) {
      try {
         if (
            req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'JWT'
         ) {
            jwt.verify(
               req.headers.authorization.split(' ')[1],
               jwtKey(),
               (err: any, decode: any) => {
                  if (err) return super.unauthorized(res)

                  req.user = decode
                  next()
               }
            )
         } else {
            return super.unauthorized(res)
         }
      } catch (error) {
         return super.fail(res, error.toString())
      }
   }
}
