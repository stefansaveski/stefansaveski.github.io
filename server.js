const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save', (req, res) => {
    const jsonData = req.body;

    // Save the JSON data to a file
    fs.writeFileSync('savedData.json', JSON.stringify(jsonData, null, 2));

    res.send('Data saved on the server.');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
