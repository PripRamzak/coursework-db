// Импорт  express
require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware') 
const path = require('path')

const PORT = process.env.PORT || 8080

// Создание объекта, с которого начинается запуск прилолжения
const app = express()
// Для отправки запросов с браузера
app.use(cors())
// Для работы с json
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
// Для работы с файлами
app.use(fileupload({}))
// Для работы с маршрутами
app.use('/api', router)
// Последний middleware
app.use(errorHandler)

const start = async () =>
{
    try
    {
        // Подключение к БД
        await sequelize.authenticate()
        // Сверяем БД со схемой данных
        await sequelize.sync()
        // Указываем порт который должен прослушивать наш сервер и передача колбэка при удачном запуске сервера
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
        
    }
    catch(e)
    {
        console.log(e)
    }
}

start()