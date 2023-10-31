function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  Classifier = ml5.imageClassifier("MobileNet" , modelloaded );
}
function modelloaded() {
  console.log(" Model is loaded ");
}
function draw(){
  image(video , 0 , 0 , 300 , 300);

  Classifier.classify(video , gotresults ); 
}

pre_Result = "" ;

function gotresults(error , results ) {
  if (error) {
    console.log(error);
  } else {
    if((  results[0].confidence > 0.5 ) && (pre_Result != results[0].label)){
      console.log(results);
      pre_Result = results[0].label ;
      speech = window.speechSynthesis ;
      speech_data = " The object is " + results[0].label ; 
      utterthis = new SpeechSynthesisUtterance(speech_data) ;
      speech.speak(utterthis);

      document.getElementById("Object").innerHTML = results[0].label ; 
      document.getElementById("Accuracy").innerHTML = results[0].confidence.toFixed(2) ; 
    }
  }
}