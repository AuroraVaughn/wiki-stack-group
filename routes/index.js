'use strict'
const express = require('express');
const router = express.Router()
const wikiRouter = require('./wiki');
const userRouter = require('./user');

module.exports = router;
// console.log('before routes in index.js')
router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', (req, res, next) => {
    // console.log('get request')
    res.send('stufffffasdfgasgeg')

    // res.render('../views/index.html');
});