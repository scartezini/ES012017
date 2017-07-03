process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()

let Table = require('../models/menu')
chai.use(chaiHttp)


	
describe('/POST access failed', () => {
	it('it should POST a access failed', (done) => {

		chai.request(app)
			.post('/api/access/')
			.send({})
			.end((err,res) => {
				res.should.have.status(401)
				
				done()
			})
	})
})



describe('/POST access ', () => {
	beforeEach((done) => {
		Table.remove({}, (err) => {
		})
		var table = new Table({token:"ashdo1312fkanq41"})
		table.save((err,book)=>{
			done()
		})
	})

	it('it should POST a access', (done) => {

		
		chai.request(app)
			.post('/api/access/')
			.send({})
			.end((err,res) => {
				res.should.have.status(401)
				
				done()
			})
	})
})
