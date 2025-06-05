const request = require('supertest');
const { app, server } = require('../app');

// Close the server after all tests
afterAll((done) => {
  server.close(done);
});

describe('API Endpoints', () => {
  test('GET /api should return success message', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.status).toBe('success');
  });

  test('GET /api/health should return UP status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });

  test('GET /api/info should return app information', async () => {
    const response = await request(app).get('/api/info');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('app');
    expect(response.body).toHaveProperty('features');
    expect(Array.isArray(response.body.features)).toBe(true);
  });
});