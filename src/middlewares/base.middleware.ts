import { Request, Response } from 'express'

export class BaseMiddleware {
   static jsonResponse(res: Response, code: number, message: string) {
      return res.status(code).json({ error: true, message })
   }

   ok<T>(res: Response, message: string, result?: T) {
      if (!!result) {
         res.type('application/json')
         return res.status(200).json({ error: false, message, result })
      } else if (!!message) {
         res.type('application/json')
         return res.status(200).json({ error: false, message })
      } else {
         return res.sendStatus(200)
      }
   }

   created(res: Response) {
      return res.sendStatus(201)
   }

   badRequest(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 400, message ? message : 'Bad request')
   }

   clientError(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 400, message ? message : 'Unauthorized')
   }

   unauthorized(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 401, message ? message : 'Unauthorized')
   }

   paymentRequired(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 402, message ? message : 'Payment required')
   }

   forbidden(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 403, message ? message : 'Forbidden')
   }

   notFound(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 404, message ? message : 'Not found')
   }

   conflict(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 409, message ? message : 'Conflict')
   }

   tooMany(res: Response, message?: string) {
      return BaseMiddleware.jsonResponse(res, 429, message ? message : 'Too many requests')
   }

   todo(res: Response) {
      return BaseMiddleware.jsonResponse(res, 400, 'TODO')
   }

   fail(res: Response, error: Error | string) {
      return BaseMiddleware.jsonResponse(res, 500, error.toString())
   }
}
