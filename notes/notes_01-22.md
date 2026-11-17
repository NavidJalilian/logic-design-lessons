# Transcription: Slides 1-22

## Slide 1
- Heading: فصل ۱ — Chapter 1 (page number "1" top-left). Section box: سیستم های دودویی — Binary systems.
- Topics: positional notation (place-value expansion), decimal, binary, and base-5 to decimal.
- Content:
  - "A decimal number (عدد دهدهی, base 10 / مبنای ده) such as (9247)_10 can be written in power form as follows:"
    - 9247 = 9x10^3 + 2x10^2 + 4x10^1 + 7x10^0
  - "A binary number (عدد دودویی, base 2) can also be written as powers of two:"
    - Example (مثال): 1010.11 = 1x2^3 + 0x2^2 + 1x2^1 + 0x2^0 + 1x2^-1 + 1x2^-2 = (10.75)_10
    - Underbrace under the integer-part terms labelled صحیح (integer part); underbrace under the fraction terms labelled اعشار (fractional part).
  - Example: (4021.2)_5 = 4x5^3 + 0x5^2 + 2x5^1 + 1x5^0 + 2x5^-1 = (511.4)_10
    - Check: 500 + 0 + 10 + 1 + 0.4 = 511.4. Correct.

## Slide 2
- Topics: hexadecimal digits, hex to decimal, table of numbers in different bases.
- Content:
  - Hexadecimal digits (اعداد مبنای شانزده): 0 1 2 ...... 9 A B C D E F (with values written above: A=10, B=11, C=12, D=13, E=14, F=15).
  - Example: (B65F)_16 = 11x16^3 + 6x16^2 + 5x16^1 + 15x16^0 = (46687)_10
    - Check: 45056 + 1536 + 80 + 15 = 46687. Correct.
  - Table 1 (جدول ۱): Numbers in several bases (اعداد در چندین مبنا). Columns (right to left in original): base 10 (مبنای ۱۰), base 16 (مبنای ۱۶), base 8 (مبنای ۸), base 2 (مبنای ۲).

    | Base 10 | Base 16 | Base 8 | Base 2 |
    |---|---|---|---|
    | 00 | 0 | 00 | 0000 |
    | 01 | 1 | 01 | 0001 |
    | 02 | 2 | 02 | 0010 |
    | 03 | 3 | 03 | 0011 |
    | 04 | 4 | 04 | 0100 |
    | 05 | 5 | 05 | 0101 |
    | 06 | 6 | 06 | 0110 |
    | 07 | 7 | 07 | 0111 |
    | 08 | 8 | 10 | 1000 |
    | 09 | 9 | 11 | 1001 |
    | 10 | A | 12 | 1010 |
    | 11 | B | 13 | 1011 |
    | 12 | C | 14 | 1100 |
    | 13 | D | 15 | 1101 |
    | 14 | E | 16 | 1110 |
    | 15 | F | 17 | 1111 |

    (A horizontal line is drawn under 7 in the octal column and under 9 in the decimal column, marking where a digit "rolls over".)

## Slide 3
- Topics: binary arithmetic (addition, subtraction, multiplication); intro to base conversion.
- Content:
  - Addition of binary numbers (جمع اعداد دودویی / باینری). Example:
    ```
      carries:  1 1 1 1
      augend (مضاف)      1 0 1 1 0 1
      addend (مضاف الیه) + 1 0 0 1 1 1
                        -----------
                        1 0 1 0 1 0 0
    ```
    Side note: 1+1 = (10)_2 = 2.
    Check: 45 + 39 = 84 = 1010100. Correct.
  - Subtraction (تفریق): "(a borrow (قرض گرفتن) adds 2 to the digit)". Example:
    ```
      minuend (مفروق منه)   1 0 1 1 0 1   (borrow marks 0, 2, 2 written above)
      subtrahend (مفروق)  - 1 0 0 1 1 1
                          -----------
                            0 0 0 1 1 0
    ```
    Check: 45 - 39 = 6 = 000110. Correct.
  - Multiplication (ضرب): "is like ordinary multiplication." A tiny sketch of a multiplication is shown [unclear: small digits, looks like 110 x 11 or 11 x 10 with partial products; too small to read].
  - Conversion of number bases (تبدیل پایه اعداد):
    - Conversion from any base to base 10: already covered (expand in powers).
    - Conversion from base 10 to base 2: successive divisions (تقسیمات متوالی) are used (for integers, اعداد صحیح), and for fractional numbers (اعداد اعشاری) successive multiplications (ضرب متوالی).

