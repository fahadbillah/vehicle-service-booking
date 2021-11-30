import 'regenerator-runtime/runtime';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import resolvers from './graphql/resolvers';

(async () => {
  const typeDefs = fs.readFileSync(`${__dirname}/graphql/schema.gql`, 'utf8');
  const server = new ApolloServer({
    typeDefs: [
      typeDefs,
    ],
    resolvers: {
      ...resolvers,
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    playground: {
      shareEnabled: true,
    },
    // context: ({ req }) => {
    //   const jwt = req?.headers?.authorization;
    //   const authToken = jwt ? jwt.split(' ')[1] : null;
    //   return { authToken };
    // },
  });

  await server.start();

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    // eslint-disable-next-line
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
})();
