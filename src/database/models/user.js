function userData(sequelize, DataTypes) {
  
    const table = 'User';
  
    const cols = {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      userName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.ENUM('normal'), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: true },
      deleted_at: { type: DataTypes.DATE, allowNull: true },
    };
  
    const config = { camelCase: false, timestamps: false, tableName: "User" };
  
    const user = sequelize.define(table, cols, config);
  
    user.associate = function (models) {
      user.hasMany(models.Link, {   
        as: "links",
        foreignKey: "User_id"
      });
    };
  
    return user;
  }
  
  module.exports = userData;