module.exports = (sequelize, Sequelize) => {
    const Circuit = sequelize.define("circuits", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.FLOAT
      },
      distance: {
        type: Sequelize.FLOAT
      }
    });
  
    return Circuit;
  };