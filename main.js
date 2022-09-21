status = "";
input_value = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting object";
    input_value = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
}

function draw() {
    image(video, 0, 0 , 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: object detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
            noFill(); stroke("#000000"); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
            if (objects[i].label == input_value) { 
                video.stop(); 
                document.getElementById("found_or_not").innerHTML = input_value + " found"; 
                objectDetector.detect(gotResult); 
                var synth = window.speechSynthesis; 
                var utterThis = new SpeechSynthesisUtterance(input_value + "found"); 
                synth.speak(utterThis); 
            }else { 
                document.getElementById("found_or_not").innerHTML = input_value + " not found"; 
            }
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }else {
        console.log(results);
        objects = results;
    }
}