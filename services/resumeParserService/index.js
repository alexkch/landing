const { breakpoints } = require('config').get('parserServiceConfig');
const { parseBulletPoints, parseSkill } = require('./parser');
const { genRegex } = require('../../utils/genRegex');

module.exports = resume => {
  const match = new RegExp(
    genRegex(breakpoints.keys, { caps: true, head: `([\\s\\S]+)` }),
    'm'
  ).exec(resume);

  console.log('IN match');
  let result = {};
  for (let i = 2; i < match.length; i += 2) {
    switch (match[i].toLowerCase()) {
      case 'education':
        break;
      case 'technical skills':
        result[match[i].toLowerCase()] = parseSkill(match[i + 1]);
        break;
      case 'work experience':
        result[match[i].toLowerCase()] = parseBulletPoints(match[i + 1]);
        break;
      case 'projects':
        result[match[i].toLowerCase()] = parseBulletPoints(match[i + 1]);
        break;
      default:
        break;
    }
  }
  console.log(result);
  return result;
};
