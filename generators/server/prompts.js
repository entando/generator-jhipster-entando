const chalk = require('chalk');

const constants = require('generator-jhipster/generators/generator-constants');
const { serverDefaultConfig } = require('generator-jhipster/generators/generator-defaults');
const { CAFFEINE, EHCACHE, HAZELCAST, INFINISPAN, MEMCACHED, REDIS } = require('generator-jhipster/jdl/jhipster/cache-types');
const { H2_DISK, H2_MEMORY, SQL } = require('generator-jhipster/jdl/jhipster/database-types');
const { GATEWAY, MICROSERVICE } = require('generator-jhipster/jdl/jhipster/application-types');
const { OptionNames } = require('generator-jhipster/jdl/jhipster/application-options');
const databaseTypes = require('generator-jhipster/jdl/jhipster/database-types');
const cacheProviderTypes = require('generator-jhipster/jdl/jhipster/cache-types');
const { DEFAULT_SERVER_PROMPTS } = require('../generator-constants');
const entandoConstants = require('../generator-constants');

const { CACHE_PROVIDER, DATABASE_TYPE, PACKAGE_NAME, DEV_DATABASE_TYPE, PROD_DATABASE_TYPE, SERVER_PORT } = OptionNames;
const NO_DATABASE = databaseTypes.NO;
const NO_CACHE_PROVIDER = cacheProviderTypes.NO;

module.exports = {
  /* eslint-disable no-use-before-define */
  askForServerSideOpts,
  askForMicroserviceDependencies,
  askForMicroFrontendGeneration,
};

function askForServerSideOpts() {
  if (this.existingProject) return undefined;

  const { applicationType } = this.jhipsterConfig;
  const defaultPort = applicationType === GATEWAY ? '8080' : '8081';
  const prompts = [
    {
      when: () => applicationType === GATEWAY || applicationType === MICROSERVICE,
      type: 'input',
      name: SERVER_PORT,
      validate: input => (/^([0-9]*)$/.test(input) ? true : 'This is not a valid port number.'),
      message:
        'As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.',
      default: defaultPort,
    },
    {
      type: 'input',
      name: PACKAGE_NAME,
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
      name: DATABASE_TYPE,
      message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
      choices: answers => {
        const opts = [];
        if (!answers.reactive) {
          opts.push({
            value: SQL,
            name: 'SQL (H2, PostgreSQL, MySQL, MariaDB, Oracle, MSSQL)',
          });
        } else {
          opts.push({
            value: SQL,
            name: 'SQL (H2, PostgreSQL, MySQL, MariaDB, MSSQL)',
          });
        }
        opts.push({
          value: NO_DATABASE,
          name: 'No database',
        });
        return opts;
      },
      default: serverDefaultConfig.databaseType,
    },
    {
      when: response => response.databaseType === SQL,
      type: 'list',
      name: PROD_DATABASE_TYPE,
      message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
      choices: answers => (answers.reactive ? constants.R2DBC_DB_OPTIONS : entandoConstants.SQL_DB_OPTIONS),
      default: serverDefaultConfig.prodDatabaseType,
    },
    {
      when: response => response.databaseType === SQL,
      type: 'list',
      name: DEV_DATABASE_TYPE,
      message: `Which ${chalk.yellow('*development*')} database would you like to use?`,
      choices: response =>
        [
          {
            value: H2_DISK,
            name: 'H2 with disk-based persistence',
          },
          {
            value: H2_MEMORY,
            name: 'H2 with in-memory persistence',
          },
        ].concat(constants.SQL_DB_OPTIONS.find(it => it.value === response.prodDatabaseType)),
      default: serverDefaultConfig.devDatabaseType,
    },
    {
      when: answers => !answers.reactive,
      type: 'list',
      name: CACHE_PROVIDER,
      message: 'Which cache do you want to use? (Spring cache abstraction)',
      choices: [
        {
          value: EHCACHE,
          name: 'Ehcache (local cache, for a single node)',
        },
        {
          value: CAFFEINE,
          name: 'Caffeine (local cache, for a single node)',
        },
        {
          value: HAZELCAST,
          name: 'Hazelcast (distributed cache, for multiple nodes, supports rate-limiting for gateway applications)',
        },
        {
          value: INFINISPAN,
          name: 'Infinispan (hybrid cache, for multiple nodes)',
        },
        {
          value: MEMCACHED,
          name: 'Memcached (distributed cache) - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
        {
          value: REDIS,
          name: 'Redis (distributed cache)',
        },
        {
          value: NO_CACHE_PROVIDER,
          name: 'No cache - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
      ],
      default: applicationType === MICROSERVICE ? 1 : serverDefaultConfig.cacheProvider,
    },
    {
      when: answers =>
        ((answers.cacheProvider !== NO_CACHE_PROVIDER && answers.cacheProvider !== MEMCACHED) || applicationType === GATEWAY) &&
        answers.databaseType === SQL &&
        !answers.reactive,
      type: 'confirm',
      name: 'enableHibernateCache',
      message: 'Do you want to use Hibernate 2nd level cache?',
      default: serverDefaultConfig.enableHibernateCache,
    },
  ];

  return this.prompt(prompts).then(answers => {
    /* eslint-disable no-multi-assign */
    this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = DEFAULT_SERVER_PROMPTS.SERVICE_DISCOVERY_TYPE;

    this.reactive = this.jhipsterConfig.reactive = false;

    // this.authenticationType = this.jhipsterConfig.authenticationType = answers.authenticationType;
    this.authenticationType = this.jhipsterConfig.authenticationType = DEFAULT_SERVER_PROMPTS.AUTHENTICATION_TYPE;

    this.packageName = this.jhipsterConfig.packageName = answers.packageName;
    this.serverPort = this.jhipsterConfig.serverPort = answers.serverPort || '8080';
    this.cacheProvider = this.jhipsterConfig.cacheProvider = !answers.reactive ? answers.cacheProvider : NO_CACHE_PROVIDER;
    this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache = !!answers.enableHibernateCache;

    const { databaseType } = answers;
    this.databaseType = this.jhipsterConfig.databaseType = databaseType;
    this.devDatabaseType = this.jhipsterConfig.devDatabaseType = answers.devDatabaseType || databaseType;
    this.prodDatabaseType = this.jhipsterConfig.prodDatabaseType = answers.prodDatabaseType || databaseType;
    this.searchEngine = this.jhipsterConfig.searchEngine = answers.searchEngine;
    this.buildTool = this.jhipsterConfig.buildTool = answers.buildTool;
  });
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

async function askForMicroserviceDependencies() {
  if (this.existingProject) return;

  const prompts = [
    {
      type: 'list',
      name: 'microserviceDependencies',
      message: 'Which BE dependencies do you want to use?',
      choices: [
        {
          value: 'entando',
          name: 'Dependencies maintained by Entando (entando/entando-bundle-bom)',
        },
        {
          value: 'jhipster',
          name: "Jhipster's original dependencies (jhipster/jhipster-bom)",
        },
      ],
      default: 'entando',
    },
  ];

  const answers = await this.prompt(prompts);
  this.microserviceDependencies = this.jhipsterConfig.microserviceDependencies = answers.microserviceDependencies;
}
