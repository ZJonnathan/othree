const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', function() {
    console.log('Connected to Database')
})

const CustomerSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    dateOfBirth: Number,
    email: String,
    phoneNumber: Number,
})

const Customer = mongoose.model('Customer', CustomerSchema, 'customers')

app.use(express.json())

app.get('/api/customers', async (req, res) => {
    const query = Customer.find()
    query instanceof mongoose.Query
    const docs = await query
    res.send(docs)
})

app.post('/api/customers', (req, res) => {
    const customer = new Customer({
        "name": req.body.name,
        "lastName": req.body.lastName,
        "dateOfBirth": req.body.dateOfBirth,
        "email": req.body.email,
        "phoneNumber": req.body.phoneNumber,
    })
    
    customer.save((err, customer) => {
        if(err) res.status(400).send(result.error.message)
    })
    res.send(customer)
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))

module.exports = app