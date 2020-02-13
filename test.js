const app = require('./index.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();

describe("/get", ()=>{
  it("should get all customers record", (done) => {
    chai.request(app).get("/api/customers").end((err, res)=> {
      res.should.have.status(200)
      res.body.should.be.a("array")
      done()
    })
  })
})

describe("/get", ()=>{
  it("should add a customer record", (done) => {
    chai.request(app).post("/api/customers")
    .set("Content-Type", "aplication/json")
    .send({
      name: "Pepito",
      lastName: "Pérez",
      dateOfBirth: 10000,
      email: "email@gmail.com",
      phoneNumber: 99999999
  })
    .end((err, res)=> {
      res.should.have.status(200)
      res.body.should.be.a("object")
      done()
    })
  })
})