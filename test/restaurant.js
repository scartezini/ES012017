process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()


let Restaurant = require('../models/restaurant')
chai.use(chaiHttp)



describe('/POST Restaurant register', () => {
	beforeEach((done) => {
			Restaurant.remove({}, (err) => {
			done()
		})
	})
	it('it should POST a restaurant register', (done) => {


		chai.request(app)
			.post('/api/restaurant/register')
			.send({email:"aa@bb.com",password:"1234"})
			.end((err,res) => {
				res.should.have.status(200)
				
				done()
			})
	})
})

describe('/POST Restaurant login', () => {
	beforeEach((done) => {
			Restaurant.remove({}, (err) => {
		})
		var restaurant = new Restaurant({email:"aacd@bb.com",password:"1234"})
		restaurant.save((err,book)=>{
				done()
		})
	})
	it('it should POST a restaurant login', (done) => {


		chai.request(app)
			.post('/api/restaurant/login')
			.send({email:"aacd@bb.com",password:"1234"})
			.end((err,res) => {
				res.should.have.status(200)
				
				done()
			})
	})
})
