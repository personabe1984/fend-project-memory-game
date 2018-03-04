/*
 * Create a list that holds all of your cards
 */
var listCard = ["fa-diamond", "fa-diamond",
                "fa-paper-plane-o", "fa-paper-plane-o",
                "fa-anchor", "fa-anchor",
                "fa-bolt", "fa-bolt",
                "fa-cube", "fa-cube",
                "fa-leaf", "fa-leaf",
                "fa-bicycle", "fa-bicycle",
                "fa-bomb", "fa-bomb"];
var moves = 0;
var openAndMatchCardsCheck = [];
var previousCardHolder = [];
/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

//I need to delete all of the previous cards in the board
//function getNewShuffledDeck(){
var deck = $('.deck');
var shuffledDeck = shuffle(listCard);
for(var i = 0; i < listCard.length; i++){
  deck.append('<li class="card"><i class="fa ' + shuffledDeck[i] + '"></li>');
}
//}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//function newGame(){
//  moves = 0;
//  getNewShuffledDeck();
//}
function noMatch(){

}
var card = deck.children();

card.click(function(){
  var temp = $(this);
  var classValue = temp.children().attr("class");
  temp.addClass("open show");
  //alert("Class Value" + classValue );
  //The first time user picks the card
  if(openAndMatchCardsCheck.length === 0){
    openAndMatchCardsCheck.push(classValue);
    previousCardHolder.push(temp);
  }else if(openAndMatchCardsCheck.length === 1){
    openAndMatchCardsCheck.push(classValue);

    if(openAndMatchCardsCheck[0] === openAndMatchCardsCheck[1]){
      temp.addClass("match");
      previousCardHolder[0].addClass("match");
      previousCardHolder = [];
      openAndMatchCardsCheck = [];
    }else{
      function noMatch(){
        previousCardHolder[0].removeClass("open show");
        temp.removeClass("open show");
        openAndMatchCardsCheck = [];
        previousCardHolder = [];
      }
      setTimeout(noMatch,700);
    }
  }
});



/*Have an array to hold the value.
  if the length of the array is less than 2 then start camparing
  case one
    if the card match
  case two
    if the card does not match
*/
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
