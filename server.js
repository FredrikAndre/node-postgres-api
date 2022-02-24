const express = require('express')
const studentRoutes = require('./src/student/routes')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hi, this is a node.js postgreSQL learning project.')
})

app.use('/api/v1/students', studentRoutes)

app.listen(port, () => console.log(`App listening to port ${port}`))
