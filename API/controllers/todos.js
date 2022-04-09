const Todos = require("../models/todos.js");
const jwt = require("jsonwebtoken");
const todos = require("../models/todos.js");
const fs = require("fs");

exports.create_todos = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;

  const newtodos = req.file
    ? new Todos({
        ...req.body,
        creatorId: userID,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      })
    : new Todos({
        ...req.body,
        creatorId: userID,
      });

  newtodos
    .save()
    .then((createdItem) =>
      res
        .status(201)
        .json({ message: "La liste viens d'être crée", created: createdItem })
    )
    .catch((err) => res.status(401).json({ err }));
};

exports.read_all_by_userId = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;

  Todos.find({ creatorId: userID })
    .then((todoslist) =>
      res.status(200).json({ message: "voici vos todos", todos: todoslist })
    )
    .catch((err) => res.status(404).json({ err }));
};

exports.read_one = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const TargetId = req.params.TargetId;

  Todos.findById(TargetId)
    .then((todo) => {
      if (userID === todo.creatorId) {
        res.status(200).json({ message: "voici votre todo", todo: todo });
      } else {
        res.status(403).json({
          message: `Vous n'avez pas les droits : todoCreatorId : ${todo.creatorId}, userId : ${userID}`,
        });
      }
    })
    .catch((err) => res.status(404).json({ err, message: "todo introuvable" }));
};

// récupérer userID du token + targetId du todo visé
// obtenir le todos selon l'id pour lire son creatorId
// verifier que le creatorId du todo === userID du token (user qui lance la requete)

// Pour PUT = voir spread operator (recherche internet ou openclass room)
// https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466398-enregistrez-et-recuperez-des-donnees

exports.update_todos = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const TargetId = req.params.TargetId;

  const newtodos = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  Todos.findById(TargetId)
    .then((todolist) => {
      if (userID === todolist.creatorId) {
        if (todolist.image) {
          const filename = todolist.image.split("/images/")[1];
          fs.unlinkSync(`images/${filename}`);
        }
        todolist
          .updateOne(newtodos)
          .then(() =>
            res.status(201).json({ message: `Todo mis à jour`, todo: newtodo })
          )
          .catch((err) => res.status(404).json({ err }));
      } else {
        res.status(403).json({
          message: `Vous n'avez pas les droits : todoCreatorId : ${todolist.creatorId}, userId : ${userID}`,
        });
      }
    })
    .catch((err) =>
      res.status(404).json({ message: "Todolist non trouvé", error: err })
    );
};

exports.delete_todos = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const TargetId = req.params.TargetId;

  Todos.findById(TargetId)
    .then((todo) => {
      if (userID === todo.creatorId) {
        todo
          .deleteOne()
          .then((deleted) => {
            res
              .status(200)
              .json({ message: `Votre todo : ${deleted.name} est supprimé` });
          })
          .catch((err) =>
            res
              .status(404)
              .json({ message: "Impossible de supprimer", error: err })
          );
      } else {
        res.status(403).json({
          message: "Vous n'avez pas les droits pour supprmier la todolist",
        });
      }
    })
    .catch((err) =>
      res.status(404).json({ message: "Todolist non trouvé", error: err })
    );
};
