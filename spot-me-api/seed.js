const BASE_URL = 'http://localhost:3001';

const users = [
  { name: 'Alex', gym: 'LA Fitness - Sunnyvale', trainingFocus: ['chest', 'arms'], timeSlots: ['Mon 6pm', 'Wed 7am'] },
  { name: 'Jordan', gym: 'LA Fitness - Sunnyvale', trainingFocus: ['chest', 'legs'], timeSlots: ['Mon 6pm', 'Fri 5pm'] },
  { name: 'Sam', gym: 'LA Fitness - Sunnyvale', trainingFocus: ['arms', 'cardio'], timeSlots: ['Wed 7am', 'Fri 5pm'] },
  { name: 'Taylor', gym: 'Planet Fitness - Downtown', trainingFocus: ['legs', 'cardio'], timeSlots: ['Mon 6pm', 'Thu 8am'] },
  { name: 'Morgan', gym: 'LA Fitness - Sunnyvale', trainingFocus: ['chest', 'arms'], timeSlots: ['Mon 6pm'] },
  { name: 'Casey', gym: 'Gold Gym - Eastside', trainingFocus: ['chest'], timeSlots: ['Wed 7am', 'Sat 9am'] },
];

async function seed() {
  console.log('Seeding users...');
  for (const user of users) {
    const res = await fetch(`${BASE_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(`  created: ${data.name} (${data.userId})`);
  }
  console.log('Done. 6 users seeded.');
}

seed().catch(console.error);
