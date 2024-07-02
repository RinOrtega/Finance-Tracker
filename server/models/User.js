const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,

        },
        lastName: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        transactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Transactions',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// creat a virtual property to show full name to better set users full name based off info from schema
userSchema
    .virtual('fullName')
    // Getter
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })
    // Setter
    .set(function (v) {
        const firstName = v.split(' ')[0];
        const lastName = v.split(' ')[1];
        this.set({ firstName, lastName })
    });

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// Initialize User Model
const User = model('user', userSchema);

module.exports = User;