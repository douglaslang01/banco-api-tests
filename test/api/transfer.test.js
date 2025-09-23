const request = require('supertest');
const { expect } = require('chai');
const auth = require('../../helpers/authentication')
const postTrasnfer = require('../../fixtures/postTransfer.json')
require('dotenv').config();



describe('Transferências', () => {
    let token;
    let bodyTransfer;
    before(async () => {
        token = await auth.getToken(process.env.USER, process.env.PASSWORD); // Get Token
    });

    beforeEach(() => {
        bodyTransfer = { ...postTrasnfer };
    });

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando valor de transferencia for igual ou acima de R$10,00', async () => {
            const respose = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfer);

            expect(respose.status).to.equal(201);
        });

        it('Deve retornar falha com 422 quando valor de transferencia for abaixo de R$10,00', async () => {
            bodyTransfer.valor = 9.00;

            const respose = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfer);

            expect(respose.status).to.equal(422);
        });
    });

    describe('GET /tranferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no bando cde dados', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias/9')
                .set('Authorization', `Bearer ${token}`);

            //console.log(response.body);

            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(9);
            expect(response.body.id).to.be.a('number');
            expect(response.body.conta_origem_id).to.be.equal(1);
            expect(response.body.conta_destino_id).to.be.equal(2);
            expect(response.body.valor).to.be.equal(10.01);
        });
    });


    describe('GET /tranferencias', () => {
        it('Deve retornar 10 elementos na paginacao quando informar quando informar limite de 1o registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`);

            console.log(response.status)
            console.log(response.body)

            expect(response.status).to.equal(200);
            expect(response.body.limit).to.equal(10);
            expect(response.body.transferencias).to.have.lengthOf(10);


        })
    });
})