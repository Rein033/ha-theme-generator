/* HA Theme Generator */
const VELDEN = [['primary', 'Primary', 'primary-color'], ['accent', 'Accent', 'accent-color'], ['bg', 'Background', 'primary-background-color'], ['card', 'Card background', 'card-background-color'],
  ['text', 'Text', 'primary-text-color'], ['text2', 'Secondary text', 'secondary-text-color'], ['icon', 'Icon (off)', 'state-icon-color'], ['lighton', 'Light on', 'state-light-active-color'],
  ['sidebar', 'Sidebar', 'sidebar-background-color'], ['sidebartext', 'Sidebar text', 'sidebar-text-color'], ['header', 'Header', 'app-header-background-color'], ['headertext', 'Header text', 'app-header-text-color'],
  ['divider', 'Dividers', 'divider-color'], ['border', 'Card border', 'ha-card-border-color']];
const FONTS = { default: ['Default (Roboto)', ''], system: ['System UI', 'system-ui, -apple-system, "Segoe UI", sans-serif'], inter: ['Inter', 'Inter, system-ui, sans-serif'],
  helvetica: ['Helvetica / Arial', '"Helvetica Neue", Helvetica, Arial, sans-serif'], rounded: ['Rounded (SF Rounded)', 'ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif'], mono: ['Monospace', 'ui-monospace, Menlo, Consolas, monospace'] };
