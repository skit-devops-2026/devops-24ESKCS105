const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../server');

function get(server, path) {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    http
      .get({ host: '127.0.0.1', port, path }, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      })
      .on('error', reject);
  });
}

test('GET /health returns ok and a commit field', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const res = await get(server, '/health');
  assert.strictEqual(res.status, 200);
  const data = JSON.parse(res.body);
  assert.strictEqual(data.status, 'ok');
  assert.ok('commit' in data);
});

test('GET / returns running status', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const res = await get(server, '/');
  assert.strictEqual(res.status, 200);
  assert.strictEqual(JSON.parse(res.body).status, 'running');
});
