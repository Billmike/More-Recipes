module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    vote: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  Vote.associate = (models) => {
    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };

  return Vote;
};
