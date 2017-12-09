module.exports = {
  development: {
    username: 'bill',
    password: 'rocketmail',
    database: 'more_recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'bill',
    password: 'rocketmail',
    database: 'more_recipes_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};

