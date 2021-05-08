const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    products: [Product]
    productById(id: String!): Product
    uploads: [File]
  }
`;
