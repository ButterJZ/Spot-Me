import { useMemo, useState } from "react";
import {
  dayOptions,
  focusOptions,
  getMatches,
  gymOptions,
  initialProfile,
  makeProfileAvatar,
  timeSlotOptions
} from "./matches";

const PAGES = {
  LANDING: "landing",
  LOGIN: "login",
  SIGNUP: "signup",
  ONBOARDING: "onboarding",
  DASHBOARD: "dashboard"
};

const toggleListItem = (items, value) =>
  items.includes(value) ? items.filter((item) => item !== value) : [...items, value];

const updateProfileFromEvent = (setProfile, field) => (event) =>
  setProfile((prev) => ({ ...prev, [field]: event.target.value }));

function AuthCard({ title, subtitle, primaryCta, altText, altCta, onAlt, onSubmit }) {
  return (
    <section className="auth-wrap">
      <article className="auth-card">
        <p className="brand-kicker">SPOT-ME</p>
        <h1>{title}</h1>
        <p className="muted-text">{subtitle}</p>
        <form className="stack-form" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" required placeholder="you@email.com" />
          </label>
          <label>
            Password
            <input type="password" required placeholder="••••••••" />
          </label>
          <button type="submit" className="cta">
            {primaryCta}
          </button>
        </form>
        <p className="auth-switch">
          {altText}{" "}
          <button className="link-btn" type="button" onClick={onAlt}>
            {altCta}
          </button>
        </p>
      </article>
    </section>
  );
}

