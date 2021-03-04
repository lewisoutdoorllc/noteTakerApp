const express = require("express");
const PORT = process.env.PORT || 3002;
const app = express();
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.send(fs.readFileSync("./db/db.json", "utf8"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuid();
  saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  saveNotes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(saveNotes)
  );
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  newNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(saveNotes.filter((data) => data.id !== id))
  );
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
