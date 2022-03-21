const express = require('express')
const app = express()
const Datastore = require('nedb')
app.listen(3000, () => console.log('Listening on port 3000'))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

const database = new Datastore('database.db')
database.loadDatabase()

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if(err) {
      return false
    } else {
      response.json(data)
    }
  })
})

app.post('/api', (request, response) => {
  database.insert(request.body)
  response.json({
    status: 'Success',
    first_name: request.body.firstName,
    last_name: request.body.lastName,
    email_address: request.body.email,
    date: request.body.date,
    timestamp: Date.now()
  })
})

