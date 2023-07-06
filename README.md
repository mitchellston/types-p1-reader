# Typescript Typings for [p1-reader](https://github.com/ruudverheijden/node-p1-reader/tree/master).

## Installation

```
npm i @mitchellston/p1-reader-types -D
```

## Setup

1. Add package to types in tsconfig.json.

```json
/* Example tsconfig */
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "es6" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,
    "types": [
      "@mitchellston/p1-reader-types"
    ] /* Specify type package names to be included without being referenced in a source file. */,

    /* Interop Constraints */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,

    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,

    /* Completeness */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

2. Now there are types for the [p1-reader](https://github.com/ruudverheijden/node-p1-reader/tree/master) package.
