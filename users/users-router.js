const express = require('express');
const db = require('../data/dbConfig')

const router = express.Router();

router.get('/', (req, res) => {
    db('users')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    db('users').where('id', req.params.id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', (req, res) => {
    const newUser = req.body
    db('users').insert(newUser, 'id')
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
    db('users').where('id', req.params.id).del()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;