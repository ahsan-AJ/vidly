const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    category: { type: String, enum: ['web', 'mobile', 'network'], required: true },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A course should have atleast one tag.' // Custom Validator
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: false,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 1500
    }
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Ahsan',
        tags: ['frontend', 'ui'],
        isPublished: true,
        price: 121.12
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        for (field in error.errors) {
            console.log(error.errors[field].message);
        }
    }
}