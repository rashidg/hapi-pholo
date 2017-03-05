var Hapi = require('hapi');
var basicAuth = require('./src/middleware/basic-auth.js');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.register(require('hapi-auth-basic'), (err) => {
    server.auth.strategy('simple', 'basic', true, { validateFunc: basicAuth });
});

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

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
