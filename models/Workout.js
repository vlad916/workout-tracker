const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    day: {
        type: String,
        default: Date.now
    },

    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Please enter the type of exercise..."
        },
        name: {
            type: String,
            trim: true,
            required: "Please enter an exercise name..."
        },
        distance: {
            type: Number,
        },
        duration: {
            type: Number,
            trim: true,
            required: "Please enter an exercise duration in minutes..."
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
    }],
    totalDuration: Number
});

// Method to get the total duration
WorkoutSchema.methods.getTotalDuration = function () {
    this.totalDuration = `${this.exercises.duration + this.exercises.duration}`
    return this.totalDuration;
};

const Workout = mongoose.model('Workout',  WorkoutSchema);

module.exports = Workout;