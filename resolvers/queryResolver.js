module.exports = {
  Query: {
    products: (parent, args, { dataSources }, info) => {
      return dataSources.ProductsDb.findAll();
    },
    productById: (parent, args, { dataSources }, info) => {
      return dataSources.ProductsDb.findOneById(args.id);
    },
    uploads: (parent, args) => {},
  },
  Product: {
    product_category: (parent, args) => {
      const productCatdata = [
        {
          id: 1,
          category_name: 'Snack',
          category_description: 'Jajanan anak-anak',
          hierarchy: 1,
        },
        {
          id: 2,
          category_name: 'Minuman Berasa',
          category_description: 'Minuman perasa untuk anak-anak',
          hierarchy: 1,
        },
      ];

      return productCatdata.find((p) => p.id === parent.product_category_id);
    },
  },
};
