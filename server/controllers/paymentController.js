const { Payment } = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/apiError')

class PaymentController {
    async create(req, res, next) {
        const { name, paymentsGroupId, paymentParameters } = req.body

        if (!name) {
            return next(ApiError.badRequest('Название платежа обязательно'))
        }
        else if (!paymentsGroupId) {
            return next(ApiError.badRequest('Выберите группу, к которой принадлежит платеж'))
        }
        else if (!paymentParameters) {
            return next(ApiError.badRequest('Добавьте хотя бы 1 параметр платежа'))
        }
        else {
            paymentParameters.map(parameter => {
                if (!parameter) {
                    return next(ApiError.badRequest('Название парамтетра обязательно'))
                }
            })
        }

        const payment = await Payment.findOne({ where: { name, paymentsGroupId } })

        if (payment) {
            return next(ApiError.badRequest('Такой платеж уже существует'))
        }

        const newPayment = await Payment.create({ name, paymentsGroupId, parameters: paymentParameters })

        return res.json(newPayment)
    }

    async getAll(req, res) {
        const { paymentsGroupId } = req.query
        let payments;

        if (!paymentsGroupId) {
            payments = await Payment.findAll()
        }
        else {
            payments = await Payment.findAll({ where: { paymentsGroupId } })
        }

        return res.json(payments)
    }

    async export(req, res) {
        await sequelize.query("COPY payments TO '/tmp/payments.csv' DELIMITER ',' CSV HEADER", {
            model: Payment,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new PaymentController()