const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');
const Creditor = require('../src/db/creditor');

const { expect } = chai;
chai.use(chaiHttp);

describe('Requirements', () => {
  let creditorId;
  let creditor;
  beforeEach(async () => {
    creditor = new Creditor({
      creditorName: 'AMEX',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 5,
      balance: 2763,
    });
    await creditor.save();
    creditorId = creditor._id;
  });
  it('Get all creditor data with total balance and average min pay percentage', async () => {
    const anotherCreditor = new Creditor({
      creditorName: 'CBNA',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 2.5,
      balance: 1363,
    });
    await anotherCreditor.save();
    const res = await chai.request(app).get('/api/balance');
    expect(res).to.have.status(200);
    expect(res.body.data.totalBalance).to.equal(4126);
    expect(res.body.data.avgMinPaymentPercentage).to.equal(3.75);
    expect(res.body.data.creditors.length).to.equal(2);
  });

  it('Get creditor data by creditor name', async () => {
    const res = await chai.request(app).get('/api/creditor/amex');
    expect(res).to.have.status(200);
    expect(res.body.length).to.equal(1);
    expect(res.body[0].creditorName).to.equal('AMEX');
  });

  it('Add a new creditor entry', async () => {
    const anotherCreditor = {
      creditorName: 'CHASE',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 24,
      balance: 6000,
    };
    const res = await chai
      .request(app)
      .post('/api/creditor')
      .send(anotherCreditor);
    expect(res).to.have.status(200);
    const { _id } = res.body;
    const savedCreditor = await Creditor.find({
      creditorName: 'CHASE',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 24,
      balance: 6000,
    });
    expect(savedCreditor[0]._id.toString()).to.equal(_id.toString());
  });

  it('Update an existing creditor entry (partial or full update)', async () => {
    creditor.creditorName = 'TFCU';
    const res = await chai
      .request(app)
      .patch(`/api/creditor/${creditorId}`)
      .send(creditor);
    expect(res).to.have.status(200);
    const updatedCreditor = await Creditor.find(creditor);
    expect(updatedCreditor[0].creditorName).to.equal('TFCU');
  });

  it('Implement credit analysis endpoint to return data that meet following criteria: a) Creditor balance should be over 2000 b) Creditor min pay percentage shouldn’t exceed 29.99%', async () => {
    const secondCreditor = new Creditor({
      creditorName: 'CBNA',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 2.5,
      balance: 1363,
    });
    const thirdCreditor = new Creditor({
      creditorName: 'TFCU',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 33,
      balance: 3000,
    });
    const fourthCreditor = new Creditor({
      creditorName: 'CHASE',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 22,
      balance: 5000,
    });
    await secondCreditor.save();
    await thirdCreditor.save();
    await fourthCreditor.save();
    const res = await chai.request(app).get(`/api/analysis`);
    expect(res).to.have.status(200);
    expect(res.body.length).to.equal(2);
    expect(res.body[0].balance).to.be.greaterThan(2000);
    expect(res.body[0].minPaymentPercentage).to.be.lessThan(29.99);
    expect(res.body[1].balance).to.be.greaterThan(2000);
    expect(res.body[1].minPaymentPercentage).to.be.lessThan(29.99);
  });
});
