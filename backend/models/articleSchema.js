var mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    articleThumbnail: {
       type: String,
       required: true
    },
    articleTitle: {
        type: String,
        required: false
    },
    articleDescription: {
        type: String,
        required: false
    },
    articleCategory: {
        type: String,
        required: false
    }
});

const Item = module.exports = mongoose.model('Article',ArticleSchema);