const SCHADUW = { none: 'none', subtle: '0 1px 2px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.08)', soft: '0 4px 14px rgba(0,0,0,0.10)', strong: '0 8px 28px rgba(0,0,0,0.28)' };
const P = (primary, accent, light, dark, extra = {}) => ({ primary, accent, light, dark, ...extra });
const L = (bg, card, text, text2, icon, sidebar, header, headertext, divider) => ({ bg, card, text, text2, icon, sidebar, sidebartext: text, header, headertext, divider, border: divider });
const PRESETS = {
  Default: P('#03a9f4', '#ff9800', L('#fafafa', '#ffffff', '#212121', '#727272', '#44739e', '#ffffff', '#03a9f4', '#ffffff', '#e0e0e0'), L('#111111', '#1c1c1c', '#e1e1e1', '#9b9b9b', '#c8c8c8', '#1c1c1c', '#101e24', '#e1e1e1', '#2f2f2f'), { rad: 12, shadow: 'subtle' }),
  Nord: P('#88c0d0', '#ebcb8b', L('#eceff4', '#ffffff', '#2e3440', '#4c566a', '#5e81ac', '#e5e9f0', '#e5e9f0', '#2e3440', '#d8dee9'), L('#2e3440', '#3b4252', '#eceff4', '#a3acbd', '#81a1c1', '#2e3440', '#2e3440', '#eceff4', '#434c5e'), { rad: 14, shadow: 'none' }),
  Dracula: P('#bd93f9', '#ff79c6', L('#f8f8f2', '#ffffff', '#282a36', '#6272a4', '#6272a4', '#f1f1ec', '#f1f1ec', '#282a36', '#e2e2dc'), L('#282a36', '#343746', '#f8f8f2', '#a4abcf', '#8be9fd', '#21222c', '#21222c', '#f8f8f2', '#44475a'), { rad: 12, shadow: 'soft' }),
  Ocean: P('#0277bd', '#26c6da', L('#eef6fb', '#ffffff', '#0d2b3e', '#4f6b7d', '#0277bd', '#ffffff', '#ffffff', '#0d2b3e', '#d5e6f0'), L('#0b1a24', '#122633', '#e3f2fd', '#90a4ae', '#4fc3f7', '#0b1a24', '#0b1a24', '#e3f2fd', '#1e3a4c'), { rad: 18, shadow: 'soft' }),
  Forest: P('#2e7d32', '#ffb300', L('#f3f6f1', '#ffffff', '#1b2a1c', '#5b6b5c', '#43a047', '#ffffff', '#ffffff', '#1b2a1c', '#dde5da'), L('#121812', '#1b241b', '#e8f0e6', '#9aab98', '#81c784', '#121812', '#121812', '#e8f0e6', '#2a382a'), { rad: 16, shadow: 'subtle' }),
  Sunset: P('#ef6c00', '#ec407a', L('#fff8f3', '#ffffff', '#2d1b12', '#7b5e50', '#ef6c00', '#fff1e6', '#fff1e6', '#2d1b12', '#f3dccb'), L('#1d1310', '#2a1c17', '#fbe9e0', '#b39b8f', '#ffab40', '#1d1310', '#1d1310', '#fbe9e0', '#3d2a22'), { rad: 20, shadow: 'soft' }),
  Graphite: P('#9e9e9e', '#64b5f6', L('#f2f2f2', '#ffffff', '#1a1a1a', '#6b6b6b', '#5f5f5f', '#ffffff', '#ffffff', '#1a1a1a', '#e2e2e2'), L('#0e0e0e', '#1a1a1a', '#ededed', '#9a9a9a', '#bdbdbd', '#0e0e0e', '#0e0e0e', '#ededed', '#2a2a2a'), { rad: 8, shadow: 'none' }),
  Soft: P('#7e57c2', '#26a69a', L('#f4f2f8', '#ffffff', '#251f33', '#6f6880', '#7e57c2', '#f4f2f8', '#f4f2f8', '#251f33', '#e4dfee'), L('#16131d', '#211c2b', '#ece8f4', '#a39cb4', '#b39ddb', '#16131d', '#16131d', '#ece8f4', '#332c40'), { rad: 24, shadow: 'soft' }),
};
function vanPreset(n) {
  const p = PRESETS[n], m = (x) => ({ ...x, primary: p.primary, accent: p.accent, lighton: '#ffc107', sidebartext: x.text, border: x.divider });
  return { naam: n.toLowerCase() === 'default' ? 'my_theme' : n.toLowerCase(), light: m(p.light), dark: m(p.dark), rad: p.rad ?? 12, bw: 0, shadow: p.shadow || 'subtle', font: 'default', modes: true, ed: 'light', pv: 'light' };
}
let t = (() => { try { const h = location.hash.match(/#t=(.+)/); if (h) return JSON.parse(decodeURIComponent(escape(atob(h[1])))); } catch (e) { /* */ } return opslag.lees('theme.v1', null) || vanPreset('Default'); })();

/* Kleurhulpjes */
const hex = (c) => { c = String(c || '').trim(); if (/^#[0-9a-f]{3}$/i.test(c)) c = '#' + [...c.slice(1)].map((x) => x + x).join(''); return /^#[0-9a-f]{6}$/i.test(c) ? c.toLowerCase() : null; };
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => { const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
const mix = (a, b, w) => '#' + rgb(a).map((v, i) => Math.round(v * (1 - w) + rgb(b)[i] * w).toString(16).padStart(2, '0')).join('');

function presets() {
  $('#presets').innerHTML = Object.entries(PRESETS).map(([n, p]) => `<button type="button" data-p="${n}"><span class="strip"><i style="background:${p.light.bg}"></i><i style="background:${p.primary}"></i><i style="background:${p.accent}"></i><i style="background:${p.dark.card}"></i><i style="background:${p.dark.bg}"></i></span>${n}</button>`).join('');
}
function kleuren() {
  const m = t[t.ed];
  $('#kleuren').innerHTML = VELDEN.map(([k, l]) => `<div class="kl"><input type="color" data-k="${k}" value="${hex(m[k]) || '#000000'}"><div class="t"><label>${l}</label><input data-k="${k}" data-txt value="${esc(m[k] || '')}"></div></div>`).join('');
  $$('#mode button').forEach((b) => b.classList.toggle('on', b.dataset.v === t.ed));
  $('#modesub').textContent = t.modes ? `Editing the ${t.ed} mode` : 'One set of colours (no separate dark mode)';
  $('#mode').style.visibility = t.modes ? '' : 'hidden';
}
function vars(m) {
  return { '--t-primary': m.primary, '--t-accent': m.accent, '--t-bg': m.bg, '--t-card': m.card, '--t-text': m.text, '--t-text2': m.text2, '--t-icon': m.icon, '--t-lighton': m.lighton,
    '--t-sidebar': m.sidebar, '--t-sidebar-text': m.sidebartext, '--t-sidebar-icon': m.text2, '--t-header': m.header, '--t-header-text': m.headertext, '--t-divider': m.divider, '--t-border': m.border,
    '--t-radius': t.rad + 'px', '--t-bw': t.bw + 'px', '--t-shadow': SCHADUW[t.shadow], '--t-font': FONTS[t.font][1] || 'Roboto, "Noto Sans", system-ui, sans-serif' };
}
function regels(m, ind) {
  const p = ' '.repeat(ind), q = (v) => `"${String(v).replace(/"/g, '\\"')}"`;
  const out = VELDEN.filter(([k]) => m[k]).map(([k, , v]) => `${p}${v}: ${q(m[k])}`);
  out.push(`${p}secondary-background-color: ${q(mix(m.bg, m.text, .04))}`, `${p}ha-card-background: ${q(m.card)}`, `${p}sidebar-icon-color: ${q(m.text2)}`,
    `${p}sidebar-selected-icon-color: ${q(m.primary)}`, `${p}sidebar-selected-text-color: ${q(m.primary)}`);
  return out;
}
function yaml() {
  const n = (t.naam || 'my_theme').trim().replace(/[^\w-]+/g, '_') || 'my_theme', q = (v) => `"${v}"`;
  const alg = [`  ha-card-border-radius: ${q(t.rad + 'px')}`, `  ha-card-border-width: ${q(t.bw + 'px')}`, `  ha-card-box-shadow: ${q(SCHADUW[t.shadow])}`];
  if (FONTS[t.font][1]) alg.push(`  primary-font-family: ${q(FONTS[t.font][1].replace(/"/g, "'"))}`, `  ha-font-family-body: ${q(FONTS[t.font][1].replace(/"/g, "'"))}`);
  const body = t.modes ? ['  modes:', '    light:', ...regels(t.light, 6), '    dark:', ...regels(t.dark, 6)] : regels(t.light, 2);
  return [`# Made with HA Theme Generator · https://uselesssite.nl/ha-theme-generator/`, `${n}:`, ...alg, ...body].join('\n') + '\n';
}
function contrast() {
  const m = t[t.pv], r = ratio(hex(m.text) || '#000000', hex(m.card) || '#ffffff'), r2 = ratio(hex(m.text2) || '#000000', hex(m.card) || '#ffffff');
  const lab = (x) => x >= 4.5 ? `<span class="ok">${x.toFixed(1)}:1 ✓</span>` : x >= 3 ? `<span class="warn">${x.toFixed(1)}:1 (low)</span>` : `<span class="bad">${x.toFixed(1)}:1 (too low)</span>`;
  $('#contrast').innerHTML = `Text contrast on cards: ${lab(r)} · secondary ${lab(r2)}`;
}
function teken() {
  const m = t.modes ? t[t.pv] : t.light;
  Object.entries(vars(m)).forEach(([k, v]) => $('#ha').style.setProperty(k, v));
  $('#yaml').textContent = yaml(); contrast();
  $$('.tn').forEach((s) => { s.textContent = (t.naam || 'my_theme').replace(/[^\w-]+/g, '_'); });
  $$('#pmode button').forEach((b) => b.classList.toggle('on', b.dataset.v === t.pv)); $('#pmode').style.visibility = t.modes ? '' : 'hidden';
  $$('#shadow button').forEach((b) => b.classList.toggle('on', b.dataset.v === t.shadow));
  $('#radv').textContent = t.rad + 'px'; $('#bwv').textContent = t.bw + 'px';
  opslag.schrijf('theme.v1', t);
}
function velden() { $('#naam').value = t.naam; $('#font').value = t.font; $('#rad').value = t.rad; $('#bw').value = t.bw; $('#modes').checked = t.modes; }
const alles = () => { velden(); kleuren(); teken(); };

$('#font').innerHTML = Object.entries(FONTS).map(([k, [n]]) => `<option value="${k}">${n}</option>`).join('');
presets();
$('#presets').onclick = (e) => { const b = e.target.closest('[data-p]'); if (!b) return; const ed = t.ed, pv = t.pv; t = vanPreset(b.dataset.p); t.ed = ed; t.pv = pv; alles(); };
$('#kleuren').oninput = (e) => {
  const k = e.target.dataset.k; if (!k) return;
  const v = e.target.dataset.txt != null ? e.target.value : e.target.value;
  t[t.ed][k] = v; if (!t.modes && t.ed === 'light') t.dark[k] = t.dark[k];
  const ander = e.target.dataset.txt != null ? $(`#kleuren input[type=color][data-k="${k}"]`) : $(`#kleuren input[data-txt][data-k="${k}"]`);
  if (e.target.dataset.txt != null) { if (hex(v)) ander.value = hex(v); } else ander.value = v;
  if (t.ed !== t.pv && t.modes) t.pv = t.ed;
  teken();
};
$('#mode').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; t.ed = t.pv = b.dataset.v; kleuren(); teken(); };
$('#pmode').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; t.pv = b.dataset.v; teken(); };
$('#modes').onchange = (e) => { t.modes = e.target.checked; if (!t.modes) { t.ed = t.pv = 'light'; } kleuren(); teken(); };
$('#maakdonker').onclick = () => {
  const l = t.light, h = (x, d) => hex(x) || d;
  t.dark = { ...l, bg: mix(h(l.primary, '#03a9f4'), '#0b0c0e', .93), card: mix(h(l.primary, '#03a9f4'), '#17181c', .9), text: '#e8e8ec', text2: '#9ea2ab', icon: mix(h(l.icon, '#44739e'), '#ffffff', .45),
    sidebar: mix(h(l.primary, '#03a9f4'), '#0b0c0e', .93), sidebartext: '#e8e8ec', header: mix(h(l.primary, '#03a9f4'), '#0b0c0e', .93), headertext: '#e8e8ec', divider: '#2c2e33', border: '#2c2e33' };
  t.modes = true; t.ed = t.pv = 'dark'; alles(); toast('Dark mode made from your light colours');
};
$('#naam').oninput = (e) => { t.naam = e.target.value; teken(); };
$('#font').onchange = (e) => { t.font = e.target.value; teken(); };
$('#rad').oninput = (e) => { t.rad = +e.target.value; teken(); };
$('#bw').oninput = (e) => { t.bw = +e.target.value; teken(); };
$('#shadow').onclick = (e) => { const b = e.target.closest('button'); if (b) { t.shadow = b.dataset.v; teken(); } };
$('#copy').onclick = () => kopieer(yaml(), 'Theme YAML copied');
$('#dl').onclick = () => download(`${(t.naam || 'my_theme').replace(/[^\w-]+/g, '_')}.yaml`, yaml(), 'text/yaml;charset=utf-8');
$('#deel').onclick = () => { const k = btoa(unescape(encodeURIComponent(JSON.stringify(t)))); kopieer(location.href.split('#')[0] + '#t=' + k, 'Share link copied'); };
$('#plak').onclick = () => { $('#plakbox').hidden = !$('#plakbox').hidden; $('#plaktekst').focus(); };
$('#laad').onclick = () => {
  try {
    const d = jsyaml.load($('#plaktekst').value); const naam = Object.keys(d || {})[0]; const th = d[naam];
    if (!naam || typeof th !== 'object') throw new Error('No theme found: the YAML should start with the theme name.');
    const lees = (src, basis) => { const m = { ...basis }; VELDEN.forEach(([k, , v]) => { if (src[v] != null) m[k] = String(src[v]); }); if (!src['sidebar-text-color'] && src['primary-text-color']) m.sidebartext = String(src['primary-text-color']); return m; };
    t.naam = naam;
    if (th.modes) { t.modes = true; t.light = lees({ ...th, ...(th.modes.light || {}) }, t.light); t.dark = lees({ ...th, ...(th.modes.dark || {}) }, t.dark); }
    else { t.modes = false; t.light = lees(th, t.light); }
    const r = parseInt(th['ha-card-border-radius'], 10); if (!isNaN(r)) t.rad = Math.min(28, r);
    const w = parseInt(th['ha-card-border-width'], 10); if (!isNaN(w)) t.bw = Math.min(3, w);
    const sh = Object.entries(SCHADUW).find(([, v]) => v === th['ha-card-box-shadow']); if (sh) t.shadow = sh[0];
    t.ed = t.pv = 'light'; $('#plakbox').hidden = true; $('#plakfout').textContent = ''; alles(); toast(`Loaded "${naam}"`);
  } catch (err) { $('#plakfout').textContent = err.message.split('\n')[0]; }
};
alles();
