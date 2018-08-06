const express = require('express');
const app = express();
const books = require('./data/book.json');
const Rx = require('rxjs');

 app.use('*',function(req,res,next){
 	res.header('Access-Control-Allow-Origin','*');
 	res.header('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild');
 	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');

 	if(req.method == 'OPTIONS'){
 		res.send(200);
 	}else{
 		next();
 	}
 });

app.use(express.static('./'));

function getBooks() {
	let db = JSON.stringify(books);
	return JSON.parse(db);
}



app.get('/api/books', (req,res) => {
	let query = req.query;
	// if(query.state === 'search') {
	// 	let title = query.title;
	// 	if(title === ''){
	// 		title = '#@()';
	// 	}
	// 	if(query.detail === 'false'){
	// 		console.log('detail = false')
	// 		let data = getBooks().data.map((item)=>(item.title)).filter(item => (item.indexOf(title)>=0));
	// 		res.send({
	// 			code: 200,
	// 			data
	// 		})
	// 	} else {
	// 		console.log('detail = true || undefine')
	// 		let data = getBooks().data.filter(item => (item.title.indexOf(title)>=0));
	// 		res.send({
	// 			code:200,
	// 			data
	// 		})
	// 	}	
	// }
	if(query.state === 'q'){
		if(query.q === 'length'){
			res.send({
			code: 200,
			data: {
				length: getBooks().length
				}
			});
		}

		if(query.q === 'list'){
			let start = parseInt(query.start);
			let end = start + 8;
			let data = getBooks().data.slice(start, end);
			res.send({
				code:200,
				data
			})
		}

		
	}
})

app.get('/test', (req,res) => {
	let data = {
		code: 200,
		data: {
			str: "test"
		}
	}
	res.send(JSON.stringify(data));
})

app.listen(3002, () => {
	console.log('It listening 3002');
})



// app.get('/api/books', (req,res) => {
// 	if(req.query.state === 'get'){
// 		res.send(getBooks().slice())
// 	}
// 	if(req.query.state == 'top5'){
// 		res.send(Rx.of(getBooks().slice(req.query.start|0,5)));
// 	}
// 	if(req.query.state == 'search'){
// 		let title = req.query.title;
// 		if(title == ''){
// 			title = '###';
// 		}
// 		res.send(Rx.of(getBooks().filter(data => (data.title.indexOf(title) >= 0 ))));
// 	}
// 	if(!req.query.state){
// 		res.send(404);
// 	}
// })

// app.get('/test', (req,res) => {
// 	res.send(getBooks());
// })