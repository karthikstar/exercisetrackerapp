const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// rooturl/exercises/ and its a get req, then we run this cmd
// CRUD ROUTES : Create, Read, Update, Delete.
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});
// when we go to localhost:5000/exercises/add and we do a post req, its expecting the following
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// get request returns just the info about that exercise. 

// id gets automatically created by mongoDB.
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// this gets executed when user passes in the id and its a delete request. 
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// if the route is exercises/update/:id , and its a post, then we will update it.
router.route('/update/:id').post((req, res) => { // find the exercise first
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
    // we are taking the username,description,duration,date from the req body, and assigning them again to the respective properties of exercise.

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// a get req to http://localhost:5000/exercises/5ee239d3d29c8b2f280e3cb7 gives us the exercise obj w that id.
// a post req to http://localhost:5000/exercises/update/5ee239d3d29c8b2f280e3cb7 and filling in all the req fields in the body can allow us to update that exercise object.

module.exports = router;
