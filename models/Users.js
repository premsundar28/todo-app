const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
}); // Define the user schema with username and password fields

userSchema.pre('save', async function(next){

    if(this.isModified('password')){ // Check if the password field has been modified
        next();
    }

    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    next(); // Proceed to the next middleware or save operation
}
);

userSchema.methods.comparePasssword = async function(password) { // Method to compare the provided password with the stored hashed password
    return bcrypt.compare(password, this.password); // Return the result of the comparison
}

module.exports = mongoose.model('User', userSchema); // Export the User model based on the defined schema

