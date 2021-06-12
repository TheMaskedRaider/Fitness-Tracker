const router = require('express').Router()
const db = require('../models');
const mongojs = require('mongojs');

router.get('/workouts', (req, res)=> {
  db.Workout.aggregate([
    {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
  ])
  .then(workoutData => {
    res.json(workoutData);
  })
  .catch((err) => {
    console.error(err)
    res.status(500).json(err)
  })
})

router.get('/workouts/range', (req, res)=> {
  db.Workout.aggregate([
    {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
  ])
  .then(workoutData => {
    res.json(workoutData);
  })
  .catch((err) => {
    console.error(err)
    res.status(500).json(err)
  })
})

router.post('/workouts', (req, res) => {
  db.Workout.create(req.body)
  .then(dbWorkout => {
    res.json(dbWorkout)
    console.log(dbWorkout)
  }) 
  .catch(err => {
    console.error(err)
    res.json(err);
  });
})

router.put('/workouts/:id', (req, res) => 
{
  db.Workout.findByIdAndUpdate(req.params.id,
    {$push: {exercises: req.body}},
    {
      runValidators: true
    })
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json(err)
    })
})


module.exports = router;