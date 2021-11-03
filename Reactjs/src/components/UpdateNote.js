import axios from 'axios';
import React, { useRef } from 'react';

const UpdateNote = (props) => {
  const id = useRef('')
  const titleData = useRef('')
  const contentData = useRef('')
  const hideModel = () => {
      id.current.style.display = 'none'
  }
  const saveUpate = () => {
    console.log(props)
    const note = {
      _id: props.note.id,
      title: titleData.current.value,
      content: contentData.current.value
    }
    axios.put("http://localhost:5858/notes", note)
    .then(res =>{
      console.log("res", res)
      hideModel()
      props.note.reloadData()
    })
    .catch(error => console.log("error", error))
    
  }
  const handleOnChangeTextarea = () => {
    document.getElementById("editContent").removeAttribute('readonly')
  }
  const handleOnChangeTextInput = () => {
    document.getElementById("editTitle").removeAttribute('readonly')
  }
  return (
    
  <div ref={id} id="editNoteModal" className="modal">   
    <div className="modal-content">
      <div className="modal-header">
        <span id="closeEdit" className="close" onClick={hideModel}>&times;</span>
        <h2>Edit Note</h2>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="left">
            <p>Title</p>
          </div>
          <div className="right">
            <input ref={titleData} id="editTitle" type="text" className="modal-input"
            defaultValue={props.note.title}
            onChange={handleOnChangeTextInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="left">
            <p>Content</p>
          </div>
          <div className="right">
            <textarea ref={contentData} id="editContent" defaultValue={props.note.content} 
            onChange={handleOnChangeTextarea}>

            </textarea>
          </div>
        </div>
        <p id="editError" className="error"></p>
      </div>
      <div className="modal-footer">
        <button onClick={saveUpate} id="saveEditNoteBtn" type="button" className="action-button" >
          Save
        </button>
        <button onClick={hideModel} id="cancelEditNoteBtn" type="button" className="action-button">
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
};

export default UpdateNote;