

var animalArray =["wolf","dog","cat","lion","tiger","racoon","panda","koala","eagle","kangaroo"];
var gif="";
var empty = true;



var getGif = function(gif) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=yMIL3jYfGCd0ym74WTKRtp04feOSDoHc&limit=9&rating=g";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var btn =$("<button>"+gif+"</button>");
        btn.attr("class","btn btn-outline-info");
        $('#btnsSection').append(btn);
        if(empty){
        for(i=0;i < 9;i++){
            console.log(response.data[i].images.fixed_height.url)
        var gifUrl = response.data[i].images.fixed_height_still.url;
        var count = i+1;
        var gifImg = $(" <div class= card><img src="+gifUrl+"><p class= card-text >image "+count+"</p></div>");
        console.log(gifUrl)
        $("#displaySection").append(gifImg);
        }
        empty=false}
    });
  };
  for(i=0;i < animalArray.length;i++){
    gif=animalArray[i];
    getGif(gif);
   }
   function display(){

   }
   
   