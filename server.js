
const express = require('express');
const api = require('./routes/api');
const html = require('./routes/html');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware for express
app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.use(express.static("public"));

app.use(api);
app.use(html);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});