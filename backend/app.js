const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//? make enviroment variables accessible
require('dotenv').config()
//* establish db connection
require('./database')
//? routes
const productRoute = require('./routes/product.route')
const categoryRoute = require('./routes/category.route')
const brandRoute = require('./routes/brand.route')

// body parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())

// allowing CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    )
    next()
})

app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/brand', brandRoute)

app.listen(4000, () => console.log('EAS up on 4000..'))