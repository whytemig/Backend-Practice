const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("practiceDB", "postgres", "mousou89", {
  host: "localhost",
  dialect: "postgres",
});

const connectionTest = async()=>{
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};

const loginForm = sequelize.define("Login-Form", {
  username: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
});

// sequelize.sync({ force: true });

module.exports = {loginForm, sequelize, connectionTest}
