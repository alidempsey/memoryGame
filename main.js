$( document ).ready(function() {
    // "cards" array will contain two of each card's (img) filename minus the extension and file path
    var cards = [];
    var level
    // when difficulty is chosen, the "cards" array will contain the cards for that level (easy, medium or hard). "level" will be used in the file path below. 
    $("#easy").click(function() {
        
        cards = ["caterina", "daniel", "elena", "prince", "caterina", "daniel", "elena", "prince"];
        level = "easy";
        game_setup();

    });

    $("#medium").click(function() {
        
        cards = ["blackwidow", "captain", "hawkeye", "hulk", "ironman", "thor", "blackwidow", "captain", "hawkeye", "hulk", "ironman", "thor"];
        level = "medium";
        game_setup();

    });

    $("#hard").click(function() {
        
        cards = ["aquaman", "batman", "flash", "greenlantern", "martian", "robin", "superman", "wonderwoman", "aquaman", "batman", "flash", "greenlantern", "martian", "robin", "superman", "wonderwoman"];
        level = "hard";
        game_setup();

    });

    function game_setup() {
        // shuffle the cards and hide the "start_game" div
        $("#start_game").hide();
        shuffleArray(cards);

        // build and insert HTML for each image into items on an unordered list and hide images

        var game = "<ul>";

        for (var i = 0; i < cards.length; i++) { 
          game += "<li>";
          game += "<img src = 'img/" + level + "/" + cards[i] + ".jpg'/>";
          game += "</li>";
        }

        game += "</ul>";
        $("#game").html(game);
        $("img").hide();

    }

    // randomize the array containing pairs of cards for easy, medium, hard decks

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //initilize "guess1" and "guess2" will be compared to determine a match after second click; "count" will keep track of how many cards have been flipped, so matches can be determined after two cards are flipped

    var guess1 = "";
    var guess2 = "";
    var count = 0;

    // each time a "li" (card) within the "game" div is clicked...

    $("#game").on("click", "li", function() {

        // first make sure the clicked card is not already face up and only 0 or 1 other card(s) have been clicked

        if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {

            // increment guess count, show image, mark it as face up

            count++;
            $(this).children("img").show();
            $(this).children("img").addClass("face-up");

            // if guess #1, assign the value of the image's "src" attribute to the "guess1" variable

            if (count === 1 ) { 
                guess1 = $(this).children("img").attr("src"); 
            }   

            // if guess #2, assign the value of the image's "src" attribute to the "guess2" variable

            else { 
                guess2 = $(this).children("img").attr("src"); 

                // since it's the 2nd guess, compare guess1 and guess2 variables to check for match

                if (guess1 === guess2) { 
                    console.log("match");
                    $("li").children("img[src='" + guess2 + "']").addClass("match");
                } 

                // else it's a miss, any face up cards are hidden again and face-up class is removed. 1 second delay before unmatched cards are hidden

                else { 
                    console.log("miss");
                    setTimeout(function() {
                        $("img").not(".match").hide();
                        $("img").not(".match").removeClass("face-up");
                    }, 1000);
                }

                // reset to start a new attempt

                count = 0; 
                setTimeout(function() { console.clear(); }, 60000);      

            }

        }

        // after each click, check for winner by comparing array lengths of all cards to matched cards

        if ($(".match").length == cards.length) {
            $("#win").html("<h1>You WIN!!!</h1><h2><a href='index.html'>Play again?</a></h2>");
        }

    });

});