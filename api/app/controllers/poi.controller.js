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

  return res.send("Supprimé !");
}

exports.addPoi = (req, res) => {
  console.log('Nom : ' + req.body.name + " posX "+ req.body.posX+ " posY "+req.body.posY +" userId "+req.body.userId);
  Poi.create({name: req.body.name, posX: req.body.posX, posY: req.body.posY, userId: req.body.userId});
  return res.send("POI créé");
}