## Slide 4
- Topics: decimal integer to binary (repeated division), decimal fraction to binary (repeated multiplication).
- Content:
  - Example: (41)_10 = (?)_2
    - 41 / 2 = 20 rem 1; 20 / 2 = 10 rem 0; 10 / 2 = 5 rem 0; 5 / 2 = 2 rem 1; 2 / 2 = 1 rem 0; final quotient 1.
    - Read remainders from last to first (arrow pointing back) → (41)_10 = (101001)_2. Check: 32+8+1 = 41. Correct.
  - Example: convert the number 0.6875 to binary.
    - Solution: same as before, but instead of dividing by 2 we multiply by 2, and instead of the remainders, the integer parts (قسمتهای صحیح) are taken.
    - 0.6875 x 2 = 1.3750 → 1
    - 0.3750 x 2 = 0.7500 → 0
    - 0.7500 x 2 = 1.500 → 1
    - 0.500 x 2 = 1.000 → 1
    - Read top to bottom → (0.6875) = (.1011)_2. Check: 0.5+0.125+0.0625 = 0.6875. Correct.
  - Note (تذکر): if we want to convert to base r, we use r instead of 2.

## Slide 5
- Topics: decimal fraction to octal; numbers with integer and fraction parts.
- Content:
  - Example: convert the number (0.513)_10 to base 8 to four decimal places (تا چهار رقم اعشار).
    - 0.513 x 8 = 4.104 → 4
    - 0.104 x 8 = 0.832 → 0
    - 0.832 x 8 = 6.656 → 6
    - 0.656 x 8 = 5.248 → 5
    - ⋮
    - = (0.4065)_8 [the handwriting shows "(4065.)_8" or "(.4065)_8"; the radix point placement is unclear, but the correct answer is (0.4065)_8, verified by the computations above.]
  - Note (تذکر): decimal numbers that have both an integer part and a fractional part are converted separately by the methods described, and the answers are written together.
  - Example: (41.6875)_10 = (?)_2
    - 41 → successive divisions (تقسیمات متوالی) → (101001)_2
    - 0.6875 → successive multiplications (ضرب متوالی) → (0.1011)_2
    - Answer (جواب) = (101001.1011)_2

## Slide 6
- Topics: direct conversion binary → octal and hexadecimal.
- Content:
  - Heading: Direct conversion of binary to octal and hexadecimal (تبدیل مستقیم دودویی به هشت تایی و شانزده تایی).
  - Since 2^3 = 8, each octal digit equals 3 binary digits. And since 2^4 = 16, each hexadecimal digit equals 4 binary digits.
  - To convert binary to octal, start from the radix point (نقطه اعشار) and move right (fraction / اعشار) and left (integer / صحیح), divide into 3-digit groups, and convert each group independently (مستقلاً).
  - Example: (10 110 001 101 011 . 111 100 000 110)_2 = (?)_8
    - Groups → 2 6 1 5 3 . 7 4 0 6
    - = (26153.7406)_8. Check of groups: 010=2, 110=6, 001=1, 101=5, 011=3, 111=7, 100=4, 000=0, 110=6. Correct.

## Slide 7
- Topics: binary → hex; octal/hex → binary.
- Content:
  - Example: convert to hexadecimal; we separate into groups of four (چهار تایی جدا می کنیم), since 2^4 = 16.
    - (10 1100 0110 1011 . 1111 0010)_2 = (?)_16
    - Groups → 2 C 6 B . F 2
    - = (2C6B.F2)_16 [the second digit in the final answer is overwritten/blotted and looks like "6", but the group label under 1100 is "C" and 1100 = C, so the correct answer is (2C6B.F2)_16.]
  - Conversion from 8 or 16 to binary is the reverse (برعکس).
  - Example: (673.124)_8 = (?)_2
    - 6→110, 7→111, 3→011, .1→001, 2→010, 4→100
    - = (110 111 011 . 001 010 100)_2. Correct.
  - Example: (306.D)_16 = (?)_2
    - 3→0011, 0→0000, 6→0110, .D→1101
    - = (0011 0000 0110 . 1101)_2. Correct.

