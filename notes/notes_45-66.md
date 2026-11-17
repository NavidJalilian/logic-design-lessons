# Transcription — Slides 45–66

## Slide 45
- Section: (continuation of Chapter 3 — K-map simplification, product-of-sums)
- Topics: Simplifying to product-of-sums (POS) with a K-map using the 0 cells
- **Note (نکته):** The 1s of a function identify its minterms (عبارات کمینه), and the 0s of the function identify its maxterms (عبارات بیشینه).
- **Note 2 (نکته ۲):** If we have a function as a product of maxterms, we can use the zeros in the table and show the remaining cells with 1. Then for sum-of-products (minterms) use the 1s, and for product-of-sums (maxterms) use the 0s to write the function.
- **Example (مثال):** Simplify the function in terms of minterms and maxterms.
  - F(x,y,z) = Π(0,2,5,7) → F = Σ(1,3,4,6)
  - Solution: since there are maxterms, we use the 0s.
  - K-map (rows x = 0,1; columns yz = 00, 01, 11, 10; y over columns 11,10; z over columns 01,11):
    - Row x=0: m0=0, m1=1, m3=1, m2=0
    - Row x=1: m4=1, m5=0, m7=0, m6=1
    - Groups circled: 1s {m1,m3} and {m4,m6} (wrap-around); 0s {m0,m2} (wrap-around) and {m5,m7}.
  - (a) In terms of minterms (from the 1s): F = x'z + xz'
  - (b) F' = xz + x'z' (from the 0s) →
    F = (F')' = (xz + x'z')' = (x' + z')(x + z)
  - [Verified correct.]

## Slide 46
- Section heading: پیاده‌سازی NAND و NOR — NAND and NOR implementation
- Topics: NAND gate, symbol, equivalence with OR with inverted inputs
- Because NAND and NOR gates are simpler to build, they are built more than AND and OR.
- **NAND:** The NAND symbol is as follows: 2-input gate, inputs x, y, output (xy)'. (AND Invert) or NOT AND.
- It can be proven that the function of a NAND gate is the same as an OR gate with inverted inputs:
  - OR gate with bubbles on inputs x, y → output x' + y'.  x' + y' = (xy)'  (by DeMorgan, طبق دمورگان)
- Therefore (بنابراین): 3-input NAND (x, y, z) → (xyz)' ≡ OR with 3 inverted inputs → x' + y' + z' = (xyz)'

## Slide 47
- Topics: NOR gate, symbol, equivalence with AND with inverted inputs
- **NOR:** The NOR symbol is as follows: inputs x, y, output (x+y)'. (NOT OR)
- It can be proven that the function of a NOR gate is the same as an AND gate with inverted inputs:
  - AND with bubbled inputs x, y → output x'·y'.  x'y' = (x+y)'
- Therefore: 3-input NOR (x,y,z) → (x+y+z)' ≡ AND with 3 inverted inputs → x'y'z' = (x+y+z)'

## Slide 48
- Topics: NAND/NOR as inverter; NAND implementation of a sum-of-products
- **Note (نکته):** A single-input NAND or NOR gate acts like an inverter:
  x → [NAND] → x' ≡ x → [NOR] → x' ≡ x → [NOT] → x'
- **NAND implementation (پیاده‌سازی NAND):** means building a function using only NAND gates.
- **Example:** Implement F = AB + CD + E with NAND.
  - Original circuit: AND(A,B), AND(C,D), and E all go into a 3-input OR → F.
  - The figure can be redrawn as follows (می‌توان شکل را به صورت زیر درآورد):
    - Middle: NAND(A,B), NAND(C,D), and E' → OR with bubbled (inverted) inputs → F.
    - ≡ Right: NAND(A,B), NAND(C,D), and E passed through a 1-input NAND (inverter) to give E' → 3-input NAND → F.
  - Caption: "NAND implementation" (پیاده‌سازی با NAND).
- Note: the small circle (bubble) is the sign of inversion, and if two circles come one after the other they cancel each other.

## Slide 49
- Section heading: شرایط بی‌اثر — Don't-care conditions
- Topics: Don't-care conditions
- The sum of minterms specifies the conditions under which the function equals 1; the function is 0 for the remaining minterms.
- In practice, some applications have the function unspecified for certain combinations of variables, so we can assign it neither value 1 nor value 0.
- Instead we use the symbol X.
- So when we put X inside a square (K-map cell), it means it does not matter whether X equals 1 or 0.
- This property can be used to simplify Boolean expressions.

## Slide 50
- Topics: K-map simplification with don't-cares (4 variables)
- **Example:** Simplify the Boolean function F(w,x,y,z) = Σ(1,3,7,11,15) with don't-care conditions d(w,x,y,z) = Σ(0,2,5).
- K-map (rows wx = 00, 01, 11, 10; columns yz = 00, 01, 11, 10; x spans rows 01,11; w spans rows 11,10; y over columns 11,10; z over columns 01,11):
  - Row wx=00: m0=X, m1=1, m3=1, m2=X
  - Row wx=01: m4=blank(0), m5=X, m7=1, m6=blank
  - Row wx=11: m12 blank, m13 blank, m15=1, m14 blank
  - Row wx=10: m8 blank, m9 blank, m11=1, m10 blank
  - Groups: column yz=11 (m3,m7,m15,m11) → yz; square {m1,m3,m5,m7} → w'z; dashed group row 00 {m0,m1,m3,m2} → w'x'.
- Answer 1: F = w'z + zy  (m5 is taken as 1)
- Answer 2 (or): F = x'w' + yz  (m0 and m2 are taken as 1)
- [Verified: both give 1 on 1,3,7,11,15 and differ only on don't-cares.]

## Slide 51
- Heading: تمرین فصل ۳ — Chapter 3 exercises (typed slide)
1. Form the Karnaugh map for the following functions and simplify:
   a) f(x,y) = Σ(0,2)  b) f(x,y,z) = Σ(0,2,4,6)  c) f(x,y,z) = Σ(0,1,3,4,6)  d) f(A,B,C) = Σ(1,2,5,7)
