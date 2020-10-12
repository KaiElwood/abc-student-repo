function deferVideo() {
    $("video source").each(function(){
        var sourcefile = $(this).attr("data-src");
        $(this).attr("src", sourcefile);
        var video = this.parentElement;
        video.load();
    })
}

window.onLoad = deferVideo();

// first, setinterval and add px to video at interval. then, after ellapsed time set visibility (or display) to none, start next cat video at previous position (plus or minus offset)

// time in # of repeats, speed in millis

function catsWalk(target, speed, direction, time){
    $(`#${target}`).trigger("play");
    var count = 0;
    var endPos;
    var interval = setInterval(function(){
        var currentPosition = $(`#${target}`).position();
        $(`#${target}`).css(`${direction}`, currentPosition.left + .5);
        if (count > time){
            clearInterval(interval);
            $(`#${target}`).trigger("pause");
            endPos = currentPosition;
            console.log(endPos);
            // return endPos;
        }
        count ++;
    }, speed)
    return interval;
};

var cat1 = catsWalk("catDeck", 10, "left", 400);
// var target = "catDeck"
// var currentPosition = $(`#${target}`).position();
// console.log("moved" + "    " + $("#catDeck").css(`left`) + "       " + currentPosition.left)

// setInterval(function () {
//     var currentPosition = $("#catDeck").position();
    
//     console.log("moved" + "    " + $("#catDeck").css(`left`) + "       " + currentPosition.left );
//         $("#catDeck").css(`left`, currentPosition.left + .5)
// }, 10);