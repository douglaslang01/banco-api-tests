const request = require('supertest');
const { expect } = require('chai');
require('dotenv/config')

describe('Login API Tests', () => {
    describe('POST /login', () => {
        it('should return 200 and a token for valid credentials', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'douglas.lang',
                    senha: '123456'
                });

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('token');
            expect(response.body.token).to.be.a('string');
        });
    });
});
