module.exports = {
  mongodb: {
    user: process.env.MONGOUSER,
    pass: process.env.MONGOPASS
  },
  googleService: {
    user: process.env.GUSER,
    pass: process.env.GPASS,
    driveNotifySecret: process.env.GNOTIFYSECRET
  },
  githubService: {
    token: process.env.GITTOKEN
  }
};
