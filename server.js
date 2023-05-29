const express = require('express')
const app = express()
PORT = 1000

app.use(express.json())

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)

app.get('/', (req, res) => {
    res.send(`
    <h1 style="font-family: Arial">My favorite words!</h1>
    <p style="font-family: Arial">This server is for API use only. Please use the '<b>/api/words</b>' route.</p>
    `)
})