# memoryGame
A simple memory game I made using JavaScript/jQuery

Adapted some of the game mechanics from: https://codepen.io/jamesbarnett/pen/kiGsl

Player can select between three difficulty levels: easy, medium, and hard.  Easy has four pairs of cards to match, medium has six
and hard has eight.  

Once cards are matched, they stay face up; once all cards in the game are matched a "win" message appears along with a link to start
a new game.

*** KNOWN BUGS ***

1. When cards are clicked too quickly (i.e. a third card is clicked while the first two unmatched are still in the "timeout" function),
a match may not be properly assigned.
