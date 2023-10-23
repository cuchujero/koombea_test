function Link(sequelize, DataTypes) {
  
    const table = 'Link';
  
    const cols = {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      url: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: true },
      User_id: { type: DataTypes.INTEGER, allowNull: false }
    };
  
    const config = { camelCase: false, timestamps: false, tableName: "Link" };
  
    const link = sequelize.define(table, cols, config);
  
    link.associate = function (models) {

      link.hasMany(models.LinkScrapper, {   
        as: "linksScrappers",
        foreignKey: "Link_id"
      });

      link.belongsTo(models.User, {   
        as: "user",
        foreignKey: "User_id"
      });

    };
  
    return link;
  }
  
  module.exports = Link;