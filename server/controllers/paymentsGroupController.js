const { PaymentsGroup, Payment, UserPayment, FavouritePayment } = require('../models/models')
const sequelize = require('../db')
const ApiError = require('../error/apiError')

class PaymentsGroupController {
    constructor() {
        this.deleteOne = this.deleteOne.bind(this)
        this.deletePaymentsGroup = this.deletePaymentsGroup.bind(this)
    }

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
            paymentsGroups = await PaymentsGroup.findAll({ order: [['name']] })
        }
        else {
            paymentsGroups = await PaymentsGroup.findAll({ where: { parentId: parentId != 0 ? parentId : null }, order: [['name']] })
        }

        return res.json(paymentsGroups)
    }

    async update(req, res, next) {
        const { id, name } = req.body

        if (!name) {
            return next(ApiError.badRequest('Название обязательно'))
        }

        const samePaymentsGroup = await PaymentsGroup.findOne({ where: { name } })

        if (samePaymentsGroup && samePaymentsGroup.id !== id) {
            return next(ApiError.badRequest('Такая группа платажей уже существует'))
        }

        const paymentGroup = await PaymentsGroup.findOne({ where: { id } })
        paymentGroup.name = name
        await paymentGroup.save()

        return res.json(paymentGroup)
    }

    async deletePaymentsGroup(id) {
        const childPaymentsGroups = await PaymentsGroup.findAll({ where: { parentId: id } })
        if (childPaymentsGroups)
            await Promise.all(childPaymentsGroups.map(paymentsGroup => this.deletePaymentsGroup(paymentsGroup.id)))

        const payments = await Payment.findAll({ where: { paymentsGroupId: id } })
        if (payments)
            await Promise.all(payments.map(async payment => {
                const userPayments = await UserPayment.findAll({ where: { paymentId: payment.id } })
                if (userPayments)
                    await Promise.all(userPayments.map(userPayment => userPayment.destroy()))

                const favouritePayments = await FavouritePayment.findAll({where: {paymentId: payment.id}})
                if (favouritePayments)
                    await Promise.all(favouritePayments.map(favouritePayment => favouritePayment.destroy()))

                await payment.destroy()
            }))

        const paymentGroup = await PaymentsGroup.findOne({ where: { id } })
        await paymentGroup.destroy()
    }

    async deleteOne(req, res) {
        const { id } = req.params

        await this.deletePaymentsGroup(id)

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

module.exports = new PaymentsGroupController()