const students = [
    { id: "T3HXX5", firstName: "Minh", lastName: "Nguyen Nhat" },
    { id: "T3HXX1", firstName: "NgAN", lastName: "Duong Thuy" },
    { id: "T3HXX2", firstName: "Ha", lastName: "Do Thi Thu" },
  ];
  
  //B27
  
  const formatName = (student) => {
    student.firstName =
      student.firstName[0].toUpperCase() +
      student.firstName.slice(1).toLowerCase();
    student.lastName =
      student.lastName[0].toUpperCase() + student.lastName.slice(1).toLowerCase();
      for(let i = 0;i<student.lastName.length;i++)
        {
            if(student.lastName[i-1]===" ")
            {
                student.lastName = student.lastName.slice(0,i) + student.lastName.charAt(i).toUpperCase() + student.lastName.slice(i+1);
            }
        }
    return student;
  };

const studentMap = students.map(formatName) // Mảng đã chuẩn hóa tên
console.log(1,studentMap);
const result = studentMap.filter((student) =>( (student.firstName.includes("A") || student.firstName.includes("a"))) && student.firstName.length >= 3) // mảng có kí tự là A
console.log(2,result);

//B28
const uniqueStudents = students.filter(student => student.lastName.includes("Do"));
console.log(3,uniqueStudents);
 

//sort: sap xep
const arrSort = [7, 0, 1, 8, 5, 9, 20, 10];
const newSort= arrSort.sort((a, b) => b - a); //a - b : tăng dần, b - a: giảm dần
console.log(newSort);


const nameSort = ['Đức', 'Anh', 'Tùng', 'Hoa'];
const newSortName = nameSort.sort((a, b) => a.localeCompare(b));
console.log(newSortName);

//B29
const studentNameSort = studentMap.sort((a, b) => a.firstName.localeCompare(b.firstName));
console.log(studentNameSort);


//reduce: 

const listAnimals = [
    {name: 'Dog', age: 2, weight: 0.5},
    {name: 'Cat', age: 5, weight: 3},
    {name: 'Pig', age: 10, weight: 20},
    {name: 'Elephant', age: 1, weight: 500},
    {name: 'Chicken', age: 7, weight: 2},
  ];

const sum= listAnimals.reduce((a, b)=>{
    return a + b.weight;
}, 0);
console.log(sum);