const db = require('../models');
const jwt = require('jsonwebtoken');
const { User } = db.sequelize.models;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token; //récupération du token depuis le header Authorization
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      User.findOne({ where: { id: userId } }).then((user) => {
        req.user = user;
        next();
      });
    }
  } catch (error) {

    console.error(error);
    res.status(401).json({
      error: error
    });
  }
};
