import express from 'express'
import cors from 'cors'
import { ApolloServer, PubSub } from 'apollo-server-express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import schema from './src/graphql/schema'

const app = express()

const corsOptions = {
  origin: '*',
  credentials: true,
}

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Database
 */

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'wecodeit',
    port: 5432,
  },
})

/**
 * Apollo
 */

const pushSubscriptions = new PubSub()

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      database: knex,
      user: null,
    }
  },
  playground: true,
  introspection: true,
})

server.applyMiddleware({ app, cors: true })
server.installSubscriptionHandlers(app)

app.listen(options.port, () => {})
