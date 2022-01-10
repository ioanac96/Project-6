import {ADD_NOTE, DELETE_NOTE, EDIT_NOTE, SAVE_NOTE} from './actions.js';

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

const initialState = {
    notes: getLocalData(),
    add: false
}

const handleNotes = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.note
                ]
            }
        
        case DELETE_NOTE:
            console.log("delete", action.index)
            let newArray = state.notes.filter((current, i) => i !== action.index);
            
            return {
                ...state,
                notes: newArray
            }

        case EDIT_NOTE:
            let editedNotes = state.notes.map((current, i) =>{
                if(i === action.index) return {
                    ...current,
                    check: !current.check
                };
                else return current;
            });
            return {
                ...state,
                notes: editedNotes
            }
        case SAVE_NOTE:
            let newNotes = state.notes.map((current, index) => {
                if(index === action.index) return action.note;
                else return current;
            });
            return {
                ...state,
                notes: newNotes
            }
        default: 
            return state;
    }
}

export default handleNotes;