module.exports = {

  "development": {
    "username": "root",
    "password": "root",
    "database": "UTTR2db",
    "host": "localhost",
    "dialect": "mysql",
    "port": "3306"
  },
  "test": {
    "username": "",
    "password": "",
    "database": "",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }

}
