const readlineSync = require('readline-sync');
const fs = require('fs');

let indexSex = ['male', 'female'];
const showMenu = () => {
  console.log('     Student Managerment ');
  console.log('===============================');
  console.log(' 1.Show all student');
  console.log(' 2.Create student and return Menu');
  console.log(' 3.Delete student');
  console.log(' 4.Edit student');
  console.log(' 5.Find student by name');
  console.log(' 6.Find top student in school ');
  console.log(' 7.Find student in black list ');
  console.log(' 8.Sort student by name ascending ');
  console.log(' 9.Sort student by score ascending ');
  console.log(' 10.Sort student by age ascending ');
  console.log(' 11.Delete many student ');
  console.log(' 12.Exit');
};
showMenu();

let chose = readlineSync.question('Your chose ?');
let studenStr = '';
try {
  const dataStr = fs.readFileSync('./students.txt', 'utf8');
  var studentJSON = JSON.parse(dataStr);
} catch (err) {
  console.error(err);
}

const saveFile = () => {
  studenStr = JSON.stringify(studentJSON);
  fs.writeFileSync('./students.txt', studenStr, 'utf8');
};

const createStudent = () => {
  let id = readlineSync.question('id?');
  let name = readlineSync.question('name?');
  let age = readlineSync.question('age?');
  let sex = readlineSync.keyInSelect(indexSex, 'sex? [0: male, 1: female]');
  let score_in = readlineSync.question('Diem dau vao?');
  let score_tb = readlineSync.question('Diem tb?');
  studentJSON.push({
    id: id,
    name: name,
    age: age,
    sex: indexSex[sex],
    score_in: score_in,
    score_tb: score_tb,
  });
  saveFile();
};
const deleteStudent = () => {
  const id = readlineSync.question('What id?');
  const filterWithoutId = studentJSON.filter((i) => i.id != id);
  studentJSON = filterWithoutId;
  saveFile();
};
const editStudent = () => {
  const idEdit = readlineSync.question('What id do you want edit?');
  let indexId = studentJSON.findIndex((i) => i.id === idEdit);
  if (indexId >= 0) {
    const nameEdit = readlineSync.question('name?');
    const ageEdit = readlineSync.question('age? ');
    let sexEdit = readlineSync.keyInSelect(
      indexSex,
      'sex? [0: male, 1: female]',
    );
    const score_inEdit = readlineSync.question('Diem dau vao?');
    const score_tbEdit = readlineSync.question('Diem trung binh?');
    const newStudent = {
      name: nameEdit,
      age: ageEdit,
      sex: indexSex[sexEdit],
      score_in: score_inEdit,
      score_tb: score_tbEdit,
    };

    studentJSON.splice(indexId, 1, newStudent);
    saveFile();
  } else {
    console.log('Không tìm thấy id');
  }
};
const findStudentByName = () => {
    const nameFind = readlineSync.question('What name do you want find?');
    const findStudent = studentJSON.filter((student)=>(student.name === nameFind));
    if(findStudent.every(a => a <=1) === true)
    {
        console.log('Không tim thấy tên học sinh');
    }
    else{
        console.log(findStudent);
    }
};
const findTopStudent = () => {
    let max = 0;
    for (const student of studentJSON) {
        if(student.score_in >= max )
        max = student.score_in;
    }
    const findTopStudent = studentJSON.filter((student)=>(student.score_in === max));
    console.log(findTopStudent);
};
const findBotStudent = () => {
    const findBotStudent = studentJSON.filter((student)=>(student.score_tb < 4 ));
    if(findBotStudent.every(a => a <=1) === true)
    {
        console.log("Không có học sinh nào có điểm trung bình dưới 4");
    }
    else
    {
        console.log(findBotStudent);
    }
}
const sortStudentByNameASC = () => {
    const sortStudentByNameASC = studentJSON.sort((a,b) => (a.name.localeCompare(b.name)));
    console.log(sortStudentByNameASC);
};
const sortStudentByScoretbASC = () => {
    const sortStudentByScoretbASC = studentJSON.sort((a,b) => (a.score_tb - b.score_tb));
    console.log(sortStudentByScoretbASC);
};
const sortStudentByAgeASC = () => {
    const sortStudentByAgeASC = studentJSON.sort((a,b) => (a.age - b.age));
    console.log(sortStudentByAgeASC);
};
const deleteStudentMany = () => {
    let idList = [];
    const numerId = readlineSync.question('Bao nhieu id muon xoa?');
    for (let i = 0; i< numerId ; i++)
    {
        idList[i] = readlineSync.question('Id thu ', i+1,' ?');
    }
    for (let j = 0; j< numerId ; j++)
    {
        const filterWithoutId = studentJSON.filter((i) => i.id != idList[j]);
        studentJSON = filterWithoutId;
        saveFile();
    }
};

while (true) {
  switch (parseInt(chose)) {
    case 0:
      showMenu();
      chose = readlineSync.question('Your chose ?');
      break;
    case 1:
      console.log(studentJSON);
      chose = 0;
      break;
    case 2:
      createStudent();
      chose = 0;
      break;
    case 3:
      deleteStudent();
      chose = 0;
      break;
    case 4:
      editStudent();
      chose = 0;
      break;
    case 5:
      findStudentByName();
      chose = 0;
      break;
    case 6:
        findTopStudent();
      chose = 0;
      break;
    case 7:
        findBotStudent();
      chose = 0;
      break;
    case 8:
        sortStudentByNameASC();
      chose = 0;
      break;
    case 9:
        sortStudentByScoretbASC();
      chose = 0;
      break;
    case 10:
        sortStudentByAgeASC();
      chose = 0;
      break;
    case 11:
        deleteStudentMany();
      chose = 0;
      break;
    case 12:
      process.exit();

    default:
      break;
  }
}
