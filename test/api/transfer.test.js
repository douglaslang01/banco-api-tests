const request = require('supertest');
const { expect } = require('chai');
const auth = require('../../helpers/authentication')
const postTrasnfer = require('../../fixtures/postTransfer.json')
require('dotenv').config();



describe('Transfers', () => {
    let token;
    let bodyTransfer;
    before(async () => {
        token = await auth.getToken(process.env.USER, process.env.PASSWORD); // Get Token
    })

    beforeEach(() => {
        bodyTransfer = { ...postTrasnfer };
    })

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando valor de transferencia for igual ou acima de R$10,00', async () => {
            const respose = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfer);

            expect(respose.status).to.equal(201);
        })

        it('Deve retornar falha com 422 quando valor de transferencia for abaixo de R$10,00', async () => {
            bodyTransfer.valor = 9.00

            const respose = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfer);

            expect(respose.status).to.equal(422);
        })
    })
})