//TODO:Stopwatch vars
var times = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
};

var display = document.querySelector('[format="stopwatch"]');
var swButtons = document.querySelectorAll('[parent="stopwatch"]');
var running;
var start;
var paused = true;

//TODO:Timer vars
var timerDisplay = document.querySelector('[format="timer"]');
var timerButtons = document.querySelectorAll('[parent="timer"]');
var counting;
var finish;
var countInput = {
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
};
var originalInput;

//Dark mode
var darkMode = document.querySelector('#dark-mode');

if(localStorage.getItem("theme") == "dark"){
    document.querySelector(":root").classList.add("dark")
    darkMode.innerHTML = "light_mode";
}


darkMode.addEventListener("click", (e) =>{
    if(localStorage.getItem("theme") == "dark"){
        localStorage.setItem("theme", "light");
        document.querySelector(":root").classList.remove("dark")
        darkMode.innerHTML = "dark_mode";
    }else{
        localStorage.setItem("theme", "dark");
        document.querySelector(":root").classList.add("dark")
        darkMode.innerHTML = "light_mode";
    }
    
});


//hoverable columns

var checkStopwatch = document.querySelectorAll('[check="stopwatch"]')
var checkTimer = document.querySelectorAll('[check="timer"]')


checkStopwatch.forEach(function(e) {
    e.addEventListener('mouseover', function() {
        var columnElements = document.querySelectorAll('[column="' + e.getAttribute('column') + '"]');
        columnElements.forEach(function(d) {
            d.classList.add('hovered');
        });
    });
    e.addEventListener('mouseout', function() {
        var columnElements = document.querySelectorAll('[column="' + e.getAttribute('column') + '"]');
        columnElements.forEach(function(d) {
            d.classList.remove('hovered');
        })
    })
});

checkTimer.forEach(function(e) {
    e.addEventListener('mouseover', function() {
        var columnElements = document.querySelectorAll('[column="' + e.getAttribute('column') + '"]');
        columnElements.forEach(function(d) {
            d.classList.add('hovered');
        });
    });
    e.addEventListener('mouseout', function() {
        var columnElements = document.querySelectorAll('[column="' + e.getAttribute('column') + '"]');
        columnElements.forEach(function(d) {
            d.classList.remove('hovered');
        })
    })
});

//TODO: Make the stopwatch work

function padZero(time){
    return time < 10 ? "0" + time : time
}

function startStopwatch(){
    let now = new Date().getTime();
    let diff = now - start;
    if(diff/3600000 > 1){
        times.hour = Math.floor(diff/3600000);
        diff -= times.hour * 3600000;
    }
    if(diff/60000 > 1){
        times.minute = Math.floor(diff/60000);
        diff -= times.minute * 60000;
    }
    if(diff/1000 > 1){
        times.second = Math.floor(diff/1000);
        diff -= times.second * 1000;
    }

    display.innerHTML = padZero(times.hour) + ":" + padZero(times.minute) + ":" + padZero(times.second) + ":" + padZero(diff);
}

function runSW(){
    var startButton = document.querySelector('#start[parent="stopwatch"]');
    if(startButton.innerHTML == "play_arrow"){
        paused = false;
        if(display.innerHTML == "00:00:00:000"){
            start = new Date().getTime();
        }
        startButton.innerHTML = "pause";
        running = setInterval(startStopwatch, 10);
    }else{
        paused = true;
        startButton.innerHTML = "play_arrow";
        clearInterval(running);
    }
}

function reset(){
    if(running){
        var startButton = document.querySelector('#start[parent="stopwatch"]');
        clearInterval(running);
        startButton.innerHTML = "play_arrow";
    }
    if(!paused){
        paused = true;
    }
    display.innerHTML = "00:00:00:000";
    times = {
        hour: 0,
        minute: 0,
        second: 0
    }
    document.querySelector('.laps__list').innerHTML = "";
}

function makeTimer(){
    clearInterval(running);
    document.querySelector('#start[parent="stopwatch"]').innerHTML = "play_arrow";
    display.innerHTML = "00:00:00:000";
    times = {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    }
    
    originalInput = undefined;
    paused = true;
    document.querySelector('.timer').classList.add('active');
    document.querySelector('.stopwatch').classList.remove('active');
}

