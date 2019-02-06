exports.getAll = model => model.find().select('-__v');

exports.getById = (model, id) => model.findById(id);

exports.createOrUpdateRecord = (model, body) => {
  let result = [];
  Object.keys(body).forEach(key => {
    result.push(
      model.findOneAndUpdate({ title: key }, body[key], { upsert: true })
    );
  });
  return Promise.all(result);
};

exports.postBody = (model, body) => {
  return new model(body).save();
};

exports.patchById = (model, id, body) => model.update({ _id: id }, body);

exports.deleteById = (model, id) => model.findByIdAndDelete(id);
