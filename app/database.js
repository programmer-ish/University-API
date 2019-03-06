const {Client}=require('pg');

module.exports = () =>{
//DB connection
const client =new Client("postgres://ehhcmqsb:xcBCgsMlrcyqlUsU0mPL6aljm3B2UBxV@isilo.db.elephantsql.com:5432/ehhcmqsb");

client.connect()
.then(() => console.log("Connected to db successfully"))
.catch(e => console.log(e))

//Student table
let query='CREATE TABLE IF NOT EXISTS Student('+
    'roll_no SERIAL PRIMARY KEY not null UNIQUE,'+
    'name VARCHAR(128) not null,'+ 
    'admissionDate TIMESTAMP not null,'+
    'active Boolean DEFAULT TRUE);';

 client.query(query)
 .then(() =>console.log("Student table created"))
 .catch(e =>console.error(e.stack))

 //SemesterClass table
 query='CREATE TABLE IF NOT EXISTS SemesterClass('+
    'id SERIAL PRIMARY KEY not null UNIQUE,'+
    'title VARCHAR(128) not null);';

 client.query(query)
 .then(() =>console.log("SemesterClass table created"))
 .catch(e =>console.error(e.stack))

 //Professor table
 query='CREATE TABLE IF NOT EXISTS Professor('+
 'university_staff_no SERIAL PRIMARY KEY not null UNIQUE,'+
 'name VARCHAR(128) not null,'+ 
 'designation VARCHAR(128) not null);';

client.query(query)
.then(() =>console.log("Professor table created"))
.catch(e =>console.error(e.stack))

 //Class-Student table
 query='CREATE TABLE IF NOT EXISTS ClassStudent('+
 'classId integer REFERENCES SemesterClass(id),'+
 'studentId integer REFERENCES Student(roll_no));';

client.query(query)
.then(() =>console.log("ClassStudent table created"))
.catch(e =>console.error(e.stack))

 //Class-Professor table
 query='CREATE TABLE IF NOT EXISTS ClassProfessor('+
 'classId integer REFERENCES SemesterClass(id),'+
 'professorId integer REFERENCES Professor(university_staff_no));';

client.query(query)
.then(() =>console.log("ClassProfessor table created"))
.catch(e =>console.error(e.stack))
}