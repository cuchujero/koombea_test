require('dotenv').config();

module.exports = {
  "test": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB_DATABASE,
    "host": process.env.TEST_DB_HOST,
    "dialect": process.env.TEST_DB_DIALECT,
    "port": process.env.TEST_DB_PORT
  },
  "production": {
    "username": process.env.PRODUCTION_DB_USERNAME,
    "password": process.env.PRODUCTION_DB_PASSWORD,
    "database": process.env.PRODUCTION_DB_DATABASE,
    "host": process.env.PRODUCTION_DB_HOST,
    "dialect": process.env.PRODUCTION_DB_DIALECT,
    "port": process.env.PRODUCTION_DB_PORT
  }
}


