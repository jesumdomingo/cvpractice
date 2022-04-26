var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".restart").click(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      $(".restart").fadeOut(100);
    }
  });

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Correct");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();},  1000);
            } 
    } else {
            console.log("Wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over")}, 200);

            var audio = new Audio ("sounds/wrong.mp3");
            audio.play();
            
            $("#level-title").text("Game Over, Press Restart To Retry");
            startOver();
    }
        
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(".restart").text("Restart").fadeIn(100);
}

function nextSequence() {

    // Levels
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

};

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed")}, 100);
}