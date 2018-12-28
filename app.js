const app = require('express')();
const { port } = require('config').get('appConfig');

require('./db/setup')(client => {
  app.listen(port);
  console.log(`app listening on port: ${port}`);
  require('./routes')(app);
});
