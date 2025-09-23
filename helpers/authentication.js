const request = require('supertest');
require('dotenv').config();

const getToken = async (user, password) => {
    const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            username: user,
            senha: password
        });

    return response.body.token;
}

module.exports = { getToken }