const redshiftClient = require('./redshift.js');

// options is an optional object with one property so far {raw: true} returns 
// just the data from redshift. {raw: false} returns the data with the pg object
const queryString = "select count(*) from systables";

redshiftClient.query(queryString, {raw: false})
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.error(err);
});