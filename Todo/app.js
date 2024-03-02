var dark_mode = document.querySelector(".dark-mode-button")


dark_mode?.addEventListener("click", () =>{
    localStorage.setItem("theme", localStorage.getItem("theme") == "dark" ? "light" : "dark")
    if(localStorage.getItem("theme") == "dark"){
        document.querySelector(":root").classList.add("dark")
    }else{
        document.querySelector(":root").classList.remove("dark")
    }
})

//TODO: Create elements for list
var mtTitle = document.querySelector("input[name=title]")
var mtDescription = document.querySelector("input[name=description]")
var mtButton = document.querySelector(".make-todo-button")
let list= localStorage.getItem("todolist")? JSON.parse(localStorage.getItem("todolist")) : [];
var todos = document.querySelector(".todos")

renderTodos();

mtButton.addEventListener("click", (e) =>{
    var hasNoOther = true;
    var index = 0
    if(mtTitle.value != "" && mtDescription.value != ""){
        for(var i = 0; i < list.length; i++){
            if(mtTitle.value == list[i].title){
                alert("Már van ilyen nevű tétel");
                hasNoOther = false;
                break;
            }
            index++;
        }
        if(hasNoOther){
            list.push({
                title: mtTitle.value,
                description: mtDescription.value,
                index: index
            })
        }

    }else if(mtDescription.value != ""){
        for(var i = 0; i < list.length; i++){
            if(mtDescription.value == list[i].description){
                alert("Már van ilyen tétel");
                hasNoOther = false;
                break;
            }
            index++;
        }
        if(hasNoOther){
            list.push({
                title: mtTitle.value,
                description: mtDescription.value,
                index: index
            })
        }
    }else{
        alert("Nincs megadva a leírás");
    }
    renderTodos();
})

function renderTodos(){
    localStorage.setItem("todolist", JSON.stringify(list));
    todos.innerHTML = ""
    for(var i = 0; i < list.length; i++){
        todos.innerHTML += 
        `
        <div class="todo-element">
            <h2>${list[i].title}</h2>
            <p>${list[i].description}</p>
            <button class="deleteButton">Törlés</button>
            <button class="editButton">Szerkesztés</button>
        </div>
        `;
    }
    addButtonEvents();
}

function addButtonEvents(){
    var deleteButtons = document.querySelectorAll(".deleteButton")
    var editButtons = document.querySelectorAll(".editButton")
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", (e) =>{
            deleteTodo(list[i]);
        })
        editButtons[i].addEventListener("click", (e) =>{
            editTodo(list[i]);
        })
    }
}

//TODO: Delete elements from list
function deleteTodo(listElement){
    for(let i = 0; i < list.length; i++){
        if(list[i] == listElement){
            list.splice(i, 1);
        }
    }
    renderTodos();
}

//TODO: Edit elements from list
var floatingEditor = document.querySelector(".floating-editor")
var editorTitle = document.querySelector(".editor-title")
var editorDescription = document.querySelector(".editor-description")
var editorSave = document.querySelector(".editor-save")
var editorCancel = document.querySelector(".editor-cancel")

function editTodo(listElement){
    editorTitle.innerHTML = listElement.title != "" ? listElement.title : "Tétel szerkesztése";
    editorDescription.value = listElement.description
    editorSave.addEventListener("click", (e) =>{
        saveElement(listElement, editorDescription.value);
        floatingEditor.classList.remove("active");
        renderTodos();
    })
    editorCancel.addEventListener("click", (e)=>{
        console.log("cancel")
        floatingEditor.classList.remove("active");
    })
    floatingEditor.classList.add("active");
}

function saveElement(listElement, desc){
    for(let i = 0; i < list.length; i++){
        if(list[i].index == listElement.index){
            list[i].description = desc;
        }
    }

}