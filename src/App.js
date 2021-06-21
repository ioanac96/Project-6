import React, { useState, useEffect } from 'react';
import Note from './Note.js';
import './App.less';
import PopUp from './PopUp.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {deleteNote, editNote, saveNote} from './actions.js';
import {connect} from 'react-redux';

function App(props) {
  let [add, setAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(props.notes));
  }, [props.notes]);

  console.log("props", props);

  // const onClickAdd = (title, text) => {
  //   setAdd(false);
  // }

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


  const clickOutside = () => {
    setAdd(false);
  }

  const onClickOutsideEdit = (current,index) => {
    return () => {
      props.save(index, current.title, current.date, current.text, false);
    }   
  }

  const onAdd = () => {
    return (value) => {
      setAdd(value);   
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
            <PopUp type="add" onAdd={onAdd}/>
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
                  <PopUp {...current}  index={index} type="edit" close/>
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
    delete: (index) => dispatch(deleteNote(index)),
    edit: (index) => dispatch(editNote(index)),
    save: (index, title, date, text, check) => dispatch(saveNote(index, title, date, text, check))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
