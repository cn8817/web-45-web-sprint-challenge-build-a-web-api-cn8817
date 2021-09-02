// Write your "projects" router here!
const express = require('express')
const { validateProject, validateProjectById } = require('./projects-middleware')
const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectById, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({ 
        name: req.name, 
        description: req.description})
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProjectById, validateProject, (req, res, next) => {
    Project.update(req.params.id, { name: req.name, description: req.description})
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.delete('/:id', validateProjectById, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.status(200).json(req.project)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectById, async (req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

module.exports = router