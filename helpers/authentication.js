const request = require('supertest');
require('dotenv').config();
const postLoging = require('../fixtures/postLogin.json');

const getToken = async (user, password) => {
    const bodyLogin = { ...postLoging };
    bodyLogin.username = user;
    bodyLogin.senha = password;

    const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

    return response.body.token;
}

module.exports = { getToken }