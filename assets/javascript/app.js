

var animalArray =["wolf","dog","cat","lion","tiger","racoon","panda","koala","eagle","kangaroo"];
var gif="";
var empty = true;
var index=0;
var responseArray =[];



var getGif = function(gif) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=yMIL3jYfGCd0ym74WTKRtp04feOSDoHc&limit=9";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function ready(response) {
        var btn =$("<button>"+gif+"</button>");
        btn.attr("class","btn btn-outline-info animalbtn");
        btn.attr("data-id", response.meta.response_id);
        
        $('#btnsSection').append(btn);
        initialdisplay(response,gif);
        responseArray.push(response);
        // console.log(response.meta.response_id)
        
    });
  };
  for(i=0;i < animalArray.length;i++){
    gif=animalArray[i];
    getGif(gif);
   }
function initialdisplay(response,gif){
    if(empty){
        for(i=0;i < 9;i++){
            // console.log(response.data[i].images.fixed_height.url)
        var gifUrlstill = response.data[i].images.fixed_height_still.url;
        var gifUrlanimate = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating;
      
        
        var gifImg = $(" <div class= card><img class= gifs src="+gifUrlstill+" data-still ="+gifUrlstill+" data-animate="+gifUrlanimate+" data-state= still data-name="+gif+" ><p class= card-text >rating: "+rating+"</p></div>");
        
        $("#displaySection").append(gifImg);
        }
        
        empty=false}

}
$(".app").on("click", function(event) {
    
    var target = $( event.target );

    if (target.is("img")){
    var state = target.attr("data-state");
    
    if (state === "still") {
        target.attr("src", target.attr("data-animate"));
        target.attr("data-state", "animate");
    } else {
        target.attr("src", target.attr("data-still"));
        target.attr("data-state", "still");
    }
}
    if (target.is(".animalbtn")){
        // console.log(target.attr("data-id"));
        var name = target.html();
        for(i=0;i < responseArray.length; i++){
         
         var id = responseArray[i].meta.response_id
         
        if(id == target.attr("data-id")){
            $("#displaySection").empty();
            for(j=0;j < 9; j++){
                var gifUrlstill = responseArray[i].data[j].images.fixed_height_still.url;
                var gifUrlanimate = responseArray[i].data[j].images.fixed_height.url;
        // console.log(gifUrlanimate)
                var count = j+1;
                var gifImg = $(" <div class= card><img class= gifs src="+gifUrlstill+" data-still ="+gifUrlstill+" data-animate="+gifUrlanimate+" data-state= still data-name="+name+"><p class= card-text >image "+count+"</p></div>");
        
                 $("#displaySection").append(gifImg);
            }
            
        }
        }
    }
    if (target.is("#addbtn")){
        event.preventDefault()
       var animal=$("#myinput").val();
       if (animal !== ""){
       animalArray.push(animal);
       getGif(animal);
    }
    }
    if (target.is("#seeMore")){
        
        
        var more = $(".gifs").attr("data-name");
        var getmore = function(more) {
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + more + "&api_key=yMIL3jYfGCd0ym74WTKRtp04feOSDoHc&limit=90";
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function ready(response) { 
                console.log(response);
                index = index+9;
                for(i=index;i < index+9;i++){
                var gifUrlstill = response.data[i].images.fixed_height_still.url;
                var gifUrlanimate = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;
               
                var gifImg = $(" <div class= card><img class= gifs src="+gifUrlstill+" data-still ="+gifUrlstill+" data-animate="+gifUrlanimate+" data-state= still data-name="+gif+" ><p class= card-text >rating: "+rating+"</p></div>");
                
                $("#displaySection").append(gifImg);
                
                }
            });
        };
        getmore(more);
    }
  });

