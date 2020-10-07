import React, { useState } from 'react';
import Note from './Note.js';
import './App.css';
import PopUp from './PopUp.js';



function App() {
  let [notes, setNotes] = useState([]);


  const dateNow = () => {
    let date = new Date().toUTCString().split("");
    date.splice(3,1);
    let newDate = date.join("").split(" ");
    newDate.splice(5,1);
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

  
 

  return (
    <div className="App">
      <div className="addNote">
        <PopUp onSave={onClickAdd} type="add"/>
        
      </div>
      
      {
        notes.map((current, index)=> {
          return (
            <div> 
               {
                (current.check === true) ?  <PopUp {...current} onSave={onSave(current, index)} type="edit" close/> : 
                <div>
                  <Note date={current.date} {...current}/>
                  <button onClick={onEdit(index)}>Edit</button>
                  <button onClick={onDelete(index)}>Delete</button>
                </div>
              }
              
             
              
            </div>
            
                 
          );
        })
      }
    </div>
  );
}

export default App;
