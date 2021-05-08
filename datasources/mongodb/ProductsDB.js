const { MongoDataSource } = require('apollo-datasource-mongodb');

class Products extends MongoDataSource {
  constructor(config) {
    // Set config to assign mongoose model on MongoDataSource
    super(config);
  }

  findAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.model.find({});
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  insertData(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const insert = await this.model.insertMany(data);
        resolve(insert);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Products;