## Slide 8
- Topics: complements — r's complement (radix complement).
- Content:
  - Heading: Complements (مکمل ها).
  - The r's complement (مکمل r) of a number N (n digits / n رقمی) in base r is r^n - N.
  - Example: the 10's complement of (96750)_10 equals: 10^5 - 96750 = 3250. Check: 100000 - 96750 = 3250. Correct.
  - Example: the 2's complement of the number 1000011 equals:
    - 2^7 - N → 10000000 - 1000011 = 111101 (the 10000000 is labelled 2^7)
    - Check: 128 - 67 = 61 = 0111101 (7 bits); the handwritten 111101 drops the leading 0. Value correct.

## Slide 9
- Topics: subtraction using r's complement.
- Content:
  - Heading: Subtraction using r's complement (تفریق با استفاده از مکمل r).
  - Subtraction of two n-digit numbers M - N in base r is as follows:
    1. Add M to the r's complement of N.
    2. If M ≥ N, an extra digit (رقم اضافی, the carry) appears on the left; delete it, and the rest is the answer.
    3. If M < N, the answer equals the negative of the complement of the result (منفی مکمل جواب حاصل).
  - Example: using 10's complement, do the subtraction: 72532 - 3250 (M = 72532, N = 3250).
    - Solution: M > N.
    ```
         72532
       + 96750   (10's complement of N = 10^5 - N)
       -------
        169282
    ```
    - The leading 1 is labelled اضافی (extra), delete it → answer (جواب) = 69282. Check: 72532 - 3250 = 69282. Correct.

## Slide 10
- Topics: r's complement subtraction with M < N; (r-1)'s complement (diminished radix complement).
- Content:
  - Example: 3250 - 72532 (M = 3250, N = 72532)
    ```
         03250
       + 27468   (10's complement of N)
       -------
         30718
    ```
    - No extra carry, so answer = -(10's complement of result) = -(10^5 - 30718) = -69282. Check: 3250 - 72532 = -69282. Correct.
  - Heading: (r-1)'s complement (مکمل r-1).
  - The (r-1)'s complement of a number N (n digits) in base r is r^n - N - 1.
  - In binary numbers: 1 becomes 0 and 0 becomes 1. Example: 1's complement (مکمل ۱) of 0110 → 1001.
  - In subtraction: if M ≥ N, the result is added to 1, and the extra digit that appears on the left is deleted (end-around carry). M < N: same as before (take negative of the complement of the result).

## Slide 11
- Topics: binary logic; NOT, OR, AND operations; truth tables; gate symbols.
- Content:
  - Heading: Binary logic (منطق دودویی).
  - It consists of binary variables (متغیرهای دودویی) and logical operations (عملیات منطقی), and each variable has only two values, 0 or 1.
  - There are three logical operations: NOT, OR, AND.
  - 1) NOT: complement / opposite (مخالف). x --NOT--> x'. Symbol (نماد): inverter (triangle with bubble).
    | x | x' |
    |---|---|
    | 0 | 1 |
    | 1 | 0 |
  - 2) OR: (+). x + y = z. z = 1 if x = 1 or y = 1 or both.
    | x | y | z = x+y |
    |---|---|---|
    | 0 | 0 | 0 |
    | 0 | 1 | 1 |
    | 1 | 0 | 1 |
    | 1 | 1 | 1 |
    Symbol: OR gate with inputs x, y and output x+y.
  - 3) AND: (·). x · y = z. z = 1 if x = y = 1.
    | x | y | z = (x·y) |
    |---|---|---|
    | 0 | 0 | 0 |
    | 0 | 1 | 0 |
    | 1 | 0 | 0 |
    | 1 | 1 | 1 |
    Symbol: AND gate with inputs x, y and output x·y.

