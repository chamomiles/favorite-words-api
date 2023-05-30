const express = require('express')
const app = express()
PORT = 1000

let favoriteWords = [
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


app.get('/api/words', (req, res) => {
    res.json(favoriteWords)
})

function generateId() {
    const maxId = favoriteWords.length > 0
        ? favoriteWords.reduce((max, word) => max.id > word.id ? max.id : word.id)
        : 0

    return maxId + 1
}

app.get('/api/words/:word', (req, res) => {
    const word = req.params.word
    const wordObj = favoriteWords.find(favoriteWord => favoriteWord.word.toLowerCase() === word)
    res.json(wordObj)
})

app.post('/api/words', (req, res) => {
    const body = req.body

    const word = body.word
    const definition = body.definition

    if (favoriteWords.includes(word)) {
        return res.status(400).end()
    } else {
        favoriteWords.push({
            id: generateId(),
            word: word,
            definition: definition
        })

        res.status(204).end()
    }
})

app.put('/api/words/:word', (req, res) => {
    const oldWord = req.params.word
    const oldWordObj = favoriteWords.find(favoriteWordObj => favoriteWordObj.word.toLowerCase() === oldWord)

    if (!oldWordObj) {
        return res.status(400).json({
            error: 'word to be changed does not exist in collection'
        })
    }

    const {id} = oldWordObj

    const body = req.body
    const newWord = body.word
    const newDefinition = body.definition

    if (!newWord) {
        return res.status(400).json({
            error: 'no new word provided'
        })
    }

    if (!newDefinition) {
        return res.status(400).json({
            error: 'no new definition provided'
        })
    }

    if (oldWord === newWord) {
        return res.status(400).json({
            error: 'cannot change word to itself'
        })
    }

    const index = favoriteWords.indexOf(oldWordObj)
    favoriteWords[index] = {
        id: id,
        word: newWord,
        definition: newDefinition
    }

    console.log(favoriteWords)

    res.status(204).end()
})

app.delete('/api/words/:word', (req, res) => {
    const word = req.params.word

    const wordObj = favoriteWords.find(favoriteWord => favoriteWord.word.toLowerCase() === word)

    if (!wordObj) {
        return res.status(400).json({
            error: 'word to be deleted does not exist in collection'
        })
    }

    favoriteWords = favoriteWords.filter(favoriteWordObj => favoriteWordObj !== wordObj)

    res.status(204).end()
})  