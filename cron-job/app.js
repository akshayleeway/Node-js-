// app.js
const fs = require('fs');

function logDataWithTimestamp(data) {
  const timestamp = new Date().toISOString();
  const log = `${timestamp}: ${data}\n`;

  fs.appendFile('logs.txt', log, (err) => {
    if (err) {
      console.error('Error writing to the log file:', err);
    }
  });
}
