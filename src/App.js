import React, { useState } from 'react';
import Note from './Note.js';
import './App.less';
import PopUp from './PopUp.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const getLocalData = () => {
  let data = localStorage.getItem('notes');
  let isNull = data === null;
  let objData = [];
  if(isNull === false) {
    let localData = data;
    objData = JSON.parse(localData);
  }

  return objData;
}

function App() {
  let [notes, setNotes] = useState(getLocalData());
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
    let newNotes = [...notes,
      {
        title: title,
        date: dateNow(),
        text: text,
        check: false
      }
    ];

    setNotes( [...notes,
      {
        title: title,
        date: dateNow(),
        text: text,
        check: false
      }
    ]);

    setAdd(false);


   localStorage.setItem('notes', JSON.stringify(newNotes));


    

  
  }



  const onDelete = (index) => {
    return () => {
      let nootes = getLocalData();
      let newNotes = nootes.filter((current, i) => i !== index);
      setNotes(newNotes);  
      localStorage.setItem('notes', JSON.stringify(newNotes));  
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
      localStorage.setItem('notes', JSON.stringify(newArray));  
    }  
   
  }

  const clickOutside = () => {
    setAdd(false);
  }

  const onClickOutsideEdit = (current,index) => {
    return () => {
      let newValue = {
        ...current,
        check: false
      }
  
      let newArray = notes.map((value, position) =>{
        if(index === position) return newValue;
        else return value;
      });
  
      setNotes(newArray);
    }  
   
  }

console.log(notes);
 


  return (
    <div className="App">
      <div className="add-note">
        <AddCircleIcon onClick={() => setAdd(!add)} className="big-add"/>
        {
          (add) ? 
          <div className="pop-up-parent"> 
            <div className="pop-up-back" onClick={clickOutside}></div>
            <PopUp onSave={onClickAdd}  type="add"/>
          </div> : null
        }
        
        
      </div>
      <div className="notes">
      {
        notes.map((current, index)=> {
          return (
            <div className="one-note"> 
               {
                (current.check === true) ?  
                <div className="pop-up-parent">
                  <div className="pop-up-back" onClick={onClickOutsideEdit(current,index)}></div>
                  <PopUp {...current} onSave={onSave(current, index)} type="edit" close/>
                </div> : 
                null
              }
              <div>
                  <DeleteIcon className="icon" onClick={onDelete(index)}/>
                  <EditIcon className="icon" onClick={onEdit(index)}/>
                  <Note  {...current}/>
                </div>
              
             
              
            </div>
            
                 
          );
        })
      }
      </div>
    </div>
  );
}

export default App;
