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
                ref: "Transaction",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }
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
    
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// hash pass of new user
userSchema.pre('save', async function (next) {

    if (this.isNew || this.isModified('password')) {
    
    const saltRounds = 10;
    
    this.password = await bcrypt.hash(this.password, saltRounds);
    
    }
    
    next();
    
    });

// Initialize User Model
const User = model('user', userSchema);

module.exports = User;