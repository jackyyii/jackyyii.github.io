require(
    // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
    //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
    //     b) call element.addEventListener(...) instead of element.node.addEventListener(...)
    ["../jslibs/raphael.lonce"], // include a custom-built library

    function () {

        console.log("Yo, I am alive!");

        // grab the div where we will put our Raphael paper
        var centerDiv = document.getElementById("centerDiv");

        // create the Raphael paper that we will use for drawing and creating graphical objects
        var paper = new Raphael(centerDiv);

        // put the width and heigth of the canvas into variables for our own convenience
        var pWidth = paper.width;
        var pHeight = paper.height;
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
        //---------------------------------------------------------------------

        // assign6.1: Just create a nice black background
        var bgRect = paper.rect(0, 0, pWidth, pHeight);
        bgRect.attr({"fill": "black"});

        // ---------------------------------------------------------------
        //  HW 07
        // ---------------------------------------------------------------

        // initialize array of disks
        numDisk = 50;
        counter = 0;
        disks = [];

        // creating the disks
        while(counter < numDisk){
            disks[counter] = paper.circle(pWidth/2, pHeight/2, 10);
            disks[counter].xpos=Math.random()*pWidth;
            disks[counter].ypos=Math.random()*pHeight;
            disks[counter].xrate=Math.random();
            disks[counter].yrate=Math.random();
            disks[counter].colorString = "hsl(" + Math.random() + "," + Math.random() + "," + Math.random() + ")";
            disks[counter].attr({"fill": disks[counter].colorString});
            counter++;
        };

        // assign6.2: our drawing routine, will use as a callback for the interval timer
        var draw = function(){
            counter = 0;
            // while loop to animate all disks
            while(counter < numDisk){
                
                // assign6.7: update the position where we want our disk to be
                disks[counter].xpos += disks[counter].xrate;
                disks[counter].ypos += disks[counter].yrate;

                // assign6.8: now actually move the disk using our 'state' variables
                disks[counter].attr({'cx': disks[counter].xpos, 'cy': disks[counter].ypos});

                // assign6.9: keep the object on the paper
                if (disks[counter].xpos > pWidth) {disks[counter].xrate = -disks[counter].xrate};
                if (disks[counter].ypos > pHeight) {disks[counter].yrate = - disks[counter].yrate};
                if (disks[counter].xpos < 0) {disks[counter].xrate = -disks[counter].xrate};
                if (disks[counter].ypos < 0) {disks[counter].yrate = - disks[counter].yrate};

                // if the mouse is pushed and the distance is < 100 pixels
                if (mouseState.pushed & distance(mouseState.x, mouseState.y, disks[counter].xpos, disks[counter].ypos) < 100){
                    // change disk color to white
                    disks[counter].attr({"fill": "white"});                    
                } else {
                    // change disk color back to original
                    disks[counter].attr({"fill": disks[counter].colorString});
                }
                counter++;
            };
        };

        // assign6.3: call draw() periodically
        // We do this last thing as the module loads
        setInterval(draw, 20);

        // create transparent rectangle on top of everything
        tpRect = paper.rect(0, 0, pWidth, pHeight);
        tpRect.attr({"fill": "white", "fill-opacity": 0});

        // create a mouse variable object that keeps track of the button state and position of the mouse
        mouseState = {pushed: false, x: 0, y: 0};
        
        // create 3 event listeners to track mouse state
        tpRect.node.addEventListener("mousedown", function(ev){
            mouseState.pushed = true;
            mouseState.x = ev.offsetX;
            mouseState.y = ev.offsetY;
            console.log("Mouse pushed is " + mouseState.pushed + ", and location is at (" + mouseState.x + "," + mouseState.y + ")");
        });

        tpRect.node.addEventListener("mouseup", function(ev){
            mouseState.pushed = false;
            console.log("Mouse pushed is " + mouseState.pushed);
        });

        tpRect.node.addEventListener("mousemove", function(ev){
            if(mouseState.pushed){
                mouseState.x = ev.offsetX;
                mouseState.y = ev.offsetY;
                console.log("Mouse pushed is " + mouseState.pushed + ", and location is at (" + mouseState.x + "," + mouseState.y + ")");
            };
        });

        // create a function named distance that takes 4 arguments and calculates the distance between two points
        var distance = function(x1, y1, x2, y2){
            return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
        }
});