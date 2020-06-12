  
// we need the express router as this is a route we are creating
const router = require('express').Router();

// we are getting the users model 
let User = require('../models/user.model');

// this is the first endpoint that handles http get requests on the /users path

router.route('/').get((req, res) => {
  User.find() // mongoose method that gets a list of all the users from the database
    .then(users => res.json(users)) // return users in json format.
    .catch(err => res.status(400).json('Error: ' + err));
});
// find() is a mongoose method, it returns a proimise . 


// 2nd endpoint handles incoming http post reqs when the path is add.

router.route('/add').post((req, res) => {
  //exoexts a username in body of request.
  const username = req.body.username;

  const newUser = new User({username});
// saving new user to database.
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
// exporting the router