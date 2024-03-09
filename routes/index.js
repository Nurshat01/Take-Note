const router = require('express').Router();
const uniqid = require('uniqid');
const { readFromFile, readAndAppend, readAndDelete } = require('../hepler/Utils.js');

const ERROR_INTERNAL_SERVER = 'Internal Server Error';
const ERROR_TITLE_TEXT_REQUIRED = 'Title and text are required';
const ERROR_ID_REQUIRED = 'ID parameter is required';
const NOTE_ADDED_SUCCESSFULLY = 'Note added successfully';
const NOTE_DELETED_SUCCESSFULLY = 'Note deleted successfully';
const DB_JSON_PATH = './db/db.json';
const GET_NOTE = '/notes';
const POST_NOTE = '/notes'; // Fixed variable name
const DELETE_NOTE_BY_ID = '/notes/:id';

router.get(GET_NOTE, (req, res) => {
    readFromFile(DB_JSON_PATH)
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: ERROR_INTERNAL_SERVER });
        });
});

router.post(POST_NOTE, (req, res) => { // Fixed route variable name
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).json({ error: ERROR_TITLE_TEXT_REQUIRED });
    }

    const newNote = {
        title,
        text,
        id: uniqid(),
    };

    readAndAppend(newNote, DB_JSON_PATH)
        .then(() => res.json(NOTE_ADDED_SUCCESSFULLY))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: ERROR_INTERNAL_SERVER });
        });
});

router.delete(DELETE_NOTE_BY_ID, (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: ERROR_ID_REQUIRED });
    }

    readAndDelete(id, DB_JSON_PATH)
        .then(() => res.json(NOTE_DELETED_SUCCESSFULLY))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: ERROR_INTERNAL_SERVER });
        });
});

module.exports = router;
