import React, {useState} from 'react';
import './PopUp.less';     
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


function PopUp(props) {
    let [title, setTitle] = useState(props.title || '');
    let [text, setText] = useState(props.text || '');

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

    return (
        <div className="pop-up">
            <input id="title" type="text" onChange={onChangeTitle()} value={title} placeholder="Title"/>
            <textarea id="content" type="text" onChange={onChangeText()} value={text} placeholder="Text" />
            <div className="icons-parent">
            <div className="icons-div" >{(props.type==="add")? <button  onClick={() => props.onSave(title, text)} className="add-button">Add</button> : <SaveIcon className="edit-icon" onClick={() => props.onSave(title, text)} />}</div>
            {
                (props.close === true) ? <div onClick={() => props.onSave(props.title, props.text)} ><CancelIcon className="edit-icon" /></div> : null
            }
            </div>
        </div>
       
    )
}

export default PopUp;
