module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      validate: {
        max: 15,
        min: 3,
      },
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 6,
      },
    },
  }, {
      validate: {
        validatePassword() {
          if (this.password.length <= 8) {
            throw new Error('Enter a password greater than 8 characters');
          }
        },
      },
    });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'owner',
      as: 'recipes',
    });

    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites',
    });

    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
  };

  return User;
};
