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
    id: "u-201",
    name: "Ari Stone",
    age: 24,
    gym: "Anytime Fitness - Downtown",
    focus: "Strength",
    slots: ["Mon 7pm", "Wed 7pm", "Sat 10am"],
    bio: "Calm sets, strict form, no ego lifts.",
    photo: makeAvatar("Ari Stone", "#181818")
  },
  {
    id: "u-202",
    name: "Maya Chen",
    age: 22,
    gym: "Fit Factory - West",
    focus: "Fat Loss",
    slots: ["Tue 6am", "Thu 6am", "Sun 9am"],
    bio: "Short sessions, clean food, high consistency.",
    photo: makeAvatar("Maya Chen", "#1e1515")
  },
  {
    id: "u-203",
    name: "Luca Park",
    age: 26,
    gym: "Anytime Fitness - Downtown",
    focus: "Muscle Gain",
    slots: ["Mon 7pm", "Fri 7pm", "Sun 5pm"],
    bio: "Push-pull-legs and protein every day.",
    photo: makeAvatar("Luca Park", "#12141b")
  },
  {
    id: "u-204",
    name: "Nina Brooks",
    age: 25,
    gym: "Peak Gym - Central",
    focus: "Strength",
    slots: ["Wed 7pm", "Fri 7pm", "Sat 10am"],
    bio: "Powerlifting beginner who loves clear plans.",
    photo: makeAvatar("Nina Brooks", "#201414")
  },
  {
    id: "u-205",
    name: "Sam Rivera",
    age: 23,
    gym: "Anytime Fitness - Downtown",
    focus: "Fat Loss",
    slots: ["Mon 7pm", "Thu 6am", "Sun 9am"],
    bio: "Cardio + lifting mix, early morning energy.",
    photo: makeAvatar("Sam Rivera", "#191919")
  },
  {
    id: "u-206",
    name: "Jules Kim",
    age: 27,
    gym: "Peak Gym - Central",
    focus: "Muscle Gain",
    slots: ["Tue 6am", "Fri 7pm", "Sun 5pm"],
    bio: "Hypertrophy blocks and disciplined recovery.",
    photo: makeAvatar("Jules Kim", "#1d1111")
  }
];

const overlapCount = (left, right) => {
  const rightSet = new Set(right);
  return left.filter((slot) => rightSet.has(slot)).length;
};

export const getMatches = (profile) => {
  return users
    .map((user) => {
      const sameGym = user.gym === profile.gym;
      const sameFocus = user.focus === profile.focus;
      const overlap = overlapCount(user.slots, profile.slots);

      const gymScore = sameGym ? 40 : 0;
      const focusScore = sameFocus ? 30 : 0;
      const slotScore = Math.min(overlap * 15, 30);
      const score = gymScore + focusScore + slotScore;

      return {
        ...user,
        score,
        reasons: [
          sameGym ? "Same gym" : "Different gym",
          sameFocus ? "Same training focus" : "Different training focus",
          overlap > 0 ? `${overlap} overlapping slot(s)` : "No shared slots yet"
        ]
      };
    })
    .sort((a, b) => b.score - a.score);
};

export const initialProfile = {
  name: "",
  age: "24",
  gym: "Anytime Fitness - Downtown",
  focus: "Strength",
  bio: "",
  slots: ["Mon 7pm", "Wed 7pm"],
  photo: makeAvatar("You", "#141414", "#ff6f6f")
};

export const gymOptions = [
  "Anytime Fitness - Downtown",
  "Fit Factory - West",
  "Peak Gym - Central"
];

export const focusOptions = ["Strength", "Muscle Gain", "Fat Loss"];

export const slotOptions = [
  "Mon 7pm",
  "Tue 6am",
  "Wed 7pm",
  "Thu 6am",
  "Fri 7pm",
  "Sat 10am",
  "Sun 9am",
  "Sun 5pm"
];

export const makeProfileAvatar = (name) =>
  makeAvatar(name || "You", "#141414", "#ff6f6f");
