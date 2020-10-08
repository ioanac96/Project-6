import React, {useState} from 'react';
import './PopUp.less';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
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
            <input id="title" type="text" onChange={onChangeTitle()} value={title} palceholder="text"/>
            <textarea id="content" type="text" onChange={onChangeText()} value={text} placeholder="text" />
            <div onClick={() => props.onSave(title, text)}>{(props.type==="add")? <AddCircleIcon  className="add-icon" /> : <SaveAltIcon className="edit-icon"  />}</div>
            {
                (props.close === true) ? <div onClick={() => props.onSave(props.title, props.text)} ><CancelIcon className="edit-icon" /></div> : null
            }
        </div>
       
    )
}

export default PopUp;
