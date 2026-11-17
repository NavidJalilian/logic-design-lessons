# Lecture notes transcription — Slides 67–88

## Slide 67
- No chapter heading (continuation of the decoder topic, Chapter 5 combinational circuits).
- Topics: Decoder built from NAND gates; decoder with enable input; 2-to-4 decoder with active-low outputs.
- Content:
  - "Decoders can be built with NAND gates (دیکدرها را می‌توان با گیت‌های NAND ساخت)."
  - Boxed: "Most decoder ICs include an enable input (ورودی راه‌انداز / enable) to control circuit operation."
  - **A 2-to-4 decoder with enable input (یک دیکدر ۲-۴ با ورودی راه‌انداز):**
    - Circuit: A → inverter → (A') → inverter → (A); B → inverter → (B') → inverter → (B); E → inverter → (E').
    - Four NAND gates (3 inputs each, the third input is the inverted E):
      - D0 = (A'B')' [and E']
      - D1 = (A'B)'
      - D2 = (AB')'
      - D3 = (AB)'
    - Truth table:

      | E | A | B | D0 | D1 | D2 | D3 |
      |---|---|---|---|---|---|---|
      | 1 | X | X | 1 | 1 | 1 | 1 |
      | 0 | 0 | 0 | 0 | 1 | 1 | 1 | → D0 = 0
      | 0 | 0 | 1 | 1 | 0 | 1 | 1 | → D1 = 0
      | 0 | 1 | 0 | 1 | 1 | 0 | 1 | → D2 = 0
      | 0 | 1 | 1 | 1 | 1 | 1 | 0 | → D3 = 0
    - "The outputs are complemented (خروجی‌ها مکمل شده می‌باشند)." So enable is active-low (E = 0 enables) and the selected output is 0.
  - **Block diagram (نمودار جعبه‌ای / block symbol):** box labelled "decoder 2×4"; inputs A, B; outputs D0, D1, D2, D3 each with an inversion bubble; E (enable, written "(توانا ساز)") enters the bottom with a bubble.
    - "At any time only one of the outputs is zero (هر بار فقط یکی از خروجی‌ها صفر می‌باشد)."

## Slide 68
- Topic: Building a 4×16 decoder using two 3×8 decoders (ساخت دیکدر 4×16 با استفاده از دو دیکدر 3×8).
- Circuit:
  - Inputs x, y, z go to the data inputs of BOTH 3×8 decoders.
  - w → inverter → E of the upper decoder; w (direct) → E of the lower decoder.
  - Upper decoder outputs: D0 = (w'x'y'z') … D7.
  - Lower decoder outputs: D8 = (wx'y'z') … D15.
- Explanation:
  - If w = 0 ⇒ the upper decoder is active (دیکدر بالا فعال است): outputs 0000 … 0111 (w is the leftmost bit; written as w x y z).
  - If w = 1 ⇒ the lower decoder is active (پایینی فعال است): 1000 … 1111.
- (Here the enables are active-high: E = 1 turns the decoder on.)

## Slide 69
- Topic: Encoders (کدرها / رمزکننده — Coder/Encoder).
- Definitions:
  - "An encoder is a digital circuit that performs the inverse operation of a decoder (عمل عکس یک دیکدر)."
  - "That is, an encoder converts 2^n input lines (at most) into n output lines."
  - "The encoder's output lines generate the binary code corresponding to the input value."
- **Example: octal (8-input) encoder (مثال: کدر ۸ تایی):**
  - Truth table (inputs ورودی D0–D7, outputs خروجی x y z):

    | D0 | D1 | D2 | D3 | D4 | D5 | D6 | D7 | x | y | z |
    |---|---|---|---|---|---|---|---|---|---|---|
    | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
    | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
    | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
    | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 1 |
    | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 |
    | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 1 |
    | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 |
    | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 1 |
  - "Truth table as follows. Note (نکته): we assume that at any time only one input is 1; otherwise the circuit has no meaning."
  - From the table we have:
    - x = D4 + D5 + D6 + D7
    - y = D2 + D3 + D6 + D7
    - z = D1 + D3 + D5 + D7
  - "So the encoder circuit is as follows:" three OR gates: x = OR(D4, D5, D6, D7); y = OR(4 inputs: D2, D3, D6, D7); z = OR(4 inputs: D1, D3, D5, D7). (Only the x-gate wiring is drawn; y and z gates are drawn with 4 unconnected input stubs.)
  - Worked readings below the box:
    - If D2 = 1, then y = 1, i.e. the output is 010 — output equals 2 in binary (input 2).
    - If D6 = 1, then x = y = 1, output 110 — input 6.
    - If D0 = 1, then x = y = z = 0, output 000.

## Slide 70
- Topic: Multiplexer (MUX) — مالتی‌پلکسر (متمرکزکننده).
- Content:
  - "A multiplexer is a combinational (ترکیبی) circuit that selects binary information from one of many input lines and directs it to a single output line."
  - "Number of input lines = 2^n and number of select lines (خطوط انتخاب / select) = n."
  - "Usually MUX ICs have an enable input (راه‌انداز / Enable). When E = 1, the outputs are zero [margin: output 0] and the circuit is off (disabled). If E = 0, the circuit works as a MUX." (i.e. active-low enable)

## Slide 71
- Topic: Example — 4-to-1 multiplexer (مثال: مالتی‌پلکسر ۴ به ۱).
- "It has 4 inputs and 1 output. Select lines S0 and S1 are for choosing the inputs."
- Circuit (gate list):
  - S1 → inverter → S1'; S0 → inverter → S0'.
  - AND1(I0, S1', S0'); AND2(I1, S1', S0); AND3(I2, S1, S0'); AND4(I3, S1, S0).
  - OR(AND1..AND4) → Y.
  - So Y = I0·S1'S0' + I1·S1'S0 + I2·S1S0' + I3·S1S0.
- Function table:

  | S1 | S0 | Y |
  |---|---|---|
  | 0 | 0 | I0 |
  | 0 | 1 | I1 |
  | 1 | 0 | I2 |
  | 1 | 1 | I3 |
- Block diagram (نمودار جعبه‌ای): box with inputs 0, 1, 2, 3 (ورودی), output Y (خروجی), select lines S1, S0 at the bottom. "The MUX is also shown as (4×1)."

## Slide 72
- Topic: Implementing a Boolean function with a MUX (پیاده‌سازی تابع بولی با MUX) — procedure.
- Content:
  - "The function must be in the form of a sum of minterms (مجموع عبارات کمینه)."
  - "If the variables are A to n, e.g. ABCD…, where A is the most significant (باارزش‌ترین)."
  - "The n−1 variables BCD… are taken as the select lines (B is the highest-order select line, and so on)."
  - "Since A is the most significant variable, in the truth table the first half of the minterms contain A' and the second half contain A." (side sketch: column A with first half 0 → A', second half 1 → A)
  - "For example, for three variables ABC we have 8 minterms; minterms 0 to 3 are formed with A' and minterms 4 to 7 with A."
  - **Steps (مراحل):**
    1. For implementation, write the MUX inputs in a row and write their minterms below them in two rows, and circle all minterms of the given function. [unclear: a short trailing phrase, roughly "then we act as follows"]
    2. If neither minterm in a column is circled, the corresponding MUX input is **0**.
    3. If both minterms in a column are circled, the MUX input is **1**.
    4. If only the bottom minterm is circled (top not circled), the corresponding input is **A**.
    5. If only the top minterm is circled (bottom not), the input is **A'**.

## Slide 73
- Topic: Example — implement F(A,B,C) = Σ(1,3,5,6) with a MUX (مثال: تابع … را با MUX پیاده‌سازی کنید). Annotation: select = BC, input = A.
- Truth table (A B C | F | minterm):
  - 000 | 0 | 0
  - 001 | 1 | 1
  - 010 | 0 | 2
  - 011 | 1 | 3
  - 100 | 0 | 4
  - 101 | 1 | 5
  - 110 | 1 | 6
  - 111 | 0 | 7
- Implementation table:

  |    | I0 | I1 | I2 | I3 |
  |----|----|----|----|----|
  | A' | 0 | (1) | 2 | (3) |
  | A  | 4 | (5) | (6) | 7 |
  | →  | 0 | 1 | A | A' |
  (circled = 1, 3, 5, 6)
- ⇒ I0 = 0, I1 = 1, I2 = A, I3 = A'. [verified correct]
- Circuit: 4×1 MUX with I0 = 0, I1 = 1, I2 = A, I3 = A'; select S1 = B, S0 = C; output Y = F.
- Side note: "2 select lines → 2² = 4 inputs."
- **Note (نکته):** "Instead of the most significant variable (A), other variables can be chosen as the MUX input, provided that we modify the implementation table."
  - "E.g. in ABC, if we choose B as the input:" list of ABC rows grouped: minterms 0,1 → B'; 2,3 → B; 4,5 → B'; 6,7 → B.
  - Modified table (columns labelled with AC = 00, 01, 10, 11):

    |    | I0 | I1 | I2 | I3 |
    |----|----|----|----|----|
    | B' | 0 | 1 | 4 | 5 |
    | B  | 2 | 3 | 6 | 7 |

## Slide 74
- Topic: Example — F(A,B,C) = Σ(1,2,4,5) with a multiplexer, choosing C as the input (مثال: … را با یک متمرکزکننده طراحی کنید و C را به عنوان ورودی انتخاب کنید).
- Truth table (A B C | F): 000|0, 001|1, 010|1, 011|0, 100|1, 101|1, 110|0, 111|0. (C' / C marked beside rows.)
- Implementation table (select = A, B; input = C):

  |    | I0 | I1 | I2 | I3 |
  |----|----|----|----|----|
  | C' | 0 | (2) | (4) | 6 |
  | C  | (1) | 3 | (5) | 7 |
  | →  | C | C' | 1 | 0 |
- Circuit: MUX 4×1 with I0 = C, I1 = C' (C through inverter), I2 = 1, I3 = 0; S1 = A, S0 = B; output Y = F.
- "For example, when AB = 00, output F = I0 = C." [verified correct]

## Slide 75
- Topic: Example — implement F(A,B,C,D) = Σ(0,1,3,4,8,9,15) with a MUX (مثال: تابع زیر را با MUX پیاده کنید).
- "3 select lines → 2³ = 8 inputs."
- Implementation table:

  |    | I0 | I1 | I2 | I3 | I4 | I5 | I6 | I7 |
  |----|----|----|----|----|----|----|----|----|
  | A' | (0) | (1) | 2 | (3) | (4) | 5 | 6 | 7 |
  | A  | (8) | (9) | 10 | 11 | 12 | 13 | 14 | (15) |
  | →  | 1 | 1 | 0 | A' | A' | 0 | 0 | A |
  [verified correct]
- Circuit: 8-input MUX; constant 1 → I0, I1; constant 0 → I2, I5, I6; A → inverter → A' → I3, I4; A → I7. Select S2 = B, S1 = C, S0 = D. Output F.
- Boxed: "Demultiplexer (دِمالتی‌پلکسر): is the reverse (عکس) of the MUX."

## Slide 76
- Heading: تمرین فصل ۵ — Chapter 5 Exercises (typed slide).
1. Complete the statements (عبارات را کامل کنید):
   - a) A decoder with two inputs has …… outputs.
   - b) A multiplexer with two select lines has …… inputs and …… output(s).
   - c) A decoder with two outputs has …… input(s).
   - d) A multiplexer with 4 inputs needs …… select lines.
2. Design a comparator circuit (مدار مقایسه کننده) with a decoder.
3. Design the function f(x,y,z) = Σ(0,2,3,5) with a decoder.
4. Design the function f(x,y,z) = Σ(0,2,4,7) with a multiplexer:
   - a) choose A as the input. b) choose C as the input.
   - [possible error: the function is in x,y,z but parts a/b say "A" and "C"; presumably meaning the first variable (x) and the last variable (z).]
