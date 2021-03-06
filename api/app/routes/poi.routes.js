const { authJwt } = require("../middleware");
const controller = require("../controllers/poi.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/poi/search", controller.getPoi
  );

  app.get("/api/poi/coord", controller.getCoord
  );

  app.get("/api/poi/getPersonalPoi/:userId"/*,[authJwt.verifyToken]*/,controller.getPersonalPoi
  );

  app.get("/api/poi/delete/:poiId"/*,[authJwt.verifyToken]*/, controller.deletePoi
  );
  
  app.post("/api/poi/add", controller.addPoi
  );

};
