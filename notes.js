const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    //const duplicates = notes.filter((note) => note.title === title );
    const duplicate = notes.find((note) => note.title === title);

    if(!duplicate) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added successfully'));
    } else {
        console.log(chalk.red.inverse('Note title already present'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const finalNotes = notes.filter((note) => note.title !== title);
    if (notes.length === finalNotes.length) {
        console.log(chalk.red.inverse('Title not found, note not removed'));
    } else {
        saveNotes(finalNotes);
        console.log(chalk.green.inverse('Note removed successfully'));
    }
};

const listNotes = () => {
    console.log(chalk.blue.inverse('Your Notes'));
    const notes = loadNotes();
    notes.forEach(element => console.log(element.title));
};

const readNote = (title) => {
    const note = getNotes(title);
    if (!note) {
        console.log(chalk.red.inverse('Note not found'));
    } else {
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
}

const getNotes = (title) => {
    const notes = loadNotes();
    const found = notes.find((note) => note.title === title);
    return found;
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};