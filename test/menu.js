process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()

let Menu = require('../models/menu')
chai.use(chaiHttp)


describe('Menu', () => {
	beforeEach((done) => {
		Menu.remove({}, (err) => {
			done()
		})
	})

	describe('/GET Menu', () => {
		it('it should GET all the menu', (done) => {
			chai.request(app)
				.get('/api/menu')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
				done()
			})
		})
	})
})


