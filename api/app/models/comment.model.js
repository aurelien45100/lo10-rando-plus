module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING
      },
      note : {
        type: Sequelize.INTEGER
      }
    });
  
    return Comment;
  };