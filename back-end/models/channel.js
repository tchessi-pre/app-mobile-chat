'use strict';
const { Model } = require('sequelize');

const moment = require('moment');

const { deleteFile } = require('../services/file-removal');

module.exports = (sequelize, DataTypes) => {
  class Chanel extends Model {
    static associate(models) {
      // Chanel.belongsTo(models.User, { foreignKey: 'channelId' });
      // Chanel.hasMany(models.Post, { foreignKey: 'channelId' });
    }

    readableCreatedAt() {
      return moment(this.createdAt).locale('fr').format('LL');
    }
  }
  Chanel.init(
    {
      channelId: DataTypes.INTEGER,
      title: {
        type: DataTypes.TEXT,
        unique: true
      },
      imageUrl: DataTypes.STRING,
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
