import { useRef, useState, useEffect} from "react";
import axios from "axios";
import AddNote from './AddNote'
const Search = (props) => {
    const inputValue = useRef('')
    const [title, setTitle ] = useState('')
    const [showAddModelState, setshowAddModelState] = useState(false)
    useEffect(() => {
        axios(`http://localhost:5858/notes/?title=${title}`,{
          method: "Get",
        })
        .then(res =>{
            props.getAllNotes(res.data)
            
        })
        .catch(error => console.log(error))
    }, [title]);
   
    const handleSearch = () => {
        setTitle(inputValue.current.value)
    }
    const handleReloadAllNotes = () => {
        setTitle('')
        inputValue.current.value = ''
    }
    const showAddModel = () => {
        setshowAddModelState(true)
    }
    return (
        <>{showAddModelState ? <AddNote getAllNotes={props.getAllNotes} /> : null}
        <div className="nav">{console.log(props)}
            <button className="action-button" onClick={showAddModel}>Add</button>
            <input 
                ref={inputValue}
                className="search-input" 
                type="text" 
                placeholder="Search for note by title..."
            />  
            <button 
                className="action-button"
            > 
                Search
            </button>
            <button 
                className="action-button"
                onClick={handleReloadAllNotes} 
            > 
                Reload All Notes
            </button>       
        </div>
        </>
    );
};

export default Search;