import yaml from 'js-yaml';

const formats = {
  json: JSON.parse,
  yml: yaml.load,
};

export default (data, dataType) => {
  const parse = formats[dataType];
  return parse(data);
};
