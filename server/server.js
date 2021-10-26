const express = require('express');
const cors    = require('cors');
const bodyParser = require('body-parser');

const app = express();

const Database = require('./Database')
const db = new Database()

// cors: cross origin resource sharing
// to do API request from outside the server 
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// create POST API to be able to create a new note
app.post('/notes', (req, res) => {

    const body = req.body
    // console.log("BODY: ", body)

    db.addNote(body).then((data) =>{
        res.send(data) 
    })
    .catch(error =>{
        res.status(500).send(error)
    })

})
// create GET API to be able to get data
// app.get('/notes', (req, res) => {
//     db.getNotes()
//     .then(data =>{
//         res.send(data)
//     })
//     .catch(error => {
//         res.status(500).send(error)
//     })
// })

// create GET API to be able to get data from specific ID
app.get('/notes/:id', (req, res) => {
    const { id } = req.params
    db.getNoteById(id)
    .then(data => {
        if(!data){
            res.status(404).send("Note ID doesn't exist " + id)
        }else{
            res.send(data)
        }
        
    })
    .catch(error => {
        res.status(500).send(error)
    })
})
// get all notes have the same title
app.get('/notes', (req, res) => {
    const { title } = req.query
    // console.log(req)
    if(title){
        db.getNotesByTitle(title)
        .then(data => {
            if(!data){
                res.status(404).send("Note ID doesn't exist " + id)
            }else{
                res.send(data)
            }
            
        })
        .catch(error => {
            res.status(500).send(error)
        })
    }else{
        db.getNotes()
        .then(data => {
            if(!data){
                res.status(404).send("Note ID doesn't exist " + id)
            }else{
                res.send(data)
            }   
        })
        .catch(error => {
            res.status(500).send(error)
        })

    }
    
})

app.put('/notes', (req, res) => {
    const body = req.body
    // console.log(body)
    db.updateNote(body)
    .then(data => {
        if(!data){
            res.status(404).send("Note Id Doesn't exist " + id)
        }else{
            res.send(data)
        }
    })
    .catch(error => {
        res.status(500).send
    })
})

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params
    db.deleteNote(id)
    .then(data => {
        if(!data){
            res.status(404).send("Note ID doesn't exist " + id)
        }else{
            res.send(data)
        }
        
    })
    .catch(error => {
        res.status(500).send(error)
    })
})
const port = 3000
app.listen(port, () =>{
    console.log(`server has started on ${port}...`)
    db.connect()
})