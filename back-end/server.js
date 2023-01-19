// const http = require('http');
// const { isObject } = require('util');
// const app = require('./app');
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// module.exports = io;

// const normalizePort = (val) => {
//   const port = parseInt(val, 10);
//   if (isNaN(port)) {
//     return val;
//   }
//   return port >= 0 ? port : false;
// };

// const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

// const errorHandler = (error) => {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges.');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use.');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };


// // http.on('error', errorHandler);
// // http.on('listening', () => {
// //   const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
// //   console.log(`Serveur en route sur le ${bind} http://localhost:${port}/`);
// // });

// // http.listen(3000);