function LinkScrapper(sequelize, DataTypes) {
  
    const table = 'LinkScrapper';
  
    const cols = {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      urlScrapped: { type: DataTypes.STRING, allowNull: false },
      urlReference: { type: DataTypes.STRING, allowNull: false },
      Link_id: { type: DataTypes.INTEGER, allowNull: false }
    };

    const config = { camelCase: false, timestamps: false, tableName: "LinkScrapper" };
  
    const linkScrapper = sequelize.define(table, cols, config);
  
    linkScrapper.associate = function (models) {

      linkScrapper.belongsTo(models.Link, {   
        as: "link",
        foreignKey: "Link_id"
      });

    };
  
    return linkScrapper;
  }
  
  module.exports = LinkScrapper;