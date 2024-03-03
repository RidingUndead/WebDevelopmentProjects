var displayValue = document.querySelector(".calc-display-value")
var displayInput = document.querySelector('#calc-display')
var buttons = document.querySelectorAll(".calc-button")
var keys;
var inputs = new XMLHttpRequest();

var darkMode = document.querySelector(".dark-mode-button")

if(localStorage.getItem("theme") == "dark"){
    document.querySelector(":root").classList.add("dark")
}

darkMode.addEventListener("click", () =>{
    localStorage.setItem("theme", localStorage.getItem("theme") == "dark" ? "light" : "dark")
    if(localStorage.getItem("theme") == "dark"){
        document.querySelector(":root").classList.add("dark")
    }else{
        document.querySelector(":root").classList.remove("dark")
    }
})

var replacements = [
    {
        key: "p",
        val: "^"
    },
    {
        key: "P",
        val: "√"
    },
    {
        key: "r",
        val: "√"
    },
    {
        key: "R",
        val: "^"
    }
]

inputs.onload = function(){
    if(this.readyState == 4 && this.status == 200){
        keys = this.responseXML.getElementsByTagName("input");
    }
}

inputs.open("GET", "inputs.xml", true);
inputs.send();


for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", (e) =>{
        makeAction(e.target);
    });
}

document.addEventListener("keydown", (e) =>{
    if(keys){
        for(let i = 0; i < keys.length; i++){
            if(keys[i].getAttribute("key") == e.key){
                if(document.activeElement != displayInput || keys[i].getAttribute("action") == "calculate" || keys[i].getAttribute("action") == "clear"){
                    makeAction(keys[i]);
                }
            }
        }
    }
});

displayInput.addEventListener("input", (e) =>{
    var isValidInput = false;
    for(let i = 0; i < replacements.length; i++){
        if(e.data == replacements[i].key){
            displayInput.value = displayInput.value.replace(e.data, replacements[i].val)
            isValidInput = true;
        }
    }
    if(!isValidInput){
        displayInput.value = displayInput.value.replace(e.data, "");
        for(let i = 0; i < keys.length; i++){
            if(keys[i].getAttribute("key") == e.data){
                makeAction(keys[i])
            }
        }
    }
})

function makeAction(button){
    var action = button.getAttribute("action");
    switch(action){
        case "write":
            displayInput.value += button.innerHTML;
            break;
        case "multiply":
            displayInput.value += "*";
            break;
        case "clear":
            displayInput.value = "";
            displayValue.innerHTML = "0";
            break;
        case "backspace":
            displayInput.value = displayInput.value.slice(0, -1);
            break;
        case "power":
            displayInput.value += "^";
            break;
        case "root":
            displayInput.value += "√";
            break;
        case "calculate":
            try{
                displayValue.innerHTML = eval(
                    displayInput.value.replace("^","**").replace("√","Math.sqrt")
                    );
            }catch(err){
                displayValue.innerHTML = "Error"
            }
        
    }
}
