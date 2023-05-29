const express = require('express')
const app = express()
PORT = 1000

words = [
    {
        id: 1,
        word: 'Cinnamon',
        definition: 'An aromatic spice made from the peeled, dried, and rolled bark of a Southeast Asian tree.'
    },
    {
        id: 2,
        word: 'Sapphire',
        definition: 'A transparent precious stone, typically blue, that is a variety of corundum (aluminum oxide).'
    },
    {
        id: 3,
        word: 'Vespertine',
        definition: 'Relating to, occurring, or active in the evening.'
    }
]

app.use(express.json())

app.listen(PORT)
console.log(`Server is running on port ${PORT}`)

app.get('/', (req, res) => {
    res.send(`
    <h1 style="font-family: Arial">My favorite words!</h1>
    <p style="font-family: Arial">This server is for API use only. Please use the '<b>/api/words</b>' route.</p>
    `)
})