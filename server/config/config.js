module.exports = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'more-recipes',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'more_recipes_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};

