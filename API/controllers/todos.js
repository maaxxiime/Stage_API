const Todos = require("../models/todos.js");
const jwt = require("jsonwebtoken");



exports.create_todos = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userID = decodedToken.userID;

    
    .then((todos) => {
      const newtodos = new Todos({
        name: req.body.name,
        content: req.body.content,
        userID: req.body.userid
      });
      newtodos
        .save()
        .then(() => res.status(201).json({ message: "La liste viens d'être créé" }))
        .catch((err) => res.status(401).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
}

