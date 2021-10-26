const model = document.querySelector('#addNoteModal')
// open model add new note
const openAddModal = () => {
    const model        = document.querySelector('#addNoteModal')
    const closeSpan    = document.querySelector('#closeAdd')
    const cancleButton = document.querySelector('#cancelAddNoteBtn')

    clearAddModel()
    model.style.display = 'block'

    closeSpan.onclick = () =>{
        model.style.display = 'none'
    }
    cancleButton.onclick = () =>{
        model.style.display = 'none'
    }
}

// clear texts from field from inputs in add model 
const clearAddModel = () => {
    document.querySelector('#addTitle').value =""
    document.querySelector('#addContent').value =""
    document.querySelector('#addError').innerHTML =""
}

const saveNewNote = () => {
    const titleValue = document.querySelector('#addTitle').value
    const contentValue = document.querySelector('#addContent').value
    let note = {
        title : titleValue,
        content: contentValue 
    }
         
    addNote(note).then( response => { 
        let model = document.querySelector('#addNoteModal')
        model.style.display = 'none'     
        updateNotesTable(response['_id'])
    })
    .catch(error => {
        console.log(error)
        document.querySelector('#addError').innerHTML = error

    })

}

// to open edit model and load data to the inputs field using loadNoteData function
const openEditeModel = (noteId) => {
    const model        = document.querySelector('#editNoteModal')
    const closeSpan    = document.querySelector('#closeEdit')
    const cancleButton = document.querySelector('#cancelEditNoteBtn')

    clearAddModel()
    model.style.display = 'block'

    closeSpan.onclick = () =>{
        model.style.display = 'none'
    }
    cancleButton.onclick = () =>{
        model.style.display = 'none'
    }
    loadNoteData(noteId)
    
}

// load note data to the inputs field in the edit model
const loadNoteData = (noteId) => {
    // create attribute to be able to get the id to saveEditNote function 
    const model = document.querySelector('#editNoteModal')
    const modelAttribute = document.createAttribute('nodeid')
    modelAttribute.value = noteId
    model.setAttributeNode(modelAttribute)

    getNoteById(noteId).then(data => {
        document.querySelector('#editTitle').value = data["title"]
        document.querySelector('#editContent').value = data["content"]
    })
    .catch(error => {
        console.log(error)
    })
}


const saveEditNote = () => {
    const titleStr = document.querySelector('#editTitle').value
    const contentStr = document.querySelector('#editContent').value

    const model = document.querySelector('#editNoteModal')
    const noteId = model.getAttribute("nodeid")
    const noteData = {
        _id: noteId,
        title: titleStr,
        content: contentStr
    }
    updateNote(noteData).then(response => {
        let model = document.querySelector('#editNoteModal')
        model.style.display = 'none'
        updateNotesTable(noteId)
    })
    .catch(error => {
        document.querySelector('#editError').innerHTML = error
    })
}