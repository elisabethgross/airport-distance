var router = require('express').Router();
var path = require('path');
module.exports = router;


router.use('/api', require('./api'));

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../app', 'index.html'));
});

// Error catching endware.
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
