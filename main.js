function setup()
{
    canvas=createCanvas(280,280);
    canvas.center();
    background("white")
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearcanvas()
{
    background("white");
}
function preload()
{
    classifier=ml5.imageClassifier("DoodleNet");
}

function draw()
{
    //strokeweight is for the thickness of the line
    strokeWeight(7);
    //stoke color is the color of the pen
    stroke("cyan");

    //if mouse is pressed , draw a line between previous and current mouse position
    if (mouseIsPressed)
    {
        line (pmouseX,pmouseY,mouseX,mouseY);
    }
    
}

function classifyCanvas()
{
    classifier.classify(canvas,gotresult);
}

function gotresult(error,results)
{
    if (error)
    {
      console.error(error);
    }

    console.log(results);
    document.getElementById("label").innerHTML = "Label :"+results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence :"+Math.round(results[0].confidence * 100) + "%" ;


    utterthis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterthis);


}

