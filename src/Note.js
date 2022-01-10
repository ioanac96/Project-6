import React from 'react';
import './Note.less';

function Note(props) {
    let {title, text, date} = props;
    return (
        <div className="note">
            <div className="title">{title}</div>
            <div className="date">{date}</div>
            <div className="text">{text.split('\n').map((p) => (<p className="listItem">{p}</p>))}</div>
        </div>
    )
};

export default Note;
