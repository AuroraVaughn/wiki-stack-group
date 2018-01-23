const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;




router.get("/", (req, res, next) => {

    Page.findAll({})
        .then(function(pages) {
            res.render('index', {
                pages: pages
            })
        })
        .catch(next)
});

// router.post('/add', function(req, res, next) {
//     console.log('/add' + req.body)
//     res.send('got to POST /wiki/');
// });
router.post('/', function(req, res, next) {
    // console.log(models);
    // console.log(Page);
    const newPage = Page.build(req.body);

    newPage.save()
        .then(function() {
            // res.json();
            res.redirect('../wiki');
        })

});

router.get('/add', function(req, res, next) {

    res.render('addpage')
})
router.get('/:urlTitle', function(req, res, next) {
    console.dir('reached /:urlTitle - ' + req.param.urlTitle)
    const urlTitleOfAPage = req.params.urlTitle
    Page.find({
            where: { urlTitle: urlTitleOfAPage }
        })
        .then((page) => {
            console.log(page)
            if (page === null) {
                return next(new Error('That page was not found'))
            }
            res.render('wikipage', {
                page: page,
                content: req.body.content

            });
        })
        .catch(next);
})

module.exports = router;