module.exports = (model, body) => {
  let result = [];
  Object.keys(body).forEach(key => {
    result.push(
      model.findOneAndUpdate({ title: key }, body[key], { upsert: true })
    );
  });
  return Promise.all(result);
};
