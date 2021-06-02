module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING
      }
    });
  
    return Comment;
  };