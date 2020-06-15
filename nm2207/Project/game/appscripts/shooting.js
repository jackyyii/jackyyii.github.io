require(
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        console.log("WELCOME TO SPACE BLASTER!");

        // grab the div where we will put our Raphael paper
        var mainDiv = document.getElementById("mainDiv");

        // create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(mainDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.width;
        var pHeight = paper.height;

        // create a play space that the user can only use to control the plane
        var playSpaceSize = 20; // play space size (% of paper size)
        var playSpace = paper.rect(0, 0, (playSpaceSize+"%"), pHeight);
        playSpace.attr({
            "fill": "lightblue",
            "stroke": "none"
        });

        ///////////
        // AUDIO //
        ///////////

        var winSnd = new Audio("resources/win.wav"); // winning sound when game ends
        var hitSnd = new Audio("resources/hit.wav"); // hitting sound when bullet hits target

        ///////////
        // PLANE //
        ///////////

        var planeLen = 40; // plane size
        var plane = paper.image("resources/plane.png", 0, pHeight/2, planeLen, planeLen); // create plane

        ////////////
        // BULLET //
        ////////////

        var bulletRate = 10; // rate where the bullet moves

        var bulletWidth = 9; // bullet width
        var bulletHeight = 3; // bullet height
        var bulletRound = 5; // bullet corner (roundness)

        //////////////////////////////////////////////////////////////////////////
        //                             SHOOT BULLET                             //
        //////////////////////////////////////////////////////////////////////////
        // A bullet is created and moves periodically                           //
        // And at every period, the bullet is checked if it hits the target     //
        // If bullet hits a target, the targetted target is updated accordingly //
        //////////////////////////////////////////////////////////////////////////

        var t = 0; // keep tracks of how many targets shot

        var shoot = function(){
            // create new ullet
            var bullet = paper.rect(-10, 0, bulletWidth, bulletHeight, bulletRound); 

            bullet.attr({
                "x": 0,
                "y": plane.attr("y")+planeLen/2,
                "fill": "hsl(" + Math.random() + ", " + Math.random() + ", " + Math.random() + ")"
            });
            var bTopY = bullet.attr("y"); // top y of bullet
            var bBotY = bullet.attr("y") + bulletHeight; // bottom y of bullet

            // make bullet move
            var bulletMove = setInterval(function(){
                bullet.attr({
                    "x": bullet.attr("x") + bulletRate // bullet move at every interval
                });

                // get the targetted target
                var targ = targets[t];

                // get updated bullet location
                var bRightX = bullet.attr("x")+bulletWidth;
                var bLeftX = bullet.attr("x");
                
                // if bullet touches the targetted target
                if (bRightX>=targ.leftX && bLeftX<=targ.rightX && bTopY>=targ.topY && bBotY<=targ.botY){
                    hitSnd.play(); // play hit sound
                    bullet.remove(); // remove the bullet
                    clearInterval(bulletMove) // stop bullet movement
                    targ.attr({ // change targetted target color, opacity
                        "fill": "dimgrey",
                        "opacity": ".5"
                    });

                    // if there is a next target
                    if (typeof targets[t+1]!="undefined"){
                        targets[t+1].attr({ // change next target to be the next targetted target
                            "fill": "orangered",
                            "opacity": "1"
                        });
                    };

                    t++; // increase number of targets shot by 1

                    // if number of targets shot equals (or more than) number of targets
                    if (t>=numTarget){
                        // end game
                        endGame();
                    };
                // else
                } else{                    
                    // if the bullet reach the end of the paper
                    if (bLeftX>pWidth){
                        clearInterval(bulletMove); // clear bullet
                    };
                };
            }, 20);
        };

        ///////////////////////////////////////////////////
        //                   END GAME                    //
        ///////////////////////////////////////////////////
        // Game ends with the current high score updated //
        ///////////////////////////////////////////////////

        // when end game
        var endGame = function(){
            winSnd.play(); // play winning sound
            playing = false; // set playing state back to false
            for (var i=0; i<numTarget; i++){
                targets[i].remove(); // remove all targets
            };
            currScore = 100-Math.round((Date.now()-startTime)/numTarget/100); // calculate game score based on time taken
            // if current score is higher than the highest score
            if (currScore>highScore){
                highScore = currScore; // update highest score with current score
            };
            // display updated the scores
            document.getElementById("score").innerHTML = "Highest Score: " + highScore + "<br>" + "Previous Score: " + currScore;
            // pop up end game message with current score
            alert("Game over with score " + currScore);
        };

        /////////////////////////
        // ADD EVENT LISTENERS //
        /////////////////////////

        var playing = false; // playing state

        var startTime; // time when game starts
        var currScore; // current score of current game
        var highScore = 0; // highest score

        // when move mouse on the play space, plane
        playSpace.node.addEventListener("mousemove", function(ev){
            // update plane y
            plane.attr({
                "y": ev.offsetY-planeLen/2
            });
        });

        plane.node.addEventListener("mousemove", function(ev){
            plane.attr({
                "y": ev.offsetY-planeLen/2
            });
        });

        // when click on the play space, plane
        playSpace.node.addEventListener("click", function(ev){
            // if the game is playing
            if (playing){
                // shoot bullet
                shoot();
            };
        });

        plane.node.addEventListener("click", function(ev){
            if (playing){
                shoot();
            };
        });

        var targets;
        var numTarget = 10; // default number of targets

        var startButton = document.getElementById("startButton"); // get start button element
        var userValue = document.getElementById("userValue"); // get the new number of target from textbox
        var showTarget = document.getElementById("showTarget"); // get if target should be shown or not

        // when click on start button
        startButton.addEventListener("click", function(ev){
            // if game not in a playing state
            if (!playing){
                // if there is a value in the textbox
                if (userValue.value!=""){
                    // if the value is not a number (float will be rounded up)
                    if (userValue.value.match(/[a-z]/i)){
                        // tell user to re input a number (strictly number)
                        document.getElementById("error").innerHTML = "<br>Please input a number in its numeric form";
                    // else
                    } else {
                        document.getElementById("error").innerHTML = "";
                        numTarget = parseInt(userValue.value); // get value as number of targets
                        playing = true; // set playing state to true
                        startTime = Date.now(); // get the time where the game starts
                        t = 0; // set t back to 0

                        targets = []; // initialise array
                        for (var i=0; i<numTarget; i++){
                            var radius = randInt(5, 20); // randomize size
                            var randX = randInt(pWidth/100*playSpaceSize+2*radius, pWidth-2*radius); // randomize x position
                            var randY = randInt(2*radius, pHeight-2*radius); // randomize y position
                            var targetObj = paper.circle(randX, randY, radius); // create target
                            // if first target
                            if (i==0){
                                targetObj.attr({ // set color to the color of a targetted target
                                    "fill": "orangered",
                                    "stroke": "none"
                                });
                            // else
                            } else{
                                // if user wants to show targets
                                if(showTarget.checked){
                                    targetObj.attr({ // set to green otherwise
                                        "fill": "darkseagreen",
                                        "stroke": "none",
                                        "opacity": ".8"
                                    });
                                // else
                                } else{
                                    targetObj.attr({ // set to transparent otherwise
                                        "fill": "none",
                                        "stroke": "none",
                                        "opacity": ".8"
                                    });
                                };
                            }
                            // set the x and y of the parameter of the target
                            targetObj.leftX = targetObj.attr("cx")-radius+1; 
                            targetObj.rightX = targetObj.attr("cx")+radius;
                            targetObj.topY = randY-targetObj.attr("r")-1;
                            targetObj.botY = randY+targetObj.attr("r")+1;
                            // add newly created target into the array
                            targets[i] = targetObj;
                        };
                    };
                };
            };    
        });

        ///////////////////////////////////////////
        //        RANDOM NUMBER GENERATOR        //
        ///////////////////////////////////////////
        // Generate a random number in [m, n-1]  //
        ///////////////////////////////////////////
        
        var randInt = function(m, n) {
            var range = n-m;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        };
    });