const { Payment, UserPayment, FavouritePayment } = require('../models/models')
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
            payments = await Payment.findAll({ order: [['name']] })
        }
        else {
            payments = await Payment.findAll({ where: { paymentsGroupId }, order: [['name']] })
        }

        return res.json(payments)
    }

    async update(req, res, next) {
        const { id, name, paymentParameters } = req.body

        if (!name) {
            return next(ApiError.badRequest('Название платежа обязательно'))
        }
        else {
            paymentParameters.map(parameter => {
                if (!parameter) {
                    return next(ApiError.badRequest('Название парамтетра обязательно'))
                }
            })
        }

        const payment = await Payment.findOne({ where: { id } })
        const samePayment = await Payment.findOne({ where: { name, paymentsGroupId: payment.paymentsGroupId } })

        if (samePayment && samePayment.id !== id) {
            return next(ApiError.badRequest('Такой платеж уже существует'))
        }

        payment.name = name
        payment.parameters = paymentParameters
        await payment.save()

        return res.json(payment)
    }

    async deleteOne(req, res) {
        const { id } = req.params

        const userPayments = await UserPayment.findAll({ where: { paymentId: id } })
        if (userPayments)
            await Promise.all(userPayments.map(userPayment => userPayment.destroy()))

        const favouritePayments = await FavouritePayment.findAll({ where: { paymentId: id } })
        if (favouritePayments)
            await Promise.all(favouritePayments.map(favouritePayment => favouritePayment.destroy()))

        const payment = await Payment.findOne({ where: { id } })
        await payment.destroy();

        return res.json({ message: 'Successfuly deleted' })
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