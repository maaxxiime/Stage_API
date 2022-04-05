const User = require("../models/users.js");
const bcrypt = require("bcryptjs");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newuser = new User({
        email: req.body.email,
        password: hash,
      });
      newuser
        .save()
        .then(() => res.status(201).json({ message: "User created ! 👌" }))
        .catch((err) => res.status(401).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then((correspond) => {
      if (!correspond) {
        res.status(401).json({message : 'mdp incorrect'})
      } else {
        res.status(200).json({message : 'connexion réussi', user : user.email})
      }

    })
    .catch((err) => res.status(401).json({err}));
  }).catch((err) => res.status(404).json({message : 'utilisateur non trouvé' ,error : err, }))
};


exports.delete = (req, res, next) => {
  User.deleteOne({email: req.body.email}).then((user) =>{
    user.compare(req.params.tagId, user.Id)
    .then((correspond) => {
      if (!correspond) {
        res.status(401).json({message : 'utilisateur invalide'})
      } else {
        res.status(200).json({message : 'utilisateur supprimé'})
        mongoose.deleteModel('User');
      }

    })
    .catch((err) => res.status(401).json({err}));
  }).catch((err) => res.status(404).json({message : 'utilisateur non trouvé' ,error : err, }))
}
