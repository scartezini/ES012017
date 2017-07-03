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


describe('/POST Menu', () => {
	it('it should POST a menu', (done) => {

		var menu = {}	

		chai.request(app)
			.post('/api/menu')
			.send(menu)
			.end((err,res) => {
				res.should.have.status(200)
				
				done()
			})
	})
})



describe('/PUT/:id menu',() => {

	
	it('it should PUT a menu',(done) => {
		var menu = new Menu({name:"a"})
		menu.save((err,book)=>{
			chai.request(app)
				.put('/api/menu/' + menu.id)
				.send({name:"b"})
				.end((err,res) => {
					res.should.have.status(200)
					done()
				})
		})
	})
})


describe('/PUT/:id menu',() => {

	
	it('it should PUT a menu body',(done) => {
		var menu = new Menu({name:"a"})
		menu.save((err,book)=>{
			chai.request(app)
				.put('/api/menu/' + menu.id)
				.send({name:"b"})
				.end((err,res) => {
					res.should.have.status(200)
					res.body.should.have.property('name').eql('b')
					done()
				})
		})
	})
})
