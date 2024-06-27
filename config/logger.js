// Import the morgan logging middleware
const morgan = require('morgan');

// Import the fs (file system) module to work with the file system
const fs = require('fs');

// Import the path module to work with file and directory paths
const path = require('path');

// Create a write stream (in append mode) to the log file
// The logs will be written to 'logs/access.log' in the parent directory of the current file's directory
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

// Export the morgan middleware configured to use the 'combined' preset
// Log output will be written to the logStream
module.exports = morgan('combined', { stream: logStream });
