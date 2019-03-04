const mongoose = require('mongoose');
const { replaceString, loggerContainer } = require('../utils');
const { uri, dbName, options } = require('config').get('dbConfig');
const { mongodb } = require('../config/credentials');

module.exports = func => {
  mongoose
    .connect(
      process.env.LOCAL_DB ||
        replaceString(uri, {
          user: mongodb.user,
          pass: mongodb.pass,
          dbName: dbName
        }),
      options
    )
    .then(client => {
      loggerContainer.get('server').info('Connected to DB');
      func(client);
    })
    .catch(err => loggerContainer.get('server').error(err));
};
