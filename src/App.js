import React, { useState } from 'react';
import Note from './Note.js';
import './App.less';
import PopUp from './PopUp.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';



function App() {
  let [notes, setNotes] = useState([]);
  let [add, setAdd] = useState(false);


  const dateNow = () => {
    let date = new Date().toUTCString().split("");
    date.splice(3,1);
    let newDate = date.join("").split(" ");
    newDate.splice(4,2);
    let lastDate = newDate.join(" ");
    return lastDate;
  }

  const onClickAdd = (title, text) => {
    setNotes( [...notes,
      {
        title: title,
        date: dateNow(),
        text: text,
        check: false
      }
    ]);

    setAdd(false);
  
  }



  const onDelete = (index) => {
    return () => {
      let newNotes = notes.filter((current, i) => i !== index);
      setNotes(newNotes);    
    }
    
  }

  const onEdit = (index) => {
    return () => {
      let newArray = notes.map((current, i) => {
        if(index === i) return {
          ...current,
          check: !current.check
        }
        else return current;
      });
      setNotes(newArray);
    } 
    
  }

  const onSave = (current, index) => {
    return (title, text) => {
      let newValue = {
        ...current,
        title: title,
        text: text,
        check: false
      }
  
      let newArray = notes.map((value, position) =>{
        if(index === position) return newValue;
        else return value;
      });
  
      setNotes(newArray);
    }  
   
  }



  
 console.log(add);

  return (
    <div className="App">
      <div className="addNote">
        <AddCircleIcon onClick={() => setAdd(!add)} className="big-add"/>
        {
          (add) ? <div className="pop-up-parent"><PopUp onSave={onClickAdd}  type="add"/></div> : null
        }
        
        
      </div>
      <div className="notes">
      {
        notes.map((current, index)=> {
          return (
            <div className="one-note"> 
               {
                (current.check === true) ?  <PopUp {...current} onSave={onSave(current, index)} type="edit" close/> : 
                <div>
                  <DeleteIcon className="icon" onClick={onDelete(index)}/>
                  <EditIcon className="icon" onClick={onEdit(index)}/>
                  <Note date={current.date} {...current}/>
                </div>
              }
              
             
              
            </div>
            
                 
          );
        })
      }
      </div>
    </div>
  );
}

export default App;
