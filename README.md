# Redshift Client

Deploy this node.js jdbc client to test the connection between a Private Space and a redshift cluster within a peered AWS VPC. 

## Requirements

1. Enterprise Heroku Account
1. A Heroku Private Space peered with an AWS VPC
1. A redshift cluster deployed in said AWS VPC

## Setup

```
heroku create $app_name
heroku config:set REDSHIFT_DATABASE='mydb' \
  REDSHIFT_HOST='rs_cluster_name.some_id.region.redshift.amazonaws.com' \
  REDSHIFT_PASSWORD='your-secure-rs-password' \
  REDSHIFT_USERNAME='your-rs-username'
git push heroku master
```