- (Expected answers, not on slide: a) 4; b) 4 inputs, 1 output; c) 1; d) 2.)

## Slide 77
- Heading: فصل ۶ — Chapter 6 (circled).
- Topic: Sequential circuits (مدارهای ترتیبی).
- Definition: "A sequential circuit is a circuit whose output, in addition to the present input, also depends on the previous state (حالت قبلی). That is, it has a memory element (عنصر حافظه)."
- Block diagram of a sequential circuit (نمودار بلوکی مدار ترتیبی): inputs (ورودی‌ها) → combinational circuit (مدار ترکیبی) → outputs (خروجی); combinational circuit → memory element (عنصر حافظه) → fed back into the combinational circuit.
- Boxed: "In sequential logic systems, timing is done by a clock that produces periodic pulses (پالس‌های دوره‌ای) for digital signals; e.g. a clock pulse generator that produces a periodic train of clock pulses (clock pulse)." Waveform sketch: 0, 1, 0, 1, 0 (square pulses).

## Slide 78
- Topic: Flip-flops (فلیپ‌فلاپ).
- "The memory elements used in clocked sequential circuits (مدارات ترتیبی ساعت‌دار) are called flip-flops (flip-flop)."
- "These circuits can store one bit of information. They have two outputs: one is the normal value and the other is its complement."
- Boxed — Types of flip-flops (انواع فلیپ‌فلاپ‌ها):
  - Basic flip-flop (فلیپ‌فلاپ بنیادی) [latch]
  - RS flip-flop
  - D flip-flop
  - JK flip-flop
  - T flip-flop

