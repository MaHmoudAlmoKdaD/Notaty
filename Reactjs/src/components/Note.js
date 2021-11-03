import axios from 'axios'
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import UpdateNote from './UpdateNote';
const Note = (props) => {
    const [showUpdateModel, setShowUpdateModel] = useState(false)
    useEffect(() => {
        
        // console.log("useeffect note")
    },[showUpdateModel])
    const deleteNote = (id = props.id) => {
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to delete this?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                axios.delete(`http://localhost:5858/notes/${id}`)
                .then(res => {
                    // console.log(res)
                    props.reloadData()
                })        
                .catch(error => {
                    console.log(error)
                })
              }
            },
            {
              label: 'No',
              onClick: () => console.log("cancel")
            }
          ]
        })
    };
    const updateNote = () => {
        setShowUpdateModel(true)
    }
    return (
        <>{showUpdateModel ? <UpdateNote note={props} /> : null}
            <div className="show-note">
                <p>{props.title}</p>
                <p>{props.content}</p>
                <p>{props.updateDate}</p>
                <p>
                    <a href="#" onClick={()=>updateNote()}>
                        <img className="images" src="/images/edit.png"/>
                    </a>
                    <a href="#" onClick={()=>deleteNote(props.id)}>
                        <img className="images" src="/images/delete.png"/>
                    </a>
                </p>
                {/* <p>{props.id}</p> */}
            </div>
            
        </>
        

    );
};

export default Note;