## Slide 12
- Topics: timing diagrams (signal representation of inputs/outputs).
- Content:
  - Heading: Representing input and output using signals (نمایش ورودی و خروجی با استفاده از سیگنال ها).
  - 0 or Low (L); 1 or High (H).
  - Timing diagram across 5 time intervals:
    | Signal | t1 | t2 | t3 | t4 | t5 |
    |---|---|---|---|---|---|
    | x | 0 | 1 | 1 | 0 | 0 |
    | y | 0 | 0 | 1 | 1 | 0 |
    | x' | 1 | 0 | 0 | 1 | 1 |
    | x·y | 0 | 0 | 1 | 0 | 0 |
    | x+y | 0 | 1 | 1 | 1 | 0 |
  - (Read from the waveforms; all outputs are consistent with the inputs.)

## Slide 13
- Heading: تمرین فصل ۱ — Chapter 1 exercises (typed slide).
- Questions (translated):
  1. Convert the number 25 to base 2.
  2. Convert the number 46.12 to base 2.
  3. Convert the number (100001011)_2 to base 10.
  4. Convert the number (100110.1011)_2 to base 8.
  5. Convert the number (100110.1011)_2 to base 16.
  6. Convert the number (62.4)_8 to base 2.
  7. Convert the number (2A.B)_16 to base 2.
  8. Write the five numbers after 1011, which is in base 2.
  9. Which number comes before 110? (base 2 implied)
- Answers are NOT given on the slide. My computed answers, for reference:
  1. 11001
  2. 101110.000111101... (0.12 does not terminate in binary: 0.12→0,0,0,1,1,1,1,0,1,...)
  3. 256+8+2+1 = 267
  4. 100 110 . 101 100 → (46.54)_8
  5. 0010 0110 . 1011 → (26.B)_16
  6. (110010.1)_2 (or 110 010 . 100)
  7. (101010.1011)_2 (0010 1010 . 1011)
  8. 1100, 1101, 1110, 1111, 10000
  9. 101

## Slide 14
- Heading: فصل ۲ — Chapter 2. Section box: جبر بول — Boolean algebra.
- Topics: definition of Boolean algebra; postulates; duality.
- Content:
  - Definitions of Boolean algebra (تعاریف جبر بول): Boolean algebra is an algebraic structure (ساختار جبری) defined on a set of elements B together with two operators + and ·, and the following conditions hold.
  - Postulates and definitions of Boolean algebra (اصول و تعاریف جبر بول):
    1. x + 0 = x , x · 1 = x  (identity element / عضو خنثی)
    2. x + x' = 1 , x · x' = 0  (complement element / عضو مکمل)
    3. x + y = y + x , x · y = y · x  (commutative / جابجایی)
    4. x · (y + z) = x·y + x·z , x + (y·z) = (x + y)·(x + z)  (distributive / توزیع پذیری)
  - In every definition, each relation has a dual (دوگان) obtained by swapping (+ with ·) and (0 with 1), and vice versa.