2. Simplify the following functions with a Karnaugh map:
   a) f(x,y) = x.y + y  b) f(x,y,z) = x.y.z + x.y' + x.y.z'
   c) f(A,B,C) = A.B'.C + A.C + A'.B'.C + A.B'.C
   d) f(A,B,C,D) = A.B'.C.D + A'.C.D' + A'.B'.C + A.B'.D
3. Implement the following functions with NAND gates:
   a) f = (x + y').(x + y.z')  b) f = A.B + A.(B.C' + C)
4. Implement the functions given in question 3 with NOR gates.
- [Note: 1a) with 2 variables, Σ(0,2) — m2 exists for 2 variables (x=1,y=0), fine.]

## Slide 52
- Chapter heading: فصل ۴ — Chapter 4
- Topics: Combinational logic (منطق ترکیبی); Half adder
- **Combinational logic:** A combinational circuit is one whose outputs depend only on the current inputs and have no relation to previous inputs. (No memory; output only depends on present input.) [handwritten parenthetical partly unclear: roughly "(has no memory) – (output …)"]
- **Half adder (نیم افزاینده, half adder):** A combinational circuit that adds two input bits.
  - C: carry (بیت انتقال), S: sum (جمع)
  - Truth table (inputs x y; outputs C S):
    | x | y | C | S |
    |---|---|---|---|
    | 0 | 0 | 0 | 0 |
    | 0 | 1 | 0 | 1 |
    | 1 | 0 | 0 | 1 |
    | 1 | 1 | 1 | 0 |
  - When x and y are added, only when x = y = 1 do we have a carry bit to the higher position, which is called carry.
  - The Boolean functions of the two outputs can be written from the table:
    S = x'y + xy'
    C = xy
  - Therefore the logic circuit of the half adder is as follows: AND(x', y) and AND(x, y') → OR → S; AND(x, y) → C.

