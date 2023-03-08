'use strict';
const { Model } = require('sequelize');

const moment = require('moment');

const { deleteFile } = require('../services/file-removal');

module.exports = (sequelize, DataTypes) => {
  class Chanel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.²
     */
    static associate(models) {
      Chanel.belongsTo(models.User, { foreignKey: 'userId' });
      Chanel.hasMany(models.Comments);
      Chanel.hasMany(models.Likes);
    }

    readableCreatedAt() {
      return moment(this.createdAt).locale('fr').format('LL');
    }
  }
  Chanel.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      likesCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      validate: {
        eitherContentOrImageUrl() {
          if (!this.content && !this.imageUrl) {
            throw new Error('Vous ne pouvez pas créer de publication vide !');
          }
        },
      },
      modelName: 'Chanel',
    }
  );

  Chanel.afterDestroy(async (chanel) => {
    if (chanel.imageUrl) {
      await deleteFile(chanel.imageUrl);
    }
  });

  Chanel.afterUpdate(async (chanel) => {
    if (chanel.dataValues.imageUrl !== chanel._previousDataValues.imageUrl) {
      await deleteFile(chanel._previousDataValues.imageUrl);
    }
  });

  return Chanel;
};
