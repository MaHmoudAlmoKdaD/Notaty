
const updateNotesTable = (noteId, searchInput) => {
    const table = document.querySelector('#notes-table')
    let rowCount = table.rows.length
    // when the loop will be -1 it will stop
    while(--rowCount){
        table.deleteRow(rowCount)
    }
    getNotes(searchInput).then(data => {
        data.forEach(note => {
            let row = table.insertRow(1)
            let idAttribute = document.createAttribute("id")
            idAttribute.value = note["_id"]
            row.setAttributeNode(idAttribute)
            let cell1 = row.insertCell(0)
            let cell2 = row.insertCell(1)
            let cell3 = row.insertCell(2)
            let cell4 = row.insertCell(3)
            cell1.innerHTML = note['title']
            cell2.innerHTML = note['content']
            cell3.innerHTML = note['updateDate']
            cell4.innerHTML =   `<a href="#" onclick="openEditeModel('${note['_id']}')" ><img src="./images/edit.png" style="width: 22px"/></a>
                                <a onclick="confirmDeleteNote('${note['_id']}')" href="#" ><img src="./images/delete.png" style="width: 22px"/></a>`
        });
    }).then(() => {
        if(noteId){
            
            let row = document.getElementById(noteId)
            row.setAttribute("style", "animation: new-row 5s;")
        }
        
    })
}

const searchNotes = () => {
    const searchInput = document.querySelector('#searchInput').value
    updateNotesTable(undefined, searchInput)
}

const confirmDeleteNote = (noteId) => {
    const action = confirm("are you sure you want to delete this note?")
    if(action){
        deleteNote(noteId).then(() => {
            updateNotesTable()
        })
    }
}

