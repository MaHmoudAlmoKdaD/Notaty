const Notes = (props) => {
    return (
        <div  className="container-show-notes">
            <div style={{backgroundColor: "white"}} className="show-note font-wight">
                <p>Title</p>
                <p>Content</p>
                <p>Last Update</p>
                <p></p>
                
            </div>
        {props.notes}
        </div>
    );
};

export default Notes;