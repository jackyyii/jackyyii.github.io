require(
	[],

	function () {
        console.log("yo");
        /* assign3: center header text using javascript */
        document.getElementById("headerID").style.textAlign = "center";

        /* assign3: font family for article in JavaScript */
        document.getElementById("articleID").style.fontFamily = "Comic Sans MS, cursive, sans-serif"; // "Impact,Charcoal,sans-serif"; 

        // create new function named "hslString"
        function hslString(arg1, arg2, arg3){
        	return("hsl(" + arg1 + ", " + arg2 + "%, " + arg3 + "%)"); // concatinate the strings with the arguements
        };

        // test whether the function "hslString" works
        console.log(hslString(180, 50, 70));

        // initialise all elements and variables
        var aside = document.getElementById("asideID");
        var article = document.getElementById("articleID")
        var hue = 0;
        var saturation = 0;
		var lightness = 0;
		var opacity = 0;

		// access the respective sliders and obtaining the values when the slider is changed
        var sliderH = document.getElementById("asideID").children["sliderIDH"];
 		sliderH.addEventListener("input", function(){
 			hue = sliderH.value;
 			// update the background hue
    		aside.style.backgroundColor = hslString(hue, saturation, lightness);
    	});

        var sliderS = document.getElementById("asideID").children["sliderIDS"];
 		sliderS.addEventListener("input", function(){
 			saturation = sliderS.value;
 			// update the background saturation
    		aside.style.backgroundColor = hslString(hue, saturation, lightness);
    	});

        var sliderL = document.getElementById("asideID").children["sliderIDL"];
 		sliderL.addEventListener("input", function(){
 			lightness = sliderL.value;
 			// update the background lightness
    		aside.style.backgroundColor = hslString(hue, saturation, lightness);
    	});

		var sliderO = document.getElementById("asideID").children["sliderIDO"];
 		sliderO.addEventListener("input", function(){
 			opacity = sliderO.value;
 			// update the article's background opacity
    		article.style.opacity = sliderO.value;
    	});

 		// set opacity to 1 when mouse is held down
    	article.addEventListener("mousedown", function(){
    		article.style.opacity = 1;
    	});

    	// set opacity to that of the opacity slider value when the mouse is released
    	article.addEventListener("mouseup", function(){
    		article.style.opacity = opacity;
    	});
    }
);