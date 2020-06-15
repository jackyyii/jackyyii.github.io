require(
   // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
    ["../jslibs/raphael.lonce"],  // include a custom-built library

    function () {

        console.log("Yo, I am alive!");

        // Grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");

        // Create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.width;
        var pHeight = paper.height;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
        //---------------------------------------------------------------------

        // assign6.1 Just create a nice black background
        var bgRect = paper.rect(0,0,pWidth, pHeight);
        bgRect.attr({"fill": "black"});


        // assign7: create var to hold number of elements in your list
        var numDots=40;
        // assign7: initialize array to empty
        var dot = [];
        var i=0;
        while(i<numDots){
            dot[i]=paper.circle(pWidth/2, pHeight/2, 10);

            dot[i].colorString = "hsl(" + Math.random()+ ",1, .75)";
            dot[i].attr({"fill": dot[i].colorString, "fill-opacity" : .75});

            // assign6:5 Add some properties to dot just to keep track of it's "state"
            dot[i].xpos=pWidth/2;
            dot[i].ypos=pHeight/2;
            // assign6.6 Add properties to keep track of the rate the dot is moving
            //assign7: MAPPING of ranges (here, [0,1] -> [-5,5])
            dot[i].xrate= -5+10*Math.random();
            dot[i].yrate= -7+14*Math.random();
            i++;
        }




        // assign6.2: For counting calls to the 'draw' routine
        var count=0;
        //assign7: AVOID creating vars inside loops (eg while) and functions that get called back at high rates.
        var dist; // temp variable used inside loop
        // assign6.2: our drawing routine, will use as a callback for the interval timer


        var draw = function(){

            // Count and keep track of the number of times this function is called
            count++;
            //console.log("count = " + count);
            //console.log("dot pos is ["+dot.xpos + "," + dot.ypos + "]");

            i=0;
            while(i<numDots){

                dot[i].yrate += gravity;

                dot[i].xpos += dot[i].xrate;
                dot[i].ypos += dot[i].yrate;

                // assign6.8: Now actually move the dot using our 'state' variables
                dot[i].attr({'cx': dot[i].xpos, 'cy': dot[i].ypos});


                // assign6.9: keep the object on the paper
                if (dot[i].xpos > pWidth) {dot[i].xrate = -dot[i].xrate*0.4};
                if (dot[i].ypos > pHeight) {dot[i].yrate = -dot[i].yrate*0.4};
                if (dot[i].xpos < 0) {dot[i].xrate = -dot[i].xrate*0.4};
                if (dot[i].ypos < 0) (dot[i].yrate = -dot[i].yrate*0.4);

                i++;
            }
        }

        //assign7: Mouse tracking  - used to change graphica feature in vicinty of mouse
        var mouseState = {
            pushed: false,
            x: 0,
            y:0,
        }
 

        // assign6.3: call draw() periodically
        // We do this last thing as the module loads
        setInterval(draw, 40);

        var nextToEmit = 0;
        setInterval(function(){
            dot[nextToEmit].xpos=pWidth/2;
            dot[nextToEmit].ypos=pHeight/2;
            dot[nextToEmit].xrate= -5+10*Math.random();
            dot[nextToEmit].yrate= -7+14*Math.random();

            nextToEmit=(nextToEmit+1) % numDots;

        }, 100);

        var gravity = .2;

        if (window.DeviceOrientationEvent) {
            console.log("window.DeviceOrientationEvent is " + window.DeviceOrientationEvent);
          // Listen for the event and handle DeviceOrientationEvent object
          window.addEventListener('deviceorientation', function(ev){
            if ((ev.beta != null) && (!touching)){
                gravity = ev.beta/50;
                document.getElementById('header').innerHTML="Gravity: " + gravity;
            }
          });
        } else{
            console.log("Device orientation not supported");
        }

        var touching=false;
        
        centerDiv.addEventListener("touchstart", function(ev){
            gravity= -(pHeight/2-ev.offsetY)/100;
            // gravity = .8
        });

        centerDiv.addEventListener("touchend", function(ev){
            gravity = .2;
        });
});