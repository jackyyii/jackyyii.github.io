require(
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        console.log("WELCOME TO AIR HOCKEY!");

        // grab the div where we will put our Raphael paper
        var mainDiv = document.getElementById("mainDiv");

        // create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(mainDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.width;
        var pHeight = paper.height;

        // fil the paper with a background image
        var bgImage = paper.image("resources/airhockeybg.jpg", 0, 0, pWidth, pHeight);

        ///////////
        // AUDIO //
        ///////////

        var bumpSnd = new Audio("resources/bump.wav"); // bumping sound when the puck hits the edge of the paper
        var loseSnd = new Audio("resources/lose.wav"); // losing sound when game ends
        var hitSnd = new Audio("resources/ding.wav"); // hitting sound when the puck hits the striker

        ///////////////////
        // CIRCLE (PUCK) //
        ///////////////////

        var radius = 20; // puck size
        var puck = paper.circle(0, 0, 0);
        puck.attr({
            "fill": "firebrick",
            "cx": pWidth/2,
            "cy": pHeight/2,
            "r": radius
        });

        // add properties xRate and yRate properties to puck to update the puck position
        puck.xRate = 7; // default rate at which the puck moves horizontally
        puck.yRate = 7; // rate at which the puck moves vertically
        puck.xIncrease = 0.5; // rate at which the puck increases speed

        /////////////////////////
        // RECTANGLE (STRIKER) //
        /////////////////////////

        var rectHeight = 100; // height of striker
        var rectWidth = 20; // width of striker
        var compRect = paper.rect(0, 0, 0, 0); // create computer striker
        compRect.attr({
            "fill": "firebrick",
            "height": rectHeight,
            "width": rectWidth,
            "x": 0,
            "y": pHeight/2-rectHeight/2
        });

        var userRect = paper.rect(0, 0, 0, 0); // create user striker
        userRect.attr({
            "fill": "forestgreen",
            "height": rectHeight,
            "width": rectWidth,
            "x": pWidth-rectWidth,
            "y": pHeight/2-rectHeight/2
        });

        userRect.yBottom = pHeight/2+rectHeight/2; // get the y position of the lower edge of user striker

        var score = paper.text(pWidth-50, 50, 0).attr({
            "fill": "red", 
            "font-size": 40, 
            "font-weight": "bold", 
            "stroke": "white"
        });

        ///////////////////////////////////////////////////////////////////////////////
        //                                 PUCK MOVE                                 //
        ///////////////////////////////////////////////////////////////////////////////
        // Puck is set to move periodically, changing directions when it hits a wall //
        // Computer striker is set to follow the puck                                //
        // And at every period, user striker is checked if it misses the puck        //
        ///////////////////////////////////////////////////////////////////////////////

        var puckMove = function(){            
            // 4 conditions to check if the puck hits the wall
            // if puck hits striker

            console.log(puck.xRate);

            if (puck.attr("cx")<=radius | puck.attr("cx")>=pWidth-radius){
                hitSnd.play();
                puck.xRate *= -1; // change direction of puck animation
                // increase the speed of movement by increasing "x"
                if (puck.xRate<0){
                    puck.xRate-=puck.xIncrease;
                    numHits++;
                    score.attr({
                        "text": numHits
                    });
                } else{
                    puck.xRate+=puck.xIncrease;
                }                
                puck.attr({"fill": "hsl(" + Math.random() + ", " + Math.random() + ", " + Math.random() + ")"}) // change color of puck when hit striker
            };
            // if puck hits wall
            if (puck.attr("cy")<=radius | puck.attr("cy")>=pHeight-radius){
                bumpSnd.play();
                puck.yRate *= -1; // change direction of puck animation
            };

            // update puck cx and cy by adding xRate and yRate to each, respectively
            puck.attr({
                "cx": puck.attr("cx") + puck.xRate,
                "cy": puck.attr("cy") + puck.yRate
            });

            // update computer striker with puck location
            compRect.attr({
                "y": puck.attr("cy")-rectHeight/2
            });

            // if the user striker misses the puck when the puck reaches the user striker side
            if (puck.attr("cx")>=pWidth-radius && (puck.attr("cy")<userRect.attr("y") || puck.attr("cy")>userRect.yBottom)){
                endGame(); // end game
            };
        };

        ///////////////////////////////////////////////////
        //                   END GAME                    //
        ///////////////////////////////////////////////////
        // Game ends with the current high score updated //
        // And everything reset to its original place    //
        ///////////////////////////////////////////////////

        // when end game
        var endGame = function(){
            loseSnd.play(); // play losing sound
            clicked = false; // set clicked state to false
            clearInterval(puckMoveInterval);
            puck.xRate = 5; // reset the movement rate of the puck
            
            // if difficulty is easy
            if (diff=="easy"){
                currScore = numHits;     
            } else if (diff=="medium"){ // else if difficulty is medium
                currScore = numHits*1.5; // increase score proportionately
            } else{ // else (hard)
                currScore = numHits*2; // increase score proportionately
            };
            
            // if current score is higher than the highest score
            if (currScore>highScore){
                highScore = currScore; // update highest score with current score
            };
            // display updated the scores
            document.getElementById("score").innerHTML = "Highest Score: " + highScore + "<br>" + "Previous Score: " + currScore;
            // reset puck, user striker, and user striker position
            puck.attr({
                "cx": pWidth/2,
                "cy": pHeight/2,
                "fill": "firebrick"
            });
            compRect.attr({
                "x": 0,
                "y": pHeight/2-rectHeight/2
            });
            userRect.attr({
                "x": pWidth-rectWidth,
                "y": pHeight/2-rectHeight/2
            });
            score.attr({
                "text": 0
            });
            // pop up end game message with current score
            alert("Game over with score " + currScore);
        };

        /////////////////////////
        // ADD EVENT LISTENERS //
        /////////////////////////

        var puckMoveInterval;
        var clicked = false;
        var currScore;
        var highScore = 0;
        var numHits = 0;
        var speedSlider = document.getElementById("speedSlider") // get starting speed of puck
        var diff = "easy";

        // when click on user striker
        userRect.addEventListener("click", function(ev){
            // if game in clicked state
            if (clicked){
                clicked = false; // set clicked back to false
            // else
            } else{
                clicked = true; // set clicked to true
                numHits = 0
                setDifficulty(); // get difficulty
                // if difficulty is easy
                if (diff=="easy"){
                    puck.xIncrease = 0.5; // set increase rate to be 0.5
                } else if (diff=="medium"){ // else if difficulty is medium
                    puck.xIncrease = 1; // set increase rate to be 1
                } else{ // else (hard)
                    puck.xIncrease = 1.5; // set increase rate to be 1.5
                };
                puckMoveInterval = setInterval(puckMove, 30); // use setInterval to call puckMove periodically
            };
        });

        // when move mouse
        window.addEventListener("mousemove", function(ev){
            // if game in clicked state
            if (clicked){
                userRect.attr({ // set user striker to follow mouse y location
                    "y": ev.offsetY-rectHeight/2
                });
                userRect.yBottom = ev.offsetY+rectHeight/2; // update the bottom y value of user striker
            };
        });

        ///////////////////////////////////////////////////
        //                SET DIFFICULTY                 //
        ///////////////////////////////////////////////////
        // Sets the difficulty, which will determine the //
        // speed of the puck moving at the start         //
        ///////////////////////////////////////////////////

        var setDifficulty = function(){
            // if the easy radio is checked
            if (document.getElementById("easy").checked){
                diff = "easy"; // set difficulty to easy
            // if the medium radio is checked
            } else if(document.getElementById("medium").checked){
                diff = "medium"; // set difficulty to medium
            // if the hard radio is checked
            } else if(document.getElementById("hard").checked){
                diff = "hard"; // set difficulty to hard
            };
        };
});