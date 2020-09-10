[![NPM version][npm-image]][npm-url] [![Build Status][github-actions-generator-image]][github-actions-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster blueprint,

# entando-blueprint
For more information and documentation visit:  https://dev.entando.org, or https://forum.entando.org. Or for the latest news or product information please visit the main website: https://www.entando.com.

Information below is for running locally or building from source. For usage information see the links above.

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-entando
```

To update this blueprint:

```bash
npm update -g generator-jhipster-entando
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-entando
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-entando
```

# Usage
To use this blueprint, run the below command

```bash
jhipster --blueprints entando
```


## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
git clone https://github.com/entando/entando-blueprint.git
cd entando-blueprint
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

You could also use Yarn for this if you prefer

```bash
cd generator-jhipster
npm link

cd entando-blueprint
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-entando
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprints entando

```

# Consuming API

Once you have generated a microservice, you can start it using `./mvnw`. Swagger UI is automatically enabled in order to ease the API development process.
At the end of the startup process, you will see a URL in the console. Opening it in a browser will show you some links, one of them is the Swagger UI one. 
Swagger UI comes configured out of the box, the only thing you have to ensure is that your keycloak instance is already started as illustrated [here](https://dev.entando.org/next/tutorials/backend-developers/run-local.html#running-a-blueprint-generated-microservices-and-micro-frontend-in-local-dev).
When you try to authenticate in the Swagger UI you should keep prefilled data (`swagger_ui/swagger_ui`). After clicking `Authorize`, the first time you will be redirected to the Keycloak login form. There you have to login with credential `admin/admin` and you will be redirected back  to the Swagger UI page. 

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-entando.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-entando
[travis-image]: https://travis-ci.org/kerruba/generator-jhipster-entando.svg?branch=master
[travis-url]: https://travis-ci.org/kerruba/generator-jhipster-entando
[daviddm-image]: https://david-dm.org/kerruba/generator-jhipster-entando.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kerruba/generator-jhipster-entando
[github-actions-generator-image]: https://github.com/entando/entando-blueprint/workflows/Generator/badge.svg
[github-actions-url]: https://github.com/entando/entando-blueprint/actions
