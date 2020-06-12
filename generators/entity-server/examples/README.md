# Entity building

This folder contains assets that can speed up development and testing.

## JDL

[all-types-jdl.jh](all-types-jdl.jh) can be used to automatically create an entity with all supported field types.

### Usage

For npm-linked local `entando-blueprint`:

`jhipster import-jdl path/to/entando-blueprint/generators/entity-server/examples/all-types-jdl.jh`

For installed npm package:

`jhipster import-jdl node_modules/entando-blueprint/generators/entity-server/examples/all-types-jdl.jh`


## Prompt

[prompt-entity.exp](prompt-entity.exp) can be used to automatically create an entity with all supported field types using prompt flow. This approach requires `expect` library.

### Usage

For npm-linked local `entando-blueprint`:

`expect node_modules/entando-blueprint/generators/entity-server/examples/prompt-entity.exp`
