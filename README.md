# University-API
## A simple student/teacher platform which supports operations for managing the university database.
The product exposes REST APIs to magage database information of Students, Semester Classes and Professors. 
#### Example
Suppose the user wants to view all the students in the database, they will call the following on Postman :

    GET http://ec2-13-232-79-74.ap-south-1.compute.amazonaws.com:4000/students

This query can be run locally as well after cloning the project and pasting the following URL on Postman :

    GET http://localhost:4000/students


## Project setup and execution

### Technology stack 
  - **Backend Server** : Node.js + Express + Node-postgres
  - **Database** : Elephantsql (PostgresSQL as a service)
  - **Hosting** : AWS

### Project Structure
```
├── University-API/
│   ├── app/
│   │    ├──constants/
│   │    ├──controllers/
│   │    ├──database.js               
│   ├── index.js
│   ├── README.md

```

#### How to run the project ?
1. Prerequisites - Install node ( > 8.X ) and npm
2. Git clone the repositroy
3. Run ```npm install ``` to install the required dependencies
4. Run ```node index.js ```
5. Open postman paste the following url http://localhost:4000/students
6. Select the action GET and click send

### Database Tables
  1. **Student**
  2. **SemesterClass**
  3. **Professor** 
  4. **ClassStudent**: For mapping SemesterClass id to student roll_no 
  5. **ClassProfessor**: For mapping SemesterClass id to professor university_staff_no
  