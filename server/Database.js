const mongoose = require('mongoose');
const Note = require('./schemas/note')

class Database {
    constructor() {
        // this.Url = "mongodb://localhost:27017/notaty"
        this.Url = "mongodb+srv://admin:<passoword>@cluster0.ygj7v.mongodb.net/<DatabaseName>?retryWrites=true&w=majority"
    }

    connect() {
        mongoose.connect(this.Url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("The database conncted successfully")
        })
        .catch((error) => {
            console.log("Error in connecting to the database" + error)
        })
    }
    addNote(note) {
        return new Promise((resolve, reject) =>{
            note['createDate'] = new Date;
            note['updateDate'] = new Date;

            let newNote = new Note(note);
            newNote.save().then(doc => {
                // console.log("Saved successfully", doc);
                resolve(doc)
            })
            .catch(error => {
                // console.log("Problem in saving to database", error)
                reject(error)
            })
        })
    }

    getNotes() {
        return new Promise((resolve, reject) => {
            Note.find({})
            .then( data =>{
                resolve(data)
            })
            .catch( error =>{
                reject(error)
            })
        })
    }
    getNoteById(id) {
        return new Promise( (resolve, reject) => {
            Note.findById(id)
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
    getNotesByTitle(noteTitle) {
        return new Promise( (resolve, reject) => {
            // create regulat expression to ignore if this title is upper or lower case
            const query = { title: { $regex: new RegExp(noteTitle, "i") } }
            Note.find(query)
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
    updateNote(note) {
        return new Promise((resolve, reject) => {
            note["updateDate"] = new Date
            Note.findByIdAndUpdate(note["_id"], note)
            .then(data => {
             
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
    deleteNote(id) {
        return new Promise((resolve, reject) => {
            Note.findByIdAndDelete(id)
            .then(data =>{
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = Database