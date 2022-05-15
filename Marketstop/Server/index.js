const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

app.set('port', 3000)

app.use(express.json())
app.use(cors())

app.get('/api/students/:id', function(req, res){
	console.log(`${req.params.id}`)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('campus-02')
			const coll = db.collection('students')
			const criteria = {_id: new mongo.ObjectID(req.params.id)}
			coll.find(criteria).toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.post('/api/students', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('campus-02')
			// Prepare the JS myObj 
			const myObj = new Object()
			myObj.firstName = req.body.firstName
			myObj.lastName = req.body.lastName
			const dt_flds = req.body.dob.split('-')
			const yyyy = dt_flds[0]
			const mm = dt_flds[1]
			const dd = dt_flds[2] 
			myObj.dob = new Date(yyyy, mm, dd)
			const coll = db.collection('students')
			coll.insertOne(myObj, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.get('/api/accounts', function(req, res){
	//console.log(`${req.query.email}`)
	//console.log(`${req.query.password}`)

	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('marketstop')
			const coll = db.collection('accounts')
			const criteria = {email: req.query.email, password: req.query.password}
			coll.find(criteria).toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})	
})

app.post('/api/accounts', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('marketstop')
			// Prepare the JS myObj 
			const myObj = new Object()
			myObj.email = req.body.email
			myObj.password = req.body.password
			const coll = db.collection('accounts')
			coll.insertOne(myObj, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.post('/api/posts', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('marketstop')
			// Prepare the JS myObj 
			const myObj = new Object()
			myObj.title = req.body.title
			myObj.price = req.body.price
			myObj.location = req.body.location
			myObj.description = req.body.description
			myObj.image = req.body.image
			const coll = db.collection('posts')
			coll.insertOne(myObj, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.get('/api/posts/all', function(req, res){

	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('marketstop')
			const coll = db.collection('posts')
			coll.find().toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})	
})

app.get('/api/posts', function(req, res){
	console.log(`${req.query.title}`)

	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('marketstop')
			const coll = db.collection('posts')
			const criteria = {title: req.query.title}
			coll.find(criteria).toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})	
})

app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
