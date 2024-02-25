import {fa, faker}  from '@faker-js/faker';
import mysql from 'mysql2';
import { Express } from 'express';
const db=mysql.createConnection({
  host :'localhost',
  user:'root',
  password:'hcvnit730',
  database:'join_us'
});

// var q='SELECT count(*) as total from users'
// db.query(q,function(error,results,field){
//     if(error) throw error;
//     console.log(results);
// });


// var person={email:faker.internet.email(),
//             created_at:faker.date.past()
//         };

// db.query('Insert into users set ?',person,function(err,results)
// {
//     if(err) throw err;
//     console.log(results);
// });


// console.log(faker.date.past());

var data=[];
for(var i=0;i<500;i++)
{
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}



var q='insert into users (email,created_at) values ?';

db.query(q,[data],function(err,results){
    console.log(err);
    console.log(results);

})


db.end();



// function generateAddress()
// {
//     console.log(faker.internet.email());
// }

// generateAddress();

