const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  let err;
  console.log('in validate Mid');
  console.log(req.params);
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id))
    err = { status: 400, log: 'Invalid Mongoose ID' };
  next(err);
};
