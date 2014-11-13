var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts')


var routes = require('./routes/index');
var chat  = require('./routes/chat');

app.use(require('express').static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = server;
