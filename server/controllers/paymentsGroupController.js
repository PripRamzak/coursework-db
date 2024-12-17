const { PaymentsGroup } = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/apiError')

class PaymentsGroupController {
    async create(req, res, next) {
        const { name, parentId } = req.body

        if (!name) {
            return next(ApiError.badRequest('Название обязательно'))
        }

        const paymentsGroup = await PaymentsGroup.findOne({ where: { name } })

        if (paymentsGroup) {
            return next(ApiError.badRequest('Такая группа платажей уже существует'))
        }

        const newPaymentGroup = await PaymentsGroup.create({ name, parentId })

        return res.json(newPaymentGroup)
    }

    async getAll(req, res) {
        const { parentId } = req.query
        let paymentsGroups;

        if (!parentId) {
            paymentsGroups = await PaymentsGroup.findAll()
        }
        else {
            paymentsGroups = await PaymentsGroup.findAll({ where: { parentId: parentId != 0 ? parentId : null } })
        }

        return res.json(paymentsGroups)
    }

    async export(req, res) {
        await sequelize.query("COPY payments TO '/tmp/payments.csv' DELIMITER ',' CSV HEADER", {
            model: Payment,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new PaymentsGroupController()