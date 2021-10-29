import express from 'express'
import { Database } from './configs/database'
const app = express()
import {port} from './configs/env'
Database.getInstance()

app.use(express.json())

app.listen(port(), () => {
   console.log(`We are on-air with port: ${port()}.`)
})
