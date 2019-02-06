exports.genRegex = (keys, options = {}) => {
  const { caps, head, match } = options;
  let regex = '';
  if (head) regex = head;
  const re = caps
    ? `(${keys.reduce((acc, cur) => acc + `|${cur}`).toUpperCase()})${match ||
        `([\\s\\S]+)`}`
    : `(${keys.reduce((acc, cur) => acc + `|${cur}`)})${match ||
        `([\\s\\S]+)`}`;
  keys.forEach(() => (regex = regex + re));
  return regex;
};

exports.genDateRegex = () => {
  const monthRegex = `(?:[Jj]anuary|[Ff]ebruary|[Mm]arch|[Aa]pril|[Mm]ay|[Jj]une|[Jj]uly|[Aa]ugust|[Ss]eptember|[Oo]ctober|[Nn]ovember|[Dd]ecember)`;
  return `(.*)({month}\\s+20\\d\\d\\s*-\\s*(?:{month}\\s+20\\d\\d|\\s+))`
    .replace('{month}', monthRegex)
    .replace('{month}', monthRegex);
};

exports.genBulletPointsRegex = bulletToken => `[${bulletToken}]*\\s*`;

exports.genReferenceRegex = () => {
  return `[\\s\\S]*Reference:\\s*(.*)\\s*.*`;
};
