exports.getAll = model => model.find().select('-__v');

exports.getById = (model, id) => model.findById(id);

exports.postToModel = (model, body) => new model(body).save();

exports.patchById = (model, id, body) => model.update({ _id: id }, body);

exports.deleteById = (model, id) => model.findByIdAndDelete(id);
