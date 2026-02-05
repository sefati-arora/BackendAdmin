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
        defaultValue: 1, // 1 not verified 2 verified
      },
      role: {
        type:DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      deviceToken:
      {
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null //admin login:1 logOut:null
      }
    },
    {
      tableName: "userTable",
    },
  );
};
