require(
	[],
	function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        // Find get paper dimensions
        var dimX = paper.width;
        var dimY = paper.height;


        //--------------------------------

        var bg = paper.rect(0, 0, dimX, dimY);

        bg.attr({
                "stroke": "#444444",
                "stroke-width": 20,
                "fill" : "#CCAAFF"        // must be filled to get mouse clicks        
        });

        bg.node.addEventListener("mousedown", function(ev){
                console.log("mousedown on background detected");
        });

        var circle2 = paper.circle(dimX/4, dimY/4, 20).attr({
                "fill": "blue",
                "opacity": .5
        });

        var circle1 = paper.circle(dimX/2, dimY/2, 20).attr({
                "fill": "yellow"
        });

        var line = paper.path("M " + dimX/2 + "," + dimY/2 + " L " + dimX/4 + "," + dimY/4);
        line.attr({
                "stroke": "red",
                "stroke-width": 10
        });

        var circle2State = "up";

        circle2.node.addEventListener("mousedown", function(ev){
                //console.log("mousedown on blue circle");
                circle2State = "down";
        });

        circle2.node.addEventListener("mouseup", function(ev){
                //console.log("mouseup on blue circle")
                circle2State = "up";
        });

        circle2.node.addEventListener("mousemove", function(ev){
                //console.log("The coordinates are " + ev.offsetX + "," + ev.offsetY)
                circle2.attr({
                        "cx": ev.offsetX,
                        "cy": ev.offsetY
                })
                line.attr({
                        "path": "M " + dimX/2 + "," + dimY/2 + " L " + ev.offsetX + "," + ev.offsetY
                })
        });

        bg.node.addEventListener("mousemove", function(ev){
                //console.log("The coordinates are " + ev.offsetX + "," + ev.offsetY)
                circle2.attr({
                        "cx": ev.offsetX,
                        "cy": ev.offsetY
                })
                line.attr({
                        "path": "M " + dimX/2 + "," + dimY/2 + " L " + ev.offsetX + "," + ev.offsetY
                })
        });

        var animateCircle1 = function(){
              circle1.animate({
                "fill": "green"
              }, 1000, "linear", animateCircle2);
        }

        var animateCircle2 = function(){
              circle1.animate({
                "fill": "red"
              }, 1000, "linear", animateCircle1);
        }

        circle1.node.addEventListener("mousemove", function(ev){
                animateCircle1();
        });
});