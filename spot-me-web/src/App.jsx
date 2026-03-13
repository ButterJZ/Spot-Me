import { useMemo, useState } from "react";
import {
  focusOptions,
  getMatches,
  gymOptions,
  initialProfile,
  slotOptions
} from "./matches";

const toggleSlot = (currentSlots, slot) => {
  if (currentSlots.includes(slot)) {
    return currentSlots.filter((item) => item !== slot);
  }
  return [...currentSlots, slot];
};

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [submittedProfile, setSubmittedProfile] = useState(initialProfile);
  const [currentIndex, setCurrentIndex] = useState(0);

  const matches = useMemo(
    () => getMatches(submittedProfile),
    [submittedProfile]
  );

  const currentMatch = matches[currentIndex];

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedProfile(profile);
    setCurrentIndex(0);
  };

  const moveCard = (direction) => {
    if (!currentMatch) {
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < matches.length) {
      setCurrentIndex(nextIndex);
    }

    // Keep this text-first and minimal: actions are reflected by label only.
    console.log(`${direction.toUpperCase()}: ${currentMatch.name}`);
  };

  return (
    <main className="app-shell">
      <header className="top-bar">
        <p className="brand-dot" aria-hidden="true">
          SPOT-ME
        </p>
        <p className="muted-text">Find your gym buddy, fast.</p>
      </header>

      <section className="layout-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <h1>Profile</h1>
          <p className="muted-text">Simple inputs. Better matches.</p>

          <label>
            Name
            <input
              type="text"
              value={profile.name}
              placeholder="Your name"
              onChange={(event) =>
                setProfile((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </label>

          <label>
            Gym
            <select
              value={profile.gym}
              onChange={(event) =>
                setProfile((prev) => ({ ...prev, gym: event.target.value }))
              }
            >
              {gymOptions.map((gym) => (
                <option key={gym} value={gym}>
                  {gym}
                </option>
              ))}
            </select>
          </label>

          <label>
            Training Focus
            <select
              value={profile.focus}
              onChange={(event) =>
                setProfile((prev) => ({ ...prev, focus: event.target.value }))
              }
            >
              {focusOptions.map((focus) => (
                <option key={focus} value={focus}>
                  {focus}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Available Slots</legend>
            <div className="chips">
              {slotOptions.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={profile.slots.includes(slot) ? "chip active" : "chip"}
                  onClick={() =>
                    setProfile((prev) => ({
                      ...prev,
                      slots: toggleSlot(prev.slots, slot)
                    }))
                  }
                >
                  {slot}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="cta" type="submit">
            Get Matches
          </button>
        </form>

        <section className="panel card-panel">
          <h2>Matches</h2>
          <p className="muted-text">
            {currentMatch
              ? `Candidate ${currentIndex + 1} of ${matches.length}`
              : "No more cards. Refresh matches to restart."}
          </p>

          {currentMatch ? (
            <article className="match-card">
              <p className="score">Match Score: {currentMatch.score}</p>
              <h3>{currentMatch.name}</h3>
              <p>{currentMatch.bio}</p>
              <p className="meta">Gym: {currentMatch.gym}</p>
              <p className="meta">Focus: {currentMatch.focus}</p>
              <p className="meta">
                Slots: {currentMatch.slots.join(" / ")}
              </p>
              <ul>
                {currentMatch.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </article>
          ) : (
            <article className="match-card empty">
              <p>You have reviewed every candidate.</p>
              <p className="muted-text">Adjust profile and run matching again.</p>
            </article>
          )}

          <div className="actions">
            <button
              type="button"
              className="ghost"
              onClick={() => moveCard("pass")}
              disabled={!currentMatch}
            >
              Pass
            </button>
            <button
              type="button"
              className="cta"
              onClick={() => moveCard("like")}
              disabled={!currentMatch}
            >
              Like
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
