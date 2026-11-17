// Paste into a lesson page's console (or run through the browser tool) to check layout in a real browser.
// For every step it rebuilds the board as it looks after the previous steps, then reports text that
// runs off the board or overlaps other text, and any page errors.
// Usage: await auditLesson()  → array of problems
window.auditLesson = async function auditLesson({ settle = 60, minOverlap = 0.3 } = {}) {
  const errors = [];
  const onErr = e => errors.push(String(e.reason || e.message || e));
  addEventListener('error', onErr);
  addEventListener('unhandledrejection', onErr);
  document.querySelector('.overlay').hidden = true;
  const btns = [...document.querySelectorAll('.progress button')];
  const issues = new Set();
  const measure = label => {
    const texts = [...document.querySelectorAll('.board text')].filter(t => +getComputedStyle(t).opacity > 0.5);
    const boxes = texts.map(t => {
      const b = t.getBBox();
      const [dx, dy] = t._t || [0, 0];
      return { id: t.dataset.id, x: b.x + dx, y: b.y + dy, w: b.width, h: b.height };
    }).filter(b => b.w > 0 && b.h > 0);
    for (const b of boxes) {
      if (b.x < 0 || b.y < 0 || b.x + b.w > 1000 || b.y + b.h > 560) issues.add(`${label}: '${b.id}' runs off the board`);
    }
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], c = boxes[j];
        const ix = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x);
        const iy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
        if (ix <= 0 || iy <= 0) continue;
        // Shrink each box vertically: font boxes include empty space above and below the glyphs.
        const ia = ix * Math.max(0, iy - 0.25 * Math.min(a.h, c.h));
        if (ia / Math.min(a.w * a.h, c.w * c.h) > minOverlap) issues.add(`${label}: '${a.id}' overlaps '${c.id}'`);
      }
    }
  };
  for (let k = 1; k <= btns.length; k++) {
    // Clicking step k redraws steps 1..k-1 instantly; measure right away, before step k animates far.
    (btns[k] || btns[k - 1]).click();
    await new Promise(r => setTimeout(r, settle));
    if (k < btns.length) measure(`after step ${k}`);
  }
  removeEventListener('error', onErr);
  removeEventListener('unhandledrejection', onErr);
  return [...issues, ...errors.map(e => 'error: ' + e)];
};
