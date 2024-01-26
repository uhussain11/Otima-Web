var mysql = require('mysql');

function saveData(sql, values) {

  let success = false;

  console.log(sql)
  console.log(values)

    database = mysql.createConnection({
      "database": "b9f34c5_OtimaWeb",
      "user": "b9f34c5_Admin",
      "password": "OTIMAWEB_admin",
      "host": "198.46.91.127"
      // "debug":true
    });
  
    database.connect(function(err) {
      if(err){
        console.error('error connecting: ' + err.stack);
        return;
      }
      
      else{
        console.log('connected as id ' + database.threadId);

        database.query(sql, values, (err, results) => {
          if (err) {
            success = false;
          } else {
            success = true;
          }
        });
        database.end();
      }
    }); 
    
    return success;
  }
  
function retrieveData(sql, data) {
  
    database = mysql.createConnection({
      "database": "b9f34c5_OtimaWeb",
      "user": "b9f34c5_Admin",
      "password": "OTIMAWEB_admin",
      "host": "198.46.91.127",
      // "debug":true
    });
  
    database.connect(function(err) {
  
      if(err){
        return data(err)
      }
      else{
        // Saving
        // let sql = `INSERT INTO test(title,completed)
        //          VALUES('Learn how to insert a new row',true)`;
        
        // con.query(sql);
      }
      database.end()  
    }); 
    return;
}

module.exports = { saveData, retrieveData };