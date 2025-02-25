const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let comments = []; // This will act as our in-memory database

// Create a route for POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = comments.length + 1;
    comments.push(comment);
    res.status(201).send(comment);
});

// Create a route for GET /comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send({ message: 'Comment not found' });
    }
});

// Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id == req.params.id);
    if (comment) {
        Object.assign(comment, req.body);
        res.send(comment);
    } else {
        res.status(404).send({ message: 'Comment not found' });
    }
});

// Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(c => c.id == req.params.id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: 'Comment not found' });
    }
});

// Create a route for GET /comments/:id/children
app.get('/comments/:id/children', (req, res) => {
    const children = comments.filter(c => c.parentId == req.params.id);
    res.send(children);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

