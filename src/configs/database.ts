const mongoose = require('mongoose')
import { dbAddress } from './env'

export class Database {
   private static instance: Database

   constructor() {
      mongoose.connect(dbAddress(), {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      const db = mongoose.connection

      db.on('error', console.error.bind(console, 'MongoDB connection error:'))
      db.on(
         'open',
         console.error.bind(console, 'MongoDB database connection established successfully')
      )
   }

   public static getInstance(): Database {
      if (!Database.instance) {
         Database.instance = new Database()
      }

      return Database.instance
   }
}
