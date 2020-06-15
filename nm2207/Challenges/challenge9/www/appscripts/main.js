
require(
   // Use this raphael.lonce library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function (tutSndFactory, raphHelper) {

        console.log("Yo, I am alive!");

        // Grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.width;
        var pHeight = paper.height;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

        // Just create a nice black background
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({"fill": "black"});

        // A dot for us to play with
        var dot = paper.circle(pWidth/2, pHeight/2, 20);
        dot.attr({"fill": "green"});

        //-------------------
        
        //HTML5 audio elements

        //HTML5 audio element
        var aBackgroundSnd = new Audio ("resources/342566__inspectorj__sewer-soundscape-a.wav");
        aBackgroundSnd.play();
        aBackgroundSnd.volume=.2;
        aBackgroundSnd.loop=true;

        var aBumpSnd = new Audio ("resources/67408__noisecollector__vibrabonk.wav");
        
        var aEndSnd = new Audio ("resources/234555__electroviolence__swoosh-explosion.wav");

        //-------------------




        // Add some properties to dot just to keep track of it's "state"
        dot.xpos=pWidth/2;
        dot.ypos=pHeight/2;
        dot.xrate=5;
        dot.yrate=5;

        // our drawing routine, will use as a callback for the interval timer
        var draw = function(){

            // Update the position where we want our dot to be
            dot.xpos += dot.xrate;
            dot.ypos += dot.yrate;

            // Now actually move the dot using our 'state' variables
            dot.attr({'cx': dot.xpos, 'cy': dot.ypos});

            //---------------------------------------------
            // Set sound parameters based on the position of the moving dots



            // When dots hit the wall, reverse direction 
            if (dot.xpos > pWidth) {
                dot.xrate = -dot.xrate;
                aBumpSnd.pause();
                aBumpSnd.currentTime=0;
                aBumpSnd.play();
            }
            if (dot.ypos > pHeight) {
                dot.yrate = - dot.yrate;
                aBumpSnd.pause();
                aBumpSnd.currentTime=0;
                aBumpSnd.play();
            };
            if (dot.xpos < 0) {
                dot.xrate = -dot.xrate;
                aBumpSnd.pause();
                aBumpSnd.currentTime=0;
                aBumpSnd.play();
            }
            if (dot.ypos < 0) {
                dot.yrate = - dot.yrate;
                aBumpSnd.pause();
                aBumpSnd.currentTime=0;
                aBumpSnd.play();
            };

            if (Date.now()-startTime>=10000){
                endGame();
            };
        }

        // call draw() periodically
        // Start the timer with a button (instead of as program loads) so that sound models have time to load before we try play or set their parameters in the draw() function.
        var toggle="off";
        var timer;

        var startTime;
        var numClick;
        var difficulty = 80;

        document.getElementById("startButtonID").addEventListener('click', function(ev){
            if (toggle=="off"){
                setDifficulty();
                console.log(difficulty)
                timer=setInterval(draw, difficulty);
                toggle="on";
                startTime=Date.now();
                console.log(startTime);
                numClick=0;
                console.log(numClick);
            } else {
                endGame();
            };
        });

        dot.node.addEventListener('click', function(ev){
            if (toggle=="on"){
                numClick++;
                // click sound
                aBumpSnd.play();
                dot.attr({
                    "fill": "hsl(" + Math.random() + ", " + Math.random() + ", " + Math.random() + ")"
                });
            };
        });

        var endGame = function(){
            clearInterval(timer);
            toggle="off";
            dot.xpos=pWidth/2;
            dot.ypos=pHeight/2;
            dot.attr({'cx': dot.xpos, 'cy': dot.ypos, 'fill': 'green'});
            console.log(numClick);
            // end game sound
            aEndSnd.play();
            confirm("Number of clicks is " + numClick);
        };

        var setDifficulty = function(){
            if (document.getElementById("easy").checked){
                difficulty = 300;
            } else if(document.getElementById("soso").checked){
                difficulty = 80;
            } else if(document.getElementById("difficult").checked){
                difficulty = 10;
            };
        };
});