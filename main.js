/* =============================================
   CYBERZBIN — Shared JavaScript
   js/main.js | Used across all pages
   ============================================= */

// ===== Storage helpers =====
function getUsers()       { return JSON.parse(localStorage.getItem('czb_users')   || '[]');   }
function saveUsers(u)     { localStorage.setItem('czb_users',   JSON.stringify(u));            }
function getSession()     { return JSON.parse(localStorage.getItem('czb_session') || 'null'); }
function saveSession(u)   { localStorage.setItem('czb_session', JSON.stringify(u));            }
function clearSession()   { localStorage.removeItem('czb_session');                            }

// ===== Redirect helpers =====
function requireAuth() {
  if (!getSession()) window.location.href = 'login.html';
}
function redirectIfLoggedIn() {
  if (getSession()) window.location.href = 'dashboard.html';
}

// ===== Toggle password visibility =====
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text';     btn.textContent = '🙈'; }
  else                            { input.type = 'password'; btn.textContent = '👁'; }
}

// ===== Password strength =====
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)          score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function applyStrength(score, segIds, labelId) {
  const classes = ['', 'active-weak', 'active-ok', 'active-ok', 'active-strong'];
  const labels  = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  segIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'strength-seg';
    if (i < score) el.classList.add(classes[score]);
  });
  if (labelId) {
    const lbl = document.getElementById(labelId);
    if (lbl) lbl.textContent = score > 0 ? labels[score] : '';
  }
}

// ===== Alert helpers =====
function showAlert(id, visible) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('show', visible);
}

function setError(msgId, alertId, msg) {
  const msgEl = document.getElementById(msgId);
  if (msgEl) msgEl.textContent = msg;
  showAlert(alertId, !!msg);
}

// ===== Button loading state =====
function setLoading(btn, loading) {
  btn.classList.toggle('loading', loading);
  btn.disabled = loading;
}

// ===== Simulate async delay =====
function delay(ms) { return new Promise(res => setTimeout(res, ms)); }
