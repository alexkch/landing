const schedule = require('node-schedule');
const { googleDriveService } = require('../services');
const checkAndRequestWebhook = require('./checkAndRequestWebhook');
const { resume_v1, allowedTimeBeforeExpiry } = require('config').get(
  'googleDriveServiceConfig'
);

const { Webhook } = require('../db/models'); // to remove

exports.googleDriveWebhookCronjob = () => {
  checkAndRequestWebhook(
    googleDriveService.requestWebhook,
    resume_v1.resourceId,
    allowedTimeBeforeExpiry
  )()
    .then(() => {
      schedule.scheduleJob(
        '*/1 * * * *',
        checkAndRequestWebhook(
          googleDriveService.requestWebhook,
          resume_v1.resourceId,
          allowedTimeBeforeExpiry
        )
      );
    })
    .then(() => console.log('\nWebhook Loop Success'))
    .catch(err => console.log(err));
};

const moduletest = (service, resourceId, allowedTimeBeforeExpiry) => () => {
  return Webhook.find({
    resourceId: resourceId
  }).then(result => {
    if (
      !result ||
      result.filter(
        e => e.expiry && e.expiry - Date.now() > allowedTimeBeforeExpiry
      ).length > 0
    )
      return { continue: true };
    service();
  });
};
