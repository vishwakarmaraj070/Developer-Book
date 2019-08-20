const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BookOf = require('../Keys/keys').BookOf

let BookSchema = {}
if(BookOf === 'books'){
    BookSchema = mongoose.Schema({
        books: []
    })
}
else{
    BookSchema = mongoose.Schema({
        menu: {
            type: String,
            default: ''
        },
        menuItem: []
    })
}

let Boooks = module.exports = mongoose.model(BookOf, BookSchema)

console.log(`books of ${BookOf}`)
// add books
router.post('/books',(req, res)=>{
    const newbook = new Boooks({
        books: req.body.book
    })
    newbook.save()
        .then((data) => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        });
})

// put books
router.put('/books',(req,res)=>{
    Boooks.updateOne({$push: {books: req.body.book}})
        .then(data=>{
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        });
})

// get books
router.get('/books',(req,res)=>{
    Boooks.find()
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})

// get all router
router.get('/get', (req, res) => {
    UserBook.find()
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})

// get by id router
router.get('/get/:id', (req, res) => {
    UserBook.findById(req.params.id)
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})


// post router
router.post('/post', (req, res) => {
    const UserBook = new UserBook({
        menu: req.body.newBookData.menu,
        menuItem: req.body.newBookData.menuItem
    })
    UserBook.save()
        .then((data) => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        });
})

//delete router
router.delete('/delete/:id', (req, res) => {
    UserBook.findById(req.params.id)
        .then(data => {
            data.remove().then(() => res.json({ data: data, succes: true }))
        })
        .catch(err => res.status(404).json({ err: err, succes: false }));
})

// update menu router
router.put('/update/menu/:id', (req, res) => {
    UserBook.where({ _id: req.params.id })
        .updateOne({ $set: { menu: req.body.menuValue.menu } })
        .then((data) => { res.json({ data: data, succes: true, body: req.body.menu }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})

// update menuItem router
router.put('/update/menuItem/:id', (req, res) => {
    UserBook.where({ _id: req.params.id })
        .updateOne({}, { $set: { 'menuItem.$[i].item': req.body.newItemValue.menuItemValue } }, { arrayFilters: [{ 'i.item': req.body.newItemValue.menuItem }] })
        .then((data) => { res.json({ data: data, succes: true, body: req.body.menu }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})

// add menuItem router
router.put('/update/item/:id', (req, res) => {
    UserBook.where({ _id: req.params.id })
        .updateOne({
            $push: {
                menuItem: {
                    item: req.body.newMenuItem.item,
                    isEditable: req.body.newMenuItem.isEditable,
                    itemData: req.body.newMenuItem.itemData
                }
            }
        })
        .then((data) => { res.json({ data: data, succes: true }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})


// remove menuItem router
router.put('/delete/item/:id', (req, res) => {
    UserBook.where({ _id: req.params.id })
        .updateOne({ $pull: { menuItem: { item: req.body.deleteMenuItem.item } } })
        .then((data) => { res.json({ data: data, succes: true }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})

// add itemData router
router.put('/add/itemData/:id', (req, res) => {
    UserBook.where({ _id: req.params.id })
        .updateOne({ 'menuItem.item': req.body.bookItemData.menuItem }, { $push: { 'menuItem.$.itemData': req.body.bookItemData.newItemData } })
        .then((data) => { res.json({ data: data, succes: true, body: req.body }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})


// update itemData router
router.put('/update/itemData/:id', (req, res) => {
    UserBook.where({ _id: req.params.id })
        .updateOne({}, { $set: { 'menuItem.$[i].itemData.$[j].content': req.body.newbookData.content, 'menuItem.$[i].itemData.$[j].bookEditContent': req.body.newbookData.bookEditContent } }, { arrayFilters: [{ 'i.item': req.body.newbookData.item }, { 'j.contId': req.body.newbookData.contId }] })
        .then((data) => { res.json({ data: data, succes: true }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})

module.exports = router 