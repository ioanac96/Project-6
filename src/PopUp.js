import React, {useState} from 'react';


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
        <div>
            <label for="title">Title</label>
            <input id="title" type="text" onChange={onChangeTitle()} value={title}/>
            <label for="content">Text</label>
            <textarea id="content" type="text" onChange={onChangeText()} value={text} />
            <button onClick={() => props.onSave(title, text)}>{(props.type==="add")? <div>Add</div> : <div>Save</div>}</button>
            {
                (props.close === true) ? <button onClick={() => props.onSave(props.title, props.text)} >Cancel</button> : null
            }
        </div>
       
    )
}

export default PopUp;
