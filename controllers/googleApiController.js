const { googleDriveService } = require('../services');

exports.getResumeFromDrive = (req, res) => {
  googleDriveService
    .exportFile()
    .then(result => res.send(result))
    .catch(err => console.log(err));
};
