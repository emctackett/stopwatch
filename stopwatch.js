var App = {
  hours: $('#hours'),
  minutes: $('#minutes'),
  seconds: $('#seconds'),
  centiseconds: $('#centiseconds'),
  startStopButton: $('#start_stop'),
  resetButton: function() {
    $('#reset').on('click', function(e) {
      e.preventDefault();
      this.reset();
    }.bind(this));
  },
  resetHours: function() {
    this.hours.text('00');
  },
  resetMinutes: function() {
    this.minutes.text('00');
  },
  resetSeconds: function() {
    this.seconds.text('00');
  },
  resetCentiseconds: function() {
    this.centiseconds.text('00');
  },
  formatNumber: function(num) {
    if (String(num).length === 1) {
      return '0' + num
    } else {
      return num;
    }
  },
  incrementSeconds: function() {
    var currentSecond = Number(this.seconds.text());
    var newSecond;

    if (currentSecond < 59) {
      newSecond = currentSecond += 1;
      this.seconds.text(this.formatNumber(newSecond));
    } else {
      this.resetSeconds();
      this.incrementMinutes();
    }
  },
  incrementMinutes: function() {
    var currentMinute = Number(this.minutes.text());
    var newMinute;

    if (currentMinute < 59) {
      newMinute = currentMinute += 1;
      this.minutes.text(this.formatNumber(newMinute));
    } else {
      this.resetMinutes();
      this.incrementHours();
    }
  },
  runClock: function() {
    this.intervalId = setInterval(function() {
      var newCentisecond;
      var currentCentisecond = Number(this.centiseconds.text());

      if (currentCentisecond < 99) {
        newCentisecond = currentCentisecond += 1
        this.centiseconds.text(this.formatNumber(newCentisecond));
      } else {
        this.resetCentiseconds();
        this.incrementSeconds();
      }
    }.bind(this), 10);
  },
  stopClock: function() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  zeroNumbers: function() {
    this.resetHours();
    this.resetMinutes();
    this.resetSeconds();
    this.resetCentiseconds();
  },
  displayStopButton: function() {
    this.startStopButton.text('Stop');
  },
  displayStartButton: function() {
    this.startStopButton.text('Start');
  },
  startStop: function() {
    this.startStopButton.on('click', function(e) {
      this.clockRunning = !this.clockRunning;

      if (this.clockRunning) {
        this.displayStopButton();
        this.runClock();
      } else {
        this.stopClock();
        this.displayStartButton();
      }
    }.bind(this));
  },
  reset: function() {
    this.stopClock();
    this.clockRunning = false;
    this.displayStartButton();
    this.zeroNumbers();
  },
  bind: function() {
    this.startStop();
    this.resetButton();
  },
  init: function() {
    this.reset();
    this.bind();
  },
};

App.init();
