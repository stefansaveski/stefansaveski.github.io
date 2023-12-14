const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

let previousIndex; // Variable to store the index value

app.post('/saveuser', (req, res) => {
    const userData = req.body;

    // Check if userData has the "index" property
    if (!userData.index) {
        return res.status(400).send('Missing "index" property in the request.');
    }

    previousIndex = userData.index; // Store the index for later use

    const filename = `${userData.index}.json`;

    // Save the JSON data to a file with the index as the filename
    fs.writeFileSync(filename, JSON.stringify(userData, null, 2));

    res.send(`Data saved to file: ${filename}`);
});

app.post('/savedata', (req, res) => {
    const jsonData = req.body;

    // Check if previousIndex is set
    if (!previousIndex) {
        return res.status(400).send('No previous index value available.');
    }

    const filename = `${previousIndex}Input.json`;

    // Save the JSON data to a file with the specified filename
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));

    res.send(`Data saved to file: ${filename}`);
});

// Serve client.html directly
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'client.html');
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
