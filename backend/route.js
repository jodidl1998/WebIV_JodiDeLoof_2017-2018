const express = require('express');
const router = express.Router();

const Article = require('./articleSchema');

router.get('/Articles',function (req, res, next) {
    Article.find(function (err, articles) {
        if(err){
            res.json(err);
        }else{
            res.json(articles);
        }
    });
});

router.post('/Article', function (req, res, next) {
    var newArticle = new Article({
        articleUrl: req.body.articleUrl,
        articleTitle: req.body.articleTitle,
        articleDescription: req.body.articleDescription,
        articleThumbnail: req.body.articleThumbnail
    });
    newArticle.save(function (err) {
        if(err){res.json(err);}else{res.json({msg:'article is framblij'});}
    });
});

module.exports = router;