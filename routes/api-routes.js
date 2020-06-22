const db = require('../models');
const router = express.Router();
const path = require('path');


String.prototype.toObjectId = function () {
    const ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};


router.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .sort({'day': 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

router.post('/api/workouts', (req, res) => {
    const workout = new db.Workout();
    db.Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err);
        })
});


router.put('/api/workouts/:id', (req, res) => {
    console.log(req.body);
    db.Workout.update({
        _id: req.params.id.toObjectId()
    }, {
        $push: { exercises: req.body }
    })
    .then(function (data){
        res.json(data);
    })
});

router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
        .sort({ 'day': 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});



module.exports = router;
 