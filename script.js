
const form = document.getElementById('mood-form');
const moodLog = document.getElementById('mood-log');

const API_URL = 'http://localhost:3000/api/moods';

// Load moods
async function loadMoods() {
    const response = await fetch(API_URL);
    const moods = await response.json();
    moodLog.innerHTML = moods
        .map((mood) => `
            <div>
                <strong>${mood.date}</strong>: ${mood.mood}
                ${mood.notes ? `<p>${mood.notes}</p>` : ''}
            </div>
        `)
        .join('');
}

// Submit mood
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mood = document.getElementById('mood').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, date, notes }),
    });

    form.reset();
    loadMoods();
});

// Initial load
loadMoods();
