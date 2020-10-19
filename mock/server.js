const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock-data.json');
const middlewares = jsonServer.defaults();
const customMiddlewares = require('./mock-api');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(customMiddlewares);
server.use(router);
server.listen(process.env.PORT || 3001, () => {
  console.log('JSON Server is running');
})
