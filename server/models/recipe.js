module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    imageUrl: {
      allowNull: true,
      defaultValue: 'image-here',
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    instructions: {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    upvoters: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    downvoters: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: []
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE',
    });

    Recipe.hasMany(models.Vote, {
      foreignKey: 'recipeId',
      as: 'votes',
    });

    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
  };
  return Recipe;
};
