const fs = require('fs');
let src = fs.readFileSync('data.js', 'utf8');
global.document = { documentElement: { setAttribute: () => {}, style: {}, classList: { add: () => {}, remove: () => {} } }, readyState: "complete", addEventListener: () => {}, getElementById: () => null, querySelectorAll: () => [] };
global.window = { addEventListener: () => {}, localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} } };
global.localStorage = global.window.localStorage;
global.zxApplyViewAppIdentity = () => {};
global.sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
src += '\n;module.exports = { ZXSeed, ZXStore };';
fs.writeFileSync('/tmp/data.cjs', src);
const { ZXSeed } = require('/tmp/data.cjs');
console.log('version:', ZXSeed.version);
const ms = ZXSeed.meetings;
console.log('total meetings:', ms.length);
for (const m of ms) {
  console.log(`${m.id} | ${m.tenantId} | ${m.podId} | ${m.status}/${m.hitlStatus} | lines=${m.rawTranscript.length} | sumLen=${(m.aiSummary||'').length} | actions=${m.actionItems.length}`);
  if (m.status !== 'Ended') throw new Error('status ' + m.id);
  if ((m.aiSummary || '').length < 50) throw new Error('short summary ' + m.id);
  if (!m.actionItems.length) throw new Error('no actions ' + m.id);
  for (const l of m.rawTranscript) { if (!l.time || !l.speaker || !l.text) throw new Error('bad line ' + m.id); }
}
// schedule consistency
const bad = [];
for (const m of ms) {
  const s = ZXSeed.schedule.find(x => x.tenantId === m.tenantId && x.title === m.title);
  if (!s) bad.push(m.id);
}
console.log('meetings without matching schedule row:', bad.join(',') || 'none');
console.log('schedule rows:', ZXSeed.schedule.length);
console.log('ALL CHECKS PASSED');
