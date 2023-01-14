const db = require('../models');
const Sequelize = db.Sequelize;
const jwt = require('jsonwebtoken');
const { User } = db.sequelize.models;

const newToken = (user) => {
  token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h',
  });
  return { user, token };
};

exports.signup = async (req, res, next) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Vous devez fournir tous les champs' });
  } else {
    try {
      // Créer un nouvel utilisateur
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      })
      res.status(201).json(newToken(user))
    } catch (error) {
      // Vérification de l'email unique d'un utilisateur
      if(error.name === 'SequelizeValidationError' && error.errors[0].path === 'email'){
        res.status(409).json({ error: 'Email déjà utilisé' });
        console.log("Email déjà utilisé")
      }else{
        res.status(400).json({ error });
      }
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const response = await User.authenticate(req.body.email, req.body.password);

    if (response.valid) {
      res.status(201).json(newToken(response.user));
    } else {
      res.status(401).json({ error: response.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editUser = (req, res, next) => {
  try {
    const userObject = req.file
      ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/public/${req.file.filename
          }`,
      }
      : { ...req.body };

    console.log(userObject);
    req.user.update(userObject).then((user) => res.status(200).json({ user }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  const options = {
    where: [Sequelize.where(
      Sequelize.fn(
        'concat',
        Sequelize.col('firstName'),
        ' ',
        Sequelize.col('lastName')
      ),
      {
        [Sequelize.Op.like]: `%${req.query.search}%`,
      },

    ), { deleted: false }],


    limit: 10,
  };

  User.findAll(options)
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.FindAllUsers = (req, res, next) => {
  User.findAll({ where: { deleted: false } })
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

exports.deleteUserAccount = async (req, res, next) => {
  try {
    const user = req.user.admin
      ? await User.findOne({ where: { id: req.params.id } })
      : req.user;
    await user.softDestroy();
    res.status(200).json({ message: 'Compte supprimé' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