## Slide 15
- Topics: Theorem 1 (idempotence) with proofs.
- Content:
  - Theorem 1 (قضیه ۱): a) x + x = x   b) x · x = x
  - Proof of a (اثبات a):
    - x + x = (x + x) · 1
    - = (x + x)·(x + x')   (from postulate 2)
    - = x + (x · x')   (from postulate 4)
    - = x + 0
    - = x
  - Proof of b (اثبات b) — from the dual of the previous one (از دوگان قبلی), i.e. (0 ↔ 1 and vice versa, + ↔ · and vice versa):
    - x · x = x · x + 0
    - = x·x + x·x'
    - = x · (x + x')
    - = x · 1
    - = x

## Slide 16
- Topics: Theorem 2 (null elements) with proofs.
- Content:
  - Theorem 2 (قضیه ۲): a) x + 1 = 1   b) x · 0 = 0
  - Proof of a (اثبات a):
    - x + 1 = 1 · (x + 1)
    - = (x + x')(x + 1)
    - = x + (x' · 1)
    - = x + x'
    - = 1
  - Proof of b (اثبات b), as written:
    - = (x + x)(x + 1)
    - = x + (x' · 1)
    - = x + x'
    - = 1
  - [possible error: the written proof of b is a garbled copy of proof a. It does not start from x·0, its first step (x + x)(x + 1) is not equal to x + (x'·1), and it ends at "= 1" while the claim is x·0 = 0. A correct proof (the dual of a): x·0 = 0 + (x·0) = (x·x') + (x·0) = x·(x' + 0) = x·x' = 0.]

## Slide 17
- Topics: Theorem 3 (involution), Theorem 4 (absorption).
- Content:
  - Theorem 3 (قضیه ۳): (x')' = x
    - Proof: x' is the complement of x. (x')' is the complement of x'. → so the complement of x' is both x and (x')'. Since by the definition the complement is unique (منحصر به فرد), therefore (x')' = x.
  - Theorem 4 (قضیه ۴): a) x + xy = x   b) x(x + y) = x
    - Proof of a:
      - x + xy = x·1 + x·y
      - = x·(1 + y)
      - = x(1) = x
    - Proof of b: by duality (طبق دوگانی).

## Slide 18
- Topics: proving theorems with truth tables.
- Content:
  - The validity of Boolean algebra theorems can also be shown using a truth table (جدول صحت).
  - Example: prove theorem 4 with a table: x + xy = x
    | x | y | xy | x+xy |
    |---|---|---|---|
    | 0 | 0 | 0 | 0 |
    | 0 | 1 | 0 | 0 |
    | 1 | 0 | 0 | 1 |
    | 1 | 1 | 1 | 1 |
    - The x column and x+xy column are circled with an "=" between them. Since x + xy and x have the same values, they are equal.
  - The algebraic proof of the associative law (قانون شرکت پذیری) is long (طولانی), so it is proved with a truth table.

## Slide 19
- Topics: Theorem 5 (De Morgan), operator precedence.
- Content:
  - Theorem 5 (قضیه ۵): a) (x + y)' = x'y'   b) (xy)' = x' + y'
  - Proof of a with a truth table:
    | x | y | x+y | (x+y)' | x' | y' | x'·y' |
    |---|---|---|---|---|---|---|
    | 0 | 0 | 0 | 1 | 1 | 1 | 1 |
    | 0 | 1 | 1 | 0 | 1 | 0 | 0 |
    | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
    | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
    - Columns (x+y)' and x'·y' are circled and marked equal. Correct.
  - Operator precedence (ترتیب تقدم عملگرها): 1- parentheses (پرانتزها), 2- NOT, 3- AND, 4- OR.
  - Example: A + (B + C·D) — evaluation order marked: 1 = the parenthesis, 2 = C·D, 3 = B + (C·D), 4 = A + (...). [unclear: a small tick above C may be a prime (C') or just the end of bracket "2"; most likely just the bracket.]

## Slide 20
- Topics: Boolean functions; truth table of a function.
- Content:
  - Heading: Boolean functions (توابع بولی).
  - A Boolean function is an algebraic expression made of binary variables (0 or 1), the operators (+ and ·) (marked OR and AND), the NOT operator, parentheses, and the equals sign.
  - Example: F = xyz' + z is a Boolean function. [the slide writes "F = xy·z' + z"]
  - To represent a Boolean function with a truth table, we need 2^n combinations of 0s and 1s, where n is the number of variables.
  - Example: F = x + y·z (we have three variables). Number of possible cases (تعداد حالتهای ممکن) = 2^n = 2^3 = 8.
    | x | y | z | F |
    |---|---|---|---|
    | 0 | 0 | 0 | 0 |
    | 0 | 0 | 1 | 0 |
    | 0 | 1 | 0 | 0 |
    | 0 | 1 | 1 | 1 |
    | 1 | 0 | 0 | 1 |
    | 1 | 0 | 1 | 1 |
    | 1 | 1 | 0 | 1 |
    | 1 | 1 | 1 | 1 |
    - Verified correct.

## Slide 21
- Topics: truth tables for two Boolean functions.
- Content:
  - Example: draw the truth table for the following Boolean functions:
    - F1 = x + y'z
    - F2 = xy' + x'z
    | x | y | z | F1 | F2 |
    |---|---|---|---|---|
    | 0 | 0 | 0 | 0 | 0 |
    | 0 | 0 | 1 | 1 | 1 |
    | 0 | 1 | 0 | 0 | 0 |
    | 0 | 1 | 1 | 0 | 1 |
    | 1 | 0 | 0 | 1 | 1 |
    | 1 | 0 | 1 | 1 | 1 |
    | 1 | 1 | 0 | 1 | 0 |
    | 1 | 1 | 1 | 1 | 0 |
    - Verified correct for both.

## Slide 22
- Topics: implementing Boolean functions with gates (logic diagrams).
- Content:
  - Heading: Implementing Boolean functions with gates (پیاده سازی توابع بولی به وسیله گیت ها).
  - Example 1: F1 = xyz' — one 3-input AND gate; inputs x, y, and z through an inverter (NOT); output F1.
  - Example 2: F2 = x + y'z — y goes through an inverter, then into a 2-input AND with z; the AND output and x go into a 2-input OR gate; output F2.
  - Example 3: F3 = xy' + x'z — top AND gate: inputs z and x' (x through an inverter); bottom AND gate: inputs x and y' (y through an inverter); both AND outputs go into an OR gate; output F3. (Input labels near the top are overwritten: "z" and a struck-through "x"; the wiring matches F3 = xy' + x'z.)
  - Note: F2 here (x + y'z) is the same function as F1 on slide 21, and F3 here is F2 on slide 21 — the numbering differs between slides.

## Range summary
- Chapter 1 (فصل ۱) — Binary systems (سیستم های دودویی): slides 1-13
  - Slide 1: positional notation; binary and base-5 → decimal
  - Slide 2: hex digits; hex → decimal; table of 0-15 in bases 10/16/8/2
  - Slide 3: binary addition, subtraction (borrow), multiplication; intro to base conversion
  - Slide 4: decimal → binary (repeated division for integers, repeated multiplication for fractions)
  - Slide 5: decimal fraction → octal; mixed numbers (integer and fraction separately)
  - Slide 6: binary → octal (3-bit groups)
  - Slide 7: binary → hex (4-bit groups); octal/hex → binary
  - Slide 8: complements; r's complement (r^n - N), examples in base 10 and base 2
  - Slide 9: subtraction with r's complement (M ≥ N case)
  - Slide 10: r's complement subtraction (M < N case); (r-1)'s complement (r^n - N - 1), 1's complement, end-around carry
  - Slide 11: binary logic; NOT/OR/AND truth tables and gate symbols
  - Slide 12: timing diagrams (Low/High signals)
  - Slide 13: Chapter 1 exercises (typed; 9 questions, no answers on the slide)
- Chapter 2 (فصل ۲) — Boolean algebra (جبر بول): starts at slide 14
  - Slide 14: definition; postulates (identity, complement, commutative, distributive); duality
  - Slide 15: Theorem 1 idempotence (x+x=x, x·x=x) proofs
  - Slide 16: Theorem 2 (x+1=1, x·0=0) — proof of b in the notes is wrong (copied from a); correct proof added
  - Slide 17: Theorem 3 involution ((x')'=x); Theorem 4 absorption (x+xy=x, x(x+y)=x)
  - Slide 18: proving theorems by truth table; associative law proved by table
  - Slide 19: Theorem 5 De Morgan with truth table; operator precedence (parentheses, NOT, AND, OR)
  - Slide 20: Boolean functions; 2^n rows; truth table of F = x + yz
  - Slide 21: truth tables of F1 = x + y'z and F2 = xy' + x'z
  - Slide 22: implementing functions with gates (logic diagrams for xyz', x + y'z, xy' + x'z)
- Flags: slide 5 radix point placement unclear (correct value (0.4065)_8); slide 7 final answer blotted (correct value (2C6B.F2)_16); slide 3 multiplication sketch unreadable; slide 16 proof of b is wrong; slide 19 possible prime mark on C.
