import { ApolloServer } from "@apollo/server";
import { ApolloGateway, RemoteGraphQLDataSource, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { expressMiddleware } from '@apollo/server/express4';
import jwt from 'jsonwebtoken'
import express from 'express';
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors';
import pkg from 'body-parser';
dotenv.config()

async function getMe(req: any): Promise<any> {
  try {
    let user: any = {};
    let secretKey = process.env.JWT_SECRET_KEY as string;
    let token = req.headers.token || req.headers.Authorization || null;
    if(!!token) {
      try {
        user = jwt.verify(token, secretKey) || {};
      } catch(err) {
        if (['invalid token', 'invalid signature'].includes(err.message) && req.headers.token) throw new Error("invalid-token");
      }
    }
    let userId = user?.uid || null;
    return {
      token,
      userId
    }
  } catch(e) {
    if(e.message == 'invalid-token') {
      throw new Error('invalid-token')
    }
    throw e;
  }
}

async function startServer() {
  let port = process.env.PORT || 3002;
  let serviceList = process.env.SERVICE_MAP as string;
  let services = JSON.parse(serviceList);
  const { json } = pkg;
  const app = express();
  const httpServer = http.createServer(app);
  class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }: any) {
      if(context.me?.userId) {
        request.http.headers.set('uid', context?.me.userId);
      }
      if(context.me?.token) {
        request.http.headers.set('token', context?.me.token);
      }
    }
  }
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({ subgraphs: services }),
    buildService({ url }) {
      return new AuthenticatedDataSource({ url });
    },  
  });
  const server = new ApolloServer({
    gateway,
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground() ],
    formatError: (err) => {
      if (err?.message?.endsWith("invalid-token")) {
        return {
          message: "UNAUTHORIZED",
          statusCode: 401,
        }
      }
      if (err?.message?.endsWith("deactivated-user")) {
        return {
          message: "DEACTIVATED",
          statusCode: 401,
        }
      }
      return {
        message: err.message,
        statusCode: err.extensions?.code,
        path: err.path
      };
    }
  });
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ me: await getMe(req) }),
    }),
  );
  httpServer.listen({ port });
  console.log(JSON.stringify(`🚀 Server running at http://localhost:${port}/graphql`));
}

startServer().catch((err) => console.log(err))
