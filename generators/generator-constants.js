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
];

const MFE_MAIN_DIR = 'ui/widgets/';

const DETAILS_WIDGET = 'details';
const FORM_WIDGET = 'form';
const TABLE_WIDGET = 'table';

const DEFAULT_SERVER_PROMPTS = {
  SERVICE_DISCOVERY_TYPE: false,
  AUTHENTICATION_TYPE: 'oauth2',
};

const SCALA_LIBRARY_VERSION = '2.12.1';
const MBKNOR_JACKSON_JSONSCHEMA_VERSION = '1.0.34';
const SPRING_BOOT_VERSION = '2.7.3';
const ENTANDO_BUNDLE_BOM_VERSION = '7.2.0-ENG-4717-PR-15';
const ENTANDO_KEYCLOAK_DOCKER_IMAGE = 'entando/entando-keycloak:7.2.0-ENGPM-540-rc1';

module.exports = {
  SQL_DB_OPTIONS,
  MFE_MAIN_DIR,
  DETAILS_WIDGET,
  FORM_WIDGET,
  TABLE_WIDGET,
  DEFAULT_SERVER_PROMPTS,
  SCALA_LIBRARY_VERSION,
  MBKNOR_JACKSON_JSONSCHEMA_VERSION,
  SPRING_BOOT_VERSION,
  ENTANDO_BUNDLE_BOM_VERSION,
  ENTANDO_KEYCLOAK_DOCKER_IMAGE,
};
