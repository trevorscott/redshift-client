require('dotenv').config()
const express = require('express');
const path    = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

var client = {
  user: process.env.REDSHIFT_USERNAME,
  database: process.env.REDSHIFT_DATABASE,
  password: process.env.REDSHIFT_PASSWORD,
  port: 5439,
  host:  process.env.REDSHIFT_HOST
};
 
// The values passed in to the options object will be the difference between a connection pool and raw connection
var redshiftClient = new Redshift(client, {rawConnection: false});

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // options is an optional object with one property so far {raw: true} returns 
  // just the data from redshift. {raw: false} returns the data with the pg object
  const queryString = "select count(*) from systables";

  redshiftClient.query(queryString, {raw: false})
    .then(function(data){
        console.log("success");
        console.log(data);
    })
    .catch(function(err){
        console.log("error");
        console.error(err);
    });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}