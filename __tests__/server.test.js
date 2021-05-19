'use strict';

const  server  = require('../src/server.js');
const superTest = require('supertest');
const supergoose = require('@code-fellows/supergoose');
const request = superTest(server.server);

const mongoose=require('mongoose');
require('dotenv').config();

// mongoose.connect(process.env.MONGOOSE_TEST_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, async () => {// delete everything from db after tests
//   await mongoose.connection.db.dropDatabase();
// });


describe('server', () => {

    it('should get 404 status', async () => {
        const response = await request.get('/n');
        expect(response.status).toBe(404);
      });

      it('should get a welcome message', async () => {
        //arrange
        // let route = '/';
        //act
        const response = await request.get('/');
        //assert
        expect(response.status).toBe(200);
        expect(response.text).toBe('welcome to server.js');
      });
    
      it('should get an error', async () => {
        const response = await request.get('/bad');
        expect(response.status).toEqual(500);
      });
});


describe('api server', () => {

it('bad method', async () => {
    const response = await request.put ('/api/v1/clothes');
    expect(response.status).toBe (404);
  });

});

  describe('api server', () => {
  // afterAll(() => {// we need to close the connection after tests
  //   mongoose.connection.close();
  // });
  let id;
    it('should create a new food using post request', async () => {
        //arrange
        let food = {
            name: 'eggs',
            number: '10'
        }
        //act
        const response = await request.post('/api/v1/food').send(food);
        //assert
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('eggs');
        expect(response.body.number).toEqual('10');
        expect(response.body._id.length).toBeGreaterThan(0);

        id = response.body._id;
    });

    it('should update a food using put request', async () => {
        //arrange
        let editFood = {
            name: 'eggs',
            number: '5'
        };
        //act
        const response = await request.put(`/api/v1/food/${id}`)
            .send(editFood);
        //asert
        expect(response.status).toEqual(200);
        expect(response.body.number).toEqual('5');
    });

    

    it('get a food using Get /food/:id', async () => {
      const res = await request.get(`/api/v1/food/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body[0].name).toEqual('eggs');
      
    });

    it('get all food using GET /food', async () => {
        const response = await request.get('/api/v1/food');
        expect(response.status).toEqual(200);
      });

      
      it('delete a food using DELETE /food/:id', async () => {
          const res = await request.delete(`/api/v1/food/${id}`);
          expect(res.status).toEqual(200);
        });

      

    it('should create a new clothes using post request', async () => {
        //arrange
        let clothes = {
            name: 'T-shirt',
            number: '10'
        }
        //act
        const response = await request.post('/api/v1/clothes').send(clothes);
        //assert
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('T-shirt');
        expect(response.body.number).toEqual('10');
        expect(response.body._id.length).toBeGreaterThan(0);

        id = response.body._id;
    });

    it('should update a clothes using put request', async () => {
        //arrange
        let editClothes = {
            name: 'T-shirt',
            number: '5'
        };
        //act
        const response = await request.put(`/api/v1/clothes/${id}`)
            .send(editClothes);
        //assert
        expect(response.status).toEqual(200);
        expect(response.body.number).toEqual('5');
    });

    it('get a clothes using Get /clothes/:id', async () => {
      const res = await request.get(`/api/v1/clothes/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body[0].name).toEqual('T-shirt');
      
    });
    it('get all clothes using GET /clothes', async () => {
        const response = await request.get('/api/v1/clothes');
        expect(response.status).toEqual(200);
      });



    

      it('delete a clothes using DELETE /clothes/:id', async () => {
        const res = await request.delete(`/api/v1/clothes/${id}`);
        expect(res.status).toEqual(200);
        // expect(res.body).toEqual([]);
      });


});



