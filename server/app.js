const app = require('express')();
const { googleDriveWebhookCronjob } = require('./cronjobs');
const { port } = require('config').get('appConfig');
const { loggerContainer } = require('./utils');

require('./db/setup')(client => {
  app.listen(port);
  loggerContainer.get('server').info(`app listening on port: ${port}`);
  require('./routes')(app);
  //googleDriveWebhookCronjob();
});
