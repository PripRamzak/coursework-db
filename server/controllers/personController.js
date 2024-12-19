const sequelize = require('../db')
const { Person } = require('../models/models')
const ApiError = require('../error/apiError')

class PersonController {
    async create(req, res, next) {
        const { request } = req.body

        const person = await Person.create({
            last_name: request.last_name, first_name: request.first_name, middle_name: request.middle_name,
            ident_number: request.ident_number, birth: request.birth, sex: request.sex
        })

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

    async export(req, res) {
        await sequelize.query("COPY persons TO '/tmp/persons.csv' DELIMITER ',' CSV HEADER", {
            model: Person,
            mapToModel: true
        })

        return res.json({ message: 'Export successed' })
    }
}

module.exports = new PersonController()