import React, { useState, useEffect } from 'react';
import Note from './Note.js';
import './App.less';
import PopUp from './PopUp.js';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {deleteNote, editNote, saveNote} from './actions.js';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';



function App(props) {
  const [add, setAdd] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(props.notes));
  }, [props.notes]);

  console.log("props", props);

  // const onClickAdd = (title, text) => {
  //   setAdd(false);
  // }

  const onDelete = (index) => {
    
    console.log("!!", index);
    return () => {
      setOpenModal(false);
      props.delete(index);
      
    } 
    
  }

  const handleOpenModal = (index) => () => {
    setOpenModal(true);
    setDeleteIndex(index);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  
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
      <div className="app-header">
        <EventNoteIcon className="header-logo"></EventNoteIcon>
        <h4 className="header-title">Notes Manager</h4>
      </div>
      
      <div className="add-note">
        <IconButton onClick={() => setAdd(!add)}>
          <AddCircleIcon  className="big-add"/>
          <div className="add-note-title">Add new note</div>
        </IconButton>
        {
          (add) ? 
          <div className="pop-up-parent"> 
            <div className="pop-up-back" onClick={clickOutside}></div>
            <PopUp type="add" onAdd={onAdd} onCancel={clickOutside}/>
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
                </div> : null
              }
                <Note  {...current}/>
                <div className="icons-container">
                    <Tooltip title="Edit" placement="bottom" arrow>
                      <IconButton    onClick={onEdit(index)}>
                        <EditIcon className="icon"/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="bottom"  arrow>
                      <IconButton onClick={handleOpenModal(index)}>
                        <DeleteIcon className="icon delete-icon"/>
                      </IconButton>
                    </Tooltip>

                    
                  </div>
                  
                </div> 
          );
        })
      }
      </div>
      <Dialog open={openModal} fullWidth maxWidth="sm" className="confirmation-modal">
        <DialogTitle>Deleting note</DialogTitle>
        <DialogContent>Are you sure you want to delete this note?</DialogContent>
        <DialogActions>
          <Tooltip title="Yes" placement="bottom"  arrow>
            <IconButton  onClick={onDelete(deleteIndex)} >
              <CheckCircleIcon style={{color: "#90ee90"}}/>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="No" placement="bottom"  arrow>
            <IconButton  onClick={handleCloseModal} >
              <CancelIcon style={{color: "#F46A4E"}}/>
            </IconButton>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
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
