const express = require('express');
const cors = require('cors');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;
const COMMIT_SHA =
  process.env.COMMIT_SHA ||
  process.env.RENDER_GIT_COMMIT ||
  process.env.GITHUB_SHA ||
  'local';

app.use(cors());
app.use(express.json());

// ---- Prometheus metrics ----
client.collectDefaultMetrics({ prefix: 'skillswapify_' });
const httpRequestsTotal = new client.Counter({
  name: 'skillswapify_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

// ---- Routes ----
app.get('/', (req, res) => {
  res.json({
    name: 'Skill Swapify API',
    status: 'running',
    commit: COMMIT_SHA,
    endpoints: ['/health', '/metrics', '/api/skills'],
  });
});

// Required by the milestone sheet: returns the running commit SHA.
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    commit: COMMIT_SHA,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


// Sample skill-exchange listings used by the frontend skills board.
const SKILLS = [
  { name: 'Aarav', offers: 'Guitar', wants: 'Python programming' },
  { name: 'Meera', offers: 'Photography', wants: 'Public speaking' },
  { name: 'Kabir', offers: 'Video editing', wants: 'Guitar' },
  { name: 'Sana', offers: 'French', wants: 'Data analysis' },
  { name: 'Rohan', offers: 'Cooking', wants: 'Photography' },
  { name: 'Isha', offers: 'Data analysis', wants: 'French' },
];

app.get('/api/skills', (req, res) => {
  res.json({ count: SKILLS.length, skills: SKILLS });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Only listen when run directly (tests import the app without binding a port)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Skill Swapify backend listening on port ${PORT} (commit ${COMMIT_SHA})`);
  });
}

module.exports = app;
