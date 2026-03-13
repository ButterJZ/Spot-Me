const makeAvatar = (name, bg = "#1c1c1c", fg = "#ff4d4d") => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='400' viewBox='0 0 320 400'><rect width='320' height='400' rx='24' fill='${bg}'/><circle cx='160' cy='140' r='66' fill='#2f2f2f'/><path d='M70 330c20-60 70-90 90-90s70 30 90 90' fill='#2f2f2f'/><text x='160' y='370' text-anchor='middle' fill='${fg}' font-family='Arial, sans-serif' font-size='40' font-weight='700'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const users = [
  {
    id: "u-301",
    name: "Marcus",
    age: 26,
    gym: "LA Fitness",
    focus: ["Chest", "Arms"],
    days: ["Mon", "Wed", "Fri"],
    timeSlot: "6pm-7pm",
    bio: "Consistency first. Looking for structured evening sessions.",
    photo: makeAvatar("Marcus", "#171717")
  },
  {
    id: "u-302",
    name: "Priya",
    age: 24,
    gym: "LA Fitness",
    focus: ["Cardio", "Full Body"],
    days: ["Mon", "Fri"],
    timeSlot: "7am-8am",
    bio: "Morning workouts and high-energy training partners only.",
    photo: makeAvatar("Priya", "#1d1515")
  },
  {
    id: "u-303",
    name: "Jake",
    age: 25,
    gym: "LA Fitness",
    focus: ["Legs", "Chest"],
    days: ["Wed", "Sat"],
    timeSlot: "6pm-7pm",
    bio: "Leg days are non-negotiable. Likes focused sessions.",
    photo: makeAvatar("Jake", "#1c1c1c")
  },
  {
    id: "u-304",
    name: "Sophie",
    age: 23,
    gym: "Planet Fitness",
    focus: ["Yoga", "Cardio"],
    days: ["Tue", "Thu", "Sat"],
    timeSlot: "8am-9am",
    bio: "Flexible and friendly. Loves active recovery routines.",
    photo: makeAvatar("Sophie", "#15181e")
  },
  {
    id: "u-305",
    name: "Kevin",
    age: 28,
    gym: "Planet Fitness",
    focus: ["Chest", "Back"],
    days: ["Mon", "Wed", "Fri"],
    timeSlot: "7pm-8pm",
    bio: "Balanced upper-body splits and disciplined progression.",
    photo: makeAvatar("Kevin", "#201313")
  },
  {
    id: "u-306",
    name: "Lisa",
    age: 24,
    gym: "24 Hour Fitness",
    focus: ["Full Body"],
    days: ["Mon", "Tue", "Thu"],
    timeSlot: "6am-7am",
    bio: "Early sessions with clear goals and efficient pacing.",
    photo: makeAvatar("Lisa", "#141a18")
  },
  {
    id: "u-307",
    name: "Derek",
    age: 27,
    gym: "24 Hour Fitness",
    focus: ["Shoulders", "Arms"],
    days: ["Mon", "Wed", "Fri"],
    timeSlot: "6pm-7pm",
    bio: "Evening lifter. Form checks and progressive overload.",
    photo: makeAvatar("Derek", "#171717")
  },
  {
    id: "u-308",
    name: "Amy",
    age: 22,
    gym: "Equinox",
    focus: ["Legs", "Cardio"],
    days: ["Tue", "Thu"],
    timeSlot: "7am-8am",
    bio: "Cardio finishers and lower-body intensity sessions.",
    photo: makeAvatar("Amy", "#1f1616")
  },
  {
    id: "u-309",
    name: "Ryan",
    age: 29,
    gym: "Equinox",
    focus: ["Back", "Shoulders"],
    days: ["Mon", "Wed", "Sat"],
    timeSlot: "5pm-6pm",
    bio: "Post-work training and clean technical movements.",
    photo: makeAvatar("Ryan", "#12161d")
  }
];

const overlapCount = (left, right) => {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item)).length;
};

export const getMatches = (profile) => {
  return users
    .map((user) => {
      const sameGym = user.gym === profile.gym;
      const focusOverlap = overlapCount(user.focus, profile.focuses);
      const dayOverlap = overlapCount(user.days, profile.days);
      const sameTimeSlot = user.timeSlot === profile.timeSlot;

      const gymScore = sameGym ? 30 : 0;
      const focusScore = Math.min(focusOverlap * 18, 35);
      const dayScore = Math.min(dayOverlap * 8, 25);
      const timeScore = sameTimeSlot ? 10 : 0;
      const score = gymScore + focusScore + dayScore + timeScore;

      return {
        ...user,
        score,
        reasons: [
          sameGym ? "Same gym" : "Different gym",
          focusOverlap > 0
            ? `${focusOverlap} overlapping focus area(s)`
            : "No overlapping focus yet",
          dayOverlap > 0 ? `${dayOverlap} overlapping day(s)` : "No shared training days",
          sameTimeSlot ? "Same time slot" : "Different time slot"
        ]
      };
    })
    .sort((a, b) => b.score - a.score);
};

export const gymOptions = [...new Set(users.map((user) => user.gym))];
export const focusOptions = [...new Set(users.flatMap((user) => user.focus))];
export const dayOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const timeSlotOptions = [...new Set(users.map((user) => user.timeSlot))];

export const initialProfile = {
  name: "",
  age: "24",
  gym: gymOptions[0],
  focuses: ["Chest"],
  days: ["Mon", "Wed", "Fri"],
  timeSlot: "6pm-7pm",
  bio: "",
  photo: makeAvatar("You", "#141414", "#ff6f6f")
};

export const makeProfileAvatar = (name) =>
  makeAvatar(name || "You", "#141414", "#ff6f6f");