swButtons.forEach(function(e){
    e.addEventListener('click', function(){
        switch(e.id){
            case 'start':
                runSW();
                break;
            case 'reset':
                reset();
                break;
            case 'laps':
                if (!paused) document.querySelector('.laps__list').innerHTML += `<li>${display.innerHTML}</li>`
                break;
            case 'timer':
                makeTimer();
                break;
            default:
                break;
        }
    })
});
//FIXME: Stopwatch ends

//TODO: Make the timer work


function updateTimer(){
    var now = new Date().getTime();
    var startButton = document.querySelector('#start[parent="timer"]');
    var diff = finish - now;
    if (diff <= 0) {
        alert("Lejárt az idő!");
        startButton.innerHTML = "play_arrow";
        clearInterval(counting);
        originalInput = undefined;
        timerDisplay.innerHTML = "00:00:00:000";
        return;
    }
    if(diff/3600000 > 1){
        countInput.hour = Math.floor(diff/3600000);
        diff -= countInput.hour * 3600000;
    }else{
        countInput.hour = 0;
    }
    if(diff/60000 > 1){
        countInput.minute = Math.floor(diff/60000);
        diff -= countInput.minute * 60000;
    }else{
        countInput.minute = 0;
    }
    if(diff/1000 > 1){
        countInput.second = Math.floor(diff/1000);
        diff -= countInput.second * 1000;
    }else{
        countInput.second = 0;
    }
    timerDisplay.innerHTML = padZero(countInput.hour) + ":" + padZero(countInput.minute) + ":" + padZero(countInput.second) + ":" + padZero(diff%1000);
}

function setCountInput(){
    let hours = parseInt(document.getElementById('hours').value);
    let minutes = parseInt(document.getElementById('minutes').value);
    let seconds = parseInt(document.getElementById('seconds').value);
    let milliseconds = parseInt(document.getElementById('milliseconds').value);
    countInput = {
        hour: hours ? hours : 0,
        minute: minutes ? minutes : 0,
        second: seconds? seconds : 0,
        millisecond: milliseconds? milliseconds : 0
    }
}

function startTimer(){
    var startButton = document.querySelector('#start[parent="timer"]');
    console.log(typeof(document.querySelector('input[name=seconds]').value));
    if(originalInput == undefined){
        setCountInput();
        originalInput = JSON.stringify(countInput);
    }
    
    if(startButton.innerHTML == "play_arrow"){
        finish = new Date().getTime() + countInput.hour * 3600000 + countInput.minute * 60000 + countInput.second * 1000 + countInput.millisecond;
        counting = setInterval(updateTimer, 10);
        startButton.innerHTML = "pause";
    }else{
        clearInterval(counting);
        startButton.innerHTML = "play_arrow";
    }
}

function resetTimer(){
    countInput = JSON.parse(originalInput);
    finish = new Date().getTime() + countInput.hour * 3600000 + countInput.minute * 60000 + countInput.second * 1000 + countInput.millisecond;
}

function makeZero(){
    clearInterval(counting);
    document.querySelector('#start[parent="timer"]').innerHTML = "play_arrow";
    countInput = {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    };
    originalInput = undefined;
    timerDisplay.innerHTML = "00:00:00:000";
}

function makeStopwatch(){
    clearInterval(counting);
    document.querySelector('#start[parent="timer"]').innerHTML = "play_arrow";
    countInput = {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    }
    originalInput = undefined;
    timerDisplay.innerHTML = "00:00:00:000";
    display.innerHTML = "00:00:00:000";
    times = {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    }
    document.querySelector('.timer').classList.remove('active');
    document.querySelector('.stopwatch').classList.add('active');
}

timerButtons.forEach(function(e){
    e.addEventListener('click', function(){
        switch(e.id){
            case 'start':
                startTimer();
                break;
            case 'reset':
                resetTimer();
                break;
            case 'zero':
                makeZero();
                break;
            case 'stopwatch':
                makeStopwatch();
                break;
            default:
                break;
        }
    });
});

//FIXME: Timer ends