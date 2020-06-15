require(
	[],

	function() {
        console.log("yo");
        var articleBox = document.getElementById("article");
        articleBox.innerHTML = "Whatever";
    
        function foo(num1, num2) {
			console.log("You are in function, foo");
			return Math.abs(num1-num2);
		}

		var x = 7;
		var y = 100;

		console.log("The difference between " + x + " and " + y + " is " + foo(x, y));
		articleBox.innerHTML += "<br>The difference between " + x + " and " + y + " is " + foo(x, y);

		function multi(num1, num2) {
			var sum = num1 + num2;
			var difference = Math.abs(num1-num2);
			var product = num1 * num2;
			var object = {
				"sum": sum,
				"difference": difference,
				"product": product
			};
			return object;
		}

		var result = multi(x, y);
		console.log(result);
		articleBox.innerHTML += "<br>The sum between " + x + " and " + y + " is " + result.sum;
		articleBox.innerHTML += "<br>The difference between " + x + " and " + y + " is " + result.difference;
		articleBox.innerHTML += "<br>The product between " + x + " and " + y + " is " + result.product; 

		var point1 = {
			"x": 10,
			"y": 103
		};

		var point2 = {
			"x": 7,
			"y": 100
		};

		function pointsum(point1, point2) {
			return {
				"x": point1.x + point2.x,
				"y": point1.y + point2.y
			}
		}

		console.log("The point sum between point1 and point2 is (" + pointsum(point1, point2).x + ", " + pointsum(point1, point2).y + ")");
		articleBox.innerHTML += "<br>The point sum between point1 and point2 is " + JSON.stringify(pointsum(point1, point2));

		// Bonus Round 1
		articleBox.style.fontFamily = "Charcoal";

		// Bonus Round 2
		var myElmt = document.createElement("article2") // arg is the tag for any html element
		articleBox.appendChild(myElmt);
	}
);