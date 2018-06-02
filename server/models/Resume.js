const mongoose = require('mongoose');
const resumeSchema = require('../schemas/resume');

module.exports = mongoose.model('Resume', resumeSchema);
