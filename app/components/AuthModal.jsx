'use client';

import { useEffect, useState } from 'react';
import { login, signup } from '../lib/auth';

export default function AuthModal({ open, mode, message, onClose, onSuccess }) {
  const [tab, setTab] = useState(mode || 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Each time the modal is (re)opened, reset to whatever tab/message the
  // caller asked for and clear any leftover state from the last time it
  // was open.
  useEffect(() => {
    if (!open) return;
    setTab(mode || 'login');
    setError('');
    setBusy(false);
  }, [open, mode]);

  useEffect(() => {
    if (!open) return;
    const onKeydown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (tab === 'signup' && !terms) {
      setError('Please accept the Terms and Privacy Policy to continue.');
      return;
    }
    setBusy(true);
    try {
      const user = tab === 'login'
        ? await login({ email, password })
        : await signup({ name, email, password, termsAccepted: terms });
      onSuccess(user);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="authTitle" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="auth-close" aria-label="Close" onClick={onClose}>&times;</button>

        <div className="auth-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'login'} className={tab === 'login' ? 'on' : ''} onClick={() => { setTab('login'); setError(''); }}>Log in</button>
          <button type="button" role="tab" aria-selected={tab === 'signup'} className={tab === 'signup' ? 'on' : ''} onClick={() => { setTab('signup'); setError(''); }}>Sign up</button>
        </div>

        <h2 id="authTitle" className="auth-title">{tab === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        {message ? <p className="auth-message">{message}</p> : null}

        <form onSubmit={submit} className="auth-form">
          {tab === 'signup' && (
            <label className="auth-field">
              <span>Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
          )}
          <label className="auth-field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label className="auth-field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={tab === 'login' ? 'current-password' : 'new-password'} minLength={tab === 'signup' ? 8 : undefined} />
            {tab === 'signup' && <small>At least 8 characters, with a letter and a number.</small>}
          </label>

          {tab === 'signup' && (
            <label className="auth-check">
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
              <span>I agree to the Terms and Privacy Policy.</span>
            </label>
          )}

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={busy}>
            {busy ? 'Please wait…' : tab === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
