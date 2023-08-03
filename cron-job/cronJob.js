// cronJob.js
const cron = require('node-cron');
const { logDataWithTimestamp } = require('./app');

cron.schedule('* * * * *', () => {
  logDataWithTimestamp('Cron job executed.');
});
