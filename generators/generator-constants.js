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

const MFE_MAIN_DIR = 'ui/widgets/';

const DETAILS_WIDGET = 'details';
const FORM_WIDGET = 'form';
const TABLE_WIDGET = 'table';

const DEFAULT_SERVER_PROMPTS = {
  SERVICE_DISCOVERY_TYPE: false,
  AUTHENTICATION_TYPE: 'oauth2',
};

module.exports = {
  SQL_DB_OPTIONS,
  MFE_MAIN_DIR,
  DETAILS_WIDGET,
  FORM_WIDGET,
  TABLE_WIDGET,
  DEFAULT_SERVER_PROMPTS,
};
