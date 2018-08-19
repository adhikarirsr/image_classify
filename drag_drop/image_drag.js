let mobilenet;
let img;
let button;
function modelReady(){
	console.log('Model is Ready!!!');
}

function modelPredict(){
  mobilenet.predict(img, gotResults);
}

function gotResults(error,results){
	if (error){
		console.error(error);
	}else{
		console.log(results);
		let label = results[0].className;
		let prob = results[0].probability;
		let probp =prob*100;
		fill(0);
		textSize(18);
		//text('Guess: ' + label,350,);
		//text('Probability '+ probp.toFixed(2) + ' %',350,60);
    gtxt = createDiv('Guess: ' + label)
    gtxt.position(windowWidth/2,(windowHeight-height-80)/2)
    ptxt = createDiv('Probability '+ probp.toFixed(2) + ' %')
    ptxt.position(windowWidth/2,(windowHeight-height-40)/2)
	}

}

function setup() {
  var h1 = createElement('h1','Image Classifier Using Mobilenet trained on Imagenet')
  h1.position((windowWidth-500) / 2,0)
  // create canvas
  var c = createCanvas(700, 400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  c.position(x, y);
  background(100);
  button = createButton("Predict")
  button.position(x+300,y+410)
  // Add an event for when a file is dropped onto the canvas
  c.drop(gotFile);
  button.mousePressed(modelPredict)
  mobilenet = ml5.imageClassifier('Mobilenet',modelReady);
}

function draw() {
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width/2, height/2);
  noLoop();
}

function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    img = createImg(file.data).hide();
    // Draw the image onto the canvas
    image(img, 0, 0, width, height);
  } else {
    println('Not an image file!');
  }
}
