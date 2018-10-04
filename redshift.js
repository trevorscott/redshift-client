//redshift.js
var Redshift = require('node-redshift');
require('dotenv').config()
 
var client = {
  user: process.env.REDSHIFT_USERNAME,
  database: process.env.REDSHIFT_DATABASE,
  password: process.env.REDSHIFT_PASSWORD,
  port: 5439,
  host:  process.env.REDSHIFT_HOST
};
 
// The values passed in to the options object will be the difference between a connection pool and raw connection
var redshiftClient = new Redshift(client, [options]);
 
module.exports = redshiftClient;