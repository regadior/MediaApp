const { Model, DataTypes } = require('sequelize');
class User extends Model {}
User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  surenames: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(3000),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(3000)
  },
  imgPerfil: {
    type: DataTypes.STRING(500)
  },
  imgBanner: {
    type: DataTypes.STRING(500)
  },
  sigupdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  rolId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user_rol',
      key: 'rolId'
    }
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;