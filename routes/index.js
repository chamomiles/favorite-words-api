const express = require('express')
const router = express.Router()

words = ['Pyrexia', 'Larkspur', 'Autodefenestration']

// @desc    Home page
// @route   GET /
router.get('/', (req, res) => {
    res.render('home.ejs', {
        words: words
    })
})

module.exports = router