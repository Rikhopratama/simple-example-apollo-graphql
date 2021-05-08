import { Table } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

// Create graphql query to retreive all products data
const PRODUCTS = gql`
  query getProducts {
    products {
      _id
      product_code
      product_name
      product_description
      product_qty
      product_uom
      product_category_id
      product_category {
        id
        category_name
        category_description
      }
    }
  }
`;

const List = () => {
  // Usequery always return this 3 parameters
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return 'Loading...';
  if (error) return 'ERROR!';

  return (
    <>
      <h1>List Data</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Quantity</th>
            <th>Product Uom</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product, i) => (
            <tr key={product._id}>
              <td>{i + 1}</td>
              <td>{product.product_code}</td>
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>{product.product_qty}</td>
              <td>{product.product_uom}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default List;
