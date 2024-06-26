const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
        firstName: String,
        lastName: String,
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
    .virtuals('fullName')
    // Getter
    .get(function() {
        return `${this.firstName} ${this.lastName}`;
    })
    // Setter
    .set(function (v) {
        const firstName = v.split(' ')[0];
        const lastName = v.split(' ')[1];
        this.set({ firstName, lastName })
    });
    
// Initialize User Model
const User = model('user', userSchema);

module.exports = User;