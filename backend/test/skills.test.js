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

test('GET /api/skills returns the sample skill listings', async (t) => {
  const server = app.listen(0);
  t.after(() => server.close());

  const res = await get(server, '/api/skills');
  assert.strictEqual(res.status, 200);
  const data = JSON.parse(res.body);
  assert.ok(Array.isArray(data.skills));
  assert.strictEqual(data.count, data.skills.length);
  assert.ok(data.count >= 1);
  for (const s of data.skills) {
    assert.ok(s.name && s.offers && s.wants);
  }
});
