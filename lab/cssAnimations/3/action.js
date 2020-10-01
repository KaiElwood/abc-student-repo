let onButton = document.getElementById("on");
let offButton = document.getElementById("off");

let context = new AudioContext();

let osc = context.createOscillator();
osc.type = "triangle"
osc.frequency.value = 440;

let gain = context.createGain();

osc.connect(gain);

gain.connect(context.destination);

onButton.addEventListener("click", ()=>{
    osc.start();
});

offButton.addEventListener("click", () => {
    osc.stop();
});