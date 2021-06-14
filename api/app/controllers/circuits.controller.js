const db = require("../models");
const config = require("../config/auth.config");
const PoiCircuit = db.poi_circuits;
const Circuits = db.circuit;
const User = db.user;
const Poi = db.poi;

const Op = db.Sequelize.Op;

exports.getCircuit = (req, res) => {
  Circuits.findAll().then(circuit => {
          return res.send(JSON.stringify(circuit));
});
}

exports.getCircuitsName = (req, res) => {
  Circuits.findAll({attributes: ['name']}).then(circuit => {
          return res.send(JSON.stringify(circuit));
});
}


exports.addCircuit = async (req, res) => {
  const poiList = JSON.parse(req.body.poiList);
  
  // Create the circuit 
  let createdCircuit = await Circuits.create({name: req.body.name, userId: req.body.userId});
  
  // Link the poi to that circuit
  poiList.map((poi, index) => { // Start the order from 1 and not 0
    PoiCircuit.create({order: index + 1, poiId: poi.id, circuitId: createdCircuit.dataValues.id})
  })
  return res.send("Circuit créé");
}

/* exports.getPersonalPoi = (req, res) => {
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
} */

/* exports.addPoi = (req, res) => {
  console.log('Nom : ' + req.body.name);
  Poi.create({name: req.body.name, posX: req.body.posX, posY: req.body.posY, userId: req.body.userId});
  return res.send("POI créé");
} */