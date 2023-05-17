const {Client} = require('pg');

const client = new Client({
    host : 'localhost',
    port : 3000,
    user :'postgres',
    password : '0234',
    database : 'myData'
})

 client.connect((err)=>{
    if(err){
        console.log("faild to connect database");
    }
    else{
        console.log("database connected successfully");
    }
});

client.query('SELECT * FROM student',(err,res)=>{
    if(!err){
        console.log(res.rows)
    }
    client.end;
});

