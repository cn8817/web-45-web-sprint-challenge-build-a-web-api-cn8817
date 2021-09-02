// Write your "actions" router here!
const express = require('express')
const { validateProjectById } = require('../projects/projects-middleware')
const { validateActionId, validateAction } = require('./actions-middlware')

const Action = require('./actions-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

module.exports = router