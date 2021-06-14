exports.allAccess = (req, res) => {
  res.status(200).send("Contenu public");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenu membre");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenu administration");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Contenu modération");
};
