var showPlayer = document.querySelector(".actualPlayer");
var zones = document.querySelectorAll(".zone");
var is_o_turn = true;
var restartingBoard = document.querySelector('.board').innerHTML;

var restart = document.getElementById("restart");



function checkZones(zonelist, s){
    for(var i = 0; i < zonelist.length; i++){
        if(zonelist[i].innerHTML != s){
            return false;
        }
    }
    return true;
}

function checkWinCondition(player, col, row){
    var reverse = 2;
    var forwardList = [];
    var reversedList = [];
    for(var i = 0; i < 3; i++){
        forwardList.push(document.querySelector('.zone[posx="'+i+'"][posy="'+i+'"]'))
        reversedList.push(document.querySelector('.zone[posx="'+i+'"][posy="'+reverse+'"]'))
        reverse--;
    }
    return checkZones(col, player) ||
        checkZones(row, player) ||
        checkZones(forwardList, player) ||
        checkZones(reversedList, player)
}

function fillBoard() {
    for (var i = 0; i < zones.length; i++) {
        zones[i].addEventListener("click", function (e) {
            if (e.target.value === "") {
                e.target.innerHTML = showPlayer.innerHTML;
                e.target.classList.add(showPlayer.innerHTML.toLowerCase())
                var theRow = document.querySelectorAll('.zone[posx="' + e.target.getAttribute('posx') + '"]')
                var theCol = document.querySelectorAll('.zone[posy="' + e.target.getAttribute('posy') + '"]')

                if (checkWinCondition(showPlayer.innerHTML, theCol, theRow)) {
                    document.querySelector(".board").innerHTML = ""
                    document.querySelector(".result").classList.add("active")
                    document.getElementById("result").innerHTML = showPlayer.innerHTML + " nyert!"
                } else {
                    is_o_turn = !is_o_turn;
                    showPlayer.classList.toggle("o");
                    showPlayer.classList.toggle("x");
                    showPlayer.innerHTML = is_o_turn ? "O" : "X";
                }
            }
        })
    }
}

restart.addEventListener("click", function (){
    document.querySelector(".result").classList.remove("active")
    document.querySelector(".board").innerHTML = restartingBoard;
    zones = document.querySelectorAll(".zone")
    is_o_turn = true
    showPlayer.classList.remove("x")
    showPlayer.classList.add("o")
    showPlayer.innerHTML = "O"

    fillBoard()
});

fillBoard()