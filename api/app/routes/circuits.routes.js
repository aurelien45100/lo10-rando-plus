const { authJwt } = require("../middleware");
const controller = require("../controllers/circuits.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/circuits/search", controller.getCircuit
  );

  app.get("/api/circuits/getCircuitById/:id"/*,[authJwt.verifyToken]*/, controller.getCircuitById
  );

  app.get("/api/circuits/name", controller.getCircuitsName
  );

  app.post("/api/circuits/add", controller.addCircuit);

  app.get("/api/circuits/top/:number", controller.getTopCircuits);


};
