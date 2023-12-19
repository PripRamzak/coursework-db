const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')
const { Account } = require('../models/models')

const generateJwt = (id, email, role, status, personId) => {
    return jwt.sign({ id, email, role, status, personId }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AccountController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        const candidate = await Account.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const account = await Account.create({ email, role, password: hashPassword })
        const token = generateJwt(account.id, account.email, account.role, account.status)

        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const account = await Account.findOne({ where: { email } })
        if (!account) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        let comparePassword = bcrypt.compareSync(password, account.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        const token = generateJwt(account.id, account.email, account.role, account.status, account.personId)
        return res.json({ token })
    }

    async activation(req, res, next) {
        const { person_id, account_id } = req.body

        const account = await Account.findOne({ where: { id: account_id } })
        if (!account) {
            return next(ApiError.badRequest('Unauthorized'))
        }

        account.personId = person_id
        account.status = 'Активирован'
        await account.save()

        const token = generateJwt(account.id, account.email, account.role, account.status, account.personId)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.account.id, req.account.email, req.account.role)
        return res.json({ token })
    }

    async export(req, res) {
        await sequelize.query("COPY accounts TO '/tmp/accounts.csv' DELIMITER ',' CSV HEADER", {
            model: Account,
            mapToModel: true
        })

        return res.json({message: 'Export successed'})
    }
}

module.exports = new AccountController()