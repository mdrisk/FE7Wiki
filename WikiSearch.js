document.addEventListener("DOMContentLoaded", function() {
  document.onkeypress = keyPress;
  var url="https://en.wikipedia.org/w/api.php?action=query&format=json&gsrlimit=5&generator=search&origin=*&gsrsearch=";

  var randomInfo = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=random&grnnamespace=0&grnlimit=5&prop=content";

  var urlinfo = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&origin=*&titles=";



  function keyPress(e){
    var key = (e.keyCode);
    if(key == 13 || key == 3){
      var ul = document.getElementById("results");
      ul.innerHTML = "";
      event.preventDefault();
      console.log("key pressed!");
      var info = (url + document.getElementById("searchBar").value);

    $.ajax(info, {
        success:function(data){
        var i = 0;
        console.log(data);
        $.each(data.query.pages, function(index, value){

          var li=document.createElement('li');
          var li2=document.createElement('li');
          ul.appendChild(li);
          li.innerHTML=li.innerHTML + value.title;
          li.setAttribute("id", "item"+i);
          ul.appendChild(li2);
          li2.innerHTML=li2.innerHTML;
          li2.setAttribute("id", value.title);
          i+=1;

          });


        }
    });
    }
  }

  $("#randomButton").on("click", function(){
      var ul = document.getElementById("results");
      ul.innerHTML = "";
      console.log("Button pressed!");


      $.ajax(randomInfo, {
        success:function(data){
        var i = 0;
        console.log(data);
        $.each(data.query.pages, function(index, value){

          var li=document.createElement('li');
          var li2=document.createElement('li');
          ul.appendChild(li);
          li.innerHTML=li.innerHTML + value.title;
          li.setAttribute("id", "item"+i);
          ul.appendChild(li2);
          li2.innerHTML=li2.innerHTML;
          li2.setAttribute("id", value.title);

          i+=1;

          });


        }
    });
  });

 $("#results").on("click", "li",function(){
      infoBlurb(this.innerHTML);
      });

 function infoBlurb(word){

   var linkinfo = "https://en.wikipedia.org/wiki/"+ word.replace(/ /g,"_");
   var urlinfo = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&origin=*&titles=";
   info = urlinfo+word;
   $.ajax(info, {
        success:function(data){
           $.each(data.query.pages, function(index, value){
             spot = document.getElementById(word);
             console.log(spot.innerHTML.length);
             if(spot.innerHTML.length == 0){
             spot.innerHTML = "";
             if(value.extract.length > 150){
                 spot.innerHTML = "<a href ="+linkinfo+">"+spot.innerHTML+value.extract.substring(0,147)+"..."+"</a>";}
             else {
                 spot.innerHTML = "<a href ="+linkinfo+">"+value.extract+"</a>"; }} else {
                 spot.innerHTML = "";
                 }
           });
        }
    });
  }
});
