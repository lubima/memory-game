/*
    Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

/*
  Display the cards on the page
    - shuffle the list of cards using the provided "shuffle" method below
    - loop through each card and create its HTML
    - add each card's HTML to the page
 */
function createCard(card) {
    return `<li class="card" data-card = "${card}"><i class="fa ${card}"></i></li>`
}

function displayCards() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function (card) {
        return createCard(card);
    });

    deck.innerHTML = cardHTML.join('');

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

// Message window pop-up function

function openWindow(message,moves,minutes,seconds) {
    let newWindow = window.open(``, null, `height=200,width=800,left=200,top=200`);
    newWindow.focus();

    let html = `<div style="font-size:30px">${message} * Your moves were:${moves} * Your time was: ${minutes} minutes and ${seconds} seconds</div>`; newWindow.document.body.insertAdjacentHTML('afterbegin', html);

}
//*******Modal******** 
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//********* 

const allCards = document.querySelectorAll('.card');
// const starsHTML = document.getElementsByClassName('stars');
const starHTML = document.getElementsByClassName('fa-star');
let openCards = [];
let matchedCards = [];
let moveCounter = document.querySelector('.moves');
let moves = 0;



/* 
    set up the event listener for a card. If a card is clicked:
   - display the card's symbol (put this functionality in another function that you call from this one)
   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) 
*/

allCards.forEach(function (card) {
    card.addEventListener('click', function (event) {
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            /* 
                if the list already has another card, check to see if the two cards match
                if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) 
            */
            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                } else {
                    /*
                        if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
                    */
                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                        });

                        openCards = [];
                    }, 500

                    );

                }
            }
        }
    /*
    increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    */
    moves += 1;
    if(moves == 1){
        timer();
    }

    if (moves % 2 == 0) {
        moveCounter.innerHTML = moves / 2;
    }

    /*
    Star Rating
    The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).

    The number of moves needed to change the rating is up to you, but it should happen at some point.
    */

    if (moves == 20) {
        starHTML[3].setAttribute("class", "fa fa-star-o");
    }
    else if (moves == 40) {
        starHTML[2].setAttribute("class", "fa fa-star-o");
    }
    else if (moves == 60) {
        starHTML[1].setAttribute("class", "fa fa-star-o");
    }
    else if (moves == 80) {
        starHTML[0].setAttribute("class", "fa fa-star-o");
        //Display a message saying "GAME OVER" and restarting the game 
        openWindow(`GAME OVER`,moves,minutes,seconds);
        location.reload();
    }
/*  
    Congratulations Popup
    if all cards have matched, display a message with the final score (put this         functionality in another function that you call from this one)

    When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.
 */

    if (card.classList.contains('match')){
        matchedCards.push(card);
        if (matchedCards.length == 8) {
            openWindow(`CONGRATULATIONS!!!`,moves,minutes,seconds);
            location.reload();
        }
    }
    });
    
});

/*
    Restart Button - A restart button allows the player to reset the game board, the timer, and the star rating.
*/

restart = document.querySelector('.restart');

restart.addEventListener('click', function () {
    location.reload();
})

/* 
    Timer
    When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.
*/
//https://codepad.co/snippet/YMYUDYgr

let time = document.getElementsByTagName('h3')[0],
seconds = 0, 
minutes = 0, 
hours = 0,
t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
