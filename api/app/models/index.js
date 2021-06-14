const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
db.circuit = require("../models/circuit.model.js")(sequelize, Sequelize);
db.poi = require("../models/poi.model.js")(sequelize, Sequelize);

const PoiCircuit = sequelize.define("poi_circuits", {
  order: Sequelize.INTEGER
});

// association n , n user / role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// Association 1,n user / comment
db.comment.belongsTo(db.user);

// Association 1,n user / poi
db.poi.belongsTo(db.user)

// Asociation 1,n circuit / user
db.circuit.belongsTo(db.user)

// Association 1,n Commentaire / circuit
db.comment.belongsTo(db.circuit)

// Association 1,N Commentaire / POI

// association n , n poi / circuit
db.poi.belongsToMany(db.circuit, {
  through: "poi_circuits",
  foreignKey: "poiId",
  otherKey: "circuitId"
});
db.circuit.belongsToMany(db.poi, {
  through: "poi_circuits",
  foreignKey: "circuitId",
  otherKey: "poiId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
