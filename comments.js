// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Load comments
let comments = [];
fs.readFile('comments.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        comments = JSON.parse(data);
    }
});

// Create route to get comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// Create route to post comments
app.post('/comments', (req, res) => {
    // Add comment to array
    comments.push(req.body);
    // Save comments to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Comment saved');
        }
    });
    res.send(comments);
});

// Create route to delete comments
app.delete('/comments/:id', (req, res) => {
    // Remove comment from array
    comments.splice(req.params.id, 1);
    // Save comments to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Comment deleted');
        }
    });
    res.send(comments);
});

// Create route to update comments
app.put('/comments/:id', (req, res) => {
    // Update comment in array
    comments[req.params.id].comment = req.body.comment;
    // Save comments to file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Comment updated');
        }
    });
    res.send(comments);
});

// Listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));