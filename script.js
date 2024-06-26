// CODE FOR TIMER 
    $(document).ready(function(){
        var countS = 25;
        $("#session").html(countS);
        var countB = 5;
        $("#break").html(countB);
        var pos = "pomodoro";
        var countLama;
        var posLama;
        var count;
        $("#stats").html(pos);
        var clock = $(".timer").FlipClock(0, {
        countdown: true,
        clockFace: 'MinuteCounter',
        autoStart: false,
        callbacks: {
            interval: function(){
            if (clock.getTime() == 0){
                if (pos == "session"){
                clock.setTime(countB*60);
                clock.start();
                pos = "break";
                $("#stats").html(pos);
                } else if (pos == "break"){
                clock.setTime(countS*60);
                clock.start();
                pos = "session";
                $("#stats").html(pos);
                }
            }        
            }
        }
        })  
        //SESSION
        $("#sessInc").on("click", function(){
        if ($("#session").html() > 0){
            countS = parseInt($("#session").html());
            countS+=1;
            $("#session").html(countS);
            //clock.setTime(countS*60);
        }
        });
        $("#sessDec").on("click", function(){
        if ($("#session").html() > 1){
            countS = parseInt($("#session").html());
            countS-=1;
            $("#session").html(countS);
            //clock.setTime(countS*60);
        }
        });
        //BREAK not really needed 
        $("#breakInc").on("click", function(){
        if ($("#break").html() > 0){
            countB = parseInt($("#break").html());
            countB+=1;
            $("#break").html(countB);
        }    
        });
        $("#breakDec").on("click", function(){
        if ($("#break").html() > 1){
            countB = parseInt($("#break").html());
            countB-=1;
            $("#break").html(countB);
        }
        });  
        $("#start").on("click", function(){
        if (count != countS || clock.getTime()==0){
            clock.setTime(countS*60);
            pos="session";
            $("#stats").html(pos);
        } else {
            pos = posLama;
            $("#stats").html(pos);
        }
        count = countS;    
        clock.start();    
        });
        $("#stop").on("click", function(){
        clock.stop();
        countLama = clock.getTime();
        posLama = $("#stats").html();
        });
        $("#clear").on("click", function(){
        clock.stop();
        pos = "pomodoro";
        $("#stats").html(pos);
        clock.setTime(0);
        });
    });




// Make the DIV element draggable:
dragElement(document.getElementById("container-box"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// CODE FOR DUPLICATION BUTTON

$(document).ready(function () {
    var maxTimers = 14; // Maximum number of timers allowed
    var timerCount = 0; // Initial timer count
    var countS = 25; // Ensure this is set or fetched correctly

    $(".circle-button").on("click", function () {
        if (timerCount < maxTimers) {
            var newPomodoroWrapper = $(".pomodoro-wrapper").first().clone(); // Clone the container wrapper
            newPomodoroWrapper.find(".pomodoro").attr("id", "timer-" + timerCount); // Assign a unique ID to the cloned pomodoro
            newPomodoroWrapper.css({ top: "0", left: "0" }); // Reset the position of the cloned pomodoro
            $(".pomodoro-container").append(newPomodoroWrapper); // Append the cloned pomodoro container to the container

            // Initialize the FlipClock for the new pomodoro
            var newClock = newPomodoroWrapper.find(".timer").FlipClock({
                clockFace: "MinuteCounter",
                countdown: true,
                autoStart: false, // Set autoStart to false to prevent the clock from starting instantly
                callbacks: {
                    interval: function () {
                        if (newClock.getTime() === 0) {
                            // Ensure pos and countB are accessible and correctly set
                            var pos = newPomodoroWrapper.find("#stats").html(); // Fetch current status
                            if (pos === "session") {
                                newClock.setTime(countB * 60);
                                newClock.start();
                                pos = "break";
                            } else if (pos === "break") {
                                newClock.setTime(countS * 60);
                                newClock.start();
                                pos = "session";
                            }
                            newPomodoroWrapper.find("#stats").html(pos);
                        }
                    },
                },
            });

            // Bind event handler to the start button
            newPomodoroWrapper.find("#start").on("click", function() {
                console.log("Starting new timer with session length: " + countS); // Debugging
                newClock.setTime(countS * 60); // Set the time based on the current session length
                newClock.start(); // Start the clock
            });

        // Bind event handlers to the new buttons
        newPomodoroWrapper.find("#stop").on("click", function() {
          newClock.stop();
          countLama = newClock.getTime();
          posLama = newPomodoroWrapper.find("#stats").html();
        });

        newPomodoroWrapper.find("#clear").on("click", function() {
          newClock.stop();
          newClock.setTime(0);
          newPomodoroWrapper.find("#stats").html("pomodoro");
        });

        // Bind event handlers for session increment and decrement
        newPomodoroWrapper.find("#sessInc").on("click", function(){
          var sessionLength = parseInt(newPomodoroWrapper.find("#session").html());
          if (sessionLength > 0) {
            sessionLength += 1;
            newPomodoroWrapper.find("#session").html(sessionLength);
          }
        });

        newPomodoroWrapper.find("#sessDec").on("click", function(){
          var sessionLength = parseInt(newPomodoroWrapper.find("#session").html());
          if (sessionLength > 1) {
            sessionLength -= 1;
            newPomodoroWrapper.find("#session").html(sessionLength);
          }
        });

        // Make the new pomodoro container draggable
        dragElement(newPomodoroWrapper[0]);
  
        timerCount++; // Increment the timer count
      }
    });
});

const menuButton = document.getElementById('menuButton');

menuButton.addEventListener('click', function() {
  window.location.href = 'datasheet.html';
});
