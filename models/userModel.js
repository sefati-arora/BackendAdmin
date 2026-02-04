module.exports = (Sequelize, sequelize, DataTypes) => {
  return sequelize.define(
    "userTable",
    {
      ...require("./core")(Sequelize, DataTypes),
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      otpVerify: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0, // 0 not verified 1 verified
      },
      role: {
        type:DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      }
    },
    {
      tableName: "userTable",
    },
  );
};
