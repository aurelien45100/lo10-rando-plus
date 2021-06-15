const db = require("../models");
const config = require("../config/auth.config");
const PoiCircuit = db.poi_circuits;
const Circuits = db.circuit;
const User = db.user;
const Poi = db.poi;
const Comment = db.comment;

const Op = db.Sequelize.Op;

exports.getCircuit = (req, res) => {
  Circuits.findAll().then(circuit => {
          return res.send(JSON.stringify(circuit));
});
}

exports.getTopCircuits = async (req, res) => {
  let target = req.params.number;

  if(target === undefined){
    return res.send("Paramètre incorrect");
  } else {
    let isNumber = !isNaN(target) && !isNaN(parseFloat(target))
    if (!isNumber) {
      return res.send("Le paramètre n'est pas un numéro")
    } else {
      const [results, metadata] = await db.sequelize.query(`SELECT AVG(note) as moyenneNote, circuitId, randoplusDB.circuits.name FROM randoplusDB.comments join randoplusDB.circuits where randoplusDB.circuits.id = randoplusDB.comments.circuitId GROUP BY circuitId Order by moyenneNote DESC limit ${target};`);
      res.send(JSON.stringify(results))  
    }
  }
}

exports.getCircuitById = (req, res) => {
  let target = req.params.id;

  if(target === undefined){
    return res.send("Paramètre incorrect");
  }

  Circuits.findAll({
    where: {
      id: {
        [Op.eq]: target
      }
    }
  }).then(listCircuits => {
      return res.send(JSON.stringify(listCircuits));
});
}

exports.getCircuitsName = (req, res) => {
  Circuits.findAll({attributes: ['name']}).then(circuit => {
          return res.send(JSON.stringify(circuit));
});
}


exports.addCircuit = async (req, res) => {
  const poiList = JSON.parse(req.body.poiList);
  console.log(req.body);
  console.log('11111111111111111111111111111111111111111111');
  // Create the circuit 
  let createdCircuit = await Circuits.create({name: req.body.name, userId: req.body.userId}).catch(
    console.log('Catché')
  );
  console.log('2222222222222222222222222222222222222222222222222');
  
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