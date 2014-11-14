var express = require('express');
var router  = express.Router();

router.get('/', function(request, response){
  response.render('index');
});

router.get('/chat', function(request, response){
  response.render('chat');
});

module.exports = router;
