# Transcription — Slides 23–44

## Slide 23
- Section: (continuation of Chapter 2 — Boolean algebra)
- Topic: Algebraic simplification of Boolean functions using Boolean-algebra laws
- Header text: "Using the laws of Boolean algebra (قوانین جبر بول), a Boolean function (تابع بولی) can be simplified (ساده کرد) and the number of operations reduced."
- **Example 1 (مثال ۱):**
  - F = x + x'y
  - = (x + x')·(x + y) = x + y   [(x + x') underlined and marked = 1; distributive law x + yz = (x+y)(x+z)]
  - Circuit drawing: original circuit — x goes into an OR gate directly and also through an inverter (NOT) into an AND gate with y; AND output goes into the OR gate; output F = x + x'y. "≡" equivalent circuit: a single OR gate with inputs x, y, output F = x + y, labelled «ساده شده» ("simplified").
- **Example 2 (مثال ۲):**
  - F = x'y'z + x'yz + xy'
  - = x'z(y' + y) + xy' = x'z + xy'
- **Example 3 (مثال ۳):** (consensus theorem)
  - F = xy + x'z + yz = xy + x'z + yz(x + x')
  - = xy + x'z + xyz + x'yz   [xy with xyz grouped, x'z with x'yz grouped — shown by underlines]
  - = xy(1 + z) + x'z(1 + y)   [(1+z) and (1+y) each marked = 1]
  - = xy + x'z

## Slide 24
- Topic: Complement of a function (مکمل یک تابع)
- Definition: "The complement of function F is denoted F', such that if one of them is 1, the other is 0."
- Boxed: "From Theorem 5 (قضیه ۵) we had: (A + B)' = A'·B'  and  (A·B)' = A' + B'" (DeMorgan's theorems)
- "These theorems can be extended (تعمیم داد):"
  - (A + B + ... + F)' = A'·B'· ... ·F'
  - (A·B· ... ·F)' = A' + B' + ... + F'

## Slide 25
- Topic: Worked examples — finding the complement with generalized DeMorgan
- **Example: Find the complement of F1.**
  - F1 = x'yz' + x'y'z
  - F1' = (x'yz' + x'y'z)'  [first term labelled A, second labelled B, i.e. (A+B)' = A'B']
  - = (x'yz')'·(x'y'z)'
  - = (x + y' + z)·(x + y + z')
- **Example: Find the complement of F2.**
  - F2 = x(y'z' + yz)
  - F2' = x' + (y'z' + yz)' = x' + (y'z')'·(yz)'
  - = x' + (y + z)(y' + z')
- (Both verified correct.)

## Slide 26
- Topic: Minterms and Maxterms (عبارات کمینه و بیشینه — MinTerm and MaxTerm)
- "Boolean functions can be written in two standard forms (دو شکل استاندارد)."
- **Minterms (عبارات کمینه):** "We call a minterm a standard product (حاصلضرب استاندارد), which is a product of a combination of different factors (variables). If the bit in question is 0 it is primed ('), and if it is 1 it is without prime. We denote it m_j. (It has value 1.)"
- **Maxterms (عبارات بیشینه):** "We call a maxterm a standard sum (حاصلجمع استاندارد), which is a sum of a combination of different factors. If the bit in question is 1 it is primed, and if it is 0 it is without prime. We denote it M_j. (It has value 0.)"
- Table (3 variables):

| x | y | z | Minterm term (جمله) | Designation (علامت) | Maxterm term | Designation |
|---|---|---|---|---|---|---|
| 0 | 0 | 0 | x'y'z' | m0 | x + y + z | M0 |
| 0 | 0 | 1 | x'y'z | m1 | x + y + z' | M1 |
| 0 | 1 | 0 | x'yz' | m2 | x + y' + z | M2 |
| 0 | 1 | 1 | x'yz | m3 | x + y' + z' | M3 |
| 1 | 0 | 0 | xy'z' | m4 | x' + y + z | M4 |
| 1 | 0 | 1 | xy'z | m5 | x' + y + z' | M5 |
| 1 | 1 | 0 | xyz' | m6 | x' + y' + z | M6 |
| 1 | 1 | 1 | xyz | m7 | x' + y' + z' | M7 |

  - Under the minterm column: "1" (a minterm equals 1 for its row); under the maxterm column: "0".
- Side note: m0' = (x'y'z')' = x + y + z = M0.

## Slide 27
- Topic: Expressing functions as sum of minterms / product of maxterms
- Boxed rule: "Every Boolean function can be written as a sum of minterms (مجموع عبارات کمینه) or as a product of maxterms (حاصلضرب عبارات بیشینه)."
- **Example: Write f1 and f2 in terms of minterms and maxterms.**

| x | y | z | f1 | | f2 |
|---|---|---|---|---|---|
| 0 | 0 | 0 | 0 | m0 | 0 |
| 0 | 0 | 1 | 1 | m1 | 0 |
| 0 | 1 | 0 | 0 | m2 | 0 |
| 0 | 1 | 1 | 0 | m3 | 1 |
| 1 | 0 | 0 | 1 | m4 | 0 |
| 1 | 0 | 1 | 0 | m5 | 1 |
| 1 | 1 | 0 | 0 | m6 | 1 |
| 1 | 1 | 1 | 1 | m7 | 1 |

  - Minterms (کمینه) — "places where it is 1":
    - f1 = x'y'z + xy'z' + xyz = m1 + m4 + m7
    - f2 = m3 + m5 + m6 + m7
  - "If we also complement f1' ..." — from the table, the 0 places (از جدول جاهای صفر):
    - f1' = x'y'z' + x'yz' + x'yz + xy'z + xyz'
    - ⇒ f1 = (f1')' = (x + y + z)(x + y' + z)(x + y' + z')(x' + y + z')(x' + y' + z)
    - ⇒ f1 = M0·M2·M3·M5·M6
    - In the same way (به همین ترتیب): f2 = M0·M1·M2·M4
    - Side note: "we write the places that are 0."
  - (Verified correct.)

## Slide 28
- Topic: Converting a function to canonical sum-of-minterms form by expanding missing variables
- Note (تذکر): "In order to write a sum as a sum of minterm products, each term must contain all the variables (literals)."
- **Example: Write the following three-variable function as a sum of minterms (جمع حاصلضرب‌ها — "minterm" written beneath).**
  - F = A + B'C
  - ⇒ F = A(B + B')(C + C') + B'C(A + A')
  - = ABC + ABC' + AB'C + AB'C' + AB'C + A'B'C   [the two AB'C terms are marked as the duplicate]
  - "(We write repeated terms only once, because x + x = x.)"
  - Truth table:

| A | B | C | F | |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | |
| 0 | 0 | 1 | 1 | (A'B'C) m1 |
| 0 | 1 | 0 | 0 | |
| 0 | 1 | 1 | 0 | |
| 1 | 0 | 0 | 1 | (AB'C') m4 |
| 1 | 0 | 1 | 1 | (AB'C) m5 |
| 1 | 1 | 0 | 1 | (ABC') m6 |
| 1 | 1 | 1 | 1 | (ABC) m7 |

  - ⇒ F = m1 + m4 + m5 + m6 + m7
  - or F = Σ(1, 4, 5, 6, 7)  — labelled "shorthand form" [unclear: Persian label, approx. «صورت کوتاه‌نویسی» / short notation]

## Slide 29
- Topic: Converting a function to product-of-maxterms form
- **Example: Write the Boolean function F = xy + x'z as a product of maxterms (حاصلضرب عبارات بیشینه).**
  - Side note top right: xyz + xyz' + x'yz + x'y'z (indices 7, 6, 3, 1) — the sum-of-minterms version [accompanying Persian note partly unclear: roughly "(if written as sum-of-products it is the sum of these)"]
  - F = xy + x'z = (xy + x')·(xy + z)   [distributive law]
  - = (x' + x)(x' + y)·(z + x)(z + y)   [(x' + x) = 1]
  - = (x' + y)(x + z)(y + z)
  - Expanding each factor to include all variables:
    - x' + y = x' + y + zz' = (x' + y + z)(x' + y + z')
    - x + z = x + z + yy' = (x + z + y)·(x + z + y')
    - y + z = y + z + xx' = (y + z + x)·(y + z + x')
  - ⇒ F = (x' + y + z)(x' + y + z')·(x + y + z)(x + y' + z)·(x + y + z)(x' + y + z)
  - = (x' + y + z)(x' + y + z')·(x + y + z)(x + y' + z)   [duplicates removed]
  - Note: "In maxterms, 0s have no prime, e.g. x + y + z = 0 (the factor becomes 0); 1s have primes."
  - Truth table:

| x | y | z | F | |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | (x+y+z) M0 |
| 0 | 0 | 1 | 1 | |
| 0 | 1 | 0 | 0 | (x+y'+z) M2 |
| 0 | 1 | 1 | 1 | |
| 1 | 0 | 0 | 0 | (x'+y+z) M4 |
| 1 | 0 | 1 | 0 | (x'+y+z') M5 |
| 1 | 1 | 0 | 1 | |
| 1 | 1 | 1 | 1 | |

  - ⇒ F = M0·M2·M4·M5
  - shorthand form = Π(0, 2, 4, 5)
  - (Verified: F = 1 at 1,3,6,7 so zeros at 0,2,4,5 — correct.)

## Slide 30
- Topic: Converting between minterm and maxterm forms; m_j' = M_j
- "Minterms and maxterms can be converted to each other."
- For example:
  - F(A,B,C) = Σ(1, 4, 5, 6, 7) = m1 + m4 + m5 + m6 + m7
  - → F'(A,B,C) = Σ(0, 2, 3) = m0 + m2 + m3
  - "If we find the complement of F' using DeMorgan's theorem:"
  - F = (F')' = (m0 + m2 + m3)' = m0'·m2'·m3' = M0·M2·M3
  - ⇒ **m_j' = M_j**  (boxed)
  - "Because minterms are terms that make the function 1, and maxterms are terms that make the function 0."

## Slide 31
- Topic: Other logic operations (عملیات منطقی دیگر) and logic gate symbols
  1. x/y = xy'  (Inhibition)
  2. (x ⊕ y) = xy' + x'y : Exclusive OR (XOR) — side note: "exclusive OR (OR انحصاری): only when exactly one of them is 1 (gives 1)"
  3. x ↓ y = (x + y)' : NOR (NOT OR)
  4. x ⊙ y = xy + x'y' : (XNOR) — side note: "(when both are the same, it gives 1)"
  5. x ↑ y = (x·y)' : NAND (NOT AND)  [handwritten as "NANO / NOTANO", meaning NAND]
- Symbols of logic gates (نمادهای گیت‌های منطقی):
  - AND: inputs x, y → x·y
  - OR: inputs x, y → x + y
  - NOT (Inverter): x → x'
  - Buffer: x → x

## Slide 32
- Topic: NAND, NOR, XOR, XNOR gate symbols and truth tables
- NAND gate: inputs x, y → (xy)'

| x | y | (xy)' |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

- NOR gate: inputs x, y → (x + y)'

| x | y | (x+y)' |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

- XOR gate: x ⊕ y = xy' + x'y

| x | y | x⊕y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

- XNOR gate: x ⊙ y = xy + x'y'

| x | y | x⊙y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

- Note: "The NAND and NOR functions do not have the associative property (خاصیت شرکت‌پذیری)."

## Slide 33
- Heading: تمرین فصل ۲ — Chapter 2 Exercises (typed slide)
- 1. Answer the following:
  - a) X + 1 =   b) X + X =   c) 1 · 0 =   d) X + 0·y =   e) X + (1 + x) =
  - [The typed line is jumbled by right-to-left layout: "c)1 . 0=d)  X+0.y=e)  X+(1+x)=" — the letters a–e map as listed above.]
  - (Answers for reference, not on slide: a) 1, b) X, c) 0, d) X, e) 1)
