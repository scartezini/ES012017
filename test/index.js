process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()

chai.use(chaiHttp)



describe('index', () => {
	describe('/GET /', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

	describe('/GET /logout', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/logout')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

	describe('/GET /table', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/table')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

	describe('/GET /notification', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/notification')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

	describe('/GET /access', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/access')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

	describe('/GET /restaurant', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/restaurant')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

	describe('/GET /menu', () => {
		it('it should GET interface', (done) => {
			chai.request(app)
				.get('/menu')
				.end((err, res) => {
					res.should.have.status(200)
				done()
			})
		})
	})

})
