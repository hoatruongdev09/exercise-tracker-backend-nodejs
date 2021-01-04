const router = require('express').Router()
const { json } = require('body-parser')
let Exercise = require('../models/exercise.model')

router.get('/', (req, res) => {
    Exercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.post('/', (req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = req.body.duration
    const date = Date.parse(req.body.date)

    const exercise = new Exercise({
        username: username,
        description: description,
        duration: duration,
        date: date
    })
    exercise.save()
        .then(() => res.json('exercise added'))
        .catch(err => json.status(400).json(`Error: ${err}`))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Exercise.findById(id)
        .then(doc => res.json(doc))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Exercise.findByIdAndDelete(id)
        .then(() => { res.json(`exercise deleted`) })
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.post('/update/:id', (req, res) => {
    const id = req.params.id
    const username = req.body.username
    const description = req.body.description
    const duration = req.body.duration
    const date = Date.parse(req.body.date)

    Exercise.findById(id)
        .then(doc => {
            doc.username = username
            doc.description = description
            doc.duration = duration
            doc.date = date

            doc.save().then(() => res.json(`Exercise updated`)).catch(err => res.status(400).json(`Error: ${er}`))
        }).catch(err => res.status(400).json(`Error: ${err}`))
})


module.exports = router