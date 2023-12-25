const request = require('supertest');
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`


describe('Testing index', () => {
   it('GET /', async () => {
       const res = await request(url).get('/');
       expect(res.statusCode).toBe(200);
   });
   // hurrengo it()
   it('returns an error if the username length is not enough', async () => {
    const response = await request(url)
      .post('/register')
      .send({ username: 'motz', email: 'test@example.com', password: 'password', confirm_password: 'password' });

    expect(response.status).toBe(400);
  });

  it('returns an error if passwords do not match', async () => {
    const response = await request(url)
      .post('/register')
      .send({ username: 'validusername', email: 'test@example.com', password: 'password', confirm_password: 'differentpassword' });

    expect(response.status).toBe(400);
  });

  it('returns an error if passwords are not alphanumeric or less than 6 characters', async () => {
    const response = await request(url)
      .post('/register')
      .send({ username: 'validusername', email: 'test@example.com', password: 'pass', confirm_password: 'pass' });

    expect(response.status).toBe(400);
  });

  it('returns an error if the email does not meet the conditions', async () => {
    const response = await request(url)
      .post('/register')
      .send({ username: 'validusername', email: 'invalidemail', password: 'password', confirm_password: 'password' });

    expect(response.status).toBe(400);
  });

  it('returns a JSON object with status 200 if all conditions are met', async () => {
    const response = await request(url)
      .post('/register')
      .send({ username: 'validusername', email: 'test@example.com', password: 'password', confirm_password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ username: 'validusername', email: 'test@example.com' });
  });
});
