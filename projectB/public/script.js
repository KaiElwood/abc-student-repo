let socket = io();
let allTimes = [];
let msgBoard = document.getElementById("msgBoard");
let drawspace = document.getElementById("drawspace");
let nameInput = document.getElementById("nameInput");
nameInput.addEventListener("keyup", function(e){
  var regex = /^[a-zA-Z\s]+$/;
  if (regex.test(this.value) !== true)
    this.value = this.value.replace(/[^a-zA-Z\s]+/, '');
});
let screenImg = null;
let msgBoardBackground = "";
let clientTime = new Date();
let clientHour = clientTime.getHours();
console.log("client time: " + clientHour);
socket.emit('clientHour', clientHour);

// set up color arrays
let documentBackgrounds = ["linear-gradient(132deg, #182247, #1f0a38)","linear-gradient(132deg, #363c6b, #3b346b)","linear-gradient(132deg, #d96f4c, #5f7bb3)","linear-gradient(132deg, #9ecce6, #82bee6)","linear-gradient(132deg, #68bae8, #62ade1)","linear-gradient(132deg, #289ddf, #2b8fe1)","linear-gradient(132deg, #4fa3c9, #6094d2)","linear-gradient(132deg, #f08b39, #6281e3)","linear-gradient(132deg, #22115c, #1f2b5e)","linear-gradient(132deg, #223667, #111e50)"];
let canvasBackgrounds = ["linear-gradient(132deg, #1f2347 , #221b40)","linear-gradient(132deg, #424a85, #473e82)","linear-gradient(132deg, #e88361, #7293d4)","linear-gradient(132deg, #9ebce6, #8abceb)","linear-gradient(132deg, #71b0f0, #78bff0)","linear-gradient(132deg, #40a8ed, #3e9eed)","linear-gradient(132deg, #60b9e0, #6fa3e3)","linear-gradient(132deg, #ff834a, #7486ed)","linear-gradient(132deg, #352275, #243478)","linear-gradient(132deg, #2d447d, #192b6e)"];

// set background based on client time
document.body.style.background = getBackground(clientHour, documentBackgrounds);

// on new user connect, set msgBoard height and width as bigger or smaller
socket.on("newConnect", (userCount)=>{
  // userCount = 30;
  console.log(userCount + " users");
  window.users=userCount;
  let style = getComputedStyle(document.querySelector(".container"));

  let canvasWidth = userCount*150 + 300;
  let canvasHeight = userCount*75 + 250;

  let styleHeight = style.height.replace('px', '');
  console.log("The height of the parent is " + styleHeight);
  console.log("The calculated height is " + canvasHeight);

  msgBoard.style.width = (window.innerWidth < canvasWidth) ? (window.innerWidth + "px") : (canvasWidth + "px");
  msgBoard.style.height = (styleHeight < canvasHeight) ? (styleHeight + "px") : (canvasHeight + "px");
})

// when a new time is added to the array (new user joins the chat), adjust the msgBoard background
socket.on("allTimes", (clientHour)=>{
  console.log("incoming times: " + clientHour);
  window.clientHours=clientHour;
  allTimes.push(clientHour);
  const sum = allTimes.reduce((a, b) => a + b, 0);
  const avg = (sum / allTimes.length) || 0;
  console.log("sum: " + sum);
  console.log("avg: " + avg);
  avgHour = Math.round(avg);
  msgBoardBackground = getBackground(avgHour, canvasBackgrounds)
  msgBoard.style.background = msgBoardBackground;
});

// when the finish button is pressed, send the screenshot
socket.on("newMsg", (message) => {
  let imageData = message.photo;
  let positionX = message.positionX;
  let positionY = message.positionY;
  let name = message.name;
  let newEl = document.createElement("div");
  let newPic = document.createElement("img");
  let newCaption = document.createElement("p");
  newCaption.innerHTML = name;
  newCaption.classList.add("textTitle");
  newPic.src = imageData;
  newPic.style.height = "150px";
  newEl.appendChild(newCaption);
  newEl.appendChild(newPic);
  newEl.classList.add("message");
  newEl.style.left = positionX + "px";
  newEl.style.top = positionY + "px";
  msgBoard.appendChild(newEl);
})


// variables for p5 canvas
let drawcanvas = document.getElementById("drawcanvas");
let backColor = document.getElementById("backcolor").value;
let submitButton = document.getElementById("submit");
let isStopped = true;
let photo = null;

// p5 canvas setup and draw functions
function setup() {
  let cnv = createCanvas(350,200);
  cnv.parent('drawcanvas');
  background(backColor);
  // console.log(backColor);
  noStroke();

  let clear = createButton("Clear");
  clear.parent("clear");
  clear.mousePressed(clearCanvas);

}

// to-do!!!
//  ---------- take screenhot and save it, stop draw ability, and then allow drag and drop

function clearCanvas(){
  clear();
  background(backColor);
}

function draw() {
  let slider = document.getElementById("slider").value;
  let brushColor = document.getElementById("colorPicker").value;
  backColor = document.getElementById("backcolor").value;
  if (mouseIsPressed) {
      fill(brushColor);
    } else {
      noFill();
    }
  ellipse(mouseX, mouseY, slider, slider);
}

