function deferVideo() {
    $("video source").each(function(){
        var sourcefile = $(this).attr("data-src");
        $(this).attr("src", sourcefile);
        var video = this.parentElement;
        video.load();
        // video.play();
    })
}

window.onLoad = deferVideo();

const foodBowl = $("#foodBowl")


foodBowl.on("click", function(){
    $(foodBowl).addClass("shake");
    var audio = $("#mysoundclip")[0];
    audio.currentTime = 0;
    audio.play();
    var num = Math.random();
    if ( num < .4){
        catFromLeft();
    } else if (num <.7){
        catFromRight();
    } else {
        catFromBottom();
    }
    setTimeout(function(){$(foodBowl).removeClass("shake");}, 600);
})

// first, setinterval and add px to video at interval. then, after ellapsed time set visibility (or display) to none, start next cat video at previous position (plus or minus offset)

// time in # of repeats, speed in millis

// i need time because I need to know when to start and stop videos
// I need speed to be a function of the width of the screen

function catsWalk(target, speed, direction, time){
    $(`#${target}`).get(0).currentTime = 0;
    $(`#${target}`).trigger("play");
    $(`#${target}`).css("visibility", "visible");
    var count = 0;
    var endPos;
    var interval = setInterval(function(){
        var currentPosition = $(`#${target}`).position();

        $(`#${target}`).css(`${direction}`, currentPosition.left + ((window.innerWidth/1000) * speed));
        if (count > time){
            clearInterval(interval);
            $(`#${target}`).trigger("pause");
            $(`#${target}`).css("visibility", "hidden");
            endPos = currentPosition;
            console.log(endPos);
            // return endPos;
        }
        count ++;
    }, 10)
    // await endPos;
};

function catFromLeft(){
    $("#catDeck").css("left", "-500px");
    var cat1 = $("#catDeck");
    var cat2 = $("#catBlack");
    cat1.get(0).currentTime = 0;
    cat2.get(0).currentTime = 0;
    var cat1T = 400;
    catsWalk("catDeck", 2, "left", cat1T);

    // cat2.css("left", cat1Pos.left);

    setTimeout(function(){
        // debugger;
        // console.log($("#catDeck").position());
        var cat1Pos = cat1.position();
        cat2.css("left", cat1Pos.left - 100);
        catsWalk("catBlack", .5, "left", cat1T);
    }, cat1T * 10);
}

function catFromRight(){
    var cat1 = $("#sandCat");
    var cat2 = $("#highCat");
    // cat1.get(0).currentTime = 0;
    // cat2.get(0).currentTime = 0;
    var cat1T = 180;
    cat1.css("left", "80vw");
    catsWalk("sandCat", -2, "left", cat1T);

    // cat2.css("left", cat1Pos.left);

    setTimeout(function(){
        // debugger;
        var cat1Pos = cat1.position();
        cat2.css("left", cat1Pos.left - 350);
        console.log($("#sandCat").position());
        console.log($("#highCat").position());
        catsWalk("highCat", -.5, "left", 300);
    }, cat1T * 10);
}

function catFromBottom(){
    var cat1 = $("#leashCat");
    var cat2 = $("#treadmillCat");
    // cat1.get(0).currentTime = 0;
    // cat2.get(0).currentTime = 0;
    var cat1T = 340;
    cat1.css("left", "-200px");
    catsWalk("leashCat", .2, "left", cat1T);

    // cat2.css("left", cat1Pos.left);

    setTimeout(function(){
        // debugger;
        var cat1Pos = cat1.position();
        cat2.css("left", cat1Pos.left + 785);
        // console.log($("#sandCat").position());
        // console.log($("#highCat").position());
        catsWalk("treadmillCat", .5, "left", 400);
    }, cat1T * 10);
}