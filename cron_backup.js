
const cron = require('node-cron');
const {make_backup} = require("./backup");

cron.schedule('30 0 * * *', make_backup);


