const User = require("../models/users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((correspond) => {
          if (!correspond) {
            res.status(401).json({ message: "mdp incorrect" });
          } else {
            const token = jwt.sign(
              { userID: user._id, email: user.email },
              process.env.TOKEN_KEY,
              { expiresIn: "7d" }
            );
            res.status(200).json({
              message: "connexion réussi",
              user: user.email,
              userId: user.id,
              token: token,
            });
          }
        })
        .catch((err) => res.status(401).json({ err }));
    })
    .catch((err) =>
      res
        .status(404)
        .json({
          message: "utilisateur non trouvé : " + req.body.email,
          error: err,
        })
    );
};

exports.delete = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const TargetId = req.params.TargetId;

  if (userID === TargetId) {
    User.findByIdAndDelete(TargetId)
      .then((user) => {
        res.status(200).json({ message: `utilisateur ${user.email} supprimé` });
      })
      .catch((err) =>
        res.status(404).json({ message: "utilisateur non trouvé", error: err })
      );
  } else {
    res.status(403).json({
      error: "Vous n'avez pas les droit pour supprimer cet utilisateur",
    });
  }
};

exports.update = (req, res, next) => {
  //  token == "Bearer zriohuyeotihyetyueityeeiuyhetihyety"
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const targetID = req.params.TargetId;

  if (userID === targetID) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const newEmail = req.body.email;

        const updateUser = {
          email: newEmail,
          password: hash,
        };

        User.findByIdAndUpdate(targetID, updateUser)
          .then(() =>
            res.status(200).json({
              message: `votre email à était modififié par ${updateUser.email}`,
            })
          )
          .catch((err) =>
            res
              .status(404)
              .json({ message: "utilisateur introuvable", error: err })
          );
      })
      .catch((err) =>
        res.status(500).json({ message: "bcrypt error", error: err })
      );
  } else {
    res.status(403).json({
      error: "Vous n'avez pas les droit pour modifier cet utilisateur",
    });
  }
};

// url/api/users/:id

// id req === id user visé (via le token)
