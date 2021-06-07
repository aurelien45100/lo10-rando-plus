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