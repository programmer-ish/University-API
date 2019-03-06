module.exports={
    GET_CLASSES:"select * from SemesterClass",
    POST_CLASSES:"INSERT INTO SemesterClass(title) VALUES($1)",
    GET_STUDENTS:"select * from Students"
}