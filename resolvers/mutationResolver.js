const { NEW_PRODUCT } = require('../utils/constants');
const path = require('path');
const fs = require('fs');

module.exports = {
  Mutation: {
    addProducts: async (parent, args, { dataSources, pubsub }, info) => {
      const dataToInsert = args.input;
      const result = await dataSources.ProductsDb.insertData(dataToInsert); // Insert data into mongodb

      pubsub.publish(NEW_PRODUCT, {
        newProduct: result,
      }); // Publish result

      return result;
    },
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const pathName = path.join(__dirname, `../storage/images/${filename}`);
      await stream.pipe(fs.createWriteStream(pathName));

      return {
        filename,
        path: pathName,
      };
    },
  },
};
