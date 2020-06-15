define(
[],
function () {

    var iosocket = io.connect();

    var typingBox = document.getElementById("outgoingChatMessage");
    var chatBox = document.getElementById("chatBox");

    var uname = prompt("Please enter your name");
    var uname = uname || "anon";


    iosocket.on('connect', function () {
        console.log("Yo.........connected!");

        // MESSAGE PROCESSING HERE --------------
        iosocket.on('message', function(m){
            if (m.mtype=="text"){
                console.log("yep, got a message: " + m.data);
                chatBox.value+= m.uname + "> " + m.data + "\n";
            } else{
                var path = paper.path(m.pathString);
                    path.attr({
                        "stroke": m.colorString,
                        "stroke-width": m.strokeWidth
                    });
            };      
        });

        //---------------------------------------
        
        iosocket.on('disconnect', function() {
            console.log("Disconnected")
        });
    });


    // When the user is typing and hits 'return', add the 
    //     message to the chat window and send the text to the server (and thus to others)
    typingBox.addEventListener('keypress', function(event){
    	var mymessage; // holds tet from the typingBox
    	if(event.which == 13) {  // 'return' key
    		event.preventDefault();

            //-----------get text, construct message object and send ------------------------------
            mymessage = typingBox.value;
            chatBox.value += uname + "> " + mymessage + "\n";
            typingBox.value = "";

            iosocket.send({"uname" : uname, "data" : mymessage, "mtype": "text"});
            //-------------------------------------------------------------
    	}
    });


    //---------------------------------------------
    // Drawing chat 
    //---------------------------------------------

    svgdiv = document.getElementById("svgcanvas");
    var paper = new Raphael(svgdiv);

    var raphaelPath; // for holding the raphael path
    var pathString; // for holding the path string
    var mousePushed = false; // for rememberin g the state of the mouse
    var colorString;
    var strokeWidth;

    svgdiv.addEventListener("mousedown", function(ev){
        colorString = "hsl(" + sliderH.value + "," + sliderS.value + "," + sliderL.value + ")";
        strokeWidth = sliderSW.value;
        pathString = "M " + ev.offsetX + "," + ev.offsetY;
        raphaelPath = paper.path(pathString);
        raphaelPath.attr({
            "stroke": colorString,
            "stroke-width": strokeWidth
        });
        mousePushed = true;
    });

    svgdiv.addEventListener("mouseup", function(ev){
        mousePushed = false;
        iosocket.send({"pathString": pathString, "mtype": "draw", 
            "colorString": colorString, "strokeWidth": strokeWidth});
    });

    svgdiv.addEventListener("mousemove", function(ev){
        if (mousePushed){
            pathString += "L " + ev.offsetX + "," + ev.offsetY;
            raphaelPath = paper.path(pathString);
            raphaelPath.attr({
                "stroke": colorString,
                "stroke-width": strokeWidth
            });
        };
    });

    clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener("click", function(){
        paper.clear();
    });

    var sliderH = document.getElementById("sliderH");
    var sliderS = document.getElementById("sliderS");
    var sliderL = document.getElementById("sliderL");
    var sliderSW = document.getElementById("sliderSW");
});

 

