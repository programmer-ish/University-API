module.exports={
    GET_CLASSES:"select * from SemesterClass",
    POST_CLASSES:"INSERT INTO SemesterClass(title) VALUES($1)",
    GET_STUDENTS:"select * from Students",
    GET_STUDENT_BY_ID:"select * from Student where roll_no=",
    POST_STUDENTS:'INSERT INTO Student(name, admissionDate) VALUES($1, $2)'
}