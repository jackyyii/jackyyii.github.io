require(
	[],

	function() {
        console.log("yo");
        /* assign3: center header text using javascript */
        document.getElementById("headerID").style.textAlign = "center";

        /* assign3: font family for article in JavaScript */
        document.getElementById("articleID").style.fontFamily = "Comic Sans MS, cursive, sans-serif"; //"Impact,Charcoal,sans-serif"; 

        //--------------------------------------------------------------
        var header = document.getElementById("headerID");
        var counter = 0;
        header.addEventListener("click", function(){
        	counter += 1;
			header.innerHTML = "OK, I have now received " + counter + " clicks";
			console.log("OK, I have now received " + counter*100 + " clicks");
        });

 		var slider = document.getElementById("asideID").children["sliderID"];
 		console.log(slider)
 		slider.addEventListener("click", function(){
    		console.log("This is a message, slider value: " + slider.value);
    		header.style.backgroundColor = "rgb(" + Math.floor(slider.value) + "," + Math.floor(slider.value) + "," + Math.floor(slider.value) + ")"
    	});
	}
);