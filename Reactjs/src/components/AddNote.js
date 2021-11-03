import React, { useRef } from 'react';
import axios from 'axios'

const Add = (props) => {
    const id = useRef('')
    const titleData = useRef('')
    const contentData = useRef('')

    const hideModel = () => {
      id.current.style.display = 'none'
      
    }

    const saveNote = () => {
      // console.log()
      const note = {
        title: titleData.current.value,
        content: contentData.current.value
      }
      axios.post("http://localhost:5858/notes", note)
      .then(res =>{
        console.log("res", res)
        hideModel()
        reloadData()
      })
      .catch(error => console.log("error", error))
      
    }
    const reloadData = () => {
      axios("http://localhost:5858/notes/",{
          method: "Get",
        })
        .then(res =>{
          
          props.getAllNotes(res.data)
        })
        .catch(error => console.log(error))
    }
    return (
       
        <div ref={id} id="addNoteModal" className="modal">
         
          <div className="modal-content">
            <div className="modal-header">
              <span id="closeAdd" className="close" onClick={hideModel}>&times;</span>
              <h2>New Note</h2>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="left">
                  <p>Title</p>
                </div>
                <div className="right">
                  <input ref={titleData} id="addTitle" type="text" className="modal-input" />
                </div>
              </div>
              <div className="row">
                <div className="left">
                  <p>Content</p>
                </div>
                <div className="right">
                  <textarea ref={contentData} id="addContent"></textarea>
                </div>
              </div>
              <p id="addError" className="error"></p>
            </div>
            <div className="modal-footer">
              <button
                id="saveAddNoteBtn"
                onClick={saveNote}
                type="button"
                className="action-button">Save
              </button>
              <button id="cancelAddNoteBtn" type="button" className="action-button" onClick={hideModel}>
                Cancel
              </button>
            </div>
          </div>
        </div>            
    );
};

export default Add;