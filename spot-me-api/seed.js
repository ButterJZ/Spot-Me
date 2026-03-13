const BASE_URL = 'http://localhost:3001';

const SEED_USERS = [
  { name: "Marcus", gym: "LA Fitness", focus: ["Chest", "Arms"], days: ["Mon", "Wed", "Fri"], timeSlot: "6pm-7pm" },
  { name: "Priya", gym: "LA Fitness", focus: ["Cardio", "Full Body"], days: ["Mon", "Fri"], timeSlot: "7am-8am" },
  { name: "Jake", gym: "LA Fitness", focus: ["Legs", "Chest"], days: ["Wed", "Sat"], timeSlot: "6pm-7pm" },
  { name: "Sophie", gym: "Planet Fitness", focus: ["Yoga", "Cardio"], days: ["Tue", "Thu", "Sat"], timeSlot: "8am-9am" },
  { name: "Kevin", gym: "Planet Fitness", focus: ["Chest", "Back"], days: ["Mon", "Wed", "Fri"], timeSlot: "7pm-8pm" },
  { name: "Lisa", gym: "24 Hour Fitness", focus: ["Full Body"], days: ["Mon", "Tue", "Thu"], timeSlot: "6am-7am" },
  { name: "Derek", gym: "24 Hour Fitness", focus: ["Shoulders", "Arms"], days: ["Mon", "Wed", "Fri"], timeSlot: "6pm-7pm" },
  { name: "Amy", gym: "Equinox", focus: ["Legs", "Cardio"], days: ["Tue", "Thu"], timeSlot: "7am-8am" },
  { name: "Ryan", gym: "Equinox", focus: ["Back", "Shoulders"], days: ["Mon", "Wed", "Sat"], timeSlot: "5pm-6pm" },
  { name: "Mia", gym: "Gold's Gym", focus: ["Chest", "Legs", "Arms"], days: ["Mon", "Tue", "Wed", "Thu", "Fri"], timeSlot: "8pm-9pm" },
  { name: "Carlos", gym: "Gold's Gym", focus: ["Full Body"], days: ["Sat", "Sun"], timeSlot: "9am-10am" },
  { name: "Nina", gym: "LA Fitness", focus: ["Back", "Legs"], days: ["Mon", "Wed"], timeSlot: "6pm-7pm" },
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