function App() {
  const [page, setPage] = useState(PAGES.LANDING);
  const [profile, setProfile] = useState(initialProfile);
  const [submittedProfile, setSubmittedProfile] = useState(initialProfile);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState([]);

  const matches = useMemo(() => getMatches(submittedProfile), [submittedProfile]);
  const currentMatch = matches[currentIndex];

  const goToDashboard = () => {
    const safeProfile = {
      ...profile,
      name: profile.name || "You",
      photo: profile.photo || makeProfileAvatar(profile.name || "You")
    };
    setSubmittedProfile(safeProfile);
    setProfile(safeProfile);
    setPage(PAGES.DASHBOARD);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const moveCard = (direction) => {
    if (!currentMatch) {
      return;
    }

    if (direction === "like") {
      setLiked((prev) => {
        if (prev.some((person) => person.id === currentMatch.id)) {
          return prev;
        }
        return [...prev, currentMatch];
      });
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (page === PAGES.LANDING) {
    return (
      <main className="screen landing-screen">
        <header className="landing-nav">
          <p className="brand-kicker">SPOT-ME</p>
          <div className="row-actions">
            <button className="ghost small" onClick={() => setPage(PAGES.LOGIN)}>
              Log In
            </button>
            <button className="cta small" onClick={() => setPage(PAGES.SIGNUP)}>
              Sign Up
            </button>
          </div>
        </header>

        <section className="landing-hero">
          <p className="hero-tag">Gym partner matching for modern routines.</p>
          <h1>
            Meet your next training partner.
            <span> In minutes.</span>
          </h1>
          <p className="muted-text">
            Profile-first, schedule-aware, and designed for fast demo storytelling.
          </p>
          <div className="row-actions">
            <button className="cta" onClick={() => setPage(PAGES.SIGNUP)}>
              Start Matching
            </button>
            <button className="ghost" onClick={() => setPage(PAGES.LOGIN)}>
              I already have an account
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (page === PAGES.LOGIN) {
    return (
      <AuthCard
        title="Welcome back"
        subtitle="Log in and keep building your streak with a gym buddy."
        primaryCta="Log In"
        altText="New here?"
        altCta="Create account"
        onAlt={() => setPage(PAGES.SIGNUP)}
        onSubmit={(event) => {
          event.preventDefault();
          setPage(PAGES.DASHBOARD);
        }}
      />
    );
  }

  if (page === PAGES.SIGNUP) {
    return (
      <AuthCard
        title="Create account"
        subtitle="Build your profile and get your first matches instantly."
        primaryCta="Create Account"
        altText="Already have an account?"
        altCta="Log in"
        onAlt={() => setPage(PAGES.LOGIN)}
        onSubmit={(event) => {
          event.preventDefault();
          setPage(PAGES.ONBOARDING);
        }}
      />
    );
  }

  if (page === PAGES.ONBOARDING) {
    return (
      <main className="screen onboarding-screen">
        <section className="onboarding-shell">
          <article className="panel">
            <p className="brand-kicker">ONBOARDING</p>
            <h1>Set your matching profile</h1>
            <p className="muted-text">
              Keep it short. We will optimize based on your gym, focus, and schedule.
            </p>
            <form
              className="stack-form"
              onSubmit={(event) => {
                event.preventDefault();
                goToDashboard();
              }}
            >
              <label>
                Name
                <input
                  type="text"
                  value={profile.name}
                  onChange={updateProfileFromEvent(setProfile, "name")}
                  placeholder="Alex Morgan"
                />
              </label>
              <label>
                Age
                <input
                  type="number"
                  min="18"
                  max="60"
                  value={profile.age}
                  onChange={updateProfileFromEvent(setProfile, "age")}
                />
              </label>
              <label>
                Gym
                <select
                  value={profile.gym}
                  onChange={updateProfileFromEvent(setProfile, "gym")}
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
                <div className="chips focus-chips">
                  {focusOptions.map((focus) => (
                    <button
                      key={focus}
                      type="button"
                      className={profile.focuses.includes(focus) ? "chip active" : "chip"}
                      onClick={() =>
                        setProfile((prev) => ({
                          ...prev,
                          focuses: toggleListItem(prev.focuses, focus)
                        }))
                      }
                    >
                      {focus}
                    </button>
                  ))}
                </div>
              </label>
              <label>
                Bio
                <textarea
                  rows="3"
                  value={profile.bio}
                  onChange={updateProfileFromEvent(setProfile, "bio")}
                  placeholder="What training vibe are you looking for?"
                />
              </label>
              <label>
                Upload Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
              </label>

              <fieldset className="availability-field">
                <legend>Available Slots</legend>
                <div className="availability-grid">
                  <section>
                    <p className="slot-label">Days</p>
                    <div className="day-chips">
                      {dayOptions.map((day) => (
                        <button
                          key={day}
                          type="button"
                          className={profile.days.includes(day) ? "chip active" : "chip"}
                          onClick={() =>
                            setProfile((prev) => ({
                              ...prev,
                              days: toggleListItem(prev.days, day)
                            }))
                          }
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </section>
                  <label className="timeslot-select">
                    Time Slot
                    <select
                      value={profile.timeSlot}
                      onChange={updateProfileFromEvent(setProfile, "timeSlot")}
                    >
                      {timeSlotOptions.map((timeSlot) => (
                        <option key={timeSlot} value={timeSlot}>
                          {timeSlot}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>
              <button type="submit" className="cta">
                Continue to Dashboard
              </button>
            </form>
          </article>

          <aside className="panel profile-preview">
            <p className="muted-text">Live Preview</p>
            <img
              className="profile-photo large"
              src={profile.photo || makeProfileAvatar(profile.name || "You")}
              alt="Profile preview"
            />
            <h3>{profile.name || "You"}</h3>
            <p className="muted-text">{profile.focuses.join(", ")}</p>
            <p className="muted-text">
              {profile.days.join(" / ")} - {profile.timeSlot}
            </p>
            <p>{profile.bio || "No bio yet."}</p>
          </aside>
        </section>
      </main>
    );
  }

  return (
    <main className="screen dashboard-screen">
      <header className="dashboard-topbar">
        <div>
          <p className="brand-kicker">SPOT-ME DASHBOARD</p>
          <h1>Welcome, {submittedProfile.name || "Athlete"}.</h1>
        </div>
        <div className="row-actions">
          <button className="ghost small" onClick={() => setPage(PAGES.ONBOARDING)}>
            Edit Profile
          </button>
          <button className="ghost small" onClick={() => setPage(PAGES.LANDING)}>
            Log Out
          </button>
        </div>
      </header>

      <section className="dashboard-grid">
        <aside className="panel side-panel">
          <img
            className="profile-photo"
            src={submittedProfile.photo}
            alt={`${submittedProfile.name} profile`}
          />
          <h2>{submittedProfile.name || "You"}</h2>
          <p className="meta">{submittedProfile.gym}</p>
          <p className="meta">{submittedProfile.focuses.join(", ")}</p>
          <p className="meta">
            {submittedProfile.days.join(" / ")} - {submittedProfile.timeSlot}
          </p>
          <div className="kpi-row">
            <article>
              <p className="kpi-num">{matches.length}</p>
              <p className="muted-text tiny">Candidates</p>
            </article>
            <article>
              <p className="kpi-num">{liked.length}</p>
              <p className="muted-text tiny">Liked</p>
            </article>
          </div>
        </aside>

        <section className="panel discover-panel">
          <div className="heading-row">
            <h2>Discover</h2>
            <p className="muted-text">
              {currentMatch ? `Card ${currentIndex + 1}/${matches.length}` : "Done"}
            </p>
          </div>

          {currentMatch ? (
            <article className="match-card image-card">
              <img
                className="match-photo"
                src={currentMatch.photo}
                alt={`${currentMatch.name} profile`}
              />
              <div className="match-content">
                <p className="score">Match Score: {currentMatch.score}</p>
                <h3>
                  {currentMatch.name}, {currentMatch.age}
                </h3>
                <p>{currentMatch.bio}</p>
                <p className="meta">{currentMatch.gym}</p>
                <p className="meta">Focus: {currentMatch.focus.join(", ")}</p>
                <p className="meta">
                  Availability: {currentMatch.days.join(" / ")} - {currentMatch.timeSlot}
                </p>
                <ul>
                  {currentMatch.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
            </article>
          ) : (
            <article className="match-card empty">
              <p>No more candidates right now.</p>
              <p className="muted-text">Try editing profile preferences.</p>
            </article>
          )}

          <div className="actions">
            <button className="ghost" onClick={() => moveCard("pass")} disabled={!currentMatch}>
              Pass
            </button>
            <button className="cta" onClick={() => moveCard("like")} disabled={!currentMatch}>
              Like
            </button>
          </div>
        </section>

        <section className="stack-col">
          <article className="panel feed-panel">
            <h2>Recent Likes</h2>
            {liked.length === 0 ? (
              <p className="muted-text">Like a few profiles to populate this list.</p>
            ) : (
              <ul className="feed-list">
                {liked.map((person) => (
                  <li key={person.id}>
                    <img className="profile-photo mini" src={person.photo} alt={person.name} />
                    <div>
                      <p>{person.name}</p>
                      <p className="muted-text tiny">{person.focus.join(", ")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="panel feed-panel">
            <h2>Upcoming Sessions</h2>
            {submittedProfile.days.length === 0 ? (
              <p className="muted-text">Add available days in onboarding to see sessions.</p>
            ) : (
              <ul className="sessions">
                {submittedProfile.days.slice(0, 3).map((day) => (
                  <li key={day}>
                    <span>
                      {day} {submittedProfile.timeSlot}
                    </span>
                    <span className="muted-text">
                      {submittedProfile.focuses[0] || "Workout"} session
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
