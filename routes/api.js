const router = require('express').Router();
const fs = require("fs");

const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(dbJson);
});

//post request to add new note
router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    const newNotes = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }
    dbJson.push(newNotes);
    fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
    res.json(dbJson);
});