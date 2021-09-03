// Write your "actions" router here!
const express = require('express')
const { validateProjectById } = require('../projects/projects-middleware')
const { validateActionId, validateAction } = require('./actions-middlware')

const Action = require('./actions-model')
const actionsRouter = express.Router()

actionsRouter.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

actionsRouter.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

actionsRouter.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

actionsRouter.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(() => {
            return Action.get(req.params.id)
        })
        .then(actions => {
            res.status(201).json(actions)
        })
        .catch(next)
})

actionsRouter.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.status(200).json(action)
    } catch(err) {
        next(err)
    }
})

module.exports = actionsRouter