import express from 'express'
import { config } from 'dotenv'
import { mongoClient } from './database/mongo'
import { routes } from './routes/routes'

const main = async () => {
  config()

  const app = express()

  await mongoClient.connect()

  app.use(express.json())

  app.use(routes)

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`🚀 server is running on ${port}!`)
  })
}

main()
