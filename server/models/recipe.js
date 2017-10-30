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
    img_link: {
      allowNull: true,
      defaultValue: 'image-here',
      type: DataTypes.STRING,
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    ingredients: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    instructions: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
  }, {
    hooks: {
      beforeCreate: (recipe) => {
        const checkArrayData = (field) => {
          if (Array.isArray(field) === false) {
            field = [field];
          }
          return field;
        };
        recipe.ingredients = checkArrayData(recipe.ingredients);
        recipe.instructions = checkArrayData(recipe.instructions);
      },
      beforeUpdate: (recipe) => {
        const checkData = (field) => {
          if (Array.isArray(field) === false) {
            field = [field];
          }
          return field;
        };
        recipe.ingredients = checkData(recipe.ingredients);
        recipe.instructions = checkData(recipe.instructions);
      },
    },
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
