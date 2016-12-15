var router = require('express').Router();
var axios = require('axios');
module.exports = router;

router.post('/airport', function(req, res) {
  var name = req.body.name.split(' ').join('%20');
  axios.get(`https://airport.api.aero/airport/match/${name}?user_key=ba833b35f84a2e26f3edce04c96aa3dd`)
  .then(response => res.send(response.data.airports[0].code));
});

// api route to receive all US airports (make a call to Sita developer airport api)
router.get('/airports', function (req, res) {
  axios.get('https://airport.api.aero/airport?user_key=ba833b35f84a2e26f3edce04c96aa3dd')
    .then(response => {
      var airports = response.data.airports;
      var usAirports = airports.filter(elem => {
        return elem.country === 'United States';
      });
      res.send(usAirports);
    });
});

// api route to receive distance between two US airports (make a call to Sita developer airport api)
router.post('/airports/distance', function(req, res) {
  var airportA = req.body.airportA;
  var airportB = req.body.airportB;

  axios.get(`https://airport.api.aero/airport/distance/${airportA}/${airportB}?user_key=ba833b35f84a2e26f3edce04c96aa3dd&units=mile`)
  .then(response => res.json(response.data.distance));
});
