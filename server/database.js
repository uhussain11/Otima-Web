var mysql = require('mysql');
var randomstring = require("randomstring");

function saveData(sql, values) {
  return new Promise((resolve, reject) => {
    const database = mysql.createConnection({
      "database": "b9f34c5_OtimaWeb",
      "user": "b9f34c5_Admin",
      "password": "OTIMAWEB_admin",
      "host": "198.46.91.127"
      // "debug": true
    });

    database.connect(async (err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        reject(err);
        return;
      }

      console.log('connected as id ' + database.threadId);

      database.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          resolve(null);

        } else {
          resolve(results);
        }
        // Close the database connection
        database.end();
      });
    });
  });
}
  
function retrieveData(sql) {
  return new Promise((resolve, reject) => {
  let success = false;

    database = mysql.createConnection({
      "database": "b9f34c5_OtimaWeb",
      "user": "b9f34c5_Admin",
      "password": "OTIMAWEB_admin",
      "host": "198.46.91.127",
      // "debug":true
    });
  
    database.connect(async function(err) {
      if(err){
        return data(err)
      }
      else{
        // Saving
        console.log('connected as id ' + database.threadId);

        database.query(sql, (err, results) => {
          if (err) {
            console.log(err)
            resolve(null);

          } else {
            if(results.length === 0){
              resolve(null);
            }else{
              resolve(results);
            }
          }
        });
      }
      database.end();
    }); 
  });
}

function setSession(userID){
  // update session value if valid, create new one if not
  return new Promise((resolve, reject) => {
  const token = randomstring.generate(40);

  values = [
    `${userID}`,
    `${token}`
    ];

  const update = `UPDATE Sessions SET Creation = CURRENT_TIMESTAMP WHERE user_id = ${userID}`;
  const add = 'INSERT INTO `Sessions`(`user_id`, `token`, `Creation`) VALUES (?,?,NOW())';

  database =  mysql.createConnection({
    "database": "b9f34c5_OtimaWeb",
    "user": "b9f34c5_Admin",
    "password": "OTIMAWEB_admin",
    "host": "198.46.91.127",
    // "debug":true
  });

  database.connect(async (err) => {
    if(err){
      console.error('error connecting: ' + err.stack);
      return;
    }
    
    else{
      console.log('Session Creation connection as id ' + database.threadId);

      database.query(update, (err, results) => {
        if (err) {
          console.error(err)
          database.end();
          resolve(null)

        } else {
          if(results.changedRows >=1){
            resolve({new:false, sessionID:null})
            database.end();
          }
          else{
            database.query(add, values, (err, results) => {
              if (err) {
                console.error(err)
                resolve(null)
      
              } else {
                if(results){
                  console.log('saving new data')
                  database.end();
                  resolve({new:true, sessionID:token})
                }
              }
            });
          }
        }
      });
    }
  }); 
});
}

function checkSession(userID){
  // check to see if session is Still Valid

  // if not, logout
}

module.exports = { saveData, retrieveData, setSession };