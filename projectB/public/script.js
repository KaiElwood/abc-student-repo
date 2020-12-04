let socket = io();
let allTimes = [];
let msgBoard = document.getElementById("msgBoard");
let screenImg = null;
let msgBoardBackground = "";
let clientTime = new Date();
let clientHour = clientTime.getHours();
console.log("client time: " + clientHour);
socket.emit('clientHour', clientHour);

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
socket.on("newMsg", (imageData) => {
  let newEl = document.createElement("img");
  newEl.src = imageData;
  newEl.classList.add("message");
  msgBoard.appendChild(newEl);
})


// variables for p5 canvas
let drawcanvas = document.getElementById("drawcanvas");
let backColor = document.getElementById("backcolor").value;
let isStopped = false;
let photo = null;

// p5 canvas setup and draw functions
function setup() {
  let cnv = createCanvas(350,200);
  cnv.parent('drawcanvas');
  background(backColor);
  console.log(backColor);
  noStroke();

  let clear = createButton("Clear");
  clear.parent("clear");
  clear.mousePressed(clearCanvas);

  let submit = createButton("Finish");
  submit.parent("submit");
  submit.mousePressed(screenshot);
}

// to-do!!!
//  ---------- take screenhot and save it, stop draw ability, and then allow drag and drop

function screenshot(){
  console.log("submit!");
  changeLoop();
  allowDragDrop();
  saveFrames('myCanvas', "png", 0.1, 10, d => {
    print(d);
    photo = d[0].imageData;
    console.log(photo);
    // socket.emit('screenshot', d);
    // clearCanvas();
  });
}

function changeLoop(){
  isStopped = !isStopped;
  isStopped ? noLoop() : loop();
  console.log(isStopped);
}

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
  let canvas = drawcanvas.firstElementChild;
  console.log(isStopped);
  if (isStopped){
    canvas.onmousedown = function(event) {
      // console.log(event.target);
      let shiftX = event.clientX - canvas.getBoundingClientRect().left;
      let shiftY = event.clientY - canvas.getBoundingClientRect().top;
    
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
        // console.log(elemBelow);
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
      canvas.onmouseup = function(event) {
        console.log(event.clientX, event.clientY);
        console.log(currentDroppable)
        canvas.style.position = 'unset';
        drawcanvas.append(canvas);
        msgBoard.style.background = msgBoardBackground;
        if (currentDroppable){

          socket.emit('screenshot', photo);
        }
        // socket.emit('screenshot', d);
        setTimeout(clearCanvas, .1);
        changeLoop();
        // add function to check if dropped 
        document.removeEventListener('mousemove', onMouseMove);
        canvas.onmouseup = null;
        canvas.onmousedown = null;
      };
    
    };

    function enterDroppable(elem) {
      elem.style.background = 'pink';
    }
    
    function leaveDroppable(elem) {
      elem.style.background = msgBoardBackground;
    }  
    
    canvas.ondragstart = function() {
      return false;
    };
  }
}




// get background function
function getBackground(hour, backgroundArray){
  console.log("getBackground is working");
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


function dragDropLogic(){
  
}