## Slide 53
- Topics: Alternative half-adder implementations
- The half-adder circuit can also be written in other forms:
  - (2) S = (x+y)(x'+y'), C = xy. Circuit: OR(x,y) and OR(x',y') → AND → S; AND(x,y) → C.
  - (3) S = (x+y)(x'+y'), C = (x'+y')'. Circuit: OR(x,y) and OR(x',y') → AND → S; output of OR(x',y') also → NOT → C.
  - (4) S = x ⊕ y, C = xy. Circuit: XOR(x,y) → S; AND(x,y) → C.

## Slide 54
- Topics: Full adder
- **Full adder (تمام افزاینده, Full Adder):** A combinational circuit that adds three input bits.
- Truth table (inputs x y z; outputs C S):
  | x | y | z | C | S |
  |---|---|---|---|---|
  | 0 | 0 | 0 | 0 | 0 |
  | 0 | 0 | 1 | 0 | 1 |
  | 0 | 1 | 0 | 0 | 1 |
  | 0 | 1 | 1 | 1 | 0 |
  | 1 | 0 | 0 | 0 | 1 |
  | 1 | 0 | 1 | 1 | 0 |
  | 1 | 1 | 0 | 1 | 0 |
  | 1 | 1 | 1 | 1 | 1 |
- Now to simplify S and C we draw the Karnaugh maps.
  - S map (rows x=0,1; cols yz=00,01,11,10): row 0: m0=0, m1=1, m3=blank, m2=1; row 1: m4=1, m5=·, m7=1, m6=blank. Each 1 circled alone (no adjacency).
    S = x'y'z + x'yz' + xy'z' + xyz
  - C map: row 0: m3=1; row 1: m5=1, m7=1, m6=1. Groups: {m3,m7} (yz), {m5,m7} (xz), {m7,m6} dashed (xy).
    C = xz + yz + xy
- Circuits:
  - S: AND(x',y',z), AND(x',y,z'), AND(x,y',z'), AND(x,y,z) → 4-input OR → S.
  - C: AND(x,y), AND(x,z), AND(y,z) → 3-input OR → C.

## Slide 55
- Topics: Full adder from two half adders
- A full adder can be implemented with two half adders and one OR gate as follows:
  - Circuit: XOR(x,y) → x⊕y; XOR(x⊕y, z) → S. AND(x,y) → xy. AND(z, x⊕y) → z(x⊕y). OR(z(x⊕y), xy) → C.
- Proof for S:
  S = z ⊕ (x ⊕ y)
    = z ⊕ (x'y + xy')
    = z'(x'y + xy') + z(x'y + xy')'
    = x'yz' + xy'z' + z(xy + x'y')
    = x'yz' + xy'z' + xyz + x'y'z  — which is the same as the Karnaugh map result.
