// Skill Swapify frontend - plain HTML/CSS/JavaScript (no build step)

// When the frontend is served on its own (e.g. GitHub Pages) there is no
// backend next to it, so this falls back to localhost for local/Docker use.
// In docker-compose the API is reachable on the host at port 3000.
const API_URL = window.SKILLSWAPIFY_API_URL || 'http://localhost:3000';

const SKILLS = [
  { name: 'Aarav', offers: 'Guitar', wants: 'Python programming' },
  { name: 'Meera', offers: 'Photography', wants: 'Public speaking' },
  { name: 'Kabir', offers: 'Video editing', wants: 'Guitar' },
  { name: 'Sana', offers: 'French', wants: 'Data analysis' },
  { name: 'Rohan', offers: 'Cooking', wants: 'Photography' },
  { name: 'Isha', offers: 'Data analysis', wants: 'French' },
];

document.getElementById('skills').innerHTML = SKILLS.map(
  (s) =>
    `<li><strong>${s.name}</strong> teaches <strong>${s.offers}</strong><br>` +
    `<span class="wants">wants to learn: ${s.wants}</span></li>`
).join('');

fetch(`${API_URL}/health`)
  .then((r) => r.json())
  .then((data) => {
    document.getElementById('health').textContent = JSON.stringify(data, null, 2);
  })
  .catch(() => {
    document.getElementById('health').textContent =
      'Backend not reachable from this deployment (expected on the static Pages site - run docker compose up to see it live).';
  });
