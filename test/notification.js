process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()

let Notification = require('../models/notification')
let Table = require('../models/table')
chai.use(chaiHttp)


describe('Notification', () => {
	beforeEach((done) => {
		Notification.remove({}, (err) => {
			done()
		})
	})

	describe('/GET Notification', () => {
		it('it should GET all the notifications', (done) => {
			chai.request(app)
				.get('/api/notification')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
				done()
			})
		})
	})
})

describe('/POST Notification', () => {
	it('it should POST a notification', (done) => {

		var notification = {
			table:{
				  "__v": 0,
				  "token": "75rC",
				  "name": "Dinner",
				  "_id": "58fb714c1fbe974070141d21",
				  "id": "58fb714c1fbe974070141d21"
			},
			type: "call",
			message: "fast"
		}	

		chai.request(app)
			.post('/api/notification')
			.send(notification)
			.end((err,res) => {
				res.should.have.status(200)
				
				done()
			})
	})
})

describe('/DELETE/:id notification',() => {

	beforeEach((done) => {
		Notification.remove({}, (err) => {
			done()
		})
	})
	
	it('it should DELETE a notification by the given id',(done) => {
		var notification = new Notification({})
		notification.save((err,book)=>{
			chai.request(app)
				.delete('/api/notification/' + notification.id)
				.end((err,res) => {
					res.should.have.status(200)
				
					done()
				})
		})
	})
})
