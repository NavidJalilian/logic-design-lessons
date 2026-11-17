# Digital Logic Design — animated teacher

Animated lessons for a handwritten Persian Digital Logic Design course (88 slides, 6 chapters).
Each lesson plays like a teacher at a whiteboard: one idea per step, spoken and drawn, then quiz questions.

Explanations are in Persian (right-to-left); numbers, math and technical terms stay in English.
The teacher speaks aloud only if the computer has a Persian voice; otherwise the text appears word by word.

## Open it

```bash
python3 -m http.server 8791
```

Then open http://localhost:8791 (the course outline). Lessons also open straight from disk.

## Layout

- `index.html` — course outline; add a lesson's file path there to mark it ready
- `assets/teacher.js` — the lesson player (whiteboard helpers, narration, quizzes)
- `assets/teacher.css` — shared look, light (whiteboard) and dark (chalkboard)
- `lessons/NN-*.html` — one file per lesson: a list of steps (`say`, `draw`, `term`, `quiz`)
- `notes/` — English transcription of every slide, with errors in the handwritten notes flagged
- `source/book.pdf` — the original slides (not committed)
