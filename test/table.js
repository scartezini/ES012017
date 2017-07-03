process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()

let Table = require('../models/table')
let Restaurant =  require('../models/restaurant')
chai.use(chaiHttp)

describe('Table', () => {
	var cookies

	beforeEach((done) => {
		Table.remove({}, (err) => {})
		
		let rest = new Restaurant({email:'test@test.com',password:'1234'})
		rest.save((err,book) => {})
		chai.request(app)
			.post('/api/restaurant/login')
			.send(rest)
			.end((err, res) => {
				cookies = res.headers['set-cookie'].pop().split(';')[0]
				done()
			})
	})

	describe('/GET Table', () => {
		it('it should GET all the tables', (done) => {
			chai.request(app)
				.get('/api/table')
				.set('Cookie',cookies)
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
				done()
			})
		})
	})


	describe('/POST table',() => {
	 it('it should POST a table', (done) => {
		var table = {
			name: "Dining table"
		}	

		chai.request(app)
			.post('/api/table')
			.set('Cookie',cookies)
			.send(table)
			.end((err,res) => {
					res.should.have.status(200)
				
				done()
			})
		})

	 it('it should not POST a table without a name', (done) => {
		var table = {}	

		chai.request(app)
			.post('/api/table')
			.set('Cookie',cookies)
			.send(table)
			.end((err,res) => {
					res.should.have.status(400)
				
				done()
			})
		})

	 it('it should generate token in POST table', (done) => {
		var table = {
			name: "Dining Table"
		}	

		chai.request(app)
			.post('/api/table')
			.set('Cookie',cookies)
			.send(table)
			.end((err,res) => {
					res.body.should.be.a('object')
					res.body.should.have.property('id')
					res.body.should.have.property('name')
					res.body.should.have.property('token')
					
					done()
			})
		})

	})


	describe('/GET/:id table',() => {
		it('it should GET a table by the given id',(done) => {
			var table = new Table({name:"lunch Table"})
			table.save((err,book)=>{
				chai.request(app)
					.get('/api/table/' + table.id)
					.set('Cookie',cookies)
					.end((err,res) => {
						res.should.have.status(200)
					
						done()
					})
			})
		})
	})



		describe('/DELETE/:id table',() => {
		it('it should DELETE a table by the given id',(done) => {
			var table = new Table({name:"Dining Table"})
			table.save((err,book)=>{
				chai.request(app)
					.delete('/api/table/' + table.id)
					.set('Cookie',cookies)
					.end((err,res) => {
						res.should.have.status(200)
					
						done()
					})
			})
		})
	})
})



describe('Table failed', () => {

	beforeEach((done) => {
		Table.remove({}, (err) => {done()})
	})

	describe('/GET Table', () => {
		it('it should GET all the tables', (done) => {
			chai.request(app)
				.get('/api/table')
				.end((err, res) => {
					res.should.have.status(401)
				done()
			})
		})
	})


	describe('/POST table',() => {
	 it('it should POST a table', (done) => {
		var table = {
			name: "Dining table"
		}	

		chai.request(app)
			.post('/api/table')
			.send(table)
			.end((err,res) => {
					res.should.have.status(401)
				
				done()
			})
		})

	 it('it should not POST a table without a name', (done) => {
		var table = {}	

		chai.request(app)
			.post('/api/table')
			.send(table)
			.end((err,res) => {
					res.should.have.status(401)
				
				done()
			})
		})

	 it('it should generate token in POST table', (done) => {
		var table = {
			name: "Dining Table"
		}	

		chai.request(app)
			.post('/api/table')
			.send(table)
			.end((err,res) => {
					res.should.have.status(401)
					
					done()
			})
		})

	})


	describe('/GET/:id table',() => {
		it('it should GET a table by the given id',(done) => {
			var table = new Table({name:"lunch Table"})
			table.save((err,book)=>{
				chai.request(app)
					.get('/api/table/' + table.id)
					.end((err,res) => {
						res.should.have.status(401)
					
						done()
					})
			})
		})
	})



		describe('/DELETE/:id table',() => {
		it('it should DELETE a table by the given id',(done) => {
			var table = new Table({name:"Dining Table"})
			table.save((err,book)=>{
				chai.request(app)
					.delete('/api/table/' + table.id)
					.end((err,res) => {
						res.should.have.status(401)
					
						done()
					})
			})
		})
	})
})



