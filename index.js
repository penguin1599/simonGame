
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;


$(document).keypress(function(){
  if(!started){
    $("#title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);

  }

} 
else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("#title").text("Game Over! Press any key to restart.");
        startOver();
  }

}

function nextSequence(){
  userClickedPattern = [];
    level++;
    $("#title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   animatePress(randomChosenColour);
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");

setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}