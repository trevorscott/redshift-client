require('dotenv').config()

const express = require('express');
const path    = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const { Pool } = require('pg')

const PORT = process.env.PORT || 5000;

const redshiftPool = new Pool({
  user: process.env.REDSHIFT_USERNAME,
  host: process.env.REDSHIFT_HOST,
  database: process.env.REDSHIFT_DATABASE,
  password: process.env.REDSHIFT_PASSWORD,
  port: 5439
});

const postgresPool = new Pool({
  user: process.env.REDSHIFT_USERNAME,
  host: process.env.REDSHIFT_HOST,
  database: process.env.REDSHIFT_DATABASE,
  password: process.env.REDSHIFT_PASSWORD,
  port: 5439
});
 

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

  const redshiftTestQuery = "SELECT * FROM pg_catalog.pg_tables;";
  redshiftPool.query(redshiftTestQuery)
    .then(r => {
      console.log(r);
      console.log(`Successfully connected to AWS Redshift Cluster: ${process.env.REDSHIFT_HOST}:${process.env.REDSHIFT_DATABASE}`)
    })
    .catch(e =>{         
      throw e;
    }); 

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}