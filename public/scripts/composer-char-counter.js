$(document).ready(function(){

  //txtarea where you post tweet function
  $(".new-tweet > form > textarea").on( "keyup", function() {
    var txtar = $(".new-tweet > form > textarea");
    console.log(txtar.val());

  //counter function
    var counter = txtar.siblings(".counter");
    var leng = txtar.val().length;
    var numchar = (140 - leng);
    counter.text(numchar);
    if (numchar < 0 ) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  })

}); //end of ready function