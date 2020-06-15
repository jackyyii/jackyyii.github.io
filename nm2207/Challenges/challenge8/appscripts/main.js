
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

        //HTML5 audio element
        var audio1 = new Audio("resources\\342566__inspectorj__sewer-soundscape-a.wav");

        // as chrome cannot play audio when webpage loads
        var playButton = document.getElementById("playMusic")
        playButton.addEventListener("click", function(ev){
            audio1.play();
            audio1.loop = true;
        });

        var audio2 = new Audio("resources\\234555__electroviolence__swoosh-explosion.wav");
        dot.addEventListener("click", function(ev){
            audio2.play();
        });
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



            // When dots hit any of the 4 walls, reverse its direction 
            if (dot.xpos > pWidth) {
                dot.xrate = -dot.xrate;

            }
            if (dot.ypos > pHeight) {
                dot.yrate = - dot.yrate;

            };
            if (dot.xpos < 0) {
                dot.xrate = -dot.xrate;

            }
            if (dot.ypos < 0) {
                dot.yrate = - dot.yrate;

            };
        }

        // call draw() periodically
        // Start the timer with a button (instead of as program loads) so that sound models have time to load before we try play or set their parameters in the draw() function.
        var toggle="off";
        var timer;
        document.getElementById("startButtonID").addEventListener('click', function(ev){
            if (toggle=="off"){
                timer=setInterval(draw, 20);

                toggle="on";
            } else {
                toggle="off"
                clearInterval(timer);

            }
        })
        

});