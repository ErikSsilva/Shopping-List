const addInput = document.querySelector("#item-add-input")
const addButton = document.querySelector("#addItem-button")
const listField = document.querySelector(".item-list")
const listItems = document.querySelectorAll("li")
const removeButton = document.querySelectorAll(".remove")
const alert = document.querySelector(".remove-alert")
let itemIndex = listItems.length

console.log(itemIndex)

addButton.addEventListener('click', (event) =>{
  event.preventDefault()

  itemIndex++;
  let newItem = document.createElement("li")
  let newInput = document.createElement("input")
  let newLabel = document.createElement("label")
  let newButton = document.createElement("button")
  let newImg = document.createElement("img")

  newInput.setAttribute("type", "checkbox")
  newInput.setAttribute("id", `item-check${itemIndex}`)
  newLabel.setAttribute("for", `item-check${itemIndex}`)
  newImg.setAttribute("src", "./assets/icon-delete.svg")
  newImg.setAttribute("alt", "Remove item")
  
  if(addInput.value){
    newLabel.innerText = addInput.value
  }else{
    return
  }

  newButton.append(newImg)

  newItem.classList.add("item")
  newItem.append(newInput, newLabel, newButton)
  

  listField.append(newItem)
  addInput.value = ""
  alert.classList.add("hidden")
})

listField.addEventListener("click", (event) => {
  if(event.target && event.target.matches("li button img")){
    let elTarget = event.target.parentElement.parentElement
    elTarget.remove()


    alert.classList.remove("hidden")
    setTimeout(function(){
      alert.classList.add("hidden")}
      , 2000)
  }
})




