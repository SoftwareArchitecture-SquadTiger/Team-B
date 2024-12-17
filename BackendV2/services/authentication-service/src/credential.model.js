const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true},
    email: { type: String, unique: true, required: true },
    userType: { type: String, required: true },
    hashedPassword: { type: String, required: true } // received from encryption service
});

module.exports = mongoose.model('Credential', credentialSchema);
