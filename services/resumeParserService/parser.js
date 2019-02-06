const {
  bulletPoint,
  skillTypeSplitToken,
  skillsSplitToken
} = require('config').get('parserServiceConfig');
const {
  genDateRegex,
  genReferenceRegex,
  genBulletPointsRegex
} = require('../../utils/genRegex');

exports.parseBulletPoints = payload => {
  let result = {};
  let currentHeader, match, match2;
  payload
    .split(/[\n]{1,3}/)
    .filter(e => e.trim().length > 0)
    .forEach(e => {
      if (e[0] !== bulletPoint) {
        match = new RegExp(genDateRegex(), 'm').exec(e.trim());
        if (!match) {
          currentHeader = e.trim();
          result[currentHeader] = {
            title: currentHeader,
            description: [],
            reference: 'none'
          };
        } else {
          currentHeader = match[1].trim();
          result[currentHeader] = {
            title: currentHeader,
            description: [],
            date: match[2].trim(),
            reference: 'none'
          };
        }
      } else {
        if (currentHeader) {
          match2 = new RegExp(genReferenceRegex(), 'm').exec(e.trim());
          if (!match2) {
            result[currentHeader].description.push(
              e
                .trim()
                .replace(new RegExp(genBulletPointsRegex(bulletPoint), 'm'), '')
                .replace(/\s+/g, ' ')
            );
          } else {
            result[currentHeader].reference = match2[1];
          }
        }
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
      result[skill.trim()] = {
        title: skill.trim(),
        skills: lang
          .trim()
          .split(skillsSplitToken)
          .map(e => e.trim())
      };
    });

  return result;
};
