function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: checkload(),
            order: "viewCount",
            publishedAfter: "2007-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyCXDTz6DnO8uj2OPd71Fd3DaWJgGI2IxdI");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
        console.log("API ready");
    });
}

var loadin = document.getElementById("loadn");
var loadval = loadin.value.parseInt();

function checkload(){
	if (loadval <= 0){
		loadval = 1;
		return loadval;
	}
	if (loadval > 20){
		loadval = 20;
		return loadval;
	}
	else{
		loadval = loadval;
		return loadval;
	}
}

var sealb = document.getElementById("seals");
sealb.addEventListener("click", function(e){
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: "seal|seals|seal meme|seals meme",
            maxResults: checkload(),
            order: "relevance",
            publishedAfter: "2007-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            });
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
    
