const db = require("../models");
const config = require("../config/auth.config");
const Comment = db.comment;

const Op = db.Sequelize.Op;

exports.getComments = (req, res) => {
    let target = req.params.circuitId;

    Comment.findAll({
        where: {
            poiId: target
        }
        }).then(listComments => {
        return res.send(JSON.stringify(listComments));
    });
}

exports.addComment = (req, res) => {
    console.log('Contenu : ' + req.body.content + " note "+ req.body.note+ " userId "+req.body.userId +" commentId "+req.body.circuitId);
    Comment.create({content: req.body.content, note: req.body.note, userId: req.body.userId, poiId: req.body.circuitId});
    return res.send("Commentaire créé");
}