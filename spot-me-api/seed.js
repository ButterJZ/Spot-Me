const BASE_URL = 'http://localhost:3001';

const SEED_USERS = [
  { name: "Ari Stone",   gym: "Anytime Fitness - Downtown", focus: "Strength",    slots: ["Mon 7pm", "Wed 7pm", "Sat 10am"] },
  { name: "Luca Park",   gym: "Anytime Fitness - Downtown", focus: "Muscle Gain", slots: ["Mon 7pm", "Fri 7pm", "Sun 5pm"] },
  { name: "Sam Rivera",  gym: "Anytime Fitness - Downtown", focus: "Fat Loss",    slots: ["Mon 7pm", "Thu 6am", "Sun 9am"] },
  { name: "Maya Chen",   gym: "Fit Factory - West",         focus: "Fat Loss",    slots: ["Tue 6am", "Thu 6am", "Sun 9am"] },
  { name: "Jules Kim",   gym: "Peak Gym - Central",         focus: "Muscle Gain", slots: ["Tue 6am", "Fri 7pm", "Sun 5pm"] },
  { name: "Nina Brooks", gym: "Peak Gym - Central",         focus: "Strength",    slots: ["Wed 7pm", "Fri 7pm", "Sat 10am"] },
];

async function seed() {
  console.log('Seeding users...');
  for (const user of SEED_USERS) {
    const res = await fetch(`${BASE_URL}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(`  created: ${data.name} (${data.userId})`);
  }
  console.log(`Done. ${SEED_USERS.length} users seeded.`);
}

seed().catch(console.error);
