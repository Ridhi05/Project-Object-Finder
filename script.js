video="";
object=[];
function preload(){
}
function setup(){
    canvas=createCanvas(480,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,500);
    video.hide()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Detecting Objects";
    objectName=document.getElementById("object_name").value;
}
status="";
function modelLoaded(){
    console.log("model Loaded");
    status=true;
    
  
}
function draw(){
    image(video,0,0,480,500);
    if(status!=""){
    objectDetector.detect(video,gotResult);
    for(i=0;i<object.length;i++){
        document.getElementById("status").innerHTML="Detected objects";
        document.getElementById("objectsNumber").innerHTML="The number of objects detected are "+object.length;
        fill("red");
        percentage=floor(object[i].confidence*100);
        text(object[i].label+" "+percentage+"%",object[i].x+20,object[i].y+20);
        noFill();
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        if(object[i].label==objectName){
video.stop();
objectDetector.detect(gotResult);
document.getElementById("status").innerHTML=objectName+" Found";
        }
        else{
            document.getElementById("status").innerHTML=objectName+" Not Found";
        }
    }
    }

}
function gotResult(error,results){
if(error){
    console.log(error)
}
else{
    console.log(results);
object=results
}
}
