import Header from './Header';
import Notes from './Notes';
import Search from './Search';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Note from './Note';
import Error from './Error'
import UpdateNote from './UpdateNote';
const UserInterface = (props) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [empty, setEempty] = useState(false)
    useEffect(() => {
      // console.log("ueseeffect")
        axios("http://localhost:5858/notes/",{
          method: "Get",
        })
        .then(res =>{
          if(res.data.length === 0){
            setEempty(true)
            return
          }
          getAllNotes(res.data)
        })
        .catch(error => console.log(error))
    }, []);
    const reloadData = () => {
      axios("http://localhost:5858/notes/",{
          method: "Get",
        })
        .then(res =>{
          if(res.data.length === 0){
            setEempty(true)
            return
          }
          getAllNotes(res.data)
        })
        .catch(error => console.log(error))
    }
    const getAllNotes = (data) => {
      if(data.length === 0){
        setError(true)
        return
      }
      
      const notes = data.map((note) => {
          return <Note   key={note._id}
                          id={note._id}
                          title={note.title}
                          content={note.content}
                          createDate={note.createDate}
                          updateDate={note.updateDate}
                          reloadData={reloadData}
          />
        })
        setError(false)
        setData(notes)
    }
    return (
      <div className="">
        <Header />
        <Search getAllNotes={getAllNotes}/>
        {empty ? <Error error="No Notes, add notes please"/> : 
          error ? <Error error="No result for your search"/> : 
        (<Notes notes={data} />)
        
        }
        
      </div>
    );
};

export default UserInterface;