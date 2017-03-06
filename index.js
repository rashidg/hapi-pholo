var Hapi = require('hapi');
var Sequelize = require('sequelize');
var basicAuth = require('./src/middleware/basic-auth.js');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

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

server.register(
  [
    {
      register: require('hapi-auth-basic'),
      next: (err) => {
          server.auth.strategy('simple', 'basic', true, { validateFunc: basicAuth });
        }
    },
    {
      register: require('hapi-sequelize'),
      options:
        {
          name: 'pholo_db', // identifier
          models: ['./src/models/*.js'],  // paths/globs to model files
          sequelize: sequelize_instance, // sequelize instance
          sync: true, // sync models - default false
          forceSync: false // force sync (drops tables) - default false
        }

    }
  ],
  () => {
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
  }
);

//for (var route in routes)
//    server.route(routes[route]);

server.route({
    method: 'GET',
    path: '/123',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
    //config: {auth: false}
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      const db = request.getDb('pholo_db');
      const Store = db.getModel('store');

      Store.findAll().then(function(stores){
        reply(stores);
      });
    },
    config: {auth: false}
});
