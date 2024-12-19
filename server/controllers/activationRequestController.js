const sequelize = require('../db')
const { ActivationRequest } = require('../models/models')
const ApiError = require('../error/apiError')

class ActivationRequestController {
    async create(req, res, next) {
        const { last_name, first_name, middle_name, ident_number, birth, sex, accountId } = req.body
        if (!last_name || !first_name || !middle_name || !ident_number || !birth || !sex || !accountId) {
            return next(ApiError.badRequest('Заполните все поля'))
        }
        const activationRequest = await ActivationRequest.create({ last_name, first_name, middle_name, ident_number, birth, sex, accountId })
        return res.json(activationRequest)
    }

    async getAll(req, res) {
        const activationRequest = await ActivationRequest.findAll()
        return res.json(activationRequest)
    }

    async getOne(req, res) {
        const { accountId } = req.params
        const activationRequest = await ActivationRequest.findOne({ where: { accountId } })
        return res.json(activationRequest)
    }

    async changeStatus(req, res) {
        const { activationRequestId, newStatus } = req.body
        const activationRequest = await ActivationRequest.findOne({ where: { id: activationRequestId } })

        activationRequest.status = newStatus
        await activationRequest.save()

        return res.json(activationRequest)
    }

    async deleteOne(req, res) {
        const { id } = req.params

        const activationRequest = await ActivationRequest.findOne({ where: { id } })
        await activationRequest.destroy()

        return res.json({ message: 'Successfuly deleted' })
    }

    async export(req, res) {
        await sequelize.query("COPY persons TO '/tmp/persons.csv' DELIMITER ',' CSV HEADER", {
            model: Person,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new ActivationRequestController()