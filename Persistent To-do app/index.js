let items = [];
const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")
const storageKey = "items";

function renderItems(){
    itemsDiv.innerHTML = null; //removing everything that is inside itemsDiv

    for(const[idx, item] of Object.entries(items)){
        const container = document.createElement("div")
        container.style.marginBottom = "10px"

        const text = document.createElement("p")
        text.style.display = "inline"
        text.style.marginRight = "inline"
        text.textContent = item;

        const button = document.createElement("button")
        button.textContent ="Delete"
        button.onclick = () => removeItem(idx) //wrapping the call to the removeItem function in another funtion inorder not js to call it.

        container.appendChild(text)
        container.appendChild(button)
        
        itemsDiv.appendChild(container) 
    }
}

function loadItems(){
    const oldItems = localStorage.getItem(storageKey)
    if(oldItems) items = JSON.parse(oldItems) // Parse reads through oldItems and convert it to a js object: in this case to an array
    renderItems()
}

function saveItems(){
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems) 
}

function addItem(){
    const value = input.value;
    if(!value){
        alert("You can't add an empty item")
        return  // naked return
    }
    items.push(value)
    renderItems()
    input.value = ""
    saveItems()
}

function removeItem(idx){
    items.splice(idx, 1)    // removes 1 element at a specified index
    renderItems()
    saveItems()
}

document.addEventListener("DOMContentLoaded", loadItems)  //