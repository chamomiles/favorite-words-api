const express = require('express')
const router = express.Router()

const Word = require('../models/Word')

// @desc    Show all words
// @route   GET /words
router.get('/', (req, res) => {
    
})

// @desc    Show specific word
// @route   GET /words/:word
router.get('/:word', (req, res) => {
    const word = req.params.word
    const wordObj = favoriteWords.find(favoriteWord => favoriteWord.word.toLowerCase() === word)
    res.json(wordObj)
})

// @desc    Add word
// @route   POST /words
router.post('/', (req, res) => {
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

// @desc    Edit a word
// @route   PUT /words
router.put('/', (req, res) => {
    const body = req.body

    const oldWord = body.oldWord
    const oldWordObj = favoriteWords.find(favoriteWordObj => favoriteWordObj.word.toLowerCase() === oldWord)

    if (!oldWordObj) {
        return res.status(400).json({
            error: 'word to be changed does not exist in collection'
        })
    }

    const {id} = oldWordObj

    const newWord = body.newWord
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

    res.status(204).end()
})

// @desc    Edit a word
// @route   PUT /words/:word
router.put('/:word', (req, res) => {
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

    res.status(204).end()
})

// @desc    Delete a word
// @route   DELETE /words
router.delete('/', (req, res) => {
    const query = querystring.parse(path)
    const word = req.params.word
    console.log(word)

    const wordObj = favoriteWords.find(favoriteWord => favoriteWord.word.toLowerCase() === word)

    if (!wordObj) {
        return res.status(400).json({
            error: 'word to be deleted does not exist in collection'
        })
    }

    favoriteWords = favoriteWords.filter(favoriteWordObj => favoriteWordObj !== wordObj)

    res.status(204).end()
})  

// @desc    Delete a word
// @route   DELETE /words/:word
router.delete('/:word', (req, res) => {
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

module.exports = router