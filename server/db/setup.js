const mongoose = require('mongoose');
const { replaceString } = require('../utils');
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
      console.log('Connected to DB');
      func(client);
    })
    .catch(err => console.log(err));
};
