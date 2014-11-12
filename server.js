var express = require('express')
var debug = require('debug')('express-node');
var expressLayouts = require('express-ejs-layouts')
var app = express()
var http = require('http').createServer(app)

app.use(expressLayouts)

app.get('/', function(request, response){
  response.send('<h1>Welcome to Makers</h1>')
})

module.exports = http
