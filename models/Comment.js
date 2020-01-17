// require mongoose//
var mongoose = require("mongoose")

 var Schema = mongoose.Schema;
 // defining data type for comment schema//
 var CommentSchema = new Schema({
     title:{
         type:String,
         body: String
     }
 })
 // create Comment schema inside of mongoose model//

 var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;