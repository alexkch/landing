const mongoose = require('mongoose');

module.exports = function(req, res, next) {
  let err;
  console.log('in validate Mid');
  console.log(req.params);
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id))
    err = { status: 400 };
  next(err);
};
