import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useMutation, gql } from '@apollo/client';

const ADD_PRODUCT = gql`
  # [ProductInput!]! is type from Backend
  mutation AddProduct($products: [ProductInput!]!) {
    addProducts(input: $products) {
      product_code
      product_name
      product_description
      product_qty
      product_uom
      product_category_id
      product_price
    }
  }
`;

const Add = () => {
  // State
  const [formData, setFormData] = useState({
    product_code: null,
    product_name: null,
    product_description: null,
    product_qty: null,
    product_uom: null,
    product_category_id: null,
    product_price: null,
  });

  // GraphQl Execute Mutation
  const [addProductData, { data, error }] = useMutation(ADD_PRODUCT);
  console.log('DATA MUTATE ==>', data);
  console.log('ERROR MUTATE ==>', error && JSON.stringify(error, null, 2));

  // Custom Function
  const handleSubmit = (e) => {
    e.preventDefault();
    addProductData({
      variables: {
        products: formData,
      },
    });
  };

  const handleChange = (e, isNumber) => {
    let value = e.target.value;
    value = isNumber ? Number(value) : value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  // Render Component
  return (
    <>
      <h1>Add Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formProductCode'>
          <Form.Label>Product Code</Form.Label>
          <Form.Control
            name='product_code'
            type='text'
            placeholder='Enter Product Code'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='formProductName'>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name='product_name'
            type='text'
            placeholder='Enter Product Name'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='formProductDescription'>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name='product_description'
            type='text'
            placeholder='Enter Product Description'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='formProductQuantity'>
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            name='product_qty'
            type='number'
            placeholder='Enter Product Quantity'
            onChange={(e) => handleChange(e, true)}
          />
        </Form.Group>

        <Form.Group controlId='formProductUOM'>
          <Form.Label>Product UOM</Form.Label>
          <Form.Control
            name='product_uom'
            type='text'
            placeholder='Enter Product UOM'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId='formProductCategoryId'>
          <Form.Label>Product Category Id</Form.Label>
          <Form.Control
            name='product_category_id'
            type='number'
            placeholder='Enter Product CategoryId'
            onChange={(e) => handleChange(e, true)}
          />
        </Form.Group>

        <Form.Group controlId='formProductPrice'>
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            name='product_price'
            type='number'
            placeholder='Enter Product Price'
            onChange={(e) => handleChange(e, true)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Add;
