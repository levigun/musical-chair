const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Instrument extends Model {}

Instrument.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    instrument_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
       type: DataTypes.STRING,
       required: true
    },
    family_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'family',
        key: 'id',
      },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'instrument',
  }
);

module.exports = Instrument;
