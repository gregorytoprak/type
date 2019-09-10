# [Touch Typing Trainer](https://type.gregorytoprak.com/)

This touch typing trainer teaches through the theory of spaced repetition.

## What it is

Type the presented character without looking at your keyboard to learn its location and improve your typing.

Designed for the early stages of learning to touch type. This trainer repeatedly gives you characters (and short n-grams) to type at an interval determined by your history with that character.

This allows your muscle memory to develop; it teaches you to remember where each key is without having to look.

After mastery of key locations has been developed, common bigrams and trigrams are introduced for greater typing efficacy.

## How it works

There are a number of 'tiers' of characters. You start in the first tier, with the ten [most common](http://norvig.com/mayzner.html) letters in English. You advance to the next tier once every character in the current tier has been typed correctly 3 times in a row. That is to say, once every character is in box 3 or above.

In each tier, the [Leitner System](https://en.wikipedia.org/wiki/Leitner_system) of spaced repetition is used.

Every character begins in box zero and is 'due'. When you successfully type a character, it advances one box. (Incorrectly typing a character sends it back to box zero.)

After typing a character, its next appearance time is based on its box number: a character that has just entered box k will be next due in 3^k seconds.

To choose a character to be typed, we select randomly from all of the characters currently due for the current tier. (If nothing is currently due, the character that will become due next is chosen.)

That's all there is to it, except for the choice of characters in tiers.

## Tiers

1. top ten most common letters
 - (e t a o i n s r h l)
2. include the second ten most common letters
 - 1 + (d c u m f p g w y b)
3. include the last six letters (the whole alphabet)
 - 2 + (v k x j q z)
4. the whole alphabet capitalized
 - (E T A O I N S R H L D C U M F P G W Y B V K X J Q Z)
5. the ten digits
 - (1 2 3 4 5 6 7 8 9 0)
6. the thirty-two standard punctuation characters on the keyboard/in ASCII
 - (! @ # $ % ^ & * ( ) [ ] \` \ ' = / ; , . - { } ~ | " + ? : < > \_)
7. top ten most common digraphs
 - (th he in er an re on at en nd)
8. top ten most common trigraphs
 - (the and ing ion tio ent ati for her ter)

## Limitations

This trainer is not enough for absolute mastery, of course. After sufficient skill has been developed here, the final step is to use this touch typing in your everyday keyboard use! It is only over time that true skill can be developed.

I hope touch typing becomes so natural that you forget it was even a skill you had to learn.

Good luck!

---

A project by [GDT](https://gregorytoprak.com/).  
Brought to you with the support of [acritch](http://acritch.com) and users like you.  
Thank you!

---

