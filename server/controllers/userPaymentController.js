const { Payment, Card, UserPayment } = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/apiError')
const { where } = require('sequelize')

class UserPaymentController {
    async create(req, res, next) {
        const { amount, type, data, cardId, paymentId } = req.body

        if (amount <= 0) {
            return next(ApiError.badRequest('Некорректная сумма'))
        }
        else if (!data) {
            return next(ApiError.badRequest('Введите данные для платежа'))
        }
        else {
            const payment = await Payment.findOne({ where: { id: paymentId } });
            payment.parameters.map((parameter, index) => {
                if (!data[index])
                    return next(ApiError.badRequest('Поле "' + parameter + '" не заполнено'))
            })
        }

        const userCard = await Card.findOne({ where: { id: cardId } })

        if (type === 'Зачисление') {
            userCard.balance += Number(amount)
        }
        else {
            if (Number(userCard.balance) < Number(amount))
                return next(ApiError.badRequest('Недостаточно средств'));
            userCard.balance -= Number(amount)
        }
        userCard.balance = userCard.balance.toFixed(2)
        await userCard.save()

        const date = new Date()

        const userPayment = await UserPayment.create({ amount, type, data, date, cardId, paymentId })

        return res.json(userPayment)
    }

    async createTransfer(req, res, next) {
        const { senderCardId, receiverCardNumber, amount } = req.body

        if (amount <= 0) {
            return next(ApiError.badRequest('Некорректная сумма'))
        }
        else if (!receiverCardNumber) {
            return next(ApiError.badRequest('Введите номер карты'))
        }
        else if (receiverCardNumber.length !== 16) {
            return next(ApiError.badRequest('Некорректный номер карты'))
        }

        const receiverCard = await Card.findOne({ where: { number: receiverCardNumber } })

        if (!receiverCard) {
            return next(ApiError.badRequest('Проверьте правильно ли Вы ввели номер карты'))
        }

        const senderCard = await Card.findOne({ where: { id: senderCardId } })
        if (Number(senderCard.balance) < Number(amount))
            return next(ApiError.badRequest('Недостаточно средств'));

        senderCard.balance -= Number(amount)
        senderCard.balance = senderCard.balance.toFixed(2)

        receiverCard.balance += Number(amount)
        receiverCard.balance = receiverCard.balance.toFixed(2)

        await senderCard.save();
        await receiverCard.save();

        const date = new Date()

        const senderPayment = await UserPayment.create({ amount, type: 'Оплата', data: [receiverCardNumber], date, cardId: senderCardId, paymentId: 1001 })
        await UserPayment.create({amount, type: 'Зачисление', data: [], date, cardId: receiverCard.id, paymentId: 1001})

        return res.json(senderPayment)
    }

    async get(req, res) {
        const { cardId } = req.query
        let userPayments;

        if (!cardId) {
            userPayments = await UserPayment.findAll()
        }
        else {
            userPayments = await UserPayment.findAll({ where: { cardId } })
        }

        return res.json(userPayments)
    }

    async getCardStatement(req, res) {
        const { cardId } = req.query

        if (!cardId)
            return

        const userPayments = await UserPayment.findAll({ include: Payment, where: { cardId }, order: [['date', 'desc']] })

        return res.json(userPayments)
    }

    async export(req, res) {
        await sequelize.query("COPY payments TO '/tmp/payments.csv' DELIMITER ',' CSV HEADER", {
            model: Payment,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new UserPaymentController()