const { gql } = require('apollo-server');

module.exports = gql`
  type Product {
    _id: ID
    product_code: String!
    product_name: String!
    product_description: String!
    product_qty: Int!
    product_uom: String!
    product_category_id: Int!
    product_category: ProductCategory
    product_price: Int!
  }

  type ProductCategory {
    id: Int!
    category_name: String!
    category_description: String!
    hierarchy: Int!
  }

  """
  input type, for mutation
  """
  input ProductInput {
    product_code: String!
    product_name: String!
    product_description: String!
    product_qty: Int!
    product_uom: String!
    product_category_id: Int!
    product_price: Int!
  }
`;
