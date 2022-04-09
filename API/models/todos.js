const mongoose = require('mongoose');

const todosSchema = mongoose.Schema(
{
name : {type : String, required : true},
content : {type : String, required : true},
image : {type : String, required : false},
creatorId : {type : String, required : true}
}, {timestamps : true}
)


module.exports = mongoose.model("Todos", todosSchema);
