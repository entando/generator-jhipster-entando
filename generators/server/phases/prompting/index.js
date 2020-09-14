const chalk = require('chalk');

const constants = require('generator-jhipster/generators/generator-constants');
const { getBase64Secret, getRandomHex } = require('generator-jhipster/generators/utils');
const entandoDefaultPrompts = require('./entando_default_prompts').default;

module.exports = {
  /* eslint-disable no-use-before-define */
  askForModuleName,
  askForServerSideOpts,
  askForOptionalItems,
  askFori18n,
  askForBundleName,
  askForDockerOrganization,
  askForMicroFrontendGeneration,
  setSharedConfigOptions,
};

function askForModuleName() {
  if (this.baseName) return;

  this.askModuleName(this);
}

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
    // {
    //     when: response => applicationType === 'gateway' || applicationType === 'microservice' || applicationType === 'uaa',
    //     type: 'list',
    //     name: 'serviceDiscoveryType',
    //     message: 'Which service discovery server do you want to use?',
    //     choices: [
    //         {
    //             value: 'eureka',
    //             name: 'JHipster Registry (uses Eureka, provides Spring Cloud Config support and monitoring dashboards)'
    //         },
    //         {
    //             value: 'consul',
    //             name: 'Consul'
    //         },
    //         {
    //             value: false,
    //             name: 'No service discovery'
    //         }
    //     ],
    //     default: 'eureka'
    // },
    // {
    //     when: applicationType === 'monolith',
    //     type: 'list',
    //     name: 'serviceDiscoveryType',
    //     message: 'Do you want to use the JHipster Registry to configure, monitor and scale your application?',
    //     choices: [
    //         {
    //             value: false,
    //             name: 'No'
    //         },
    //         {
    //             value: 'eureka',
    //             name: 'Yes'
    //         }
    //     ],
    //     default: false
    // },
    // {
    //     when: response =>
    //         (applicationType === 'monolith' && response.serviceDiscoveryType !== 'eureka') ||
    //         ['gateway', 'microservice'].includes(applicationType),
    //     type: 'list',
    //     name: 'authenticationType',
    //     message: `Which ${chalk.yellow('*type*')} of authentication would you like to use?`,
    //     choices: response => {
    //         const opts = [
    //             {
    //                 value: 'jwt',
    //                 name: 'JWT authentication (stateless, with a token)'
    //             }
    //         ];
    //         if (applicationType === 'monolith' && response.serviceDiscoveryType !== 'eureka') {
    //             opts.push({
    //                 value: 'session',
    //                 name: 'HTTP Session Authentication (stateful, default Spring Security mechanism)'
    //             });
    //         }
    //         if (!reactive) {
    //             opts.push({
    //                 value: 'oauth2',
    //                 name: 'OAuth 2.0 / OIDC Authentication (stateful, works with Keycloak and Okta)'
    //             });
    //             if (['gateway', 'microservice'].includes(applicationType)) {
    //                 opts.push({
    //                     value: 'uaa',
    //                     name: 'Authentication with JHipster UAA server (the server must be generated separately)'
    //                 });
    //             }
    //         }
    //         return opts;
    //     },
    //     default: 0
    // },
    // {
    //     when: response =>
    //         (applicationType === 'gateway' || applicationType === 'microservice') && response.authenticationType === 'uaa',
    //     type: 'input',
    //     name: 'uaaBaseName',
    //     message: 'What is the folder path of your UAA application?',
    //     default: '../uaa',
    //     validate: input => {
    //         const uaaAppData = this.getUaaAppName(input);

    //         if (uaaAppData && uaaAppData.baseName && uaaAppData.applicationType === 'uaa') {
    //             return true;
    //         }
    //         return `Could not find a valid JHipster UAA server in path "${input}"`;
    //     }
    // },
    {
      type: 'list',
      name: 'databaseType',
      message: `Which ${chalk.yellow('*type*')} of database would you like to use?`,
      choices: () => {
        const opts = [];
        if (!reactive) {
          opts.push({
            value: 'sql',
            name: 'SQL (H2, MySQL, PostgreSQL, Oracle)',
          });
        }
        // TODO: Disabled some options
        // opts.push({
        //     value: 'mongodb',
        //     name: 'MongoDB'
        // });
        // if (response.authenticationType !== 'oauth2') {
        //     opts.push({
        //         value: 'cassandra',
        //         name: 'Cassandra'
        //     });
        // }
        // opts.push({
        //     value: 'couchbase',
        //     name: 'Couchbase'
        // });
        if (!reactive) {
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
      choices: [
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
          name: 'Oracle (Please follow our documentation to use the Oracle proprietary driver)',
        },
      ],
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
          value: 'no',
          name: 'No - Warning, when using an SQL database, this will disable the Hibernate 2nd level cache!',
        },
      ],
      default: applicationType === 'microservice' || applicationType === 'uaa' ? 1 : 0,
    },
    {
      when: response =>
        ((response.cacheProvider !== 'no' && response.cacheProvider !== 'memcached') ||
          applicationType === 'gateway') &&
        response.databaseType === 'sql',
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
    this.serviceDiscoveryType = entandoDefaultPrompts.SERVICE_DISCOVERY_TYPE;
    this.authenticationType = entandoDefaultPrompts.AUTHENTICATION_TYPE;

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
      this.prodDatabaseTypePlugin = 'none';
      this.enableHibernateCache = false;
      if (this.authenticationType !== 'uaa') {
        this.skipUserManagement = true;
      }
    } else if (this.databaseType === 'mongodb') {
      this.devDatabaseType = 'mongodb';
      this.prodDatabaseType = 'mongodb';
      // not supported yet, set to none
      this.prodDatabaseTypePlugin = 'none';
      this.enableHibernateCache = false;
    } else if (this.databaseType === 'couchbase') {
      this.devDatabaseType = 'couchbase';
      this.prodDatabaseType = 'couchbase';
      // not supported yet, set to none
      this.prodDatabaseTypePlugin = 'none';
      this.enableHibernateCache = false;
    } else if (this.databaseType === 'cassandra') {
      this.devDatabaseType = 'cassandra';
      this.prodDatabaseType = 'cassandra';
      // not supported yet, set to none
      this.prodDatabaseTypePlugin = 'none';
      this.enableHibernateCache = false;
    }
    done();
  });
}

