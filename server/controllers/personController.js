const { Person } = require('../models/models')
const ApiError = require('../error/apiError')

class PersonController {
    async create(req, res, next) {
        const { last_name, first_name, middle_name, ident_number, birth, sex } = req.body
        if (!last_name || !first_name || !middle_name || !ident_number || !birth || !sex) {
            return next(ApiError.badRequest('Incorrect personal data'))
        }
        const person = await Person.create({ last_name, first_name, middle_name, ident_number, birth, sex })
        return res.json(person)
    }

    async getAll(req, res) {
        const persons = await Person.findAll()
        return res.json(persons)
    }

    async getOne(req, res) {
        const { id } = req.params
        const person = Person.findOne({ where: { id } })
        return res.json(person)
    }
}

module.exports = new PersonController()