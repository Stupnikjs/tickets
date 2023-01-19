import { response } from 'express'
import request from 'supertest'
import { app } from "../../app"

it('returns a 201 on successful signup', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com', 
        password: 'password'
    })
    .expect(201)
})

it('returns a 400 with an ivalid email', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'jopjopjopjm', 
        password: 'password'
    })
    .expect(400)
})
it('returns a 400 with an ivalid password', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'jopjopjopjm', 
        password: 'pad'
    })
    .expect(400)
})
it('returns a 400 with missing password and email ', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
      email:"jojo@gmail.com"
    })
    .expect(400); 
    await request(app)
    .post('/api/users/signup')
    .send({
      password:'jojojjo'
    })
    .expect(400)
})

it('disallows two duplicate emails', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com', 
        password: 'password'
    })
    .expect(201)
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com', 
        password: 'password'
    })
    .expect(400)
})


it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com', 
            password: 'password'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined() // supertest not using https but http 
})