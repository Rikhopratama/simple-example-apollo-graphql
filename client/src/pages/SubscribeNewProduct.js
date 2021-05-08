import { useSubscription, gql } from '@apollo/client';

const PRODUCT_SUBSCRIPTION = gql`
  subscription OnNewProduct {
    newProduct {
      _id
      product_code
      product_name
      product_description
      product_qty
      product_uom
      product_category_id
    }
  }
`;

const SubscribeNewProduct = () => {
  const { data, loading } = useSubscription(PRODUCT_SUBSCRIPTION);
  if (loading) console.log('Loading Subscription...');
  if (data) console.log('DATA SUBSCRIPTION', data);

  return <div>New data: {data && JSON.stringify(data.newProduct)}</div>;
};

export default SubscribeNewProduct;
