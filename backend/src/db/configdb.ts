module.exports = {
    development: {
      username: 'root',
      password: '1234',
      database: 'mediaapp_dev',
      host: 'localhost',
      dialect: 'mariadb'
    },
    test: {
      username: 'root',
      password: '1234',
      database: 'mediaapp_test',
      host: 'localhost',
      dialect: 'mariadb'
    },
    production: {
      username: 'root',
      password: '1234',
      database: 'mediaapp',
      host: 'localhost',
      dialect: 'mariadb'
    }
  };