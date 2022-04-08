const Todos = require("../models/todos.js");
const jwt = require("jsonwebtoken");
const todos = require("../models/todos.js");

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
