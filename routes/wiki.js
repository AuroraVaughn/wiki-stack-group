const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;




router.get('/', function(req, res, next) {
    res.redirect('/');
});

// router.post('/add', function(req, res, next) {
//     console.log('/add' + req.body)
//     res.send('got to POST /wiki/');
// });
router.post('/', function(req, res, next) {
    // console.log(models);
    // console.log(Page);
    const page = Page.build(req.body);
    //     {
    //     title: req.body.title,
    //     content: req.body.content
    // }
    page.save()
        .then(() => {
            console.log('saved successfully')
                // res.redirect('/');
        })

});

router.get('/add', function(req, res, next) {
    console.log('wiki/add reached')
    res.render('addpage.html');
});


module.exports = router;