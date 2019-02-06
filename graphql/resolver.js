const { Project } = require('../db/models');
const { mongoDbService } = require('../services');

module.exports = {
  project: args => {
    return mongoCloudService
      .getById(Project, args.id)
      .then(result => ({ _id: result._id.toString(), title: result.title }));
  },
  projects: () => {
    return mongoCloudService
      .getAll(Project)
      .then(result =>
        result.map(e => ({ _id: e._id.toString(), title: e.title }))
      );
  }
};
