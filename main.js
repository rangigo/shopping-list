// Global list items
const list = []
const doneList = []

/*
Open/close Modal which is the Form
Submitting item
*/

const addButton = document.querySelector('.add-button')
const modal = document.querySelector('.my-form')
const closeModal = document.querySelector('.close')
const submitBtn = document.querySelector('.submit-button')
const formName = document.querySelector('#form-name')
const formQuantity = document.querySelector('#form-quantity')

addButton.onclick = () => {
  modal.style.display = 'block'
}

window.onclick = e => {
  if (e.target == modal) modal.style.display = 'none'
}

closeModal.onclick = () => {
  modal.style.display = 'none'
}

//Submit new item
submitBtn.onclick = () => {
  //Close modal
  modal.style.display = 'none'

  //Add new item to the list
  list.push({
    name: formName.value,
    quantity: formQuantity.value
  })
  console.log(list)
  //Append item to the DOM list
  let htmlStr = `
    <div class='item'>
      <div class='check-box-container'>
        <input type="checkbox" name="check-box" onClick='doneButton(event)'>Done
        <span class="checkmark"></span>
      </div>
      <div>${formName.value}</div>
      <div>${formQuantity.value}</div>
      <div class='delete-container'>
        <button class='delete-button' onClick='deleteButton(event)'>DELETE</button>
      </div>
    </div>`

  document
    .querySelector('.shopping-list')
    .insertAdjacentHTML('beforeend', htmlStr)

  //Clear the input text
  formName.value = ''
  formQuantity.value = null
}

/*
//Iterate through list to append new items to the DOM
const appendDOMList = () => {
  const shoppingList = document.querySelector('.shopping-list')
  let htmlStr = ''

  for (let item of list) {
    htmlStr += `
      <div class='item'>
        <div class='check-box-container'>
          <input type="checkbox" name="check-box" onClick='doneButton(event)'>Done
          <span class="checkmark"></span>
        </div>
        <div>${item.name}</div>
        <div>${item.quantity}</div>
        <div class='delete-container'>
          <button class='delete-button' onClick='deleteButton(event)'>DELETE</button>
        </div>
      </div>
      `
  }

  shoppingList.insertAdjacentHTML('beforeend', htmlStr)
}

appendDOMList()
*/

//Add function to delete button
const deleteButton = e => {
  let item = e.currentTarget.parentNode.parentNode
  const name = item.children[1].textContent
  const quantity = item.children[2].textContent
  item.remove()

  //Delete item from list
  list.splice(list.findIndex(e => e.name == name && e.quantity == quantity), 1)
  console.log(list)
  console.log(doneList)
}

//Add function to delete button of done list
const deleteButtonDL = e => {
  let item = e.currentTarget.parentNode.parentNode
  const name = item.children[1].textContent
  const quantity = item.children[2].textContent
  item.remove()

  //Delete item from list
  doneList.splice(
    doneList.findIndex(e => e.name == name && e.quantity == quantity),
    1
  )
}

//Add function to done button
const doneButton = e => {
  //get the item row
  let item = e.currentTarget.parentNode.parentNode
  //get the name and quantity
  const name = item.children[1].textContent
  const quantity = item.children[2].textContent

  //Delete item from list
  list.splice(list.findIndex(e => e.name == name && e.quantity == quantity), 1)

  //Add item to done list
  doneList.push({
    name: name,
    quantity: quantity
  })

  //remove the row from the shopping list
  item.remove()

  const htmlStr = `<div class="done-item">
      <div class="undone-container">
        <button class="undone-button" onClick='undoneButton(event)'>UNDONE</button>
      </div>
      <div class="done-item-name">${name}</div>
      <div class="done-quantity">${quantity}</div>
      <div class="delete-container">
        <button class="delete-button" onClick='deleteButtonDL(event)'>DELETE</button>
      </div>
    </div>`

  const doneDOMList = document.querySelector('.done-list')
  // append item to the done list
  doneDOMList.insertAdjacentHTML('beforeend', htmlStr)
  //re-adjust done list height to animate properly
  if (doneDOMList.style.maxHeight)
    doneDOMList.style.maxHeight = doneDOMList.scrollHeight + 'px'
}

//Add function to undone button
const undoneButton = e => {
  let item = e.currentTarget.parentNode.parentNode
  const name = item.children[1].textContent
  const quantity = item.children[2].textContent

  //Delete item from done list
  doneList.splice(
    doneList.findIndex(e => e.name == name && e.quantity == quantity),
    1
  )

  //Add item back to list
  list.push({
    name: name,
    quantity: quantity
  })

  item.remove()

  const htmlStr = `
    <div class='item'>
      <div class='check-box-container'>
        <input type="checkbox" name="check-box" onClick='doneButton(event)'>Done
        <span class="checkmark"></span>
      </div>
      <div>${name}</div>
      <div>${quantity}</div>
      <div class='delete-container'>
        <button class='delete-button' onClick='deleteButton(event)'>DELETE</button>
      </div>
    </div>
  `

  document
    .querySelector('.shopping-list')
    .insertAdjacentHTML('beforeend', htmlStr)
}

//Expand table function
document.querySelector('.expand').addEventListener('click', e => {
  e.target.classList.toggle('active')

  const panel = e.target.nextElementSibling
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px'
  }
})
