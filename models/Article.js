// require mongoose here//
var mongoose = require("mongoose")


var Schema = mongoose.Schema
//defining  article schema here//
var ArticleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true

    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }


})
// create actual schema call Article inside mongoose model //
var Article = mongoose.model("Article", ArticleSchema);
// export module Article//
module.exports = Article;