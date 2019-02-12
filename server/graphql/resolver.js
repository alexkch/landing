const { Project } = require('../db/models');

module.exports = {
  project: args => {
    return Project.findById(args.id).then(result => ({
      _id: result._id.toString(),
      title: result.title
    }));
  },
  projects: () => {
    return Project.find()
      .select('-__v')
      .then(result =>
        result.map(e => ({ _id: e._id.toString(), title: e.title }))
      );
  }
};
