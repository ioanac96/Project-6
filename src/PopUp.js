import React, {useState} from 'react';
import './PopUp.less';     
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {addNote, saveNote} from './actions.js';
import {connect} from 'react-redux';
import { Tooltip } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';


function PopUp(props) {
    let [title, setTitle] = useState(props.title || '');
    let [text, setText] = useState(props.text || '');

    console.log("pop-up", props);
    const dateNow = () => {
        let date = new Date().toUTCString().split("");
        date.splice(3,1);
        let newDate = date.join("").split(" ");
        newDate.splice(4,2);
        let lastDate = newDate.join(" ");
        return lastDate;
    }

    const onChangeTitle = () => {
        return (event) => {
          setTitle(event.target.value);
        }
      }

    const onChangeText = () => {
        return (event) => {
            setText(event.target.value);
        }
    }

    const onClickAdd = (title, text) => {
        props.add(title, dateNow(), text, false);
        props.onAdd()(false);
      }

    
    const onSave = (title, text) => {
        props.save(props.index, title, dateNow(), text, false); 
    }

    return (
        <div className="pop-up">
            <input id="title" type="text" onChange={onChangeTitle()} value={title} placeholder="Title"/>
            <textarea id="content" type="text" onChange={onChangeText()} value={text} placeholder="Text" />
            <div className="icons-parent">
            <div className="icons-div" >{(props.type==="add")? 
                <div>
                    <Tooltip title="Add" placement="bottom"  arrow onClick={props.onCancel}>
                        <AddCircle className="edit-icon" onClick={() => {onClickAdd(title, text)}}/>
                    </Tooltip> 
                    <Tooltip title="Cancel" placement="bottom"  arrow onClick={props.onCancel}>
                        <CancelIcon className="cancel-icon"/>
                    </Tooltip> 
                </div>
                 : 
                <Tooltip title="Save" placement="bottom"  arrow>
                    <SaveIcon className="edit-icon" onClick={() => {onSave(title, text)}} />
                </Tooltip>
                }</div>
            {
                (props.close === true) ? <div onClick={()=>{onSave(props.title, props.text)}} >
                    <Tooltip title="Cancel" placement="bottom"  arrow>
                        <CancelIcon className="cancel-icon"/>
                    </Tooltip>    
                 </div> : null
            }
            </div>
        </div>
       
    )
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        add: (title, date, text, check) => dispatch(addNote(title, date, text, check)),
        save: (index, title, date, text, check) => dispatch(saveNote(index, title, date, text, check))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUp);
