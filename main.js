$( document ).ready(function() {

    var cards = [];
    var level

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

        $("#start_game").hide();
        shuffleArray(cards);

        // insert HTML for each image into an unordered list and hide images

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

    var guess1 = "";
    var guess2 = "";
    var count = 0;

    $("#game").on("click", "li", function() {

        if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {
        
            // increment guess count, show image, mark it as face up
            count++;
            $(this).children("img").show();
            $(this).children("img").addClass("face-up");
            
            //guess #1
            if (count === 1 ) { 
                guess1 = $(this).children("img").attr("src"); 
            }   
            
            //guess #2
            else { 
                guess2 = $(this).children("img").attr("src"); 
          
                // since it's the 2nd guess check for match
                if (guess1 === guess2) { 
                    console.log("match");
                    $("li").children("img[src='" + guess2 + "']").addClass("match");
                } 
          
                // else it's a miss
                else { 
                    console.log("miss");
                    setTimeout(function() {
                        $("img").not(".match").hide();
                        $("img").not(".match").removeClass("face-up");
                    }, 1000);
                }
          
                // reset
                count = 0; 
                setTimeout(function() { console.clear(); }, 60000);      
            }

        }
        if ($(".match").length == cards.length) {
            $("#win").html("<h1>You WIN!!!</h1><h2><a href='index.html'>Play again?</a></h2>");
        }
    });


        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }





});