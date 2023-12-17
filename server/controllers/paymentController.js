const { Card, Payment } = require('../models/models')
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
            card.balance -= amount
        }
        else {
            card.balance += amount
        }

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
}

module.exports = new PaymentController()