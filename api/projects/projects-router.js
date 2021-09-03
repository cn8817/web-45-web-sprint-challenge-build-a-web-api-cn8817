// Write your "projects" router here!
const express = require('express')
const { validateProject, validateProjectById } = require('./projects-middleware')
const Project = require('./projects-model')

const projectsRouter = express.Router()

projectsRouter.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

projectsRouter.get('/:id', validateProjectById, (req, res) => {
    res.status(200).json(req.project)
})

projectsRouter.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

projectsRouter.put('/:id', validateProject, validateProjectById, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

projectsRouter.delete('/:id', validateProjectById, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.status(200).json(project)
    } catch(err) {
        next(err)
    }
})

projectsRouter.get('/:id/actions', validateProjectById, async (req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

module.exports = projectsRouter