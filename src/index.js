import path from 'path';
import diffInformation from './diffInformation.js';
import parsers from './parsers.js';
import readFile from './utils.js';

const getParserData = (file) => {
  const dataType = path.extname(file).slice(1);
  const data = readFile(file);

  return parsers(data, dataType);
};

export default (filepath1, filepath2) => {
  const getDiffInformation = diffInformation(getParserData(filepath1), getParserData(filepath2));
  const difference = getDiffInformation.map((diff) => {
    const typeDiff = diff.type;

    switch (typeDiff) {
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      case 'removed':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanged':
        return `    ${diff.key}: ${diff.value}`;
      case 'changed':
        return `  - ${diff.key}: ${diff.oldValue}\n  + ${diff.key}: ${diff.newValue}`;
      default:
        return null;
    }
  });
  return `{\n${difference.join('\n')}\n}`;
};
