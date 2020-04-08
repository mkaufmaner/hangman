## Installation

```bash
$ npm install
```

## Setup
Copy the `sample.env` file to `.env` and modify the variables to connect to a locally running instance of MySQL.
```bash
cp sample.env .env
```

## Build
```bash
npm run build
```

## Running

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation
The API interfaces are documented using OpenAPI and can be found after launching the application and navigating to `http://localhost:3000/api/` in your browser.
