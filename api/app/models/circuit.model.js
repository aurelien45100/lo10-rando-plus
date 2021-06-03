module.exports = (sequelize, Sequelize) => {
    const Circuit = sequelize.define("circuits", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Circuit;
  };