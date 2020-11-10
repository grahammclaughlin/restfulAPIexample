const express = require('express')
const app = express()
let students = require('./students.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/students', (req, res) => {
    res.send(students)
})
app.get('/students/:studentId', (req, res) => {
    res.send(students.find((student)=>student.id == req.params.studentId))
})
app.get('/grades/:studentId', (req, res) => {
    let student = students.find((student)=>student.id == req.params.studentId)
    res.send(`${student.username}'s grades are:
    ${student.grades}`)
})

/*
Example JSON:
{"id":0,
"grades": [100,100,100]
*/
app.post('/grades', (req,res) =>  {
    let grades = req.body.grades;
    let id = req.body.id;
    let student = students.find((student)=>student.id == id)
    if(student && grades){
        index = students.findIndex((student)=>student.id == id)
        students[index].grades = students[index].grades.concat(grades)
        res.send(`${grades} added to ${student.username}'s grades`)
    }
    else{
        res.send("Error: Student doesn't exist or grades were not entered")
    }
})


/*
Example JSON:
{"username": "Graham",
"email": "test@gmail.com"}
*/
app.post('/register', (req,res) => {
    let username = req.body.username;
    let email = req.body.email;
    if(username && email){
        newID = students.length;
        newStudent = {
            username: username,
            email: email,
            id: newID,
            grades: []
        }
        students.push(newStudent)
        res.send(`Successfully added ${username} to the database
        email: ${email}
        Student ID: ${newID}`)
    }
    else{
        res.send("Error: no valid username or email")
    }
})

const port = 3000
app.listen(port, () =>  
    console.log(
        `Example app listening at http://localhost:${port}`
        )
    )
