const db = require('../models');
const path = require('path');


String.prototype.toObjectId = function () {
    const ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

module.exports = function (app) {

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
}


module.exports = router;
