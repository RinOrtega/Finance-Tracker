const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        categoryType: {
            type: String,
            default: false,
        },
    }
)

const Category = model('Category', categorySchema);

module.exports = Category;