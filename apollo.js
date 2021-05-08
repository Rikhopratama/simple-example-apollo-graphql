const { ApolloServer, makeExecutableSchema, gql } = require('apollo-server');
const { RedisPubSub } = require('graphql-redis-subscriptions');

const { merge } = require('lodash');
const { publisher, subscriber } = require('./redis');

// Import schema and resolver
const {
  querySchema,
  mutationSchema,
  subscriptionSchema,
  productSchema,
  uploadSchema,
} = require('./schemas');
const {
  queryResolver,
  mutationResolver,
  uploadResolver,
  subscriptionResolver,
} = require('./resolvers');

// Import datasources
const MongoDBDataSources = require('./datasources/mongodb');

// Import models
const { ProductsModel } = require('./mongoose/models');

// Create pubsub
const pubsub = new RedisPubSub({
  publisher,
  subscriber,
});

// Combine multiple schema and resolver
const schema = makeExecutableSchema({
  typeDefs: [
    querySchema,
    mutationSchema,
    subscriptionSchema,
    uploadSchema, // Only needed if we using makeExecutableSchema.
    productSchema,
  ],
  resolvers: merge(
    queryResolver,
    mutationResolver,
    uploadResolver, // Only needed if we using makeExecutableSchema
    subscriptionResolver(pubsub)
  ),
});

// Configure datasources
const dataSources = () => {
  return {
    ProductsDb: new MongoDBDataSources.ProductsDB(ProductsModel), // Send paramater mongoose model
  };
};

const context = () => {
  return {
    pubsub,
  };
};

// Create apollo server
const server = new ApolloServer({
  schema,
  subscriptions: { path: '/subscriptions' }, // Custom endpoint to connect websocket uri (ws://localhost:4000/subscriptions)
  dataSources,
  context,
});

// Run server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
