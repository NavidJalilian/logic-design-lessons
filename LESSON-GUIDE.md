# How a lesson is written

Every lesson follows `lessons/01-number-systems.html`. Copy its structure: same `<head>`, the
`teacher.js` include, one inline script that calls `Teacher.start({...})`.

## Language
- The teacher's explanations (`say`, quiz `hint` / `explain`, Persian board labels) are **Persian**.
- Technical terms stay **English** inside the Persian sentence: binary, decimal, base, octal, hex,
  complement, minterm, K-map, flip-flop, MUX, decoder… Use the book's Persian word next to it the
  first time when the book has one (e.g. "*complement* یا مکمل").
- **Numbers are normal western digits** (1, 2, 3). Never Persian digits.
- Math on the board is plain text: `^` for superscripts and `_` for subscripts, e.g. `(1010.11)_2`,
  `2^{-1}`, `F = x'y + xz`. Prime is `'`.
- Persian board text uses `{ fa: true }`. Wrap a run of numbers or math inside Persian board text with
  `LTR('...')` (copy the one-line helper from Lesson 1) so it isn't reversed.
- In `say`, avoid putting sentence punctuation *inside* math; the player keeps `.`, `،`, `؛` after a
  math run on the Persian side automatically.

## Teaching style — a teacher, not a slide
- One idea per step. Explain the *mechanism* step by step, then the result. 15–28 steps per lesson.
- Follow the book's own examples, in the book's order, with the book's numbers. Say "مثال کتاب" when
  using one. Add your own extra example only when it helps, and mark exam tips with `tip: true`.
- If `notes/` flags an error in the handwritten notes, teach the correct version and say plainly in
  the narration that the notes have it wrong (e.g. "در جزوه اینجا اشتباه نوشته شده…").
- Each step's `draw` animates what the teacher is saying *right now* — write, highlight (`pulse`,
  `ring`, `recolor`), cross out (`line` + `dim`), move. Clear the board (`b.clear()`) when the topic changes.
- Add `term: ['English term', 'واژه‌ی فارسی کتاب']` the first time a key exam term appears.
- End with a "یادت باشد" summary step, then **4–6 exam-style quiz steps** (`quiz` + `solve`). Mix typed
  answers (`answer: [...]`, compared ignoring spaces / parentheses / trailing `_base`) and multiple
  choice (`choices`, `correct`). `solve(b)` animates the full method on the board.
- Typed answers must be short and unambiguous (a number, a bit string, or a short expression). For
  Boolean expressions prefer multiple choice, since many forms are equivalent.

## Correctness
- Recompute every number, table, K-map group and equation yourself (run a quick `node -e` check).
  The quiz answers must be right.
- Prefer computing values in code (as Lesson 1's `expand()` does) over typing them by hand.

## Board
- The board is 1000 × 560. Keep everything inside x 40–960, y 40–540; don't let text overlap.
- Helpers on `b`: `write`, `line`, `arrow`, `box`, `ring`, `path`, `wire`, `dot`, `gate`, `pins`,
  `erase`, `clear`, `dim`, `move`, `pulse`, `recolor`, `wait`. See the top of `assets/teacher.js`.
- Colors: `ink`, `blue` (place values / inputs), `orange` (focus), `green` (results), `red` (errors,
  carries, borrows), `purple` (positions / labels), `soft` (secondary).
- Gates: `await b.gate(id, 'nand', x, y)`; `b.pins('nand', x, y, n)` returns `{ ins: [[x,y]...], out: [x,y] }`
  to connect `b.wire(id, [[x1,y1],[x2,y2],...])`. Kinds: and, or, not, buf, nand, nor, xor, xnor.
- Every `draw` must work when replayed instantly (going Back redraws all earlier steps with no
  animation), so a step's drawing may only depend on what earlier steps drew.

## File and links
- File `lessons/NN-slug.html`; `id: 'LNN'`, `number: NN`, `next: { href: 'NN+1-slug.html', title: '…' }`
  (omit `next` on the last lesson).

## Check before you finish
```bash
node tools/check-lesson.mjs lessons/NN-slug.html
```
It replays every step and reports errors, drawings off the board, Persian digits and broken quizzes.
It cannot see overlaps or ugliness, so lay out coordinates carefully.
