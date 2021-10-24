import express from 'express'
const app = express()
import {port} from './configs/env'

app.use(express.json())

app.listen(port(), () => {
   console.log(`We are on-air with port: ${port()}.`)
})
