require(
	[],
	function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        // Find get paper dimensions
        var dimX = paper.width;
        var dimY = paper.height;

        // maps x in the interval [a,b] into the interval [m, n]
        var map = function (x, a, b, m, n){
            var range = n-m;
            var proportion = (x-a)/(b-a);
            return (m + proportion*range);
        }

        //--------------------------------

        var circle1 = paper.circle(dimX/2, dimY/2, 10);

        var xrate = 0.1;
        
        var draw = function(){
            time += frameLength;
            console.log("Time: " + time);
            var a = time*2*Math.PI/1000*xrate;

            var sa = Math.sin(a);
            console.log("sa: " + sa);
            var result = map(sa, -1, 1, 0, dimX);

            var ca = Math.cos(a);
            console.log("ca: " + ca);
            var result2 = map(ca, -1, 1, 0, dimY);

            circle1.attr({
                "cx": result,
                "cy": result2
            })
        };

        var frameLength = 5;
        var time = 0;

        setInterval(draw, frameLength);

        circle1.animate({
            "fill": "yellow"
        }, 1000, "linear");
});