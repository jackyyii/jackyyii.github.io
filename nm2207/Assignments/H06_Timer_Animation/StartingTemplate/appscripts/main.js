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

        // create a black rectangle that fits on the Raphael paper as a background
        var rectBg = paper.rect(0, 0, pWidth, pHeight);
        rectBg.attr({
            "fill": "black"
        })

        // create a green disk (circle) at the center of the paper with a radius of 20
        var radius = 20;
        var disk = paper.circle(pWidth/2, pHeight/2, radius);
        disk.attr({
            "fill": "green"
        });

        // create a function named ‘draw’ that keeps track of how many times it’s called
        // and prints the count to the console each time
        var count = 0;

        var draw = function(){
            count++;
            console.log("Number of times function 'draw' is called: " + count);

            // create a new white disk (circle)
            var nd = paper.circle(0, 0, radius).attr({
                "fill": "white",
                "xpos": disk.xpos,
                "ypos": disk.ypos,
                "xrate": disk.xrate,
                "yrate": disk.yrate
            });
            
            // 4 conditions to check if the disk hits the wall
            // if disk hits wall, change direction of disk animation
            if (disk.xpos<=0 | disk.xpos>=pWidth){
                disk.xrate *= -1;
            } 
            if (disk.ypos<=0 | disk.ypos>=pHeight){
                disk.yrate *= -1;
            }

            // update disk xpos and ypos by adding xrate and yrate to each, respectively
            disk.xpos += disk.xrate;
            disk.ypos += disk.yrate;
            console.log("xpos: " + disk.xpos + ", " + disk.ypos);
            nd.attr({
                "cx": disk.xpos,
                "cy": disk.ypos
                }); 

            // make a call to animate the fill of your circle to some color over 1 second in a linear fashion
            nd.animate({
                "fill": "yellow"
            }, 1000, "linear", function(){nd.remove()});
        };

        // use setInterval to call draw once per a certain time interval (e.g. 1 second)
        setInterval(draw, 50); // 1000 change to 50 to make animation run faster/smoother

        // add properties to disk object to keep track of its xpos and ypos
        // (initialize to the point at the center of the paper)
        disk.xpos = pWidth/2;
        disk.ypos = pHeight/2;

        // add properties xrate and yrate properties to disk to update the disk position
        // (initialize to 10)
        disk.xrate = 20; // 10 change to 20 to make animation run faster
        disk.yrate = 20;
});