var express = require('express');
var router = express.Router();
var { resolve } = require('path');
module.exports = router;

// serve static files
router.use(express.static(resolve(__dirname, '..', 'public')));

router.use('/api', require('./api'));

router.get('/*', function (req, res) {
  res.sendFile(resolve(__dirname, '../public', 'index.html'));
});

// Error catching endware.
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
