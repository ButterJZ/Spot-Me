const users = [
  {
    id: "u-201",
    name: "Ari",
    gym: "Anytime Fitness - Downtown",
    focus: "Strength",
    slots: ["Mon 7pm", "Wed 7pm", "Sat 10am"],
    bio: "Calm sets, strict form, no ego lifts."
  },
  {
    id: "u-202",
    name: "Maya",
    gym: "Fit Factory - West",
    focus: "Fat Loss",
    slots: ["Tue 6am", "Thu 6am", "Sun 9am"],
    bio: "Likes short sessions and consistency."
  },
  {
    id: "u-203",
    name: "Luca",
    gym: "Anytime Fitness - Downtown",
    focus: "Muscle Gain",
    slots: ["Mon 7pm", "Fri 7pm", "Sun 5pm"],
    bio: "Push-pull-legs and protein every day."
  },
  {
    id: "u-204",
    name: "Nina",
    gym: "Peak Gym - Central",
    focus: "Strength",
    slots: ["Wed 7pm", "Fri 7pm", "Sat 10am"],
    bio: "Powerlifting beginner, loves clear plans."
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
  gym: "Anytime Fitness - Downtown",
  focus: "Strength",
  slots: ["Mon 7pm", "Wed 7pm"]
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
