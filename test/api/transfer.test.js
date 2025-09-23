const request = require('supertest');
const { expect } = require('chai');
const auth = require('../../helpers/authentication')
require('dotenv').config();


describe('Transfers', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando valor de transferencia for igual ou acima de R$10,00', async () => {
            const token = await auth.getToken(process.env.USER, process.env.PASSWORD); // Get Token

            const respose = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10.01,
                    token: ""
                });

            expect(respose.status).to.equal(201);
        })

        it('Deve retornar falha com 422 quando valor de transferencia for abaixo de R$10,00', async () => {
            const token = await auth.getToken(process.env.USER, process.env.PASSWORD); // Get Token

            const respose = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                });

            expect(respose.status).to.equal(422);

        })
    })
})