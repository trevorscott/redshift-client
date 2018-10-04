var redshiftClient = require('./redshift.js');

redshiftClient.connect(function(err){
  if(err) throw err;
  else{
    redshiftClient.query('SELECT * FROM "TableName"', [options], function(err, data){
      if(err) throw err;
      else{
        console.log(data);
        redshiftClient.close();
      }
    });
  }
});