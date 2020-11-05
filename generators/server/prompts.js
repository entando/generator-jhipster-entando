const chalk = require('chalk');

const constants = require('generator-jhipster/generators/generator-constants');
const { getBase64Secret, getRandomHex } = require('generator-jhipster/generators/utils');
const entandoConstants = require('../generator-constants');
const { DEFAULT_SERVER_PROMPTS } = require('../generator-constants');

module.exports = {
  /* eslint-disable no-use-before-define */
  askForServerSideOpts,
  askForBundleName,
  askForDockerOrganization,
  askForMicroFrontendGeneration,
  setEntandoSharedConfigOptions,
};

function askForServerSideOpts(meta) {
  if (!meta && this.existingProject) return;

  const { applicationType } = this;
  const { reactive } = this;
  let defaultPort = applicationType === 'gateway' ? '8080' : '8081';
  if (applicationType === 'uaa') {
    defaultPort = '9999';
  }
  const prompts = [
    {
      when: () =>
        applicationType === 'gateway' || applicationType === 'microservice' || applicationType === 'uaa',
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
      default: 'com.mycompany.myapp',
      store: true,
    },
    {
      type: 'list',
      name: 'databaseType',
      message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
      choices: () => {
        const opts = [];
        if (!reactive) {
          opts.push({
            value: 'sql',
            name: 'SQL (H2, MySQL, MariaDB, PostgreSQL, Oracle, MSSQL)',
          });
        } else {
          opts.push({
            value: 'sql',
            name: 'SQL (H2, MySQL, PostgreSQL, MSSQL)',
          });
        }
        if (applicationType !== 'uaa') {
          opts.push({
            value: 'no',
            name: 'No database',
          });
        }
        return opts;
      },
      default: 0,
    },
    {
      when: response => response.databaseType === 'sql',
      type: 'list',
      name: 'prodDatabaseType',
      message: `Which ${chalk.yellow('*production*')} database would you like to use?`,
      choices: reactive ? constants.R2DBC_DB_OPTIONS : entandoConstants.SQL_DB_OPTIONS,
      default: 0,
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
      default: 0,
    },
    {
      when: () => !reactive,
      type: 'list',
      name: 'cacheProvider',
      message: 'Do you want to use the Spring cache abstraction?',
      choices: [
        {
          value: 'ehcache',
          name: 'Yes, with the Ehcache implementation (local cache, for a single node)',
        },
        {
          value: 'caffeine',
          name: 'Yes, with the Caffeine implementation (local cache, for a single node)',
        },
        {
          value: 'hazelcast',
          name:
            'Yes, with the Hazelcast implementation (distributed cache, for multiple nodes, supports rate-limiting for gateway applications)',
        },
        {
          value: 'infinispan',
          name: '[BETA] Yes, with the Infinispan implementation (hybrid cache, for multiple nodes)',
        },
        {
          value: 'memcached',
          name:
            'Yes, with Memcached (distributed cache) - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
        {
          value: 'redis',
          name: 'Yes, with the Redis implementation',
        },
        {
          value: 'no',
          name: 'No - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
      ],
      default: applicationType === 'microservice' || applicationType === 'uaa' ? 2 : 0,
    },
    {
      when: response =>
        ((response.cacheProvider !== 'no' && response.cacheProvider !== 'memcached') ||
          applicationType === 'gateway') &&
        response.databaseType === 'sql' &&
        !reactive,
      type: 'confirm',
      name: 'enableHibernateCache',
      message: 'Do you want to use Hibernate 2nd level cache?',
      default: true,
    },
    {
      type: 'list',
      name: 'buildTool',
      message: 'Would you like to use Maven or Gradle for building the backend?',
      choices: [
        {
          value: 'maven',
          name: 'Maven',
        },
        {
          value: 'gradle',
          name: 'Gradle',
        },
      ],
      default: 'maven',
    },
  ];

  if (meta) return prompts; // eslint-disable-line consistent-return

  const done = this.async();

  this.prompt(prompts).then(props => {
    this.serviceDiscoveryType = DEFAULT_SERVER_PROMPTS.SERVICE_DISCOVERY_TYPE;
    this.authenticationType = DEFAULT_SERVER_PROMPTS.AUTHENTICATION_TYPE;

    // JWT authentication is mandatory with Eureka, so the JHipster Registry
    // can control the applications
    if (
      this.serviceDiscoveryType === 'eureka' &&
      this.authenticationType !== 'uaa' &&
      this.authenticationType !== 'oauth2'
    ) {
      this.authenticationType = 'jwt';
    }

    if (this.authenticationType === 'session') {
      this.rememberMeKey = getRandomHex();
    }

    if (this.authenticationType === 'jwt' || this.applicationType === 'microservice') {
      this.jwtSecretKey = getBase64Secret(null, 64);
    }

    // user-management will be handled by UAA app, oauth expects users to be managed in IpP
    if (
      (this.applicationType === 'gateway' && this.authenticationType === 'uaa') ||
      this.authenticationType === 'oauth2'
    ) {
      this.skipUserManagement = true;
    }

    if (this.applicationType === 'uaa') {
      this.authenticationType = 'uaa';
    }

    this.packageName = props.packageName;
    this.serverPort = props.serverPort;
    if (this.serverPort === undefined) {
      this.serverPort = '8080';
    }
    this.cacheProvider = !reactive ? props.cacheProvider : 'no';
    this.enableHibernateCache = props.enableHibernateCache;
    this.databaseType = props.databaseType;
    this.devDatabaseType = props.devDatabaseType;
    this.prodDatabaseType = props.prodDatabaseType;
    this.searchEngine = props.searchEngine;
    this.buildTool = props.buildTool;
    this.uaaBaseName = this.getUaaAppName(props.uaaBaseName).baseName;

    this.prodDatabaseTypePlugin = props.prodDatabaseType;

    if (this.databaseType === 'no') {
      this.devDatabaseType = 'no';
      this.prodDatabaseType = 'no';
      this.enableHibernateCache = false;
      if (this.authenticationType !== 'uaa') {
        this.skipUserManagement = true;
      }
      this.prodDatabaseTypePlugin = 'none';
    } else if (['mongodb', 'neo4j', 'couchbase', 'cassandra'].includes(this.databaseType)) {
      this.devDatabaseType = this.databaseType;
      this.prodDatabaseType = this.databaseType;
      this.enableHibernateCache = false;
      this.prodDatabaseTypePlugin = 'none';
    }
    done();
  });
}

function askForBundleName(meta) {
  if (!meta && this.existingProject) return;

  const done = this.async();

  const { applicationType } = this;
  const prompts = [
    {
      when: () => applicationType === 'microservice',
      type: 'input',
      name: 'bundleName',
      message: 'What name would you give to the bundle to share on an Entando digital-exchange?',
      default: `${this.baseName.toLowerCase()}-bundle`,
    },
  ];
  this.prompt(prompts).then(prompt => {
    this.bundleName = prompt.bundleName;
    this.config.set('bundleName', this.bundleName);
    done();
  });
}

function askForDockerOrganization(meta) {
  if (!meta && this.existingProject) return;

  const done = this.async();

  const { applicationType } = this;
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
  this.prompt(prompts).then(prompt => {
    this.dockerImageOrganization = prompt.dockerImageOrganization;
    this.config.set('dockerOrganization', this.dockerImageOrganization);
    done();
  });
}

function askForMicroFrontendGeneration(meta) {
  if (!meta && this.existingProject) return;

  const done = this.async();

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
  this.prompt(prompts).then(prompt => {
    this.config.set('generateMicroFrontends', prompt.generateMicroFrontends);

    done();
  });
}

function setEntandoSharedConfigOptions() {
  this.configOptions.bundleName = this.bundleName;
  this.configOptions.prodDatabaseTypePlugin = this.prodDatabaseTypePlugin;
  this.configOptions.dockerImageOrganization = this.dockerImageOrganization;
}
