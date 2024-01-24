var mysql = require('mysql');

function RetrieveData(sql, data) {

    con = mysql.createConnection({
      "database": "b9f34c5_OtimaWeb",
      "user": "b9f34c5_Admin",
      "password": "OTIMAWEB_admin",
      "host": "198.46.91.127",
      // "debug":true
    });
  
    con.connect(function(err) {
  
      if(err){
        return data(err)
      }
      else{
      
        // Getting
        // const sql = `SELECT *
        // FROM test
        // WHERE title = 'Learn how to insert a new row'`;
      
        // con.query(sql, (err, result) => {
        //   if (err) throw err;
      
        //   // Print the result
        //   console.log('Completed:', result);
      
        //   // Close the connection
        //   con.end();
        // });
      }
    
      con.end()
    }); 
    
  
  }
  
function SaveData(sql) {
  
    con = mysql.createConnection({
      "database": "b9f34c5_OtimaWeb",
      "user": "b9f34c5_Admin",
      "password": "OTIMAWEB_admin",
      "host": "198.46.91.127",
      // "debug":true
    });
  
    con.connect(function(err) {
  
      if(err){
        return data(err)
      }
      else{
        // Saving
        // let sql = `INSERT INTO test(title,completed)
        //          VALUES('Learn how to insert a new row',true)`;
        
        // con.query(sql);
      }
      con.end()  
    }); 
    return;
}
