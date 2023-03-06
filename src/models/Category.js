/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    tableName: 'categories',
    timestamps: false,
  });

  return Category;
};

module.exports = CategoryModel;
