const Todos = require("../models/todos.js");
const jwt = require("jsonwebtoken");



exports.create_todos = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userID = decodedToken.userID;

}

