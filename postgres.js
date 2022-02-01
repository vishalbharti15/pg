const { Client } = require('pg');
const express = require('express')
var bodyparser = require('body-parser')
var port = process.env.PORT || 5000
var app = express()
app.use(bodyparser.urlencoded({
    extended : true
}))
//creating template

app.set('view engine','ejs')

const client = new Client({
    user: 'ysazlmrasrcffz',
    host: 'ec2-54-157-160-218.compute-1.amazonaws.com',
    database: 'd6n9grr07e30mb',
    port: 5432,
    password: '3b6ff2b4441df48d7f7879a14e9ca3417fdfaa571fbc3ad3b34e0a6fcb57f4be',
    ssl:{
        rejectUnauthorized : false
    }
    
});

client.connect();

app.get("/create" , function(req,res){
    const query = "CREATE TABLE users (email varchar, firstName varchar, lastName varchar, age int)"

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Table is Successfully Created');
        client.end();
    });
    res.send("Table is Successfully Created")
})
//create table

app.get("/insert",function(req,res){
    const queryI = "INSERT INTO users (email, firstName, lastName, age)VALUES ('vbhaarti@gmail.com', 'Vishal', 'Bharti', 23)"

    client.query(queryI, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data Inserted Successfully');
        
    });
    res.send("Record Inserted Successfully")
})

app.get("/select" , function(req,res){
    var selectQuery = "select * from users"

    client.query(selectQuery, function(err, result){
        if(err)
        {
            console.log("Err in select query")
            return
        }
        if( result.rowCount > 0 )
        {
            //console.log("Result : ", result.rows)
            for( var tempRow of result.rows )
            {
                console.log(tempRow)
                console.log("*****************")
            }
        }
        else{
            console.log("No information is retrieved")
        }
    })
   // res.render('read',{title : 'list', userData : res})

    res.send("Records selected")
})

app.get("/update" , function(req,res){
    const queryU =" UPDATE users SET age = 22 WHERE email = 'vbhaarti@gmail.com'"


client.query(queryU, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data Updated Successfully');
    
    });
    res.send("Record Updated Successfully")
})
app.get("/delete" , function(req,res){
    const queryD = "DELETE FROM users WHERE email = 'vbhaarti@gmail.com'"

    client.query(queryD, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data Deleted Successfully');
        
    });
    res.send("Record Deleted Successfully")
})
app.listen(port,function(err,result){
    console.log("Server started");
})