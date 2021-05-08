const { NEW_PRODUCT } = require('../utils/constants');

const subscriptionResolver = (pubsub) => {
  return {
    Subscription: {
      newProduct: {
        subscribe: () => pubsub.asyncIterator(NEW_PRODUCT),
      },
    },
  };
};

module.exports = subscriptionResolver;
