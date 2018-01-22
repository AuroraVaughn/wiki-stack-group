'use strict'
const morgan = require('morgan');
const express = require('express');
const app = express();
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const env = nunjucks.configure('views', { noCache: true });
const path = require('path')
const models = require('./models')


app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
console.log('before makerouter /')

app.use(routes)

// app.listen(3000, function() {
//     console.log('listening on port 3000.');
// })
// app.get('*', (req, res, next) => {
//     console.log('get request')
//     res.send('stufffffasdfgasgeg')
// });
models.db.sync({ force: true })
    .then(() => {
        return models.User.sync({}) //{} holds any parametes such as force: true
    })
    .then(() => {
        return models.Page.sync({})
    })
    .then(() => {
        app.listen(3000, function() {
            console.log('listening on port 3000.');
        })
    })
    .catch(console.error);