function askForOptionalItems(meta) {
  if (!meta && this.existingProject) return;

  const { applicationType } = this;
  const choices = [];
  const defaultChoice = [];
  if (!this.reactive) {
    if (this.databaseType === 'sql' || this.databaseType === 'mongodb') {
      choices.push({
        name: 'Search engine using Elasticsearch',
        value: 'searchEngine:elasticsearch',
      });
    }
    if (applicationType === 'monolith' || applicationType === 'gateway') {
      choices.push({
        name: 'WebSockets using Spring Websocket',
        value: 'websocket:spring-websocket',
      });
    }
    choices.push({
      name: 'Asynchronous messages using Apache Kafka',
      value: 'messageBroker:kafka',
    });
  }
  choices.push({
    name: 'API first development using OpenAPI-generator',
    value: 'enableSwaggerCodegen:true',
  });

  const PROMPTS = {
    type: 'checkbox',
    name: 'serverSideOptions',
    message: 'Which other technologies would you like to use?',
    choices,
    default: defaultChoice,
  };

  if (meta) return PROMPTS; // eslint-disable-line consistent-return

  const done = this.async();
  if (choices.length > 0) {
    this.prompt(PROMPTS).then(prompt => {
      this.serverSideOptions = prompt.serverSideOptions;
      this.websocket = this.getOptionFromArray(this.serverSideOptions, 'websocket');
      this.searchEngine = this.getOptionFromArray(this.serverSideOptions, 'searchEngine');
      this.messageBroker = this.getOptionFromArray(this.serverSideOptions, 'messageBroker');
      this.enableSwaggerCodegen = this.getOptionFromArray(this.serverSideOptions, 'enableSwaggerCodegen');
      // Only set this option if it hasn't been set in a previous question, as it's only optional for monoliths
      if (!this.serviceDiscoveryType) {
        this.serviceDiscoveryType = this.getOptionFromArray(this.serverSideOptions, 'serviceDiscoveryType');
      }
      done();
    });
  } else {
    done();
  }
}

function askFori18n() {
  if (this.existingProject || this.configOptions.skipI18nQuestion) return;

  this.aski18n(this);
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

function setSharedConfigOptions() {
  this.configOptions.packageName = this.packageName;
  this.configOptions.cacheProvider = this.cacheProvider;
  this.configOptions.enableHibernateCache = this.enableHibernateCache;
  this.configOptions.websocket = this.websocket;
  this.configOptions.databaseType = this.databaseType;
  this.configOptions.devDatabaseType = this.devDatabaseType;
  this.configOptions.prodDatabaseType = this.prodDatabaseType;
  this.configOptions.searchEngine = this.searchEngine;
  this.configOptions.messageBroker = this.messageBroker;
  this.configOptions.serviceDiscoveryType = this.serviceDiscoveryType;
  this.configOptions.buildTool = this.buildTool;
  this.configOptions.enableSwaggerCodegen = this.enableSwaggerCodegen;
  this.configOptions.authenticationType = this.authenticationType;
  const { uaaBaseName } = this;
  if (uaaBaseName) {
    this.configOptions.uaaBaseName = this.uaaBaseName;
  }
  this.configOptions.serverPort = this.serverPort;
  this.configOptions.bundleName = this.bundleName;
  this.configOptions.prodDatabaseTypePlugin = this.prodDatabaseTypePlugin;
  this.configOptions.dockerImageOrganization = this.dockerImageOrganization;
  // Make dist dir available in templates
  this.BUILD_DIR = this.getBuildDirectoryForBuildTool(this.buildTool);
  this.CLIENT_DIST_DIR =
    this.getResourceBuildDirectoryForBuildTool(this.configOptions.buildTool) + constants.CLIENT_DIST_DIR;
}
