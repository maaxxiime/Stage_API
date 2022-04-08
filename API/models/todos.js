const mongoose = require('mongoose');

const todosSchema = mongoose.Schema(
{
name : {type : String, required : true},
content : {type : String, required : true},
creatorId : {type : String, required : true}
}, {timestamps : true}
)


module.exports = mongoose.model("Todos", todosSchema);
