import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled'
import { expressMiddleware } from '@apollo/server/express4';
import { initializeFirebase } from './services/firebase.js'
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from '@apollo/server';
import resolvers from './resolvers/index.js'
import typeDefs from './typeDefs/index.js'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';

dotenv.config()

async function getContext(req: any): Promise<any> {
  let userId = req.headers?.uid;
  let token = req.headers?.token;
  return {
    userId,
    token
  }
}

async function reconnectMongoDb(url: string): Promise<any> {

  console.log('reconnecting to database...')
  await mongoose.connect(url)
  .then(() => console.log('connected to mongoDB database ✅'))
  .catch(async (err) => {
    if(err) {
      if(err.name == 'MongoParseError') {
        throw new Error('Incorrect MongoDB Url')
      }
      if(err.name == 'MongoServerError') {
        throw new Error('Incorrect MongoDB Credentials')
      }
      console.error(err)
      process.exit(1);
    }
  })
}

async function connectDb(): Promise<any> {

  const mongoUrl = process.env.MONGO_URI as string;
  mongoose.set('strictQuery', false);
  await mongoose.connect(mongoUrl)
    .then(() => console.log('connected to mongoDB database ✅'))
    .catch(async (err) => {
      if(err) {
        await reconnectMongoDb(mongoUrl);
      }
    })
}

async function startServer() {
  const app = express();
  const { json } = bodyParser;
  const port = process.env.PORT || 3002;
  const httpServer = http.createServer(app);
  const server = new ApolloServer<any>({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginInlineTraceDisabled()
    ],
  });
  await connectDb();
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ me: await getContext(req) }),
    }),
  );
  await initializeFirebase();
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`Server listening at http://localhost:${port}/graphql ✅`);
}
startServer().catch((err) => console.log(err));