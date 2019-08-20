const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
let loginUser = require('../Keys/keys').LoginUser
let user = require('../Keys/keys').User

// user schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName required"]
    },
    lastName: {
        type: String,
        required: [true, "lastName required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: [true, "Email is Exist"]
    },
    password: {
        type: String,
        required: [true, "password required"]
    },
    conformPassword: {
        type: String,
        required: [true, "conform Password required"]
    },
    login: {
        type: Boolean,
        default: false
    },
    activeBook:{
        type: String,
        default: ""
    },
    books: []
})

const users = module.exports = mongoose.model('users', UserSchema)

// get curent user
router.get('/', (req, res) => {
    if (user.login) {
        res.json({ user: user, succes: true })
    }
    else {
        res.json({ user: {}, succes: false })
    }
})

// add user
router.post('/', (req, res) => {
    const { firstName, lastName, email, password, conformPassword } = req.body
    const user = new users({
        firstName,
        lastName,
        email,
        password,
        conformPassword
    })
    user.save()
        .then((data) => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        });
})

// update user login
router.put('/:email', (req, res) => {
    users.findOne({ email: req.params.email })
        .then(data => {
            if (data.password === req.body.password) {

                if (loginUser.length > 0) {
                    loginUser.map((use, index) => {
                        if (data.email === use.email) {
                            res.json({ info: 'user already login',  succes: true, data: data })
                        }
                        else {
                            data.updateOne({ $set: { login: true } })
                                .then(updateData => {
                                    users.findOne({ email: req.params.email })
                                        .then(data => {
                                            loginUser.push(data)
                                            user = data
                                            res.json({ updateData: updateData, data: data, succes: true })
                                        })
                                })
                        }
                    })
                }
                else {
                    data.updateOne({ $set: { login: true } })
                        .then(updateData => {
                            users.findOne({ email: req.params.email })
                                .then(data => {
                                    loginUser.push(data)
                                    user = data
                                    res.json({ updateData: updateData, data: data, succes: true })

                                })
                        })
                }
            }
            else {
                res.json({ succes: false })
            }
        })
        .catch(err => {
            res.json(err)
        })
})
// end user router
// get user book router
router.get('/book/:id', (req, res) => {
    users.findById(req.params.id)
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})

// add book router
router.post('/book/:id', (req, res) => {
    users.where({ _id: req.params.id })
        .updateOne({
            $push: {
                books: [{
                    bookOf: req.body.bookOf,
                    book: []
                }]
            }
        })
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})

// set active book router
router.put('/book/activeBook/:id', (req, res)=>{
        users.where({ _id: req.params.id })
        .updateOne({$set: {activeBook: req.body.activeBook}})
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})

// add book menu
router.post('/book/menu/:id', (req, res) => {
    users.where({ _id: req.params.id })
        .updateOne({'books.bookOf': req.body.bookOf}, {
            $push: {
                'books.$.book': {
                    menu: req.body.menu,
                    menuItem: req.body.menuItem
                }
            }
        }
        )
        .then(data => {
            res.json({ data: data, succes: true })
        })
        .catch(err => {
            res.json({ err: err, succes: false })
        })
})

// add book itemData router
router.put('/book/itemData/:id', (req, res) => {
    users.where({ _id: req.params.id})
        .updateOne({},{$push: { 'books.$[i].book.$[j].menuItem.$[k].itemData': req.body.newItemData } }, { arrayFilters: [{ 'i.bookOf': req.body.activeBook }, { 'j.menu': req.body.menu}, { 'k.item': req.body.menuItem}] })
        .then((data) => { res.json({ data: data, succes: true}) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})


// update book itemData router
router.put('/book/update/itemData/:id', (req, res) => {
    users.where({ _id: req.params.id })
        .updateOne({}, { $set: { 'books.$[i].book.$[j].menuItem.$[k].itemData.$[l].content': req.body.content } }, { arrayFilters: [{ 'i.bookOf': req.body.activeBook }, { 'j.menu': req.body.menu}, { 'k.item': req.body.menuItem}, { 'l.contentId': req.body.contentId}]})
        .then((data) => { res.json({ data: data, succes: true }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})

// add book menuItem router
router.put('/book/add/item/:id', (req, res) => {
    users.where({ _id: req.params.id })
        .updateOne({},{$push : {'books.$[i].book.$[j].menuItem': req.body.newMenu}},{arrayFilters: [{ 'i.bookOf': req.body.activeBook }, { 'j.menu': req.body.menu}]})
        .then((data) => { res.json({ data: data, succes: true }) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})


// update book menuItem router
router.put('/book/update/menuItem/:id', (req, res) => {
    users.where({ _id: req.params.id })
        .updateOne({}, { $set: {'books.$[i].book.$[j].menuItem.$[k].item': req.body.newItem}},{arrayFilters: [{ 'i.bookOf': req.body.activeBook }, { 'j.menu': req.body.menu}, { 'k.item': req.body.item}]})
        .then((data) => { res.json({ data: data, succes: true}) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
}) 

// update book menu router
router.put('/book/update/menu/:id', (req, res) => {
    users.where({ _id: req.params.id })
        .updateOne({},{ $set: {'books.$[i].book.$[j].menu': req.body.newMenu}},{arrayFilters: [{ 'i.bookOf': req.body.activeBook }, { 'j.menu': req.body.menu}]})
        .then((data) => { res.json({ data: data, succes: true}) })
        .catch(err => {
            res.status(404).json({ err: err, succes: false })
        })
})

// // remove book menuItem router
// router.put('/book/delete/item/:id', (req, res) => {
//     users.where({ _id: req.params.id })
//         .updateOne({},{ $pull: {'books.$[i].book.$[j].menu': req.body.newMenu}},{arrayFilters: [{ 'i.bookOf': req.body.activeBook }, { 'j.menu': req.body.menu}]})
//         .then((data) => { res.json({ data: data, succes: true }) })
//         .catch(err => {
//             res.status(404).json({ err: err, succes: false })
//         })
// })


module.exports = router