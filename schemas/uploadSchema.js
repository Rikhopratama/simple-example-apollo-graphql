const { gql } = require('apollo-server');

module.exports = gql`
  scalar Upload

  type File {
    filename: String!
    path: String!
  }
`;
