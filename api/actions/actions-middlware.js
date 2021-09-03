// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: 'action not found'
            })
        } else{
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}

function validateAction(req, res, next) {
    const { description, notes, project_id } = req.body
    if(!description || !notes ||  !project_id  ) {
        res.status(400).json({
            message: 'missing description or notes'
        })
    } else{
        req.description = description
        req.notes = notes
        req.project_id = project_id
        next()
    }
}

module.exports = { validateActionId, validateAction }