'use client';

// Thin client for the existing mytr.ai backend (api.mytr.ai — a separate,
// already-deployed FastAPI service; see DEPLOYMENT.md). Plain JS, not a
// React context, so both React components (Nav, AuthModal) and the
// imperative SpikeLabScript can import the same singleton module and share
// one source of truth for session state via the subscribe() pub/sub below.
//
// Session tokens are JSON bearer tokens from the API (no cookie option is
// offered server-side), so localStorage is the only place to keep them on
// a static site. Treat this like any other access/refresh bearer pair.

const API_BASE = 'https://api.mytr.ai/api/v1';
const LS_ACCESS = 'mytr_access_token';
const LS_REFRESH = 'mytr_refresh_token';
const LS_USER = 'mytr_user';

const listeners = new Set();
function notify() {
  const user = getUser();
  listeners.forEach((fn) => fn(user));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function readStorage(key) {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(key); } catch { return null; }
}
function writeStorage(key, val) {
  if (typeof window === 'undefined') return;
  try {
    if (val == null) localStorage.removeItem(key);
    else localStorage.setItem(key, val);
  } catch { /* storage unavailable (private mode, etc.) — fail silent */ }
}

export function getUser() {
  const raw = readStorage(LS_USER);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
export function getAccessToken() {
  return readStorage(LS_ACCESS);
}
function getRefreshToken() {
  return readStorage(LS_REFRESH);
}
export function isLoggedIn() {
  return !!getAccessToken() && !!getUser();
}

function setSession(tokens) {
  writeStorage(LS_ACCESS, tokens.access_token);
  writeStorage(LS_REFRESH, tokens.refresh_token);
}
function setUser(user) {
  writeStorage(LS_USER, JSON.stringify(user));
  notify();
}
function clearSession() {
  writeStorage(LS_ACCESS, null);
  writeStorage(LS_REFRESH, null);
  writeStorage(LS_USER, null);
  notify();
}

async function parseErrorMessage(res, fallback) {
  try {
    const body = await res.json();
    if (typeof body.detail === 'string') return body.detail;
    if (body.detail && typeof body.detail.message === 'string') return body.detail.message;
  } catch { /* non-JSON error body */ }
  return fallback;
}

export async function fetchProfile() {
  const token = getAccessToken();
  if (!token) throw new Error('Not signed in.');
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res, 'Could not load your profile.'));
  return res.json();
}

export async function login({ email, password, rememberMe }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, remember_me: !!rememberMe }),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res, 'Could not sign in.'));
  const data = await res.json();
  setSession(data);
  try {
    const profile = await fetchProfile();
    setUser(profile);
    return profile;
  } catch {
    // /auth/me failing right after a successful /auth/login is unlikely,
    // but the session itself is still good — fall back to what login gave us.
    const fallback = {
      id: data.user_id, name: data.name, email,
      user_type: data.user_type, onboarding_complete: true, email_verified: false,
    };
    setUser(fallback);
    return fallback;
  }
}

export async function signup({ name, email, password, termsAccepted }) {
  const res = await fetch(`${API_BASE}/users/onboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // user_type is a required field on this endpoint but isn't read or
      // stored by the handler (verified against the backend source) — the
      // website only collects name/email/password, not the full
      // health-profile wizard the mobile app's onboarding flow has.
      user_type: 'individual',
      name,
      email,
      password,
      terms_accepted: !!termsAccepted,
    }),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res, 'Could not create your account.'));
  const data = await res.json();
  setSession(data);
  try {
    const profile = await fetchProfile();
    setUser(profile);
    return profile;
  } catch {
    const fallback = {
      id: data.user_id, name, email,
      user_type: null, onboarding_complete: false, email_verified: false,
    };
    setUser(fallback);
    return fallback;
  }
}

// Clears this browser's local session only. There's no single-session
// revoke endpoint on the API (only /auth/logout-all, which invalidates
// every refresh token for the account — including the mobile app's — so
// it's deliberately not called here).
export function logout() {
  clearSession();
}

export async function refreshSession() {
  const refresh_token = getRefreshToken();
  if (!refresh_token) throw new Error('No session to refresh.');
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token }),
  });
  if (!res.ok) {
    clearSession();
    throw new Error('Session expired.');
  }
  const data = await res.json();
  setSession(data); // /auth/refresh rotates both tokens
  return data.access_token;
}

// Called once on load (from Nav, which always mounts via layout.js) to
// quietly confirm whatever session was cached from a previous visit is
// still valid, refreshing the access token once if it had expired, and
// clearing local state if the session is truly gone.
export async function restoreSession() {
  if (!getAccessToken()) return;
  try {
    setUser(await fetchProfile());
  } catch {
    try {
      await refreshSession();
      setUser(await fetchProfile());
    } catch {
      clearSession();
    }
  }
}

// Lets code that doesn't own the modal's open state (e.g. the imperative
// Spike Lab script, gating a feature behind login) ask Nav to open it.
export function requestLogin(detail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('mytr-auth:open', { detail }));
}
