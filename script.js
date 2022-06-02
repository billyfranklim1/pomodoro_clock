/**
 * Created by LEE on 2016/10/19.
 */

 $(document).ready(function () {
  var startButton = $("#btn-start");
  var resetButton = $("#btn-reset");
  var stopMusicButton = $("#btn-stop-music");
  // stopMusicButton.prop('disabled',true);

  //use this to resume session or break when user
  //stop then resume(start) the clock
  var sessionWasRunning = true;

  var isSessionStop = true;
  var isBreakStop = true;

  var resetSession = 1500;
  var resetBreak = 300;

  //user choice of session and break time

  var sessionTime = 1500;
  var breakTime = 300;

  var sessionOverMusic = new Howl({
      //edit this to the music you want to play
      // src: ['music/bensound-cute.mp3'],
      src: ['music/bensound-anewbeginning.mp3'],
      onend: function () {
          stopMusicButton.prop('disabled',true);
      }
  });

  var breakOverMusic = new Howl({
      //edit this to the music you want to play
      src: ['music/bensound-anewbeginning.mp3'],
      onend: function () {
          stopMusicButton.disabled = true;
      }
  });

  var sessionClock = $('.session-clock').FlipClock(sessionTime, {
      clockFace: 'MinuteCounter',

      countdown: true,
      autoStart: false,

      callbacks: {
          interval: function () {
              var sessionTime = sessionClock.getTime().time;
              if (sessionTime == 0) {
                  //set time again to offset the one second difference
                  breakClock.setTime(breakTime + 1);
                  breakClock.start();
                  isBreakStop = false;

                  isSessionStop = true;
                  sessionWasRunning = false;

                  playSessionOverMusic();

              } else if (breakTime == 0 && isBreakStop) {

                  //set time for display
                  breakClock.setTime(breakTime);
              }
          }
      }
  });

  var breakClock = $('.break-clock').FlipClock(breakTime, {
      clockFace: 'MinuteCounter',

      countdown: true,
      autoStart: false,

      callbacks: {
          interval: function () {
              var breakTime = breakClock.getTime().time;

              if (breakTime == 0) {

                  //set time again to offset the one second difference
                  sessionClock.setTime(sessionTime + 1);
                  sessionClock.start();
                  isSessionStop = false;
                  sessionWasRunning = true;

                  isBreakStop = true;

                  playBreakOverMusic();

              } else if (sessionTime == 0 && isSessionStop) {

                  //set time for display
                  sessionClock.setTime(sessionTime);
              }
          }
      }
  });

  /* Edit Time Section */

  $("#btn-reduce-session-minute").click(function () {
      changeSessionTime(-60);
  });

  $("#btn-increase-session-minute").click(function () {
      changeSessionTime(60);
  });

  $("#btn-reduce-session-second").click(function () {
      changeSessionTime(-1);
  });

  $("#btn-increase-session-second").click(function () {
      changeSessionTime(1);
  });

  function changeSessionTime(time) {
      if ((sessionTime + time >= 0) && (sessionTime + time <= 6000)) {
          stopAllClocks();
          sessionTime += time;
          sessionClock.setTime(sessionTime);
      }
  }

  $("#btn-reduce-break-minute").click(function () {
      changeBreakTime(-60);
  });

  $("#btn-increase-break-minute").click(function () {
      changeBreakTime(60);
  });

  $("#btn-reduce-break-second").click(function () {
      changeBreakTime(-1);
  });

  $("#btn-increase-break-second").click(function () {
      changeBreakTime(1);
  });

  function changeBreakTime(time) {
      if ((breakTime + time >= 0) && (breakTime + time <= 6000)) {
          stopAllClocks();
          breakTime += time;
          breakClock.setTime(breakTime);
      }
  }

  /* End Edit Time Section */

  startButton.click(function () {
      if (sessionWasRunning && isSessionStop) {
          sessionClock.start();
          startButton.text("Parar");

          isSessionStop = false;
      } else if (!sessionWasRunning && isBreakStop) {
          breakClock.start();
          startButton.text("Parar");

          isBreakStop = false;
      }else if(!isSessionStop){
          sessionClock.stop();
          startButton.text("Começar");

          isSessionStop = true;
          sessionWasRunning = true;
      }else if(!isBreakStop){
          breakClock.stop();
          startButton.text("Começar");

          isBreakStop = true;
          sessionWasRunning = false;
      }else{

      }

  });

  resetButton.click(function () {
      //stop the countdown when reset is clicked

      stopAllClocks();

      sessionTime = resetSession;
      breakTime = resetBreak;

      sessionClock.setTime(sessionTime);
      breakClock.setTime(breakTime);
  });

  stopMusicButton.click(function () {
      sessionOverMusic.stop();
      breakOverMusic.stop();

      $(this).prop("disabled",true);
  });

  function stopAllClocks() {
      sessionClock.stop();
      isSessionStop = true;

      breakClock.stop();
      isBreakStop = true;

      startButton.text("Começar");
  }

  function playSessionOverMusic() {
      stopMusicButton.prop('disabled',false);

      if (isSessionStop) {
          breakOverMusic.stop();
          sessionOverMusic.play();
      }
  }

  function playBreakOverMusic() {
      stopMusicButton.prop('disabled',false);

      if (isBreakStop) {
          sessionOverMusic.stop();
          breakOverMusic.play();
      }
  }


});

