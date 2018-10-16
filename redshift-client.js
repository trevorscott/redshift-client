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

  console.log("connecting to redshift...")
  const redshiftTestQuery = "SELECT * FROM pg_catalog.pg_tables;";
  redshiftPool.query(redshiftTestQuery)
    .then(r => {
      console.log(`Successfully connected to AWS Redshift Cluster: ${process.env.REDSHIFT_HOST}:${process.env.REDSHIFT_DATABASE}`)
    })
    .catch(e =>{         
      throw e;
    }); 