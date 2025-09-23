const request = require('supertest');
const { expect } = require('chai');

const baseUrl = 'http://localhost:3000';

async function getToken() {
    const response = await request(baseUrl)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            username: 'douglas.lang',
            senha: '123456'
        });

    return response.body.token;
}


describe('Transfers', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando valor de transferencia for igual ou acima de R$10,00', async () => {
            // Get Token
            const token = await getToken();

            const respose = await request(baseUrl)
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
            // Get Token
            const token = await getToken();

            const respose = await request(baseUrl)
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