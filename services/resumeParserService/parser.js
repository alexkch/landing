const {
  bulletPoint,
  skillTypeSplitToken,
  skillsSplitToken
} = require('config').get('parserServiceConfig');
const { genDateRegex, genBulletPointsRegex } = require('../../utils/genRegex');

exports.parseBulletPoints = payload => {
  let result = {};
  let currentHeader;
  payload
    .split(/[\n]{1,3}/)
    .filter(e => e.trim().length > 0)
    .forEach(e => {
      if (e[0] !== bulletPoint) {
        const match = new RegExp(genDateRegex(), 'm').exec(e.trim());
        if (!match) {
          currentHeader = e.trim();
          result[currentHeader] = [];
        } else {
          currentHeader = match[1].trim();
          result[currentHeader] = [];
          result[currentHeader].push({ date: match[2].trim() });
        }
      } else {
        if (currentHeader)
          result[currentHeader].push(
            e
              .trim()
              .replace(new RegExp(genBulletPointsRegex(bulletPoint), 'm'), '')
              .replace(/\s+/g, ' ')
          );
      }
    });
  return result;
};

exports.parseSkill = payload => {
  let result = {};
  let skill, lang;
  payload
    .split(/[\n]{1,3}/)
    .filter(e => e.trim().length > 0)
    .forEach(e => {
      [skill, lang] = e.split(skillTypeSplitToken);
      result[skill.trim()] = lang
        .trim()
        .split(skillsSplitToken)
        .map(e => e.trim());
    });

  return result;
};
