const { ApolloServer } = require("apollo-server-express");
const express = require("express");
require("dotenv").config();

// graphql server

// types query/mutation/subscription schema definitions
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

// resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};


// express server
const app = express();

// integrate express server to incorporate apollo graphql
async function startServer() {
  const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.get('/rest', (req, res) => {
  res.json({
    data: 'API is working...',
  });
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Server is a go! Running at http://localhost:${PORT}`);
});