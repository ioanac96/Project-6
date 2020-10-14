import React, { useState, useEffect } from 'react';
import Note from './Note.js';
import './App.less';
import PopUp from './PopUp.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {addNote, deleteNote, editNote, saveNote} from './actions.js';
import {connect} from 'react-redux';

function App(props) {
  let [add, setAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(props.notes));
  }, [props.notes]);

  console.log("props", props);

  const dateNow = () => {
    let date = new Date().toUTCString().split("");
    date.splice(3,1);
    let newDate = date.join("").split(" ");
    newDate.splice(4,2);
    let lastDate = newDate.join(" ");
    return lastDate;
  }

  const onClickAdd = (title, text) => {
    props.add(title, dateNow(), text, false);
    setAdd(false);
  }

  const onDelete = (index) => {
    return () => {
      props.delete(index);
    } 
  }

  const onEdit = (index) => {
    return () => {
      props.edit(index);
    } 
    
  }

  const onSave = (current, index) => {
    return (title, text) => {
      props.save(index, title, dateNow(), text, false); 
    }   
  }

  const clickOutside = () => {
    setAdd(false);
  }

  const onClickOutsideEdit = (current,index) => {
    return () => {
      props.save(index, current.title, current.date, current.text, false);
    }   
  }

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
        props.notes.map((current, index)=> {
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

function mapStateToProps(state) {
    console.log("aici-redux",state);
    return {
      notes:  state.notes
    }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (title, date, text, check) =>  dispatch(addNote(title,date, text, check)),
    delete: (index) => dispatch(deleteNote(index)),
    edit: (index) => dispatch(editNote(index)),
    save: (index, title, date, text, check) => dispatch(saveNote(index, title, date, text, check))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
