const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost/myTools", {
  logging: false
});

const User = db.define("users", {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
});

const Tool = db.define("tool", {
  toolType: { type: Sequelize.STRING, allowNull: false },
  specificIdentifyingDetails: { type: Sequelize.STRING },
  manufacturer: { type: Sequelize.STRING },
  approximateAge: { type: Sequelize.INTEGER },
  condition: {
    type: Sequelize.ENUM(
      "broken",
      "on the fritz",
      "worn but works",
      "lightly used",
      "like new"
    )
  },
  powered: { type: Sequelize.ENUM("not-powered", "battery", "corded") },
  accessories: { type: Sequelize.STRING },
  loanStatus: { type: Sequelize.STRING, defaultValue: "not currently loaned" },
  comments: { type: Sequelize.STRING }
});

//associations

Tool.belongsTo(User);
User.hasMany(Tool);

module.exports = {
  db,
  User,
  Tool
};