- Proof for C:
  C = z(x⊕y) + xy
    = z(xy' + x'y) + xy
    = xy'z + x'yz + xy
    = xy'z + x'yz + xy(z + z')
    = xy'z + x'yz + xyz + xyz'  → simplify with Karnaugh:
  - K-map: row x=0: m3=1; row x=1: m5=1, m7=1, m6=1.
  - Using the table ⇒ C = xy + xz + yz
- [Verified correct.]

## Slide 56
- Heading: کاهنده‌ها (تفریق‌کننده‌ها) — Subtractors
- Topics: Half subtractor
- Subtraction can also be done by a direct method, or by using the complement, in which case subtraction is converted to addition.
- **Half subtractor (نیم کاهنده):** A combinational circuit that subtracts two bits.
  - For x − y: if x ≥ y, then 0−0=0, 1−0=1, 1−1=0, and the result is called the difference bit (D, difference / بیت تفاضل).
  - But if x < y, i.e. 0−1, a 1 must be borrowed from the higher position; we show the borrowed bit with B (Borrow). Side note: borrowing makes 0 into 10 (binary 2), so 10 − 1 = 1 (written "0−1 = 1" with borrow).
  - Truth table:
    | x | y | B | D |
    |---|---|---|---|
    | 0 | 0 | 0 | 0 |
    | 0 | 1 | 1 | 1 |
    | 1 | 0 | 0 | 1 |
    | 1 | 1 | 0 | 0 |
  - D = x'y + xy'
  - B = x'y
  - Circuit: AND(x', y) → B, and also → OR; AND(x, y') → OR → D.

## Slide 57
- Topics: Full subtractor
- **Full subtractor (تمام کاهنده):** A combinational circuit that performs subtraction between two bits while a 1 may have been borrowed by a previous stage.
- x and y are the bits of the difference (x − y), and z represents the previous borrow bit.
- Truth table:
  | x | y | z | B | D |
  |---|---|---|---|---|
  | 0 | 0 | 0 | 0 | 0 |
  | 0 | 0 | 1 | 1 | 1 |
  | 0 | 1 | 0 | 1 | 1 |
  | 0 | 1 | 1 | 1 | 0 |
  | 1 | 0 | 0 | 0 | 1 |
  | 1 | 0 | 1 | 0 | 0 |
  | 1 | 1 | 0 | 0 | 0 |
  | 1 | 1 | 1 | 1 | 1 |
- The outputs are determined from x − y − z.
- For example, for x−y−z = 0−0−1, a 1 must be borrowed from the higher stage: B = 1 ⇒ 10(=2) − 0 − 1 = 1 [handwritten trailing "↷ 0" unclear — likely shows the borrowed position becoming 0].
- K-maps (rows x=0,1; cols yz=00,01,11,10):
  - D: row 0: m1=1, m2=1; row 1: m4=1, m7=1 (all isolated).
    D = x'y'z + x'yz' + xy'z' + xyz
  - B: row 0: m1=1, m3=1, m2=1; row 1: m7=1. Groups: {m1,m3} (x'z), {m3,m2} (x'y), {m3,m7} (yz).
    B = x'y + x'z + yz
- [Verified correct.]

## Slide 58
- Heading: تابع OR انحصاری (XOR) — Exclusive-OR function
- This operation is shown with the symbol ⊕ and gives the following function:
  x ⊕ y = xy' + x'y
- Its result is 1 only when exactly one of the inputs is 1, i.e. the other is zero.
- The complement of XOR is as follows: (x⊕y)' = xy + x'y'  — which is 1 when x and y are equal.
- Proof of the complement (اثبات مکمل):
  (x⊕y)' = (xy' + x'y)'
         = (xy')'·(x'y)' = (x' + y)(x + y')
         = xx' + x'y' + xy + yy' = xy + x'y'   (xx' = 0 and yy' = 0 marked)

## Slide 59
- Topics: XOR identities and properties
- The following identities can be proven for XOR:
  - x ⊕ 0 = x  x ⊕ 1 = x'
  - x ⊕ x = 0  x ⊕ x' = 1
  - x ⊕ y' = (x⊕y)'  x' ⊕ y = (x⊕y)'
- It can also be shown that XOR is both commutative (جابجایی‌پذیر) and associative (شرکت‌پذیر):
  - A ⊕ B = B ⊕ A
  - (A ⊕ B) ⊕ C = A ⊕ (B ⊕ C) = A ⊕ B ⊕ C

## Slide 60
- Heading: تمرین فصل ۴ — Chapter 4 exercises (typed slide)
1. Write the result of the following expressions:
   a) x' ⊕ 0 =  b) z ⊕ z' =  c) x + x.1 =  d) y + 1 =
   e) x + 0 + x' =  f) 1 + x.x' =  g) x ⊕ x =  h) y.0 + 1 =
