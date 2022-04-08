const Todos = require("../models/todos.js");
const jwt = require("jsonwebtoken");

exports.create_todos = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;

  const newtodos = new Todos({
    name: req.body.name,
    content: req.body.content,
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

  const newName = req.body.name;
  const newContent = req.body.content

  const updatetodo = {
    name: newName,
    content: newContent
  }

  Todos.findByIdAndUpdate(TargetId, updatetodo)
    .then((todo) => {
      if (userID === todo.creatorId) {
        res.status(200).json({ message: "vos renseignement ont était modifés", todo: todo });
      } else {
        res.status(403).json({
          message: `Vous n'avez pas les droits : todoCreatorId : ${todo.creatorId}, userId : ${userID}`,
        });
      }
    })
    .catch((err) => res.status(404).json({ err, message: "todo introuvable" }));
}

exports.delete_todos = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userID = decodedToken.userID;
  const TargetId = req.params.TargetId;

  console.log(userID);
  console.log(Todos.creatorId);
  if(userID === Todos.creatorId) {
    console.log(userID);
    console.log(Todos.creatorId);
    Todos.findByIdAndDelete(TargetId)
    .then((targetTodo) => {
      res.status(200).json({ message: `Votre ${targetTodo} est supprimé`});
    })
    .catch((err) =>
    res.status(404).json({ message: "Todolist non trouvé", error: err })
    )
  }else {
    res.status(403).json({ message: "Vous n'avez pas les droits pour supprmier la todolist"});
  }
}