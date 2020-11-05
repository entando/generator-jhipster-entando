// Define Entando own SQL_DB_OPTIONS to override this from JHipster https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js#L154
const SQL_DB_OPTIONS = [
  {
    value: 'mysql',
    name: 'MySQL',
  },
  {
    value: 'postgresql',
    name: 'PostgreSQL',
  },
  {
    value: 'oracle',
    name: 'Oracle',
  },
];

const constants = {
  SQL_DB_OPTIONS,
};

module.exports = constants;