2. Simplify the following expressions:
   a) f = (x ⊕ x.y)  b) 1 ⊕ (x ⊕ y)  c) (x ⊕ y).x

## Slide 61
- Chapter heading: فصل ۵ — Chapter 5
- Section heading: ۲- افزاینده موازی — 2. Parallel adder
- A binary parallel adder is a digital circuit that produces the arithmetic sum of two binary numbers in parallel.
- An n-bit parallel adder needs n full adders that are connected in a chain, such that the carry output of each full adder is connected to the carry input of the next full adder.
- Addition layout:
  ```
      C3 C2 C1 C0
      A3 A2 A1 A0
    + B3 B2 B1 B0
    -------------
   C4 S3 S2 S1 S0
  ```
- Diagram (typed): 4 full adder (F.A) blocks. Rightmost F.A: inputs B0, A0, carry-in C0 → output S0, carry out to next. Next: B1, A1 → S1; next: B2, A2 → S2; leftmost: B3, A3 → S3 and C4. Each carry out feeds the carry in of the stage to its left (ripple-carry).
- [Note: heading numbered "2" — item 1 of chapter 5 is not on this slide; may be on a slide outside this range or omitted.]

## Slide 62
- Heading: مقایسه‌کننده بزرگی (magnitude comparator) — Magnitude comparator
- A combinational circuit that compares two numbers A and B and determines their relative magnitude.
- To compare two n-bit numbers A and B, there are 2^(2n) cases in the truth table: 2^n × 2^n = 2^(2n) cases.
- **Comparator of two 1-bit numbers (A0, B0):**
  - To determine the relative size of two numbers we need 3 outputs: one for (A>B), one for (A<B), and one for (A=B), such that when A>B the corresponding output is 1 and the other two are zero (and likewise for the others).
  - Truth table:
    | A0 | B0 | A>B | A=B | A<B |
    |----|----|-----|-----|-----|
    | 0  | 0  | 0   | 1   | 0   |
    | 0  | 1  | 0   | 0   | 1   |
    | 1  | 0  | 1   | 0   | 0   |
    | 1  | 1  | 0   | 1   | 0   |
  - (A>B) = A0B0'
  - (A=B) = A0B0 + A0'B0' → complement (مکمل): (A0=B0)' = (A0'+B0')(A0+B0) = A0'B0 + A0B0'
  - (A<B) = A0'B0
  - Circuit: A0 → NOT; B0 → NOT. AND(A0', B0) → A'B → output A<B. AND(A0, B0') → AB' → output A>B. Both AND outputs → NOR → (A=B).

## Slide 63
- Heading: کدرها و دیکدرها (رمزکننده و کشف‌رمزکننده) — Coders/encoders and decoders (coder–decoder)
- **Decoders (کشف‌رمزکننده‌ها):** A decoder is a combinational circuit that receives binary information from n input lines and converts it into at most 2^n unique output lines. Diagram: n lines → [decoder] → 2^n lines.
- If the n-bit encoded information has unused (don't-care) states, the decoder output has fewer than 2^n.
- The decoders in this discussion are called n-to-m, where m ≤ 2^n.
- It can be said the goal is to generate the 2^n minterms of n input variables.

## Slide 64
- Topics: 3-to-8 decoder example
- **Example:** Consider a 3-to-8 decoder. It has 3 inputs and 8 = 2^3 outputs. The corresponding table is as follows:
  | x | y | z | D0 | D1 | D2 | D3 | D4 | D5 | D6 | D7 |
  |---|---|---|----|----|----|----|----|----|----|----|
  | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
  | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
  | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
  | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
  | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
  | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
  | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
  | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
- The outputs D are the minterms (Di = mi).
- For each input, exactly one of the outputs is 1.
- Circuit: inputs x, y, z each with an inverter giving x', y', z'. 3-input AND gates: D0 = x'y'z', D1 = x'y'z, …, D7 = xyz (8 AND gates, middle ones shown as dots).

## Slide 65
- Topics: Implementing logic functions with a decoder
- **Implementing logic expressions with a decoder (پیاده‌سازی عبارات منطقی با دیکدر):** Since every logic function can be written as a sum of products (minterms), a decoder can be used to generate the minterms and build the function — the function's minterm outputs are combined with an OR.
- **Example:** F = m0 + m1 + m4 → decoder outputs m0, m1, m4 → OR → F.
- **Note:** To implement a function using a decoder, the function must be in terms of sum of minterms (sum of products).

## Slide 66
- Topics: Full adder with a decoder and OR gates
- **Example:** Implement the full-adder circuit with a decoder and OR gates.
- Solution: from before we obtained:
  - S(x,y,z) = Σ(1,2,4,7)
  - C(x,y,z) = Σ(3,5,6,7)
- Since we have three inputs, we have at most 2^3 outputs and need a 3-to-8 decoder.
- Circuit: 3×8 decoder; x → input weight 2^2, y → 2^1, z → 2^0; outputs 0–7. OR gate for S takes outputs 1, 2, 4, 7; OR gate for C takes outputs 3, 5, 6, 7 (output 7 shared, junction dot). Output 0 unused.
- Margin scribble near top-left [unclear: small calculation, appears to be "2^3 = 8 … =4 … 2+1=3"].
- [Verified: S and C minterm lists match the full-adder truth table on Slide 54.]

## Range summary
- Slide 45: Chapter 3 (cont.) — POS simplification with K-map using 0s; example F = Π(0,2,5,7).
- Slides 46–47: NAND and NOR gates — symbols, DeMorgan equivalents (NAND = OR with inverted inputs; NOR = AND with inverted inputs), 3-input versions.
- Slide 48: NAND/NOR as inverter; NAND-only implementation of F = AB + CD + E; bubble cancellation.
- Slides 49–50: Don't-care conditions (X); 4-variable example F = Σ(1,3,7,11,15), d = Σ(0,2,5) → F = w'z + yz or x'w' + yz.
- Slide 51: Chapter 3 exercises (K-maps, NAND/NOR implementation).
- **Chapter boundary: Slide 52 starts فصل ۴ (Chapter 4).**
- Slide 52: Combinational logic definition; half adder (truth table, S = x'y + xy', C = xy, circuit).
- Slide 53: Alternative half-adder circuits (POS form, inverter form, XOR form).
- Slides 54–55: Full adder (truth table, K-maps, S and C, two-level circuit; built from two half adders + OR with algebraic proof).
- Slides 56–57: Subtractors — half subtractor (D = x'y + xy', B = x'y) and full subtractor (D = x'y'z + x'yz' + xy'z' + xyz, B = x'y + x'z + yz).
- Slides 58–59: XOR function, its complement (XNOR) with proof, XOR identities, commutative/associative.
- Slide 60: Chapter 4 exercises.
- **Chapter boundary: Slide 61 starts فصل ۵ (Chapter 5).**
- Slide 61: (2.) Parallel (ripple-carry) adder with 4 full adders.
- Slide 62: Magnitude comparator — 2^(2n) cases; 1-bit comparator table, equations, circuit.
- Slide 63: Coders and decoders — decoder definition, n-to-m with m ≤ 2^n.
- Slide 64: 3-to-8 decoder truth table and circuit (Di = minterms).
- Slide 65: Implementing functions with a decoder + OR (needs sum-of-minterms form).
- Slide 66: Full adder with a 3×8 decoder and two OR gates (S = Σ(1,2,4,7), C = Σ(3,5,6,7)).
- No handwritten math errors found; all worked examples checked. Minor unclear items: a parenthetical on Slide 52, a trailing mark on Slide 57's borrow example, and a margin scribble on Slide 66.
