var mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    articleUrl: {
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
    articleThumbnail: {
        type: String,
        required: false
    }
});

const Item = module.exports = mongoose.model('Article',ArticleSchema);