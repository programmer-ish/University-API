module.exports={
    GET_CLASSES:"select * from SemesterClass",
    POST_CLASS:"INSERT INTO SemesterClass(title) VALUES($1)",
    GET_STUDENTS:"select * from Student",
    GET_STUDENT_BY_ID:"select * from Student where roll_no=",
    GET_CLASSES_OF_STUDENT:"select * from ClassStudent inner join SemesterClass on ClassStudent.classId=SemesterClass.id where ClassStudent.studentId=",
    POST_STUDENT:"INSERT INTO Student(name, admissionDate) VALUES($1, $2)",
    PATCH_STUDENT:"UPDATE Student SET name=$1 WHERE roll_no=$2",
    DELETE_STUDENT:"UPDATE Student SET active=FALSE WHERE roll_no=",
    POST_STUDENTS_TO_CLASS:"INSERT INTO ClassStudent(classId,studentId) VALUES",
    GET_PROFESSORS:"select * from Professor",
    POST_PROFESSOR:"INSERT INTO Professor(name,designation) VALUES($1,$2)",
    POST_PROFESSOR_TO_CLASS:"INSERT INTO ClassProfessor(classId,professorId) VALUES($1,$2)"
}