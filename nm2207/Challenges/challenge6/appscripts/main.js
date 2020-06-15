require(
	[],
	function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        // Find get paper dimensions
        var dimX = paper.width;
        var dimY = paper.height;


        //------------------------------------------
        // Careate a rectangle with the same dimensions as the canvas and save it in the variable bg
        var bg = paper.rect(0, 0, dimX, dimY);

        // Set some background rectangle attributes
        bg.attr({
                "stroke": "#444444",
                "stroke-width": 20,
                "fill" : "#CCAAFF"        // must be filled to get mouse clicks        
        })

        // add mousedown listener that prints to console (but only if the rectangle was filled)
        bg.node.addEventListener("mousedown", function(ev){
                console.log("mouse down on paper")
        });

        //------------------------------------------
  
        mybigheart="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4z"

        // Create myHeart1 with attributes
        myHeart1 = paper.path(mybigheart);
        
        myHeart1.attr({
                "fill": "yellow",
                "stroke": "black",
                "stroke-width": 5
        })

        //============================================================
        //create some kind of transformation

        //============================================================
        //Animate myHeart1 in stages

        //============================================================
        // Create other hearts starting from transforming the path for the first one
        // give it some attributes
        myHeart2 = paper.path(Raphael.transformPath(mybigheart, "S0.4T10,5R290"));
        myHeart2.attr({
                "fill": "red",
                "stroke": "black",
                "stroke-width": 5
        });

        myHeart3 = paper.path(Raphael.transformPath(mybigheart, "S0.4T10,5R290"));
        myHeart3.attr({
                "fill": "orange",
                "stroke": "black",
                "stroke-width": 5
        });

        var foo = function(){
                myHeart1.animate({
                        "transform": "S0.5T100,50R45"
                }, 2000, bar3);
        };

        var bar = function(){
                myHeart1.animate({
                        "transform": "S0.75T50,25R30"
                }, 2000, foo2);
        };

        var foo2 = function(){
                myHeart2.animate({
                        "transform": "S0.5T10,25R290"
                }, 2000, bar);
        };

        var bar2 = function(){
                myHeart2.animate({
                        "transform": "S0.4T100,50R180"
                }, 2000, foo3);
        };

        var foo3 = function(){
                myHeart3.animate({
                        "transform": "S0.1T10,25R130"
                }, 2000, bar2);
        };

        var bar3 = function(){
                myHeart3.animate({
                        "transform": "S0.6T20,10R20"
                }, 2000, foo);
        };

        //============================================================
        // animate them, too 

        //============================================================
        // use the mouse location to control the animation through the transformation strings 
        bg.node.addEventListener("click", foo);
        bg.node.addEventListener("click", foo2);
});