/* TODO
Congratulations Popup

When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.
---
Star Rating

The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).

The number of moves needed to change the rating is up to you, but it should happen at some point.
---
Timer

When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.
---
Move Counter

Game displays the current number of moves a user has made.

*/



/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond','fa-diamond',
                'fa-paper-plane-o','fa-paper-plane-o',
                'fa-anchor','fa-anchor',
                'fa-bolt','fa-bolt',
                'fa-cube','fa-cube',
                'fa-leaf','fa-leaf',
                'fa-bicycle','fa-bicycle',
                'fa-bomb','fa-bomb'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createCard(card) {
    return `<li class="card" data-card = "${card}"><i class="fa ${card}"></i></li>`
}

function displayCards() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card){
        return createCard(card);
    });
    
    deck.innerHTML = cardHTML.join('');
    // moves = 0;
    // moveCounter.innerText = moves;

} 

displayCards();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const allCards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let moveCounter = document.querySelector('.moves');
// moveCounter.innerText = moves;


/* 
    set up the event listener for a card. If a card is clicked:
   - display the card's symbol (put this functionality in another function that you call from this one)
   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) 
*/

allCards.forEach(function(card) {
    card.addEventListener('click', function(event) {
        if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') ){
            openCards.push(card);
            card.classList.add('open','show');
/* 
    - if the list already has another card, check to see if the two cards match
    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) 
*/
            if(openCards.length ==2) {
                if(openCards[0].dataset.card ==openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                } else {
/*
    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/ 
                    setTimeout(function() {
                        openCards.forEach(function(card){
                            card.classList.remove('open','show');
                        });

                        openCards = [];
                    },1000

                    );
                    
                }
            }
        }
    });
});


 
 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
Restart Button - A restart button allows the player to reset the game board, the timer, and the star rating.
*/
restart = document.querySelector('.restart');

restart.addEventListener('click', function() {
    location.reload();
})


