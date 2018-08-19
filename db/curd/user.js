const mongoose = require('mongoose');
const UserSchema = require('../schema/user');
const User = require('../schema/user');

exports.login = async (ctx) => {
    let query = ctx.request.body;
    console.log(query);

    await find(query).then(
        function (data) {
            if (data.length === 0) {
                ctx.body = 'login fail';
            } else {
                ctx.body = 'login success'
            }
        }
    )
}

exports.register = async (ctx) => {
    let query = ctx.request.body;
    console.log(query);
    await find({username: query.username}).then(function(data) {
        if(data.length > 0){
            ctx.body = 'user is exist';
        } else {
            insert(query).then(function(data){
                console.log(data);
                ctx.body = 'register success';
            })
        }
    })
}

function find(query) {
    return new Promise(function (resolve, reject) {
        User.find(query, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function insert(doc) {
    return new Promise(function(resolve, reject) {
        User.create(doc, function(err, data) {
            if(err){
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

function update(cdt,doc){
    return new Promise(function(resolve, reject) {
        User.update(cdt ,doc, function(err, data){
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function deleted(){
    return new Promise(function(resolve, reject) {
        User.remove(cdt, function(err, data) {
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}