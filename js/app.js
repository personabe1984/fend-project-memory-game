

/*
 * Create a list that holds all of your cards
 */

 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function startGame(){
   var myTimer = startTimer(0);

   var listCard = ["fa-diamond", "fa-diamond",
       "fa-paper-plane-o", "fa-paper-plane-o",
       "fa-anchor", "fa-anchor",
       "fa-bolt", "fa-bolt",
       "fa-cube", "fa-cube",
       "fa-leaf", "fa-leaf",
       "fa-bicycle", "fa-bicycle",
       "fa-bomb", "fa-bomb"
   ];

   var star = 3;
   var moves = 0;
   var totalMatchedCards = [];
   var deck = $(".deck");
   var shuffledDeck = shuffle(listCard);
   for (var i = 0; i < listCard.length; i++) {
       deck.append('<li class="card"><i class="fa ' + shuffledDeck[i] + '"></li>');
   }

   $(".stars").append('<li id="one"><i class="fa fa-star"></i></li>');
   $(".stars").append('<li id="two"><i class="fa fa-star"></i></li>');
   $(".stars").append('<li id="three"><i class="fa fa-star"></i></li>');

   function restart(){
     $(".deck").empty();
     $(".moves").html(0);
     clearInterval(myTimer);
     $(".stars").empty();
     startGame();
   }
   var card = deck.children();
   var prev = null;

   card.click(function() {
       if(star > 2 && moves > 16 && moves < 24){
         $("#three").remove();
         star--;
       }else if (star > 1 && moves > 24) {
         $("#two").remove();
         star--;
       }

       var current = $(this);
       getClassValue = function (node) {
         return node.children().attr("class");
       }
       current.addClass("open show");
     if (current.hasClass("match")) {
       return
     }
       if (prev === null ) {
          prev = current
           $(".moves").html(++moves);
       } else {
           if (getClassValue(prev) === getClassValue(current) && !(prev.is(current))) {
               totalMatchedCards.push(prev);
               totalMatchedCards.push(current);
               current.addClass("match");
               prev.addClass("match");
               $(".moves").html(++moves);
               prev = null
               if(totalMatchedCards.length === shuffledDeck.length){
                 var endGameScreen = $(".end-game");
                 var time = $("#minutes").text() + ":" + $("#seconds").text();
                 endGameScreen.append('<p id="time"></p>');
                 var score = "Time: " + time + " Rating: " + star + " Moves: " + moves;
                 $("#time").html(score);
                 $(".end-game").css("display", "flex");
                 clearInterval(myTimer);
                 $(".play-again").click(function(){
                   $(".end-game").css("display", "none");
                   restart();
                 });

               }
           } else {
               setTimeout(function() {
                   prev.removeClass("open show");
                   current.removeClass("open show");
                   prev = null
                   current = null
               }, 300);
               $(".moves").html(++moves);
           }
       }
   });

   var restartButton = $(".restart");
   restartButton.click(function(){
    restart();
   });

 }



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

function startTimer(sec){
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  var refresh = setInterval( function(){
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
  }, 1000);
  return refresh;
}

window.onload = function(){
  startGame();
}



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
