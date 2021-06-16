const db = require("../models");
const config = require("../config/auth.config");
const PoiCircuit = db.poi_circuits;
const Circuits = db.circuit;
const User = db.user;
const Poi = db.poi;
const Comment = db.comment;
const axios = require("axios");

const Op = db.Sequelize.Op;

exports.getCircuit = (req, res) => {
  Circuits.findAll().then(circuit => {
          return res.send(JSON.stringify(circuit));
});
}

exports.getTopCircuits = async (req, res) => {
  let target = req.query.number;

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

  // encoded password
  let encoded = Buffer.from('lo10:LO10password').toString('base64');
  let auth = 'Basic ' + encoded;

  let origin = poiList[0].posY + ',' + poiList[0].posX;
  let destination = poiList[poiList.length - 1].posY + ',' + poiList[poiList.length - 1].posX;
  var uri = 'http://wxs.ign.fr/yc4b0898y7xcd0szthskjtal/itineraire/rest/route.json?origin=' + origin + '&destination=' + destination;
  if (poiList.length > 2) {
    uri += '&waypoints=';
    for (var i = 1; i < poiList.length - 1; i++) {
      uri += poiList[i].posY + ',' + poiList[i].posX + ';';
    }
  }
  uri += '&method=DISTANCE&graphName=Pieton';

  console.log('URI IGN ' + uri);

  axios.get(uri, {
    headers: {
      Authorization: auth
    }
  }).then(response => {
    const myJson = response.data;
    var duration = parseFloat(myJson.durationSeconds) / 60;
    var distance = parseFloat(myJson.distanceMeters);
    // Create the circuit 
    let createdCircuit = Circuits.create({name: req.body.name, userId: req.body.userId, duration: duration, distance: distance});
    // Link the poi to that circuit
    poiList.map((poi, index) => { // Start the order from 1 and not 0
      PoiCircuit.create({order: index + 1, poiId: poi.id, circuitId: createdCircuit.dataValues.id})
    })
    console.log('COUCOU');
  }).catch(error => {
    console.log(error);
  });
  
  return res.send("Circuit créé");
}

exports.getUsername = (req, res) => {
  let target = req.params.id;

  if(target === undefined){
    return res.send("Paramètre incorrect");
  }

  User.findAll({
    where: {
      id: {
        [Op.eq]: target
      }
    }
  }).then(user => {
      return res.send(JSON.stringify(user));
});
}

exports.compareCircuits = async (req,res) => {
    //let lat = req.query.lat;
    //let lng = req.query.lng;
    //let radius = req.query.radius;
    let distance = req.query.distance;
    let duration = req.query.duration;
    let isDistanceValid = !isNaN(distance) && !isNaN(parseFloat(distance))
    let isDurationValid = !isNaN(duration) && !isNaN(parseFloat(duration))

    //RECUPERATION DE TOUS LES CIRCUITS AVEC LES COORDS DE LEUR POINT DE DEPART
    let circuitsList = await Circuits.findAll().then(circuits => {
    
    if(isDistanceValid){
        circuits = circuits.filter(circuit => circuit.distance <= distance)
    }
    if(isDurationValid){
        circuits = circuits.filter(circuit => circuit.duration <= duration)
    }
        

    return res.send(JSON.stringify(circuits));
    })
    //console.log(circuitsList);

    // SI LAT, LNG ET RADIUS SONT DEFINIS, ALORS
    //DISTANCE DU POINT INITIAL AVEC GEOLIB

    // SI DISTANCE EST DEFINI, ALORS
    // TRI SUR LA DISTANCE DE CIRCUIT

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