let eyeballs = document.getElementsByClassName("eyeBall");

function eyeballTrack(MouseEvent){
    // eyeLazyGo = setTimeout(eyeLazy, 1000);

    // clearTimeout(eyeLazyGo);

    var x = MouseEvent.pageX;
    var y = MouseEvent.pageY;
    var xpos = x/window.innerWidth;
    var ypos = y/window.innerHeight;
    // console.log(xpos, ypos)
    eyeballs[0].setAttribute("cx", (ypos * 130) + 130);
    eyeballs[0].setAttribute("cy", (xpos * -80) + 125);
    eyeballs[1].setAttribute("cx", (ypos * 130) + 130);
    eyeballs[1].setAttribute("cy", (xpos * -80) + 125);

}
// document.getElementsByClassName("screenBox").onmousemove = eyeballTrack;
document.onmousemove = eyeballTrack;

// function eyeLazy(){
//     let X = Math.random() * 10;
//     let Y = Math.random() * 5;
//     console.log(X,Y)

//     // setInterval(function (){getSet(X,Y)}, 50);
// }



// function getSet (X, Y) {
//     var leftY = eyeballs[0].getAttribute("cx");
//     var leftX = eyeballs[0].getAttribute("cy");
//     var rightY = eyeballs[1].getAttribute("cx");
//     var rightX = eyeballs[1].getAttribute("cy");

//     console.log(leftY, leftX)

//     eyeballs[0].setAttribute("cx", leftY + Y);
//     eyeballs[0].setAttribute("cy", leftX + X);
//     eyeballs[1].setAttribute("cx", rightY + Y);
//     eyeballs[1].setAttribute("cy", rightX + X);
// }


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