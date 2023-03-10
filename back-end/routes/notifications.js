const express = require('express');
const router = express.Router();

const notificationsCtrl = require('../controllers/notifications');
const auth = require('../middleware/auth');

app.get('/api/notifications',auth,notificationsCtrl.getNotificationsOfOneUser);
app.delete('/api/notifications/:id',auth,notificationsCtrl.deleteNotification);

module.exports = router;

