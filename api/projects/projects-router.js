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
    Project.insert({ name: req.name, description: req.description})
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

module.exports = router