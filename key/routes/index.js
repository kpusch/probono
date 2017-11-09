var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
console.log("asd");
  res.render('index3');
});

module.exports = router;
