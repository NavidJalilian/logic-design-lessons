/*
 * Animated teacher — the lesson player shared by every lesson.
 *
 * The page is Persian (right-to-left); technical terms and math stay in English.
 *
 * A lesson is a list of steps. Each step has:
 *   say    – what the teacher says, in Persian (shown in the bubble; *word* = emphasis)
 *   draw   – async (b) => {...} draws on the whiteboard using the Board helpers below
 *   term   – optional [english, persian] exam word added to the word strip
 *   tip    – true marks the step as a teacher tip (not from the book slides)
 *   quiz   – { q, answer: [...] | choices: [...], correct, hint, explain }  (+ solve(b) to animate the method)
 *
 * Going Back or jumping to a step redraws the board instantly by replaying the
 * earlier steps with animation switched off, then animates only the current step.
 */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const CANCEL = Symbol('cancel');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function svgEl(tag, attrs = {}, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // "9×10^3", "2^{-1}", "(1010.11)_2" → text with raised / lowered small parts.
  const SCRIPT = /([\^_])(?:\{([^}]*)\}|(-?[0-9A-Za-z.]+))/g;
  function setMath(t, str, size) {
    t.textContent = '';
    let shift = 0, last = 0, m;
    const add = (txt, target, small) => {
      if (!txt) return;
      const sp = svgEl('tspan', {}, t);
      if (target !== shift) sp.setAttribute('dy', target - shift);
      if (small) sp.setAttribute('font-size', Math.round(size * 0.6));
      sp.textContent = txt;
      shift = target;
    };
    SCRIPT.lastIndex = 0;
    while ((m = SCRIPT.exec(str))) {
      add(str.slice(last, m.index), 0, false);
      add(m[2] ?? m[3], m[1] === '^' ? -size * 0.42 : size * 0.22, true);
      last = SCRIPT.lastIndex;
    }
    add(str.slice(last), 0, false);
  }
  function htmlMath(str) {
    return esc(str).replace(SCRIPT, (_, k, a, b) => (k === '^' ? `<sup>${a ?? b}</sup>` : `<sub>${a ?? b}</sub>`));
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  const PERSIAN = /[؀-ۿ]/;

  // ---------------------------------------------------------------- Board
  class Board {
    constructor(svg) {
      this.svg = svg;
      this.layer = svgEl('g', {}, svg);
      this.items = new Map();
      this.anims = new Set();
      this.speed = 1;
      this.ctx = { alive: true };
      this.instant = false;
    }
    // Starts a new drawing run and stops the previous one. Returns a view of the
    // board whose helpers stop (throw CANCEL) as soon as a newer run begins.
    session(instant) {
      this.ctx.alive = false;
      for (const a of [...this.anims]) { try { a.finish(); } catch (_) { /* already gone */ } }
      this.anims.clear();
      const s = Object.create(this);
      s.ctx = { alive: true };
      s.instant = instant;
      this.ctx = s.ctx;
      return s;
    }
    reset() { this.layer.replaceChildren(); this.items.clear(); }
    alive() { if (!this.ctx.alive) throw CANCEL; }
    dur(ms) { return this.instant ? 0 : (ms / this.speed) * (reduceMotion ? 0.3 : 1); }
    async anim(node, frames, ms, easing = 'cubic-bezier(.3,.7,.2,1)') {
      this.alive();
      const d = this.dur(ms);
      if (d <= 0) return;
      const a = node.animate(frames, { duration: d, easing, fill: 'backwards' });
      this.anims.add(a);
      try { await a.finished; } catch (_) { /* cancelled */ }
      this.anims.delete(a);
      this.alive();
    }
    add(id, node) {
      this.alive();
      this.items.get(id)?.remove();
      node.dataset.id = id;
      this.items.set(id, node);
      this.layer.appendChild(node);
      return node;
    }
    nodes(pattern) {
      const ids = [].concat(pattern).flatMap(p => (p.endsWith('*')
        ? [...this.items.keys()].filter(k => k.startsWith(p.slice(0, -1)))
        : [p]));
      return ids.map(id => [id, this.items.get(id)]).filter(([, n]) => n);
    }
    wait(ms) { return this.anim(this.layer, [{ opacity: 1 }, { opacity: 1 }], ms, 'linear'); }

    // Handwritten text. o: size, color, anchor ('start'|'middle'|'end'), bold, fa (Persian), dur
    write(id, x, y, str, o = {}) {
      const size = o.size || 40;
      const t = svgEl('text', {
        x, y, 'font-size': size, 'text-anchor': o.anchor || 'middle',
        class: `c-${o.color || 'ink'}${o.fa ? ' fa' : ''}${o.bold ? ' b' : ''}`,
      });
      if (o.fa) { t.setAttribute('direction', 'rtl'); t.textContent = str; } else setMath(t, String(str), size);
      this.add(id, t);
      const hidden = o.fa ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
      const ms = o.dur ?? Math.min(1300, 160 + 42 * String(str).length);
      return this.anim(t, [{ clipPath: hidden, opacity: 0.3 }, { clipPath: 'inset(0 0 0 0)', opacity: 1 }], ms, 'linear');
    }
    // A drawn stroke (line / arrow / box outline / circle) that appears like a pen moving.
    stroke(id, node, ms) {
      node.setAttribute('pathLength', 1);
      this.add(id, node);
      return this.anim(node, [{ strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDasharray: 1, strokeDashoffset: 0 }], ms);
    }
    line(id, x1, y1, x2, y2, o = {}) {
      return this.stroke(id, svgEl('path', { d: `M${x1} ${y1}L${x2} ${y2}`, class: `stroke s-${o.color || 'ink'}`, 'stroke-width': o.width || 3.5 }), o.dur ?? 450);
    }
    arrow(id, x1, y1, x2, y2, o = {}) {
      const a = Math.atan2(y2 - y1, x2 - x1), h = o.head || 14;
      const p = s => `${x2 - h * Math.cos(a + s)} ${y2 - h * Math.sin(a + s)}`;
      return this.stroke(id, svgEl('path', { d: `M${x1} ${y1}L${x2} ${y2}M${p(0.5)}L${x2} ${y2}L${p(-0.5)}`, class: `stroke s-${o.color || 'ink'}` }), o.dur ?? 550);
    }
    box(id, x, y, w, h, o = {}) {
      const r = svgEl('rect', { x, y, width: w, height: h, rx: o.r ?? 12, class: `stroke s-${o.color || 'ink'}` });
      if (o.fill) r.classList.add(`f-${o.fill}`);
      return this.stroke(id, r, o.dur ?? 700);
    }
    ring(id, cx, cy, rx, ry, o = {}) {
      const e = svgEl('ellipse', { cx, cy, rx, ry: ry ?? rx, class: `stroke s-${o.color || 'orange'}`, transform: `rotate(${o.tilt ?? -4} ${cx} ${cy})` });
      if (o.fill) e.classList.add(`f-${o.fill}`);
      return this.stroke(id, e, o.dur ?? 500);
    }
    async erase(pattern, ms = 350) {
      const list = this.nodes(pattern);
      list.forEach(([id]) => this.items.delete(id));
      try { await Promise.all(list.map(([, n]) => this.anim(n, [{ opacity: 1 }, { opacity: 0 }], ms))); }
      finally { list.forEach(([, n]) => n.remove()); }
    }
    clear(ms = 350) { return this.erase('*', ms); }
    dim(pattern, opacity = 0.25, ms = 400) {
      return Promise.all(this.nodes(pattern).map(([, n]) => {
        const from = getComputedStyle(n).opacity;
        n.style.opacity = opacity;
        return this.anim(n, [{ opacity: from }, { opacity }], ms);
      }));
    }
    move(pattern, dx, dy, ms = 650) {
      return Promise.all(this.nodes(pattern).map(([, n]) => {
        const [x0, y0] = n._t || [0, 0];
        n._t = [x0 + dx, y0 + dy];
        n.style.translate = `${n._t[0]}px ${n._t[1]}px`;
        return this.anim(n, [{ translate: `${x0}px ${y0}px` }, { translate: `${n._t[0]}px ${n._t[1]}px` }], ms);
      }));
    }
    pulse(pattern, ms = 650) {
      return Promise.all(this.nodes(pattern).map(([, n]) => {
        n.style.transformBox = 'fill-box';
        n.style.transformOrigin = 'center';
        return this.anim(n, [{ scale: 1 }, { scale: 1.22 }, { scale: 1 }], ms, 'ease-in-out');
      }));
    }
    recolor(pattern, color) {
      for (const [, n] of this.nodes(pattern)) {
        n.classList.forEach(c => { if (/^[cs]-/.test(c)) n.classList.remove(c); });
        n.classList.add(n.tagName === 'text' ? `c-${color}` : `s-${color}`);
      }
      return this.pulse(pattern);
    }
  }

  // --------------------------------------------------------------- Teacher art
  const TEACHER_SVG = `
<svg class="teacher" viewBox="0 0 120 140" aria-hidden="true">
  <path d="M18 140 C20 104 36 92 60 92 C84 92 100 104 102 140 Z" fill="#3f6fb5"/>
  <path d="M48 93 L60 108 L72 93" fill="#f5f2ea"/>
  <g class="arm"><path d="M92 112 C102 100 106 86 108 72" stroke="#3f6fb5" stroke-width="11" stroke-linecap="round" fill="none"/>
    <line x1="108" y1="72" x2="116" y2="34" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>
    <circle cx="108" cy="72" r="6.5" fill="#f0c49d"/></g>
  <rect x="52" y="78" width="16" height="16" rx="4" fill="#f0c49d"/>
  <path d="M30 52 C26 18 94 18 90 52 C92 64 88 74 84 80 L36 80 C32 74 28 64 30 52 Z" fill="#4a2f22"/>
  <ellipse cx="60" cy="56" rx="24" ry="27" fill="#f0c49d"/>
  <path d="M36 46 C40 28 80 26 85 46 C74 36 50 34 36 46 Z" fill="#4a2f22"/>
  <g class="eyes"><circle cx="50" cy="56" r="2.6" fill="#22252b"/><circle cx="70" cy="56" r="2.6" fill="#22252b"/></g>
  <g fill="none" stroke="#22252b" stroke-width="1.6"><circle cx="50" cy="56" r="7.5"/><circle cx="70" cy="56" r="7.5"/><path d="M57.5 56 H62.5"/></g>
  <path class="mouth-idle" d="M52 70 Q60 76 68 70" stroke="#a3433a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse class="mouth-talk" cx="60" cy="71" rx="5.5" ry="4" fill="#a3433a"/>
</svg>`;

  // --------------------------------------------------------------- storage (optional)
  const store = {
    get(k, d) { try { const v = localStorage.getItem('teacher:' + k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem('teacher:' + k, JSON.stringify(v)); } catch (_) { /* private mode */ } },
  };

  // --------------------------------------------------------------- Player
  class Player {
    constructor(def) {
      this.def = def;
      this.steps = def.steps;
      this.i = 0;
      this.playing = false;
      this.answered = new Set();
      this.voiceOn = store.get('voice', true);
      this.speed = store.get('speed', 1);
      this.build();
      this.board = new Board(this.$('.board'));
      this.board.speed = this.speed;
      this.pickVoice();
      if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = () => this.pickVoice();
      this.showStart();
    }
    $(s) { return this.root.querySelector(s); }

    build() {
      const d = this.def;
      document.title = `درس ${d.number} — ${d.title}`;
      this.root = document.getElementById('app');
      this.root.className = 'lesson';
      this.root.innerHTML = `
        <div class="topbar">
          <a class="home" href="../index.html">→ فهرست درس‌ها</a>
          <h1>درس ${d.number} · ${esc(d.title)}</h1>
          <span class="meta">${esc(d.chapter)} · اسلایدهای ${esc(d.slides)} کتاب</span>
        </div>
        <div class="progress" role="group" aria-label="قدم‌های درس"></div>
        <div class="stage">
          <svg class="board" viewBox="0 0 1000 560" role="img" aria-label="تخته"></svg>
          <div class="overlay" hidden><div class="card"></div></div>
        </div>
        <div class="talk">
          ${TEACHER_SVG}
          <div class="bubble" aria-live="polite"><div class="say"></div><div class="quiz" hidden></div></div>
        </div>
        <div class="words" hidden><span class="label">واژه‌های امتحان:</span></div>
        <div class="controls">
          <button class="btn" data-act="restart" aria-label="شروع دوباره" title="شروع دوباره">⟲</button>
          <button class="btn" data-act="prev">▶ قبلی</button>
          <button class="btn primary" data-act="play"></button>
          <button class="btn" data-act="next">بعدی ◀</button>
          <button class="btn" data-act="voice"></button>
          <select data-act="speed" aria-label="سرعت">
            ${[0.75, 1, 1.25, 1.5].map(s => `<option value="${s}"${s === this.speed ? ' selected' : ''}>${s}×</option>`).join('')}
          </select>
        </div>
        <div class="hint-keys">کلیدها: Space = پخش / مکث · ← = بعدی · → = قبلی</div>`;

      const bar = this.$('.progress');
      this.steps.forEach((s, k) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `قدم ${k + 1}${s.quiz ? ' (سؤال)' : ''}`);
        if (s.quiz) b.classList.add('is-quiz');
        b.onclick = () => { this.hideOverlay(); this.goTo(k); };
        bar.appendChild(b);
      });
      this.root.querySelector('.controls').addEventListener('click', e => {
        const act = e.target.closest('[data-act]')?.dataset.act;
        if (act === 'restart') { this.hideOverlay(); this.playing = true; this.goTo(0); }
        if (act === 'prev') { this.hideOverlay(); this.goTo(this.i - 1); }
        if (act === 'next') { this.hideOverlay(); this.goTo(this.i + 1); }
        if (act === 'play') this.togglePlay();
        if (act === 'voice') this.toggleVoice();
      });
      this.$('[data-act="speed"]').onchange = e => {
        this.speed = Number(e.target.value);
        this.board.speed = this.speed;
        store.set('speed', this.speed);
      };
      document.addEventListener('keydown', e => {
        if (e.target.closest('input, select, textarea')) return;
        if (e.key === ' ') { e.preventDefault(); this.togglePlay(); }
        // Right-to-left page: the left arrow moves forward.
        if (e.key === 'ArrowLeft') { this.hideOverlay(); this.goTo(this.i + 1); }
        if (e.key === 'ArrowRight') { this.hideOverlay(); this.goTo(this.i - 1); }
      });
      this.renderPlay();
      this.renderVoiceBtn();
    }

    showStart() {
      const saved = store.get(`pos:${this.def.id}`, 0);
      const resume = saved > 0 && saved < this.steps.length;
      this.overlay(`
        <h2>درس ${this.def.number}: ${esc(this.def.title)}</h2>
        <p>${esc(this.def.intro || '')} معلم قدم‌به‌قدم روی تخته توضیح می‌دهد.</p>
        <div class="row">
          <button class="btn primary" data-go="0">▶ شروع درس</button>
          ${resume ? `<button class="btn" data-go="${saved}">ادامه از قدم ${saved + 1}</button>` : ''}
        </div>`);
    }
    overlay(html) {
      const o = this.$('.overlay');
      o.querySelector('.card').innerHTML = html;
      o.hidden = false;
      o.querySelectorAll('[data-go]').forEach(b => {
        b.onclick = () => { this.hideOverlay(); this.playing = true; this.renderPlay(); this.goTo(Number(b.dataset.go)); };
      });
      o.querySelector('button')?.focus();
    }
    hideOverlay() { this.$('.overlay').hidden = true; }

    togglePlay() {
      if (!this.$('.overlay').hidden) { this.$('.overlay [data-go]')?.click(); return; }
      this.playing = !this.playing;
      this.renderPlay();
      if (this.playing) {
        if (this.interrupted) this.goTo(this.i); // paused mid-sentence: hear this step again
        else if (this.stepFinished) this.goTo(this.i + 1);
      } else {
        this.interrupted = !!this.endTalk;
        this.stopTalking();
        clearTimeout(this.timer);
      }
    }
    renderPlay() { this.$('[data-act="play"]').textContent = this.playing ? '❚❚ مکث' : '▶ پخش'; }
    toggleVoice() {
      this.voiceOn = !this.voiceOn;
      store.set('voice', this.voiceOn);
      if (!this.voiceOn && 'speechSynthesis' in window) speechSynthesis.cancel();
      this.renderVoiceBtn();
    }
    // Speaks only with a Persian voice; most computers have none, so the text is read silently.
    renderVoiceBtn() {
      const b = this.$('[data-act="voice"]');
      b.disabled = !this.voice;
      b.title = this.voice ? '' : 'این کامپیوتر صدای فارسی ندارد؛ متن را بخوانید';
      b.textContent = !this.voice ? '🔇 بدون صدا' : this.voiceOn ? '🔊 صدا روشن' : '🔇 صدا خاموش';
      b.setAttribute('aria-pressed', !!this.voice && this.voiceOn);
    }
    pickVoice() {
      if (!('speechSynthesis' in window)) return;
      this.voice = speechSynthesis.getVoices().find(v => /^fa(-|_|$)/i.test(v.lang)) || null;
      if (this.root) this.renderVoiceBtn();
    }

    // ---- stepping
    async goTo(i) {
      if (i < 0 || i >= this.steps.length) {
        if (i >= this.steps.length) this.finish();
        return;
      }
      clearTimeout(this.timer);
      this.stopTalking();
      this.i = i;
      this.stepFinished = false;
      this.interrupted = false;
      store.set(`pos:${this.def.id}`, i);
      this.renderProgress();
      this.renderWords();
      const quizBox = this.$('.quiz');
      quizBox.hidden = true;
      quizBox.innerHTML = '';

      const replay = this.board.session(true);
      this.board.reset();
      try {
        for (let k = 0; k < i; k++) {
          const s = this.steps[k];
          await s.draw?.(replay);
          if (s.quiz && this.answered.has(k)) await s.solve?.(replay);
        }
      } catch (e) { if (e === CANCEL) return; throw e; }

      const live = this.board.session(false);
      const step = this.steps[i];
      try {
        await Promise.all([step.draw?.(live), this.talk(step, live.ctx)]);
        if (step.quiz) { this.askQuiz(step, live); return; }
      } catch (e) { if (e === CANCEL) return; throw e; }
      this.done();
    }
    done() {
      this.stepFinished = true;
      if (this.playing) this.timer = setTimeout(() => this.goTo(this.i + 1), 1100 / this.speed);
    }
    finish() {
      this.playing = false;
      this.renderPlay();
      store.set(`pos:${this.def.id}`, 0);
      const n = this.def.next;
      this.overlay(`
        <h2>درس ${this.def.number} تمام شد 🎉</h2>
        <p>هر قدم را می‌توانید از نوار بالای تخته دوباره ببینید، یا بروید درس بعد.</p>
        <div class="row">
          <button class="btn" data-go="0">⟲ دوباره ببین</button>
          ${n ? `<a class="btn primary" href="${n.href}">درس بعد: ${esc(n.title)} ◀</a>` : '<a class="btn primary" href="../index.html">برگشت به فهرست</a>'}
        </div>`);
    }
    renderProgress() {
      [...this.$('.progress').children].forEach((b, k) => {
        b.classList.toggle('now', k === this.i);
        b.classList.toggle('done', k < this.i);
        b.setAttribute('aria-current', k === this.i ? 'step' : 'false');
      });
      this.$('[data-act="prev"]').disabled = this.i === 0;
    }
    renderWords() {
      const box = this.$('.words');
      box.querySelectorAll('.chip').forEach(c => c.remove());
      const seen = new Set();
      this.steps.slice(0, this.i + 1).forEach((s, k) => {
        if (!s.term || seen.has(s.term[0])) return;
        seen.add(s.term[0]);
        const c = document.createElement('span');
        c.className = 'chip' + (k === this.i ? ' new' : '');
        c.innerHTML = `<span>${esc(s.term[0])}</span><span class="fa" lang="fa">${esc(s.term[1])}</span>`;
        box.appendChild(c);
      });
      box.hidden = seen.size === 0;
    }

    // ---- talking
    talk(step, ctx, text = step.say) {
      const sayBox = this.$('.say');
      const words = text.split(/\s+/);
      // Runs of English / math words become one left-to-right chunk, so "Base (radix)"
      // or "8 + 2 = 10" keep their order inside a Persian sentence.
      // Sentence punctuation after such a chunk ("… 9247.") stays outside it, on the Persian side.
      const chunks = [];
      for (const w of words) {
        const [, core, tail] = /^(.*?)([.,:;!?،؛]*)$/.exec(w);
        const ltr = core !== '' && !PERSIAN.test(core);
        const last = chunks[chunks.length - 1];
        if (!ltr) chunks.push({ ltr, words: [w], tail: '' });
        else if (last?.ltr && !last.tail) { last.words.push(core); last.tail = tail; }
        else chunks.push({ ltr, words: [core], tail });
      }
      const fmt = w => {
        const m = /^([^*]*)\*(.+)\*([^*]*)$/.exec(w);
        return m ? `${esc(m[1])}<b>${htmlMath(m[2])}</b>${esc(m[3])}` : htmlMath(w);
      };
      sayBox.innerHTML = (step.tip ? '<span class="tip-label">نکته‌ی معلم</span>' : '') + chunks.map(c => c.ltr
        ? `<span class="w"><span dir="ltr">${c.words.map(fmt).join(' ')}</span>${esc(c.tail)}</span>`
        : `<span class="w">${fmt(c.words[0])}</span>`).join(' ');
      this.$('.board').setAttribute('aria-label', 'تخته: ' + text.replace(/\*/g, ''));
      const spans = [...sayBox.querySelectorAll('.w')];
      const est = Math.max(2000, words.length * 420) / this.speed;
      const teacher = this.$('.teacher');
      teacher.classList.add('talking');
      teacher.classList.remove('happy');

      return new Promise(resolve => {
        let shown = 0;
        const reveal = () => {
          spans.slice(0, ++shown).forEach(s => s.classList.add('on'));
          if (shown < spans.length) this.wordTimer = setTimeout(reveal, est / spans.length);
        };
        reveal();
        const end = () => {
          clearTimeout(this.wordTimer);
          clearTimeout(this.talkTimer);
          spans.forEach(s => s.classList.add('on'));
          teacher.classList.remove('talking');
          this.endTalk = null;
          resolve();
        };
        this.endTalk = end;
        if (this.voiceOn && this.voice) {
          const u = new SpeechSynthesisUtterance(text.replace(/\*/g, ''));
          u.voice = this.voice;
          u.lang = this.voice.lang;
          u.rate = Math.min(1.6, 0.98 * this.speed);
          u.onend = end;
          u.onerror = end;
          this.utterance = u; // keep a reference so the browser doesn't drop it mid-sentence
          speechSynthesis.cancel();
          speechSynthesis.speak(u);
          this.talkTimer = setTimeout(end, est * 2.5 + 4000);
        } else {
          this.talkTimer = setTimeout(end, est);
        }
      }).then(() => { if (!ctx.alive) throw CANCEL; });
    }
    stopTalking() {
      if ('speechSynthesis' in window) speechSynthesis.cancel();
      this.endTalk?.();
    }

    // ---- quiz
    askQuiz(step, b) {
      const q = step.quiz;
      const box = this.$('.quiz');
      box.hidden = false;
      let tries = 0;
      const input = q.choices
        ? q.choices.map((c, k) => `<button class="btn" dir="ltr" data-choice="${k}">${htmlMath(c)}</button>`).join('')
        : `<label class="visually-hidden" for="ans">جواب شما</label><input id="ans" dir="ltr" inputmode="decimal" autocomplete="off" placeholder="جواب شما">
           <button class="btn primary" data-check>بررسی</button>`;
      box.innerHTML = `${input}<button class="btn" data-show hidden>راه‌حل را نشانم بده</button><div class="feedback" role="status"></div>`;
      const fb = box.querySelector('.feedback');
      const showBtn = box.querySelector('[data-show]');
      const field = box.querySelector('input');
      field?.focus();

      const solve = async (right) => {
        this.answered.add(this.i);
        box.querySelectorAll('button, input').forEach(el => { el.disabled = true; });
        const teacher = this.$('.teacher');
        if (right) teacher.classList.add('happy');
        try {
          await Promise.all([step.solve?.(b), this.talk({}, b.ctx, (right ? 'آفرین، درست است! ' : 'این‌طوری حل می‌شود: ') + q.explain)]);
        } catch (e) { if (e === CANCEL) return; throw e; }
        box.querySelectorAll('button').forEach(el => { el.hidden = true; });
        const go = document.createElement('button');
        go.className = 'btn primary';
        go.textContent = 'ادامه ◀';
        go.onclick = () => this.goTo(this.i + 1);
        box.insertBefore(go, fb);
        go.focus();
        this.done();
      };
      const judge = (ok, given) => {
        tries++;
        if (ok) {
          fb.className = 'feedback good';
          fb.innerHTML = '✔ درست است!';
          solve(true);
        } else {
          fb.className = 'feedback bad';
          fb.innerHTML = `✘ نه کاملاً${given ? ` (جواب شما: <bdi>${esc(given)}</bdi>)` : ''}. ${tries === 1 && q.hint ? 'راهنمایی: ' + htmlMath(q.hint) : 'دوباره امتحان کن، یا بگذار راه‌حل را نشانت بدهم.'}`;
          showBtn.hidden = false;
          this.$('.teacher').classList.remove('happy');
        }
      };
      showBtn.onclick = () => { fb.className = 'feedback'; fb.textContent = ''; solve(false); };
      box.querySelectorAll('[data-choice]').forEach(btn => {
        btn.onclick = () => judge(Number(btn.dataset.choice) === q.correct, null);
      });
      const check = () => {
        const v = field.value;
        if (!v.trim()) { field.focus(); return; }
        judge(q.answer.some(a => norm(a) === norm(v)), v);
      };
      box.querySelector('[data-check]')?.addEventListener('click', check);
      field?.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    }
  }

  // "(13)_10", " 13 ", "13.0", "۱۳", "۰٫۶۲۵" → plain western form
  function norm(s) {
    let v = String(s)
      .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
      .replace(/٫/g, '.')
      .replace(/[,،٬]/g, '')
      .toLowerCase().replace(/\s+/g, '').replace(/^\((.*)\)_?\d*$/, '$1').replace(/_\d+$/, '');
    if (/^-?\d*\.?\d+$/.test(v)) v = String(Number(v));
    return v;
  }

  window.Teacher = { start: def => new Player(def), CANCEL };
})();
