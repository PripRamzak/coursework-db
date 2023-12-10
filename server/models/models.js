const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const Account = sequelize.define('accounts',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.ENUM('Активирован', 'Не активирован'), defaultValue: 'Не активирован' },
        role: { type: DataTypes.ENUM('USER', 'WORKER', 'ADMIN'), defaultValue: 'USER' }
    },
    {
        freezeTableName: true
    })

const Person = sequelize.define('persons',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        last_name: { type: DataTypes.STRING, allowNull: false },
        first_name: { type: DataTypes.STRING, allowNull: false },
        middle_name: { type: DataTypes.STRING, allowNull: false },
        ident_number: { type: DataTypes.STRING, unique: true, allowNull: false },
        birth: { type: DataTypes.DATEONLY, allowNull: false },
        sex: { type: DataTypes.STRING, allowNull: false }
    },
    {
        freezeTableName: true
    })

const Card = sequelize.define('cards',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        number: { type: DataTypes.STRING(16), allowNull: false },
        expire_date: { type: DataTypes.DATEONLY, allowNull: false },
        cvv: { type: DataTypes.INTEGER, allowNull: false },
        balance: { type: DataTypes.FLOAT, defaultValue: 0.0 }
    },
    {
        freezeTableName: true
    })

const CardType = sequelize.define('card_types',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false }
    },
    {
        freezeTableName: true
    })

const CardRequest = sequelize.define('card_requests',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        status: { type: DataTypes.ENUM('Обрабатывается', 'Одобрено', 'Отказано'), defaultValue: 'Обрабатывается' }
    },
    {
        freezeTableName: true
    })

const Loan = sequelize.define('loans',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        expire_date: { type: DataTypes.DATEONLY, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        payment: {type: DataTypes.FLOAT, allowNull: false}
    },
    {
        freezeTableName: true
    })

const LoanType = sequelize.define('loan_types',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.FLOAT, allowNull: false },
        annual_interest_rate: { type: DataTypes.FLOAT, allowNull: false },
        description: { type: DataTypes.FLOAT, allowNull: false }
    },
    {
        freezeTableName: true
    })

const LoanRequest = sequelize.define('loan_requests',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        date: { type: DataTypes.DATEONLY, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        years: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.ENUM('Обрабатывается', 'Одобрено', 'Отказано'), defaultValue: 'Обрабатывается' }
    },
    {
        freezeTableName: true
    })

const Payment = sequelize.define('payments',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        receiver: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.ENUM('Зачисление', 'Оплата'), allowNull: false }
    },
    {
        freezeTableName: true
    })

Person.hasOne(Account)
Account.belongsTo(Person)

Person.hasMany(Card)
Card.belongsTo(Person)

Person.hasMany(CardRequest)
CardRequest.belongsTo(Person)

Person.hasOne(Loan)
Loan.belongsTo(Person)

Person.hasMany(LoanRequest)
LoanRequest.belongsTo(Person)

Person.hasMany(Payment)
Payment.belongsTo(Person)

CardType.hasMany(Card)
Card.belongsTo(CardType)

CardType.hasMany(CardRequest)
CardRequest.belongsTo(CardType)

LoanType.hasMany(Loan)
Loan.belongsTo(LoanType)

LoanType.hasMany(LoanRequest)
LoanRequest.belongsTo(LoanType)

module.exports = {
    Account,
    Person,
    Card,
    CardType,
    CardRequest,
    Loan,
    LoanType,
    LoanRequest,
    Payment
}