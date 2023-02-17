var readlineSync = require('readline-sync');
const fs = require('fs');
var students = [{Id: 1,Name: 'Bui Van Tan Tai',Age: 21},
                {Id: 2,Name: 'Bui Van Tan Khoa',Age: 20},
                {Id: 3,Name: 'Bui Van Tan Tan',Age: 19},
                {Id: 4,Name: 'Bui Van Tan Lan',Age: 22},];

var list = ['Show all student', 'Create student and return menu', 'Delete student', 'Edit student', 'Find Student by name', 'Sort student by name ascending', 'Sort student by age ascending'];
//var index = readlineSync.keyInSelect(list,'What your chose?');

var showAllStudent = () =>{
    for (const key in students) {
        if (Object.hasOwnProperty.call(students, key)) {
            const element = students[key];
            console.log(element);
        }
    }
}

var addStudent = (student)=> {
    students.push(student);
    showAllStudent();
}

var delStudent = (id) => {
    for (const key in students) {
        if (Object.hasOwnProperty.call(students, key)) {
            if(students[key].Age === id)
            {
                delete students[key];
                return;
            }
        }
    }
}


var editStudent = (student) =>{ 
    for (const key in students) {
        if (Object.hasOwnProperty.call(students, key)) {
            if(students[key].Id === student.Id)
            {
                students[key].Name=student.Name;
                students[key].Age=student.Age;
                return;
            }
        }
    }
}

const student1 = {Id: 4,Name: 'Bui',Age: 22};
editStudent(student1);
showAllStudent();
