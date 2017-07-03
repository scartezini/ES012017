process.env.NODE_ENV =  'test'

let mongoose = require("mongoose")
let chai = require('chai')
let chaiHttp = require('chai-http')
let app = require('../app')
let should = chai.should()

let Table = require('../models/table')
chai.use(chaiHttp)

describe('Table', () => {
	beforeEach((done) => {
		Table.remove({}, (err) => {
			done()
		})
	})

	describe('/GET Table', () => {
		it('it should GET all the tables', (done) => {
			chai.request(app)
				.get('/api/table')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(0)
				done()
			})
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
				res.should.have.status(200)
			
			done()
		})
	})

 it('it should not POST a table without a name', (done) => {
 	var table = {}	

	chai.request(app)
		.post('/api/table')
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
				.end((err,res) => {
					res.should.have.status(200)
				
					done()
				})
		})
	})
})



describe('/DELETE/:id table',() => {

	beforeEach((done) => {
		Table.remove({}, (err) => {
			done()
		})
	})
	
	it('it should DELETE a table by the given id',(done) => {
		var table = new Table({name:"Dining Table"})
		table.save((err,book)=>{
			chai.request(app)
				.delete('/api/table/' + table.id)
				.end((err,res) => {
					res.should.have.status(200)
				
					done()
				})
		})
	})
})











