var Sequelize = require('sequelize');

var sequelize_instance = new Sequelize('pholo_db', 'pholo', 'v3ry_s3cur3', {
  host: 'localhost',
  dialect: 'postgres',
  //logging: 'false',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const options = {
  name: 'pholo_db', // identifier
  models: ['./src/models/*.js'],  // paths/globs to model files
  sequelize: sequelize_instance, // sequelize instance
  sync: true, // sync models - default false
  forceSync: false // force sync (drops tables) - default false
};

module.exports = options;
