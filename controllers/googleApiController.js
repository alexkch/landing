const { googleDriveService } = require('../services');

exports.getResumeFromDrive = (req, res) => {
  googleDriveService
    .exportFile()
    .then(result => {
      if (result) return res.send(result);
      next({ status: 404 });
    })
    .catch(err => console.log(err));
};
