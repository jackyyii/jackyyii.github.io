require(
	[],
	function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        // find get paper dimensions
        var dimX = paper.width;
        var dimY = paper.height;

        // create background
        var bg = paper.rect(0, 0, dimX, dimY);

		// create a Bezier curve for the mouth
		var mouth = paper.path("M 100,200 Q 150,150,200,200");
		// state variable for whether the face is smiling or not
		var buttonState = false;
		// state variable for animation duration
		var duration = 100;

		// create 2 ellipses for the eyes
		var eye1 = paper.ellipse(120,150,4,0.1);
		var eye2 = paper.ellipse(180,150,4,0.1);

		// create a circle for the dot following the mouth
		var dot = paper.circle(150,175,5);
		dot.attr({
			"fill": "red" // fill the circle so the dot can be clicked on the centre
		})

		// state variable for when the mouse is down or up (i.e dragging dot or not)
		var draggingDot = false;

		// get the toggle button element
		var toggle = document.getElementById("toggle");
		// add an event that controls the mouth
		toggle.addEventListener("click", function(){
			var text = document.getElementById("textLabel")
			// if already smiling
		 	if (buttonState){
		 		// change to not smiling
		 		text.innerHTML = "Not Smiling";
		 		buttonState = false;
		 		// animate mouth to not smiling
		 		mouth.animate({
		 			"path": drawMouth(150,150,500)
		 		}, duration);
		 		// animate eyes to close when not smiling
		 		eye1.animate({
		 			"ry": 0.1
		 		}, 500, "linear");
		 		eye2.animate({
		 			"ry": 0.1
		 		}, 500, "linear");
		 		// animate dot to follow mouth
		 		dot.animate({
		 			"cx": 150,
		 			"cy": 175
		 		}, duration);
		 	// else (i.e. if not smiling)
		 	} else {
		 		// change to smiling
		 		text.innerHTML = "Smiling";
		 		buttonState = true;
		 		// animate mouth to smiling
		 		mouth.animate({
		 			"path": drawMouth(150,250,2000)
		 		}, duration);
				// animate eyes to close when not smiling
		 		eye1.animate({
		 			"ry": 8
		 		}, 500, "linear")
		 		eye2.animate({
		 			"ry": 8
		 		}, 500, "linear")
		 		// animate dot to follow mouth
		 		dot.animate({
		 			"cx": 150,
		 			"cy": 225
		 		}, duration);
		 	};
		});

		// create a drawMouth function that takes 3 arguments, bx, by and ms, 
		// which creates the path of the mouth and also sets the duration time
		var drawMouth = function(bx, by, ms){
			duration = ms;
			return("M 100,200 Q " + bx + "," + by + ",200,200");
		};

		// add event that changes the draggingDot state when mouse is down
		dot.node.addEventListener("mousedown", function(ev){
			draggingDot = true;
			console.log("down");
			dot.attr({
					"cx": ev.offsetX,
					"cy": ev.offsetY
				});
			mouth.attr({
		 			"path": drawMouth(ev.offsetX, ev.offsetY)
		 		});
		});

		// add event that changes the draggingDot state when mouse is up
		dot.node.addEventListener("mouseup", function(ev){
			draggingDot = false;
			console.log("up");
		});

		// add event that changes the mouth and dot only if the state of draggingDot is true
		dot.node.addEventListener("mousemove", function(ev){
			if (draggingDot){
				console.log("dragging");
				dot.attr({
					"cx": ev.offsetX,
					"cy": ev.offsetY
				});
				mouth.attr({
		 			"path": drawMouth(ev.offsetX, ev.offsetY)
		 		});
			} else {
				console.log("not dragging");
			}
		});

		// add event smiliar to that of the dot to make the movement smooth
		// used document.body instead of bg.node as the latter doesn't solve the issue like in Challenge 5
		document.body.addEventListener("mousemove", function(ev){
			if (draggingDot){
				console.log("dragging");
				dot.attr({
					"cx": ev.offsetX,
					"cy": ev.offsetY
				});
				mouth.attr({
		 			"path": drawMouth(ev.offsetX, ev.offsetY)
		 		});
			} else {
				console.log("not dragging");
			}
		});
});