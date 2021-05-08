const redis = require('ioredis');
const chalk = require('chalk');

const options = {
  host: 'localhost',
  port: 6379,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const subscriber = new redis({ options });
const publisher = new redis({ options });

subscriber.on('connect', () => {
  console.log(chalk.greenBright.bold('[CONNECTED]') + ' Redis subscriber');
});

publisher.on('connect', () => {
  console.log(chalk.greenBright.bold('[CONNECTED]') + ' Redis publisher');
});

module.exports = {
  subscriber,
  publisher,
};
