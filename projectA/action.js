function deferVideo() {
    $("video source").each(function(){
        var sourcefile = $(this).attr("data-src");
        $(this).attr("src", sourcefile);
        var video = this.parentElement;
        video.load();
    })
}

window.onLoad = deferVideo();