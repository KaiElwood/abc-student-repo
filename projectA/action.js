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

function catsWalk(target, speed, direction){
    setInterval(speed, function(direction){
        $(target).css("left", 
    })

    $("#cat-deck").css("left", 
    
    function(){
        return ($(this).css("left") + 5);
    })
}