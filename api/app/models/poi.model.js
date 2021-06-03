module.exports = (sequelize, Sequelize) => {
    const Poi = sequelize.define("pois", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      posX: {
          type: Sequelize.FLOAT
      },
      posY: {
          type: Sequelize.FLOAT
      }
    });
  
    return Poi;
  };