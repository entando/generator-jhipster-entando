const chalk = require('chalk');

const constants = require('generator-jhipster/generators/generator-constants');
const { serverDefaultConfig } = require('generator-jhipster/generators/generator-defaults');
const entandoConstants = require('../generator-constants');
const { DEFAULT_SERVER_PROMPTS } = require('../generator-constants');

module.exports = {
  /* eslint-disable no-use-before-define */
  askForServerSideOpts,
  askForBundleName,
  askForDockerOrganization,
  askForMicroFrontendGeneration,
};

function askForServerSideOpts() {
  if (this.existingProject) return undefined;

  const { applicationType } = this.jhipsterConfig;
  const defaultPort = applicationType === 'gateway' ? '8080' : '8081';
  const prompts = [
    {
      when: () => applicationType === 'gateway' || applicationType === 'microservice',
      type: 'input',
      name: 'serverPort',
      validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
      message:
        'As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.',
      default: defaultPort,
    },
    {
      type: 'input',
      name: 'packageName',
      validate: input =>
        /^([a-z_]{1}[a-z0-9_]*(\.[a-z_]{1}[a-z0-9_]*)*)$/.test(input)
          ? true
          : 'The package name you have provided is not a valid Java package name.',
      message: 'What is your default Java package name?',
      default: serverDefaultConfig.packageName,
      store: true,
    },
    {
      type: 'list',
      name: 'databaseType',
      message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
      choices: answers => {
        const opts = [];
        if (!answers.reactive) {
          opts.push({
            value: 'sql',
            name: 'SQL (H2, PostgreSQL, MySQL)',
          });
        } else {
          opts.push({
            value: 'sql',
            name: 'SQL (H2, PostgreSQL, MySQL)',
          });
        }
        opts.push({
          value: 'no',
          name: 'No database',
        });
        return opts;
      },
      default: serverDefaultConfig.databaseType,
    },
    {
      when: response => response.databaseType === 'sql',
      type: 'list',
      name: 'prodDatabaseType',
      message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
      choices: answers => (answers.reactive ? constants.R2DBC_DB_OPTIONS : entandoConstants.SQL_DB_OPTIONS),
      default: serverDefaultConfig.prodDatabaseType,
    },
    {
      when: response => response.databaseType === 'sql',
      type: 'list',
      name: 'devDatabaseType',
      message: `Which ${chalk.yellow('*development*')} database would you like to use?`,
      choices: response =>
        [
          {
            value: 'h2Disk',
            name: 'H2 with disk-based persistence',
          },
          {
            value: 'h2Memory',
            name: 'H2 with in-memory persistence',
          },
        ].concat(constants.SQL_DB_OPTIONS.find(it => it.value === response.prodDatabaseType)),
      default: serverDefaultConfig.devDatabaseType,
    },
    {
      when: answers => !answers.reactive,
      type: 'list',
      name: 'cacheProvider',
      message: 'Which cache do you want to use? (Spring cache abstraction)',
      choices: [
        {
          value: 'ehcache',
          name: 'Ehcache (local cache, for a single node)',
        },
        {
          value: 'caffeine',
          name: 'Caffeine (local cache, for a single node)',
        },
        {
          value: 'hazelcast',
          name: 'Hazelcast (distributed cache, for multiple nodes, supports rate-limiting for gateway applications)',
        },
        {
          value: 'infinispan',
          name: 'Infinispan (hybrid cache, for multiple nodes)',
        },
        {
          value: 'memcached',
          name: 'Memcached (distributed cache) - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
        {
          value: 'redis',
          name: 'Redis (distributed cache)',
        },
        {
          value: 'no',
          name: 'No cache - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
      ],
      default: applicationType === 'microservice' ? 1 : serverDefaultConfig.cacheProvider,
    },
    {
      when: answers =>
        ((answers.cacheProvider !== 'no' && answers.cacheProvider !== 'memcached') ||
          applicationType === 'gateway') &&
        answers.databaseType === 'sql' &&
        !answers.reactive,
      type: 'confirm',
      name: 'enableHibernateCache',
      message: 'Do you want to use Hibernate 2nd level cache?',
      default: serverDefaultConfig.enableHibernateCache,
    },
  ];

  return this.prompt(prompts).then(answers => {
    /* eslint-disable no-multi-assign */
    this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType =
      DEFAULT_SERVER_PROMPTS.SERVICE_DISCOVERY_TYPE;

    this.reactive = this.jhipsterConfig.reactive = false;

    // this.authenticationType = this.jhipsterConfig.authenticationType = answers.authenticationType;
    this.authenticationType = this.jhipsterConfig.authenticationType =
      DEFAULT_SERVER_PROMPTS.AUTHENTICATION_TYPE;

    this.packageName = this.jhipsterConfig.packageName = answers.packageName;
    this.serverPort = this.jhipsterConfig.serverPort = answers.serverPort || '8080';
    this.cacheProvider = this.jhipsterConfig.cacheProvider = !answers.reactive ? answers.cacheProvider : 'no';
    this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache = !!answers.enableHibernateCache;
    this.databaseType = this.jhipsterConfig.databaseType = answers.databaseType;
    this.devDatabaseType = this.jhipsterConfig.devDatabaseType = answers.devDatabaseType;
    this.prodDatabaseType = this.jhipsterConfig.prodDatabaseType = answers.prodDatabaseType;
    this.searchEngine = this.jhipsterConfig.searchEngine = answers.searchEngine;
    this.buildTool = this.jhipsterConfig.buildTool = 'maven';
  });
}

async function askForBundleName() {
  if (this.existingProject) return;

  const { applicationType, baseName } = this.jhipsterConfig;
  const prompts = [
    {
      when: () => applicationType === 'microservice',
      type: 'input',
      name: 'bundleName',
      message: 'What name would you give to the bundle to share on an Entando Component Repository?',
      default: `${baseName.toLowerCase()}-bundle`,
    },
  ];

  const answers = await this.prompt(prompts);
  this.bundleName = this.jhipsterConfig.bundleName = answers.bundleName;
}

async function askForDockerOrganization() {
  if (this.existingProject) return;

  const { applicationType } = this.jhipsterConfig;
  const prompts = [
    {
      when: () => applicationType === 'microservice',
      type: 'input',
      validate: input =>
        /^([a-zA-Z0-9]{4,30})$/.test(input)
          ? true
          : 'Organization name should only contain 4 to 30 letters and/or numbers.',
      name: 'dockerImageOrganization',
      message: 'Which is the organization name to use when publishing the docker image?',
    },
  ];

  const answers = await this.prompt(prompts);
  this.dockerImageOrganization = this.jhipsterConfig.dockerImageOrganization =
    answers.dockerImageOrganization;
}

async function askForMicroFrontendGeneration() {
  if (this.existingProject) return;

  const prompts = [
    {
      type: 'list',
      name: 'generateMicroFrontends',
      message: 'Would you like to generate micro frontends when creating entities?',
      choices: [
        {
          value: 'always',
          name: 'Always',
        },
        {
          value: 'never',
          name: 'Never',
        },
        {
          value: 'ask',
          name: 'Ask each time entity is being created',
        },
      ],
      default: 'always',
    },
  ];

  const answers = await this.prompt(prompts);
  this.generateMicroFrontends = this.jhipsterConfig.generateMicroFrontends = answers.generateMicroFrontends;
}
