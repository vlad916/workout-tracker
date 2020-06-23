const db = require('../models');
const path = require('path');


String.prototype.toObjectId = function () {
    const ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};

module.exports = function (app) {

app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .sort({'day': 1 })
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




}


module.exports = router;
 