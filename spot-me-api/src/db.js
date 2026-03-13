const store = new Map();

function saveUser(user) {
  store.set(user.userId, user);
  return user;
}

function getUser(userId) {
  return store.get(userId) ?? null;
}

function getAllUsers() {
  return Array.from(store.values());
}

// Test helper — do not call in production code
function _reset() {
  store.clear();
}

module.exports = { saveUser, getUser, getAllUsers, _reset };
