// Checks lesson files without a browser: runs every step's drawing against a stand-in board and
// reports errors, drawings outside the board, Persian digits, and malformed quizzes.
// Usage: node tools/check-lesson.mjs lessons/02-binary-arithmetic.html [more files...]
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const FA_DIGITS = /[۰-۹٠-٩]/;
const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node tools/check-lesson.mjs lessons/NN-*.html'); process.exit(2); }
let failed = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const problems = [];
  let def = null;
  const sandbox = { Teacher: { start: d => { def = d; } }, console, Math, Promise, String, Number, Array, Object, JSON, Set, Map };
  try { vm.runInNewContext(scripts.join('\n;\n'), sandbox, { filename: file }); }
  catch (e) { problems.push('script error: ' + e.message); }

  if (def) {
    for (const k of ['id', 'number', 'title', 'chapter', 'slides', 'steps']) if (def[k] == null) problems.push(`missing ${k}`);
    if (FA_DIGITS.test(JSON.stringify({ t: def.title, c: def.chapter, i: def.intro, s: def.slides }))) problems.push('Persian digits in lesson header');
    for (const [i, s] of (def.steps || []).entries()) {
      const where = `step ${i + 1}`;
      if (!s.say) problems.push(`${where}: no say`);
      if (FA_DIGITS.test(s.say || '')) problems.push(`${where}: Persian digits in say`);
      if (s.speak) problems.push(`${where}: 'speak' is not used any more`);
      if (s.quiz) {
        const q = s.quiz;
        if (q.choices) { if (!(q.correct >= 0 && q.correct < q.choices.length)) problems.push(`${where}: quiz correct index out of range`); }
        else if (!Array.isArray(q.answer) || !q.answer.length) problems.push(`${where}: quiz needs answer[] or choices`);
        if (!q.explain) problems.push(`${where}: quiz has no explain`);
        if (FA_DIGITS.test(JSON.stringify(q))) problems.push(`${where}: Persian digits in quiz`);
      }
    }
    // Replay all drawings in order, as the player does.
    const ids = new Set();
    const out = (where, what, x, y) => {
      if (typeof x !== 'number' || typeof y !== 'number' || Number.isNaN(x) || Number.isNaN(y)) problems.push(`${where}: ${what} has bad coordinates (${x}, ${y})`);
      else if (x < 20 || x > 980 || y < 20 || y > 550) problems.push(`${where}: ${what} at (${Math.round(x)}, ${Math.round(y)}) is off the board`);
    };
    const match = p => [].concat(p).flatMap(q => q.endsWith('*') ? [...ids].filter(k => k.startsWith(q.slice(0, -1))) : [q]);
    let where = '';
    const b = {
      write(id, x, y, str, o = {}) {
        ids.add(id); out(where, `write '${id}'`, x, y);
        if (FA_DIGITS.test(String(str))) problems.push(`${where}: Persian digits in board text '${id}'`);
        if (str == null || String(str).includes('undefined') || String(str).includes('NaN')) problems.push(`${where}: board text '${id}' is '${str}'`);
        if (/[؀-ۿ]/.test(String(str)) && !o.fa) problems.push(`${where}: Persian text '${id}' needs { fa: true }`);
        return Promise.resolve();
      },
      line(id, x1, y1, x2, y2) { ids.add(id); out(where, `line '${id}'`, x1, y1); out(where, `line '${id}'`, x2, y2); return Promise.resolve(); },
      arrow(id, x1, y1, x2, y2) { return b.line(id, x1, y1, x2, y2); },
      box(id, x, y, w, h) { ids.add(id); out(where, `box '${id}'`, x, y); out(where, `box '${id}'`, x + w, y + h); return Promise.resolve(); },
      ring(id, cx, cy) { ids.add(id); out(where, `ring '${id}'`, cx, cy); return Promise.resolve(); },
      path(id) { ids.add(id); return Promise.resolve(); },
      wire(id, pts) { ids.add(id); pts.forEach(([x, y]) => out(where, `wire '${id}'`, x, y)); return Promise.resolve(); },
      dot(id, x, y) { ids.add(id); out(where, `dot '${id}'`, x, y); return Promise.resolve(); },
      gate(id, kind, x, y) {
        if (!['and', 'or', 'not', 'buf', 'nand', 'nor', 'xor', 'xnor'].includes(kind)) problems.push(`${where}: unknown gate '${kind}'`);
        ids.add(id); out(where, `gate '${id}'`, x, y); out(where, `gate '${id}'`, x + 85, y); return Promise.resolve();
      },
      pins(kind, x, y, n = kind === 'not' || kind === 'buf' ? 1 : 2) {
        const outX = { and: 60, nand: 72, or: 70, nor: 82, xor: 70, xnor: 82, buf: 50, not: 62 }[kind] ?? 60;
        const gap = n === 1 ? 0 : Math.min(16, 40 / (n - 1));
        return { ins: Array.from({ length: n }, (_, k) => [x, y + (k - (n - 1) / 2) * gap]), out: [x + outX, y] };
      },
      erase(p) { match(p).forEach(id => ids.delete(id)); return Promise.resolve(); },
      clear() { ids.clear(); return Promise.resolve(); },
      dim(p) { return b._exists(p); },
      move(p) { return b._exists(p); },
      pulse(p) { return b._exists(p); },
      recolor(p) { return b._exists(p); },
      wait() { return Promise.resolve(); },
      _exists(p) {
        for (const q of [].concat(p)) if (!q.endsWith('*') && !ids.has(q)) problems.push(`${where}: '${q}' is not on the board`);
        return Promise.resolve();
      },
    };
    for (const [i, s] of (def.steps || []).entries()) {
      where = `step ${i + 1}`;
      try { await s.draw?.(b); if (s.quiz) { where += ' (solve)'; await s.solve?.(b); } }
      catch (e) { problems.push(`${where}: draw error: ${e.message}`); }
    }
  } else if (!problems.length) problems.push('Teacher.start was never called');

  const n = def?.steps?.length ?? 0;
  const quizzes = def?.steps?.filter(s => s.quiz).length ?? 0;
  if (problems.length) {
    failed++;
    console.log(`✘ ${file} (${n} steps, ${quizzes} quizzes)`);
    [...new Set(problems)].forEach(p => console.log('   - ' + p));
  } else {
    console.log(`✔ ${file} (${n} steps, ${quizzes} quizzes)`);
  }
}
process.exit(failed ? 1 : 0);
