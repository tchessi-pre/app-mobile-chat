const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Create server
const http = require('http').createServer(app);
http.listen(3100, () => {
  console.log('Serveur Node en route sur le port:', 3100, '✅ ');
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port 3100 is already in use, please select a different port ❌.');
  } else {
    console.log(`An error occurred: ${err}`, '❌');
  }
});

// Socket.io server
const io = require('socket.io')(http);
io.on('connection', socket => {
  console.log('user connected socket io ✅')
  socket.on("disconnect", () => {
  console.log('user disconnected socket ❌')
  } )
});
module.exports = io;

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Routes logique
const path = require('path');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const channelRoutes = require('./routes/channel')
// Route non utilisé
const likeRoute = require('./routes/like')
const commentRoute = require('./routes/comment')

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/channel', channelRoutes);
// Non utilisé
app.use('/api/like', likeRoute);
app.use('/api/comment', commentRoute);

console.trace()