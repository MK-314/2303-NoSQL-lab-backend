const { validationResult } = require('express-validator');
const { MongoClient } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'test'

exports.authenticateUser = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (injectionDetected([username, password])) {
        return res.status(400).json({ message: 'not valid input' })
    }
    MongoClient.connect(
        connectionURL, { useNewUrlParser: true },
        (error, client) => {
            if (error) {
                return console.log('Unable to connect');
            }
            const db = client.db(databaseName)
            db.collection('users').findOne({ username, password },
                (error, result) => {
                    if (error) {
                        res.status(500).json({
                            message: 'DB error'
                        })
                        return
                    }
                    if (result) {
                        res.status(200).json({
                            message: true
                        })
                    } else {
                        res.status(200).json({
                            message: false
                        })
                    }
                })
        })
}
exports.createUser = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    MongoClient.connect(
        connectionURL, { useNewUrlParser: true },
        (error, client) => {
            if (error) {
                return console.log('Unable to connect');
            }
            const db = client.db(databaseName)
            db.collection('users').insertOne({
                    username: username,
                    password: password
                })
                .then(result => {
                    res.status(200).json({
                        message: 'yes we did it'
                    })
                })
                .catch(err => {
                    req.status(500).json({
                        message: 'there is an error'
                    })
                })
        })
}

function injectionDetected(array) {
    for (let i = 0; i < array.length; i++) {
        if (!!!array[i].toString().match(/^[0-9a-zA-Z]+$/)) {
            return true
        }
    }
    return false
}