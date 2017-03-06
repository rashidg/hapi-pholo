var Hapi = require('hapi');
var basicAuth = require('./src/middleware/basic-auth.js');
var dbOptions = require('./src/middleware/db.js');
var routes = require('./src/routes/store.js');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

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
      options: dbOptions
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

for (var route in routes) {
  server.route(routes[route]);
}

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
