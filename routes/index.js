var express = require('express');
var router = express.Router();
var path, { resolve } = require('path');
module.exports = router;

router.use(express.static(resolve(__dirname, '..', 'public')));
router.use('/api', require('./api'));

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Error catching endware.
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
