'use strict';

const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
let id;


describe('Food API server testing', () => {

    // Test for food routes
    it('404 on a bad route', async() => {
        const response = await request.get(`/bad`);
        expect(response.status).toEqual(404);
    });
    it('404 on a bad method', async() => {
        const response = await request.post(`/badRoutes`);
        expect(response.status).toEqual(404);
    });
    it('Create a record using POST', async() => {
        const response = await request.post('/api/v1/food').send({
            name: 'kabab'
        });
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('kabab');
        id = response.body._id;
    });
    it('Read a list of records using GET', async() => {
        const response = await request.get(`/api/v1/food`);
        expect(response.status).toEqual(200);
    });
    it('Read a record using GET', async() => {
        const response = await request.get(`/api/v1/food/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('kabab');
    });
    it('Update a record using PUT', async() => {
        const response = await request.put(`/api/v1/food/${id}`).send({
            name: 'pizza'
        });
        expect(response.body.name).toEqual('pizza');
    });
    it('Destroy a record using DELETE', async() => {
        const response = await request.delete(`/api/v1/food/${id}`)
        expect(response.body._id).toEqual(id);
    });
});