const { Webhook } = require('../db/models');

module.exports = (service, resourceId, allowedTimeBeforeExpiry) => () => {
  console.log('\nSTART WEBHOOK LOOP');
  return Webhook.find({
    resourceId: resourceId
  })
    .then(result => {
      console.log('\n\nWebhook.find(resourceId) =>');
      console.log(result);
      if (
        !result ||
        result.filter(e => e.expiry - Date.now() > allowedTimeBeforeExpiry)
          .length > 0
      )
        return { continue: true };
      return service();
    })
    .then(result => {
      console.log(
        '\n\nresult of filter, weather to call new service or continue on =>'
      );
      console.log(result);
      if (result && result.continue) return;
      if (result && result.resourceId !== resourceId)
        return Promise.reject('ResourceId unsynced');
      return Promise.all([
        Webhook.findOneAndUpdate(
          { subscriptionId: result.id, resourceId: resourceId },
          {
            subscriptionId: result.id,
            resourceId: resourceId,
            expiry: result.expiration,
            active: true
          },
          { upsert: true }
        ),
        Webhook.updateMany(
          { resourceId: resourceId, subscriptionId: { $ne: result.id } },
          { $set: { active: false } }
        )
      ]);
    })
    .then(result => {
      console.log('\n\nAFTER Save to DB');
      if (result && result.length === 2) {
        console.log(result[0]);
        console.log(result[1]);
      }
    });
};