## Slide 79
- Topic: Basic flip-flop (فلیپ‌فلاپ بنیادی) — NOR version.
- "It has two inputs, set and Reset, and two outputs Q and Q'. There is feedback (پس‌خور) from the output of one gate to the input of the other."
- **a) Basic flip-flop with NOR gates (الف: فلیپ‌فلاپ بنیادی با گیت‌های NOR):**
  - Circuit: NOR1(R, Q') → Q; NOR2(S, Q) → Q' (cross-coupled).
  - Table:

    | S | R | Q | Q' | note |
    |---|---|---|---|---|
    | 1 | 0 | 1 | 0 | |
    | 0 | 0 | 1 | 0 | no change (بدون تغییر) |
    | 0 | 1 | 0 | 1 | |
    | 0 | 0 | 0 | 1 | no change |
    | 1 | 1 | 0 | 0 | indeterminate (حالت نامعین), Q = Q' |
  - "Whenever S = 1 and R = 0, we have Q = 1 (set state, حالت set)."
  - "To change the above state, R = 1 and S = 0 must be applied so that Q = 0 (clear state, حالت پاک شدن)."
  - "That is, the output changes when either input becomes 1 (goes from 0 to 1 — i.e. it changes on the rising edge, لبه بالارونده)."
  - Note (نکته): "To avoid the indeterminate state (Q = Q', S = R = 1), input S must be returned to 0 before R goes to 1, and vice versa, because when S = 1 and then R = 1 is applied we don't get a proper state change in the output." [partly unclear wording at end; meaning: never let both be 1 simultaneously]

## Slide 80
- Topic: b) Basic flip-flop with NAND gates (ب: فلیپ‌فلاپ بنیادی با گیت‌های NAND).
- Circuit: NAND1(S, Q') → Q; NAND2(R, Q) → Q' (cross-coupled).
- Table:

  | S | R | Q | Q' | note |
  |---|---|---|---|---|
  | 1 | 0 | 0 | 1 | |
  | 1 | 1 | 0 | 1 | (no change) |
  | 0 | 1 | 1 | 0 | |
  | 1 | 1 | 1 | 0 | (no change) |
  | 0 | 0 | 1 | 1 | indeterminate (نامعین) |
- "The output changes state when either input goes from 1 to 0, i.e. on the falling edge (لبه پایین‌رونده)."
- "Clearly, once R = 0, the output stays fixed until S = 0 is applied." [handwriting partly unclear]
- (Inputs are effectively active-low for the NAND latch.)

## Slide 81
- Topic: RS flip-flop (فلیپ‌فلاپ RS) — clocked.
- "The basic flip-flop can be improved with an additional control input (cp)."
- "An RS flip-flop with a clock-pulse input (cp) as below consists of a basic FF plus two additional NAND gates."
- Circuit: gate 3 = NAND(S, cp); gate 4 = NAND(R, cp); gate 3 output → NAND latch gate producing Q; gate 4 output → latch gate producing Q' (latch gates cross-coupled). Clock waveform drawn on cp.
- "The pulse input (cp) acts as an enable (راه‌انداز)."
- cp = 0 → outputs of gates 3 and 4 = 1 ⇒ this is the stable (rest) condition for the basic FF (output remains unchanged), regardless of S and R.
- "When cp = 1, the FF works."

## Slide 82
- Topic: RS flip-flop operation, characteristic table, K-map, symbol.
- Same circuit as slide 81 redrawn.
- cp = 1 → S = 1, R = 0 ⇒ Q = 1, Q' = 0 (set state).
- "To change the state, R = 1 must be applied, but to avoid the indeterminate state Q = Q' = 1, S must be made 0 before R becomes 1, i.e. S = 0 and R = 1."
- S = 0, R = 1 ⇒ Q = 0, Q' = 1 (reset state, حالت پاک کردن).
- Note: "In every case, when cp = 0 the circuit stays unchanged. Also when cp = 1 and S = R = 0, the output does not change."
- "The indeterminate state is when cp = 1 and S = R = 1."
- Characteristic table (present state حالت فعلی Q(t), next state حالت بعدی Q(t+1)):

  | Q(t) | S | R | Q(t+1) |
  |---|---|---|---|
  | 0 | 0 | 0 | 0 |
  | 0 | 0 | 1 | 0 |
  | 0 | 1 | 0 | 1 |
  | 0 | 1 | 1 | indeterminate (Q = Q') |
  | 1 | 0 | 0 | 1 |
  | 1 | 0 | 1 | 0 |
  | 1 | 1 | 0 | 1 |
  | 1 | 1 | 1 | indeterminate (Q = Q') |
- K-map (rows Q = 0, 1; columns SR = 00, 01, 11, 10; S spans columns 11,10; R spans 01,11):
  - Row Q=0: 00 → blank, 01 → blank, 11 → X, 10 → 1
  - Row Q=1: 00 → 1, 01 → blank, 11 → X, 10 → 1
  - Groups: S-column pair (11,10 both rows, using X) → S; row Q=1 cells 00 and 10 → R'Q.
- **Q(t+1) = S + R'Q, with the condition SR = 0** (S = R = 1 must not happen together).
- Graphic symbol (نمودار ترسیمی): box with inputs S, C, R and outputs Q, Q'.

## Slide 83
- Topic: D flip-flop (فلیپ‌فلاپ D).
- "To remove the indeterminate state in the RS flip-flop, we must make sure S and R are never 1 at the same time. This is done in the D flip-flop."
- Circuit: D → NAND(D, cp); D → inverter → NAND(D', cp); these two feed a cross-coupled NAND latch with outputs Q and Q'.
- Boxed:
  - "When cp = 0, the FF is in its rest (stable) state, and regardless of the value of D the output does not change."
  - When cp = 1:

    | Q | D | Q(t+1) |
    |---|---|---|
    | 0 | 0 | 0 |
    | 0 | 1 | 1 |
    | 1 | 0 | 0 |
    | 1 | 1 | 1 |
  - ⇒ **Q(t+1) = D** — "it has no dependence on the present state Q."
  - Graphic symbol: box with D, C inputs; Q, Q' outputs.

## Slide 84
- Topic: JK flip-flop (فلیپ‌فلاپ JK).
- "It is a modified (اصلاح‌شده) RS in which the indeterminate state has been defined."
- "The J and K inputs are like S and R, for set and clear."
- Boxed: "When J = K = 1 (which was the indeterminate state for RS, Q = Q' = 1), the flip-flop switches to its complement: i.e. if Q = 1 it becomes 0 and vice versa."
- Circuit: AND(K, cp, Q [feedback from Q output]) → NOR → Q; AND(J, cp, Q' [feedback from Q' output]) → NOR → Q'; the two NORs cross-coupled. [unclear: a small circled annotation near the lower NOR input]
- Boxed notes:
  - "Output Q is ANDed with the K and cp inputs so that the FF is cleared during a clock pulse only if Q was previously 1."
  - "Output Q' is ANDed with J and cp so that the FF is set during a clock pulse only if Q' was previously 1."

## Slide 85
- Topic: JK flip-flop characteristic table and equation.
- "When J = K = 1, only one of the AND gates' outputs is 1 — the gate whose input is connected to the flip-flop output that is 1 (e.g. Q = 1) — and the other is 0. The flip-flop changes state (the outputs change: the one that was 1 becomes 0 and vice versa)."
- Characteristic table:

  | Q | J | K | Q(t+1) | note |
  |---|---|---|---|---|
  | 0 | 0 | 0 | 0 | |
  | 0 | 0 | 1 | 0 | |
  | 0 | 1 | 0 | 1 | |
  | 0 | 1 | 1 | 1 | state change (تغییر وضعیت) |
  | 1 | 0 | 0 | 1 | no change (بدون تغییر) |
  | 1 | 0 | 1 | 0 | R (reset) |
  | 1 | 1 | 0 | 1 | Set |
  | 1 | 1 | 1 | 0 | state change |
  (small labels above J/K columns [unclear: possibly "Reset"/"Set"]; a star and bracket mark the Q = 1 rows.)
- K-map (rows Q = 0, 1; columns JK = 00, 01, 11, 10; J spans 11,10; K spans 01,11):
  - Row Q=0: blank, blank, 1, 1 (grouped → JQ')
  - Row Q=1: 1, blank, blank, 1 (wrap-around group → K'Q)
- **Q(t+1) = JQ' + K'Q** [verified]
- Cloud note: J = K = 0 → no change; J = K = 1 → change (toggle).

## Slide 86
- Topic: T flip-flop (فلیپ‌فلاپ T).
- "A JK flip-flop with a single input is called T." J = K = T.
- Symbol: T wired to both J and K of a JK box; outputs Q, Q'. Labelled "T flip-flop".
- Characteristic table:

  | Q | T | Q(t+1) |
  |---|---|---|
  | 0 | 0 | 0 |
  | 0 | 1 | 1 |
  | 1 | 0 | 1 |
  | 1 | 1 | 0 |
- Side reasoning: "For JK we had: J = K = 0 → no change; J = K = 1 → change. ⇒ T = 0 (T = J = K) → no change; T = 1 → change."
- **Q(t+1) = TQ' + T'Q** (boxed; also written TQ' + QT'), i.e. Q(t+1) = T ⊕ Q.
- "When T = 0: Q(t+1) = Q, i.e. the output stays unchanged. When T = 1: Q(t+1) = Q', the output is complemented."

## Slide 87
- Topic: Counter design (طراحی شمارنده‌ها — Counter).
- "A counter is a sequential circuit that goes through a specific sequence of states with input pulses."
- "Binary counter (شمارنده دودویی / binary counter): follows the binary sequence."
- Example: "If we want to build an n-bit binary counter, we need n flip-flops; it can count from 0 to 2^n − 1."
- "E.g. a 3-bit counter counts from 000 to 111."

## Slide 88
- Topic: Design of a 3-bit binary counter with T flip-flops (طراحی شمارنده دودویی ۳ بیتی با فلیپ‌فلاپ T).
- "We need 3 flip-flops. In these circuits the only input is cp, and with each clock pulse the outputs change."
- State sequence: 000 → 001 → … → 111 → (back to 000).
- "For the T flip-flop: whenever there is a state change, T = 1; whenever there is no change, T = 0."
- Excitation table:

  | Present A2 A1 A0 (حالت فعلی / output) | Next A2 A1 A0 (حالت بعدی) | TA2 | TA1 | TA0 |
  |---|---|---|---|---|
  | 0 0 0 | 0 0 1 | 0 | 0 | 1 |
  | 0 0 1 | 0 1 0 | 0 | 1 | 1 |
  | 0 1 0 | 0 1 1 | 0 | 0 | 1 |
  | 0 1 1 | 1 0 0 | 1 | 1 | 1 |
  | 1 0 0 | 1 0 1 | 0 | 0 | 1 |
  | 1 0 1 | 1 1 0 | 0 | 1 | 1 |
  | 1 1 0 | 1 1 1 | 0 | 0 | 1 |
  | 1 1 1 | 0 0 0 | 1 | 1 | 1 |
  [verified correct]
- K-map for TA2 (rows A2 = 0, 1; columns A1A0 = 00, 01, 11, 10): 1s only in column A1A0 = 11 in both rows → **TA2 = A1A0**.
- ⇒ **TA2 = A1A0, TA1 = A0, TA0 = 1.**
- Circuit: three T flip-flops, cp (clock) to all clock inputs. FF0: T = 1 (constant), output A0. FF1: T = A0, output A1. FF2: T = AND(A1, A0), output A2.
- Side note near clock: [unclear: roughly "cp from 1 → 0 …" — likely that the FFs trigger on the falling edge of cp].

## Range summary
- **Chapter 5 (combinational circuits), continued:**
  - 67 — Decoder with NAND gates; 2-to-4 decoder with active-low enable and complemented outputs; block symbol.
  - 68 — 4×16 decoder from two 3×8 decoders (w drives the enables).
  - 69 — Encoder (coder): definition, octal 8-to-3 encoder truth table, x/y/z OR equations and circuit.
  - 70 — Multiplexer (MUX): definition, 2^n inputs / n select lines, enable input.
  - 71 — 4-to-1 MUX: AND-OR circuit, function table, block symbol.
  - 72 — Procedure for implementing a Boolean function with a MUX (implementation table, 5 rules).
  - 73 — Example F = Σ(1,3,5,6) with 4×1 MUX; note on choosing a variable other than A as the input (B example).
  - 74 — Example F = Σ(1,2,4,5) with C as the input.
  - 75 — Example F(A,B,C,D) = Σ(0,1,3,4,8,9,15) with 8×1 MUX; demultiplexer = reverse of MUX.
  - 76 — Chapter 5 exercises (typed).
- **Chapter boundary: Chapter 6 (فصل ۶) starts at slide 77 — sequential circuits.**
  - 77 — Sequential circuits definition, block diagram, clock pulses.
  - 78 — Flip-flops definition; types (basic, RS, D, JK, T).
  - 79 — Basic NOR latch: circuit, table, set/reset, indeterminate S=R=1.
  - 80 — Basic NAND latch: circuit, table, indeterminate S=R=0, falling-edge behaviour.
  - 81 — Clocked RS flip-flop circuit (NAND gates 3 and 4, cp as enable).
  - 82 — RS characteristic table, K-map, Q(t+1) = S + R'Q with SR = 0; symbol.
  - 83 — D flip-flop: circuit, table, Q(t+1) = D; symbol.
  - 84 — JK flip-flop: definition, circuit with Q/Q' feedback, toggle when J=K=1.
  - 85 — JK characteristic table, K-map, Q(t+1) = JQ' + K'Q.
  - 86 — T flip-flop: J=K=T, table, Q(t+1) = TQ' + T'Q.
  - 87 — Counters: definition, binary counter, n FFs count 0 to 2^n − 1.
  - 88 — 3-bit binary counter design with T FFs: TA2 = A1A0, TA1 = A0, TA0 = 1; circuit.
- Math checks: all worked examples (slides 73, 74, 75, 82, 85, 88) verified correct. One likely typo in slide 76 exercise 4 (variables x,y,z but asks to choose "A"/"C" as input).
