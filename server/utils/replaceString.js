module.exports = (uri, res) =>
  Object.keys(res).reduce((acc, cur) => acc.replace(`{${cur}}`, res[cur]), uri);
