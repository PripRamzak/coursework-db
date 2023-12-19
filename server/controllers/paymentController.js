const { Card, Payment } = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/apiError')

class PaymentController {
    async create(req, res, next) {
        const { amount, code, type, cardId } = req.body

        if (!amount || !code) {
            return next(ApiError.badRequest('Incorrect code or amount'))
        }

        const date = new Date
        const card = await Card.findOne({ where: { id: cardId } })

        if (type === 'Оплата') {
            if (amount > card.balance) {
                return next(ApiError.badRequest('Not enough money'))
            }
            card.balance -= Number(amount).toFixed(2)
        }
        else {
            card.balance += Number(amount).toFixed(2)
        }

        card.balance = Number(card.balance).toFixed(2)

        await card.save()

        const payment = await Payment.create({amount, date, code, type, cardId})

        return res.json(payment)
    }

    async getAll(req, res) {
        const { paymentId, cardId } = req.query
        let payments;

        if (!paymentId && !cardId) {
            payments = await Payment.findAll()
        }
        else if (!paymentId) {
            payments = await Payment.findAll({ where: { cardId } })
        }
        else if (!cardId) {
            payments = await Payment.findAll({ where: { id: paymentId } })
        }
        else {
            payments = await Payment.findAll({ where: { id: paymentId, cardId } })
        }

        return res.json(payments)
    }

    async export(req, res) {
        await sequelize.query("COPY payments TO '/tmp/payments.csv' DELIMITER ',' CSV HEADER", {
            model: Payment,
            mapToModel: true
        })

        return res.json({message: 'Export successed'})
    }
}

module.exports = new PaymentController()