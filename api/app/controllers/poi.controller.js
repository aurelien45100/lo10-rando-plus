const db = require("../models");
const config = require("../config/auth.config");
const Poi = db.poi;
const User = db.user;

const Op = db.Sequelize.Op;

exports.getPoi = (req, res) => {
    Poi.findAll().then(listPoi => {
        return res.send(JSON.stringify(listPoi));
  });
}

exports.getCoord = (req, res) => {
  Poi.findAll({attributes: ['posX','posY']}).then(listPoi => {
      return res.send(JSON.stringify(listPoi));
});
}


exports.getPersonalPoi = (req, res) => {
  let target = req.params.userId;

  if(target === undefined){
    return res.send("Paramètre incorrect");
  }

  Poi.findAll({
    where: {
      userId: {
        [Op.eq]: target
      }
    }
  }).then(listPoi => {
      return res.send(JSON.stringify(listPoi));
});
}

exports.deletePoi = (req, res) => {
  let target = req.params.poiId;

  Poi.destroy({
    where: {
      id: target
    }
  });

  return res.redirect("http://localhost:8081/profile");
}

exports.addPoi = (req, res) => {
  console.log('Nom : ' + req.body.name + " posX "+ req.body.posX+ " posY "+req.body.posY +" userId "+req.body.userId);
  Poi.create({name: req.body.name, posX: req.body.posX, posY: req.body.posY, userId: req.body.userId});
  return res.redirect("http://localhost:8081/profile");
}