- 2. Write the complements of the following functions (مکمل توابع زیر را بنویسید):
  - a) x + y·z'   b) x·(y + z')   c) x·y + y·z'   d) (x + y)(x + y·z')
- 3. Implement the following functions with logic gates (با گیت‌های منطقی پیاده‌سازی کنید):
  - a) f = (x + y)·(x + y·z')   b) f(x,y,z) = x·y + y·(x·z' + z)
- 4. Simplify the following functions (ساده کنید):
  - a) x + x·z'   b) x·y + y·(x·z' + y)   c) (x + y)(x + y·z')

## Slide 34
- Heading: فصل ۳ — **Chapter 3**; section: ساده‌سازی توابع منطقی — Simplification of logic functions
- **Map method (روش نقشه):** "A method for reducing (simplifying) logic functions. One of these methods is the 'Karnaugh map' (نقشه کارنو)."
- "A map is a diagram consisting of several squares, each square representing one minterm (عبارت کمینه)."
- "Every Boolean function can be written as a sum of minterms (those that have value 1)."
- **Two-variable map (نقشه دو متغیری): (x, y)**
  - Number of states = 2^2 = 4. "For two variables we have four minterms."
  - Map layout (rows x = 0 [x'], x = 1 [x]; columns y = 0, y = 1 [y]):

|  | y=0 | y=1 |
|---|---|---|
| x=0 | x'y' (m0) | x'y (m1) |
| x=1 | xy' (m2) | xy (m3) |

  - "We show 0s with a prime (') and 1s without a prime."

## Slide 35
- Topic: Two-variable K-map examples
- "For example, the map of x·y is as follows:" — a single 1 in cell x=1, y=1. xy = m3
- "And the map of x + y is as follows:" — 1s in cells (x=0,y=1), (x=1,y=0), (x=1,y=1). x + y = m1 + m2 + m3

## Slide 36
- Topic: Three-variable K-map (نقشه سه متغیری) (x, y, z); adjacency
- Number of states = 2^3 = 8
- Layout (rows x = 0, 1; columns yz = 00, 01, 11, 10 — Gray-code order):

| x \ yz | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| 0 | x'y'z' (m0) | x'y'z (m1) | x'yz (m3) | x'yz' (m2) |
| 1 | xy'z' (m4) | xy'z (m5) | xyz (m7) | xyz' (m6) |

  - y spans columns 11 and 10; z spans columns 01 and 11.
- For example: m5 = xy'z ≡ 101 ≡ 5
- Note (نکته): "Any two adjacent squares (مربع مجاور) differ in only one variable, which is primed in one and unprimed in the other."
- Note: "The sum of two minterms in adjacent squares can be written as a product of two variables (one variable is eliminated)."

## Slide 37
- Topic: Combining adjacent minterms; 3-variable K-map simplification; wrap-around adjacency
- For example: m5 + m7 = xy'z + xyz = xz(y + y') = xz   [(y + y') = 1] — side note partly unclear [unclear: roughly "where they are 1 ... the variable that differs is dropped"]
- **Example: Simplify f(x,y,z) = Σ(2, 3, 4, 5).**
  - Map: 1s at m2, m3 (row x=0, columns 11 & 10) — grouped; 1s at m4, m5 (row x=1, columns 00 & 01) — grouped.
  - f = m2 + m3 + m4 + m5 = yz' + xy'   [handwritten "yz'" — m2+m3 = x'yz' + x'yz = x'y]
  - [possible error: m2 + m3 = x'yz + x'yz' = x'y, not yz'. Correct answer: f = x'y + xy'. Check: x'y covers 010, 011 = m2, m3; xy' covers 100, 101 = m4, m5. The written "yz'" would cover m2 and m6, which is wrong.]
- Note: "m0 and m2 can also be considered adjacent, and also (m6 and m4)."
  - "Because: they differ in only one variable."
  - m0 + m2 = x'y'z' + x'yz' = x'z'(y + y') = x'z'
  - and m4 + m6 = xy'z' + xyz' = xz'(y + y') = xz'

## Slide 38
- Topic: 3-variable K-map examples (wrap-around, groups of four)
- **Example: Simplify the Boolean function f(x,y,z) = Σ(3, 4, 6, 7).**
  - Solution: "We must put them into adjacent form (groups)."
  - Map: group m3 & m7 (column 11, vertical); group m4 & m6 (row x=1, wrapping columns 00 and 10).
  - f = xz' + yz
  - (Verified correct.)
- **Example: f(x,y,z) = Σ(0, 2, 4, 6)**
  - Map: column 00 (m0, m4) and column 10 (m2, m6) grouped (wrap-around).
  - f = y'z' + yz' = z'(y + y') = z'   "(they are outside z)"
- **Result (نتیجه):** "Four adjacent squares represent a term containing one variable." (in a 3-variable map)

## Slide 39
- Topic: 3-variable K-map — all-ones map; example from a given expression
- **Example: f = Σ(0,1,2,3,4,5,6,7)**
  - Map: all eight cells are 1; grouped as two groups of four (y' half and y half).
  - "For example ⇒ f = y' + y = 1"
  - Result: "Eight adjacent squares represent the function 1."
- **Example: Boolean function F = A'C + A'B + AB'C + BC is given (مفروض است).**
  - a) Write the function as a sum of minterms (عبارات کمینه).
  - b) Simplify it by the Karnaugh method.
  - Solution:
    - a) (from the table) ⇒ F = Σ(1, 2, 3, 5, 7)
    - Map (rows A = 0, 1; columns BC = 00, 01, 11, 10): 1s at A'B'C (1), A'BC (3), A'BC' (2), AB'C (5), ABC (7). Labels on map: A'C (cells 1,3), A'B (cells 2,3), AB'C (cell 5), BC (cells 3,7).
    - b) Simplified ⇒ F = C + A'B
      - C ← "four adjacent cells" (چهار خانه مجاور)
      - A'B ← note: "so that the variables become fewer, we took cell [3] again together with an adjacent cell" [partly unclear wording; meaning: a cell may be reused in more than one group]
  - (Verified: A'C={1,3}, A'B={2,3}, AB'C={5}, BC={3,7} → Σ(1,2,3,5,7); C + A'B covers exactly these. Correct.)

## Slide 40
- Topic: Four-variable K-map (نقشه چهار متغیری) (w, x, y, z)
- Number of cells (states) = 2^4 = 16
- Layout (rows wx = 00, 01, 11, 10; columns yz = 00, 01, 11, 10); first row written as w'x'y'z', w'x'y'z, w'x'yz, w'x'yz'.
  - x spans rows 01 and 11; w spans rows 11 and 10; y spans columns 11 and 10; z spans columns 01 and 11.
- Minterm numbering:

| wx \ yz | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| 00 | m0 | m1 | m3 | m2 |
| 01 | m4 | m5 | m7 | m6 |
| 11 | m12 | m13 | m15 | m14 |
| 10 | m8 | m9 | m11 | m10 |

- Boxed rules:
  - One square represents a four-literal term, which is a minterm.
  - Two adjacent squares represent a three-literal term.
  - Four adjacent squares represent a two-literal term.
  - Eight adjacent squares represent a one-literal term.
  - Sixteen squares equal 1.

## Slide 41
- Topic: Four-variable K-map simplification examples
- **Example: Simplify the following function: f(w,x,y,z) = Σ(0,1,2,4,5,6,8,9,12,13,14)**
  - Map: columns yz = 00 and 01 fully 1 (8 cells); cells 2, 6, 14 (column 10, rows 00, 01, 11) are 1; column 11 empty; cell 10 empty.
  - Groups: 8 cells of columns 00/01 → y'; w'z' (cells 0, 2, 4, 6 — top two rows, wrap columns 00 and 10); xz' (cells 4, 6, 12, 14 — middle rows, wrap columns).
  - f = y' + w'z' + xz'   [y' annotated "8 adjacent cells"]
  - (Verified correct.)
- **Example: Simplify f(A,B,C,D) = A'B'C' + B'CD' + A'BCD' + AB'C'**
  - Solution:
  - Map (rows AB = 00, 01, 11, 10; columns CD = 00, 01, 11, 10): 1s at cells 0, 1 (A'B'C'), 2, 10 (B'CD'), 6 (A'BCD'), 8, 9 (AB'C').
  - Simplified: f = B'C' + CD'A' + B'D'
    - B'C' = corners of columns 00/01 in rows 00 and 10 (cells 0, 1, 8, 9)
    - A'CD' = cells 2, 6
    - B'D' = the four corners (cells 0, 2, 8, 10) — underlined
  - (Verified: A'B'C'={0,1}, B'CD'={2,10}, A'BCD'={6}, AB'C'={8,9}; result covers {0,1,2,6,8,9,10}. Correct.)

## Slide 42
- Topic: Five-variable K-map (نقشه پنج متغیری) (A, B, C, D, E)
- Number of states = 2^5 = 32
- "For simplicity, we draw two 16-cell tables, one for A = 0 and the other for A = 1."
- A = 0 map (rows BC = 00, 01, 11, 10; columns DE = 00, 01, 11, 10):

| BC \ DE | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| 00 | 0 | 1 | 3 | 2 |
| 01 | 4 | 5 | 7 | 6 |
| 11 | 12 | 13 | 15 | 14 |
| 10 | 8 | 9 | 11 | 10 |

- A = 1 map:

| BC \ DE | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| 00 | 16 | 17 | 19 | 18 |
| 01 | 20 | 21 | 23 | 22 |
| 11 | 28 | 29 | 31 | 30 |
| 10 | 24 | 25 | 27 | 26 |

  - C spans rows 01 and 11; B spans rows 11 and 10; D spans columns 11 and 10; E spans columns 01 and 11.
- Boxed: "For each map, another adjacency is defined in addition to the previous definition: each square in the A = 0 map is adjacent to the corresponding square in the A = 1 map. For example, cell 15 is adjacent to 31."

## Slide 43
- Topic: Five-variable K-map example
- **Example: Simplify the following Boolean function:** F(A,B,C,D,E) = Σ(0, 2, 4, 6, 9, 13, 21, 23, 25, 29, 31)
  - A = 0 map: 1s at 0, 4 (column 00, rows 00 & 01) and 2, 6 (column 10, rows 00 & 01) — grouped together by wrap-around; 1s at 13 (row 11, col 01) and 9 (row 10, col 01) — dashed group.
  - A = 1 map: 1s at 21, 23 (row 01, cols 01 & 11), 29, 31 (row 11, cols 01 & 11) — square group; 25 (row 10, col 01) — dashed group with 29, marked "adjacent" (مجاور) to the A = 0 dashed group.
  - F = A'B'E' + BD'E + ACE
    - A'B'E' ← A = 0
    - BD'E ← "adjacent across the two tables" (مجاور در دو جدول) — cells 9, 13, 25, 29
    - ACE ← A = 1 — cells 21, 23, 29, 31
  - (Verified: A'B'E' = {0,2,4,6}; BD'E = {9,13,25,29}; ACE = {21,23,29,31}; union = given set. Correct.)

## Slide 44
- Topic: Product-of-sums simplification (ساده‌سازی حاصلضرب مجموع) using maxterms (عبارات بیشینه)
- "The 1s inside the squares identify the minterms (of function F)."
- "If we mark the empty squares with 0 and write their function, the complement of F, i.e. F', is obtained."
- "Now if from the function F' we obtain F, the new function is in product-of-sums form (حاصلضرب مجموع‌ها)."
- **Example: Write the function F as a) sum of products (مجموع حاصلضرب‌ها) b) product of sums (حاصلضرب مجموع).**
  - F(A,B,C,D) = Σ(0, 1, 2, 5, 8, 9, 10)
  - Map (rows AB = 00, 01, 11, 10; columns CD = 00, 01, 11, 10):

| AB \ CD | 00 | 01 | 11 | 10 |
|---|---|---|---|---|
| 00 | 1 | 1 | 0 | 1 |
| 01 | 0 | 1 | 0 | 0 |
| 11 | 0 | 0 | 0 | 0 |
| 10 | 1 | 1 | 0 | 1 |

  - a) F = C'B' + DC'A' + D'B'   (i.e. B'C' + A'C'D + B'D')
  - b) F' = AB + CD + BD'   — annotation: "the 0s are the complement of F"
    - ⇒ F = (F')' = (AB + CD + BD')'
    - = (A' + B')(C' + D')(B' + D)
  - (Verified: zeros are 3,4,6,7,11,12,13,14,15; AB = {12–15}, CD = {3,7,11,15}, BD' = {4,6,12,14} cover them exactly. Correct.)

## Range summary
- Slide 23 — Algebraic simplification with Boolean laws (3 examples incl. consensus; gate circuit before/after) — end of Chapter 2 material
- Slide 24 — Complement of a function; DeMorgan's theorems and their generalization
- Slide 25 — Complement examples (F1, F2)
- Slide 26 — Minterms and maxterms: definitions, m_j / M_j table for 3 variables
- Slide 27 — Any function as sum of minterms or product of maxterms (f1, f2 example)
- Slide 28 — Expanding to canonical sum of minterms (F = A + B'C = Σ(1,4,5,6,7))
- Slide 29 — Expanding to canonical product of maxterms (F = xy + x'z = Π(0,2,4,5))
- Slide 30 — Converting between Σ and Π forms; m_j' = M_j
- Slide 31 — Other logic operations (Inhibition, XOR, NOR, XNOR, NAND); basic gate symbols (AND, OR, NOT, Buffer)
- Slide 32 — NAND/NOR/XOR/XNOR gate symbols and truth tables; NAND and NOR are not associative
- Slide 33 — Chapter 2 exercises (تمرین فصل ۲)
- **Chapter boundary: Slide 34 starts فصل ۳ — Chapter 3: Simplification of logic functions**
- Slide 34 — Map method / Karnaugh map intro; 2-variable map
- Slide 35 — 2-variable map examples (xy, x + y)
- Slide 36 — 3-variable map layout (Gray-code order); adjacency rules
- Slide 37 — Combining adjacent minterms; example Σ(2,3,4,5); wrap-around adjacency (m0–m2, m4–m6) — contains a likely error: written answer yz' + xy' should be x'y + xy'
- Slide 38 — 3-variable examples Σ(3,4,6,7) = xz' + yz and Σ(0,2,4,6) = z'; four adjacent squares → one literal
- Slide 39 — All-ones map = 1; F = A'C + A'B + AB'C + BC → Σ(1,2,3,5,7) → C + A'B
- Slide 40 — 4-variable map layout and group-size rules (1/2/4/8/16 squares)
- Slide 41 — 4-variable examples: Σ(0,1,2,4,5,6,8,9,12,13,14) = y' + w'z' + xz'; A'B'C' + B'CD' + A'BCD' + AB'C' = B'C' + A'CD' + B'D'
- Slide 42 — 5-variable map (two 16-cell maps for A = 0 / A = 1; cross-map adjacency)
- Slide 43 — 5-variable example: Σ(0,2,4,6,9,13,21,23,25,29,31) = A'B'E' + BD'E + ACE
- Slide 44 — Product-of-sums simplification via zeros (F'): Σ(0,1,2,5,8,9,10) → SOP B'C' + A'C'D + B'D'; POS (A'+B')(C'+D')(B'+D)
