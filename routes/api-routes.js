const router = require('express').Router();
const db = require('../models');
const path = require('path');


String.prototype.toObjectId = function () {
    const ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

// Route to get all the workouts
router.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .sort({ 'day': 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// Route to create/add new workouts
router.post('/api/workouts', (req, res) => {
    const workout = new db.Workout();
    db.Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// Route for the new exercises that will be added to the workouts
router.put('/api/workouts/:id', (req, res) => {
    console.log(req.body);
    db.Workout.update({
        _id: req.params.id.toObjectId()
    }, {
        $push: { exercises: req.body }
    })
        .then((data) => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// Route to get data in workout from a specific range
router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
        .sort({ 'day': 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});


// Route to load index.html 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to load exercise.html
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// Route to load stats.html
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;



