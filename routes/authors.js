const { formatMuiErrorMessage } = require('@mui/utils')
const express = require('express')
const router = express.Router()
const Author = require('../ models/author')


// New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
    // 如果网页到了authors/new page（也就是user发出get的这个req），那么网页将render（present）authors/new.ejs
})


//All Author Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors : authors, 
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})

// create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect('authors')
    }catch{
        res.render('authors/new', {
        author: author,
        errorMessage : `Error Creating Author...` 
        })
    }
})


module.exports = router