function allowDragDrop(){
  // console.log(drawcanvas.children[2])
  let canvas = drawcanvas;
  let selector = document.getElementById("canvasDragger");
  console.log(isStopped);
  // console.log(event.target);
  if (isStopped){
    selector.onmousedown = function(event) {
      saveFrames('myCanvas', "png", 0.1, 10, d => {
        print(d);
        photo = d[0].imageData;
        // console.log(photo);
        // socket.emit('screenshot', d);
        // clearCanvas();
      });
      console.log("The canvas has been picked up!");
      
      let shiftX = event.clientX - canvas.getBoundingClientRect().left;
      let shiftY = event.clientY - canvas.getBoundingClientRect().top;
      console.log(shiftY);
    
      canvas.style.position = 'absolute';
      canvas.style.zIndex = 1000;
      document.body.append(canvas);
    
      moveAt(event.pageX, event.pageY);
    
      // moves the ball at (pageX, pageY) coordinates
      // taking initial shifts into account
      function moveAt(pageX, pageY) {
        canvas.style.left = pageX - shiftX + 'px';
        canvas.style.top = pageY - shiftY + 'px';
      }
    
      let currentDroppable = null;

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      
        canvas.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        console.log(elemBelow);
        canvas.hidden = false;
      
        // mousemove events may trigger out of the window (when the ball is dragged off-screen)
        // if clientX/clientY are out of the window, then elementFromPoint returns null
        if (!elemBelow) return;
      
        // potential droppables are labeled with the class "droppable" (can be other logic)
        let droppableBelow = elemBelow.closest('.droppable');
      
        if (currentDroppable != droppableBelow) {
          // we're flying in or out...
          // note: both values can be null
          //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
          //   droppableBelow=null if we're not over a droppable now, during this event
      
          if (currentDroppable) {
            // the logic to process "flying out" of the droppable (remove highlight)
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            // the logic to process "flying in" of the droppable
            enterDroppable(currentDroppable);
          }
        }
      }
    
      // move the ball on mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // drop the ball, remove unneeded handlers
      selector.onmouseup = function(event) {
        console.log("The canvas has been dropped!");
        console.log(event.clientX, event.clientY);
        // console.log(currentDroppable)
        canvas.style.position = 'relative';
        canvas.style.top = 'unset';
        canvas.style.left = 'unset';
        drawspace.insertBefore(canvas, drawspace.firstElementChild);
        msgBoard.style.background = msgBoardBackground;
        if (currentDroppable){
          // FINDING X POS
          // width of full page // minus width of msgBoard // divided by two is width of side bar.
          // Xpos minus side bar minus shiftX should be sent into message to sockets

          // FINDING Y POS
          // height of full page times .6 // minus height of msgBoard // divided by two is height gap
          // Ypos minus top bar minus shiftY should be sent into message to sockets
          let XPos = event.clientX - ((window.innerWidth - msgBoard.style.width.replace("px", ""))/2) - shiftX;
          let YPos = event.clientY - ((window.innerHeight*.6 - msgBoard.style.height.replace("px", "")) / 2) - shiftY;
          let name = nameInput.value;
          console.log(XPos);
          let message = {photo: photo, positionX: XPos, positionY: YPos, name: name};
          socket.emit('screenshot', message);
          setTimeout(clearCanvas, .1);
        }

        // changeLoop();
        // submitButtonTextToggle();
        // add function to check if dropped 
        document.removeEventListener('mousemove', onMouseMove);
        canvas.onmouseup = null;
        canvas.onmousedown = null;
      };
    
    };

    function enterDroppable(elem) {
      elem.style.background = 'pink';
    };
    
    function leaveDroppable(elem) {
      elem.style.background = msgBoardBackground;
    };
    
    canvas.ondragstart = function() {
      return false;
    };
  };
};


allowDragDrop();

// get background function
function getBackground(hour, backgroundArray){
  // console.log("getBackground is working");
  document.body.classList.add("backgroundAnimation");
  let background = ""
  if (hour > 22 || hour < 5){
    return backgroundArray[0];
    console.log("avg is late night");
  } else if (hour == 5){
    return backgroundArray[1];
    console.log("avg is very early morning");
  } else if (hour == 6){
    return backgroundArray[2];
    console.log("avg is sunrise");
  } else if (hour > 6 && hour < 9){
    return backgroundArray[3];
    console.log("avg is early morning");
  } else if (hour > 8 && hour < 12){
    return backgroundArray[4];
    console.log("avg is mid morning");
  } else if (hour > 11 && hour < 16){
    return backgroundArray[5];
    console.log("avg is mid day");
  } else if (hour == 16){
    return backgroundArray[6];
    console.log("avg is late afternoon");
  } else if (hour == 17){
    return backgroundArray[7];
    canvas.classList.add("backgroundAnimation");
    console.log("avg is sunset");
  } else if (hour > 17 && hour < 20){
    return backgroundArray[8];
    canvas.classList.add("backgroundAnimation");
    console.log("avg is evening");
  } else if (hour > 19 && hour < 23){
    return backgroundArray[9];
    console.log("avg is night");
  }
}