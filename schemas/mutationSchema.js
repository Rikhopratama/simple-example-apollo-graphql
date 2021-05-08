const { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    addProducts(input: [ProductInput!]!): [Product!]!
    singleUpload(file: Upload!): File!
  }
`;
