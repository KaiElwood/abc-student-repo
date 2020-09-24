let eyeballs = document.getElementsByClassName("eyeBall");

function eyeballTrack(MouseEvent){
    var x = MouseEvent.pageX;
    var y = MouseEvent.pageY;
    var xpos = x/window.innerWidth;
    var ypos = y/window.innerHeight;
    console.log(xpos, ypos)
    eyeballs[0].setAttribute("cx", xpos);
    eyeballs[0].setAttribute("cy", ypos*50);
}
// document.getElementsByClassName("screenBox").onmousemove = eyeballTrack;
document.onmousemove = eyeballTrack;


// function findScreenCoords(mouseEvent)
// {
//   var xpos;
//   var ypos;
//   if (mouseEvent)
//   {
//     //FireFox
//     xpos = mouseEvent.screenX;
//     ypos = mouseEvent.screenY;
//   }
//   else
//   {
//     //IE
//     xpos = window.event.screenX;
//     ypos = window.event.screenY;
//   }
//   document.getElementById("screenCoords").innerHTML = xpos + ", " + ypos;
// }
// document.getElementById("screenBox").onmousemove = findScreenCoords;

// on mousemove, check where mouse is

// then change location of eyeballs based on location of mouse