import express from 'express'
import { Database } from './configs/database'
const app = express()
import { port, nodeEnv } from './configs/env'
import routerV1 from './routes/routerV1'

if (nodeEnv() == 'production') {
   Database.getInstance()
}

app.use(express.json())

app.use('/api/v1', routerV1)

app.listen(port(), () => {
   console.log(`We are listening on port: ${port()}.`)
})
