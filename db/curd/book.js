const mongoose = require('mongoose');
const BookSchema = require('../schema/book');
const Book = require('../schema/book');
const Rx = require('rxjs');


exports.find = async (ctx) => {
    let query;
    if (ctx.request.query.title){
        let regex = new RegExp(ctx.request.query.title);
        query = {title: regex};
    } else {
        query = {title: '~!@~'};
    }

    console.log(query);

    await new Promise(function(resolve, reject) {
        Book.find(query, {_id: 0, __v: 0, thum: 0, public: 0}, function(err, data) {
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    }).then(function(data) {
        console.log(data);
        ctx.response.type = 'json';
        ctx.body = Rx.of(data);
    })
}
