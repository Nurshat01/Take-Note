const express = require('express');
const path = require('path');

const api = require('./routes/index');

const STRINGS = {
    PUBLIC_FOLDER: 'public',
    NOTES_HTML_PATH: './public/assets/notes.html',
    INDEX_HTML_PATH: './public/assets/index.html',
    LOCALHOST_URL: 'http://localhost:',
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(STRINGS.PUBLIC_FOLDER));

app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, STRINGS.NOTES_HTML_PATH));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, STRINGS.INDEX_HTML_PATH));
});

app.listen(PORT, () => {
    console.log(`App listening at ${STRINGS.LOCALHOST_URL}${PORT}`);
});
