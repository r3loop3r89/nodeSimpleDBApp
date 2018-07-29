'use strict';
var mysql = require('mysql');

var connection = mysql.createPool(
    {
        connectionLimit:50,
        host:'localhost',
        user:'root',
        password:'',
        database:'sampledb'
    }
)


exports.signup = function(req, res){
    var person = req.body;

    connection.getConnection(
        function(error, tempConnection){
            if(!!error){
                //ERROR IN CONNECTION
                tempConnection.release();   //CLOSING CONNECTION AFTER FAILED QUERY
                console.log("Error : " + error);
                res.writeHead(204);
                res.write(error);
                res.end();
            }else{
                console.log("Connected to DB and will insert the new record now");
                tempConnection.query(
                    "INSERT INTO UserMaster (`Name`, `Surname`, `Mobile`, `RegisteredOn`) VALUES ('" + person.name + "', '" + person.surname + "', '" + person.mobile + "', CURRENT_TIMESTAMP)",
                    function(error, result){
                        if(!!error){
                            //ERROR IN EXECUTING QUERY
                            tempConnection.release();   //CLOSING CONNECTION AFTER FAILED QUERY
                            console.log("Error : " + error);
                            res.writeHead(204);
                            res.write(error);
                            res.end();
                        }else{
                            var mResult = "Number of records inserted: " + result.affectedRows;
                            console.log(mResult);
                            tempConnection.release();   //CLOSING CONNECTION AFTER SUCCESSFULL QUERY
                            res.writeHead(200);
                            res.write(mResult);
                            res.end();
                        }
                    }
                );
            }
        }
    );

}

exports.getAllUsers = function(req, res){
    connection.getConnection(
        function(error, tempConnection){
            if(!!error){
                //ERROR IN CONNECTION
                tempConnection.release();   //CLOSING CONNECTION AFTER FAILED QUERY
                console.log("Error : " + error);
                res.writeHead(204);
                res.write(error);
                res.end();
            }else{
                console.log("Connected to DB and will fetch the records now");
                tempConnection.query(
                    "SELECT * FROM UserMaster",
                    function(error, rows, fields){
                        if(!!error){
                            //ERROR IN EXECUTING QUERY
                            tempConnection.release();   //CLOSING CONNECTION AFTER FAILED QUERY
                            console.log("Error : " + error);
                            res.writeHead(204);
                            res.write(error);
                            res.end();
                        }else{
                            res.json(rows);
                        }
                    }
                )
            }
        }
    );
}