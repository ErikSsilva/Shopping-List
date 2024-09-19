const addInput = document.querySelector("#item-add-input")
const addButton = document.querySelector("#addItem-button")
const listField = document.querySelector(".item-list")
const listItems = document.querySelectorAll("li")
const removeButton = document.querySelectorAll(".remove")
const alert = document.querySelector(".remove-alert")
let itemIndex = listItems.length

// Função para salvar os itens no localStorage
function saveItemsToLocalStorage() {
  let items = []
  document.querySelectorAll(".item-list li").forEach(item => {
    let label = item.querySelector("label").innerText
    items.push(label)
  })
  localStorage.setItem("items", JSON.stringify(items))
}

addButton.addEventListener('click', (event) => {
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
  
  if (addInput.value) {
    newLabel.innerText = addInput.value
  } else {
    return
  }

  newButton.append(newImg)

  newItem.classList.add("item")
  newItem.append(newInput, newLabel, newButton)
  listField.append(newItem)

  // Salvar itens no localStorage após adicionar
  saveItemsToLocalStorage()

  addInput.value = ""
  alert.classList.add("hidden")
})


// Função para carregar itens do localStorage
function loadItemsFromLocalStorage() {
  let storedItems = JSON.parse(localStorage.getItem("items"))

  if (storedItems) {
    storedItems.forEach((itemText, index) => {
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
      newLabel.innerText = itemText

      newButton.append(newImg)
      newItem.classList.add("item")
      newItem.append(newInput, newLabel, newButton)

      listField.append(newItem)
    })
  }
}

// Carregar os itens ao iniciar a página
window.addEventListener("DOMContentLoaded", loadItemsFromLocalStorage)


// Função para remover itens do localStorage
function removeItemFromLocalStorage(itemText) {
  let storedItems = JSON.parse(localStorage.getItem("items"))

  let updatedItems = storedItems.filter(item => item !== itemText)
  localStorage.setItem("items", JSON.stringify(updatedItems))
}

listField.addEventListener("click", (event) => {
  if (event.target && event.target.matches("li button img")) {
    let elTarget = event.target.parentElement.parentElement
    let label = elTarget.querySelector("label").innerText

    elTarget.remove()

    // Remover o item do localStorage
    removeItemFromLocalStorage(label)

    let countdown = 2000;
    alert.classList.remove("hidden")
    setTimeout(function () {
      alert.classList.add("hidden")
    }, countdown)
  }
})




