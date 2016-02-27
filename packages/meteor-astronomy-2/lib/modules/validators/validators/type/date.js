import Validator from '../../validator.js';

Validator.create({
  name: 'date',
  isValid({ value }) {
     return _.isDate(value) || _.isString(value);
  },
  resolveError({ name }) {
    return `"${name}" has to be a date`;
  }
});