export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const SAVE_NOTE = 'SAVE_NOTE';

export function addNote(title, date, text, check) {
    return {
        type: ADD_NOTE,
        note : {
            title: title,
            date: date,
            text: text,
            check: check
        }
    }
}

export function deleteNote(index) {
    return {
        type: DELETE_NOTE,
        index
    }
}

export function editNote(index) {
    return {
        type: EDIT_NOTE,
        index
    }
}

export function saveNote(index,title, date, text, check) {
    return {
        type: SAVE_NOTE,
        note : {
            title: title,
            date: date,
            text: text,
            check: check
        },
        index
    }
}
