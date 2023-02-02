import _ from 'lodash';

const diffInformation = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);

  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(file1, key)) {
      return {
        key,
        value: file2[key],
        type: 'added',
      };
    }
    if (!_.has(file2, key)) {
      return {
        key,
        value: file1[key],
        type: 'removed',
      };
    }
    if (file1[key] === file2[key]) {
      return {
        key,
        value: file1[key],
        type: 'unchanged',
      };
    }
    // if ((obj1[key] && obj2[key]) && (obj1[key] !== obj2[key])) {
    return {
      key,
      type: 'changed',
      oldValue: file1[key],
      newValue: file2[key],
    };
    // }
  });

  return result;
};

export default diffInformation;
