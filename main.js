objects = [];
status = "";
function setup() {
    canvas = createCanvas(280 , 280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(280,280);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}
function draw() {
    image(video,0,0,280,280);
    if(status != ""){
        objectDetector.detect(video , gotResult);
        for(i=0 ; i<objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("#ea05fa");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + " %" , objects[i].x + 15 , objects[i].y + 15); 
            noFill();
            stroke("#ea05fa");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);     
            }
            else{
                document.getElementById("status").innerHTML = object_name + " Not Found";
            }
        }
    }
}
function gotResult(error , results) {
    if (error) {
        console.log (error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
