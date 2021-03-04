const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const uuid = require('uuid')
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get("/api/notes", (req, res) => {
  fs.readFile('./db/db.json', 'uft8')
  console.log('readfile called');
});


app.post("/api/notes", (req, res) => {
    const newNote = {
        id: uuid.v4(),
        reg.body
    }
    
    
    
    req.body
    savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'uft8'));
    newNote.id = savedNotes.length;
    savedNotes.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'))
    JSON.stringify(savedNotes)
    console.log('You have added a new note!!');
    res.json(newNote)
    
  });
  

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
