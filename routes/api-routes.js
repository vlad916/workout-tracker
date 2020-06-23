const db = require('../models');
const path = require('path');


String.prototype.toObjectId = function () {
    const ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

module.exports = function (app) {

    // Route to get all the workouts
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({})
            .sort({ 'day': 1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

    // Route to create/add new workouts
    app.post('/api/workouts', (req, res) => {
        const workout = new db.Workout();
        db.Workout.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                res.json(err);
            })
    });

    // Route for the new exercises that will be added to the workouts
    app.put('/api/workouts/:id', (req, res) => {
        console.log(req.body);
        db.Workout.update({
            _id: req.params.id.toObjectId()
        }, {
            $push: { exercises: req.body }
        })
            .then(function (data) {
                res.json(data);
            })
    });

    // Route to get data in workout from a specific range
    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({})
            .sort({ 'day': 1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });


// Route to load index.html 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route to load exercise.html
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// Route to load stats.html
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

}



