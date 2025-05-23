const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const genres = [
    {id: 1, name: 'Fantasy'},
    {id: 2, name: 'Action'},
    {id: 3, name: 'Thriller'}
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);

});

app.delete('/api/genres/:id', (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.status(204).send();
});

function findGenre(id) {
    return genres.find(g => g.id === parseInt(id));
}

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });
    return schema.validate(genre);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
