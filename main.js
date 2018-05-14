// Global list items
const list = [
  {
    name:
      'Anim labore id esse velit est eu laboris excepteur deserunt sint laboris.',
    quantity: 1
  }
]

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

submitBtn.onclick = () => {
  //Close modal
  modal.style.display = 'none'

  //Add new item to the list
  list.push({
    name: formName.value,
    quantity: formQuantity.value
  })


  //Append item to the DOM list
  let htmlStr = `
    <div class='item item'>
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

  document.querySelector('.shopping-list').insertAdjacentHTML('beforeend', htmlStr)

  //Clear the input text
  formName.value = ''
  formQuantity.value = null
}

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

//Add function to delete button
const deleteButton = e => {
  e.currentTarget.parentNode.parentNode.remove()
}

//Add function to done button

const doneButton = e => {
  let item = e.currentTarget.parentNode.parentNode
  const name = item.children[1].textContent
  const quantity = item.children[2].textContent
  item.remove()

  const htmlStr = 
    `<div class="done-item">
      <div class="undone-container">
        <button class="undone-button">UNDONE</button>
      </div>
      <div class="done-item-name">${name}</div>
      <div class="done-quantity">${quantity}</div>
      <div class="delete-container">
        <button class="delete-button" onClick='deleteButton(event)'>DELETE</button>
      </div>
    </div>`
  
    setTimeout(document.querySelector('.done-list').insertAdjacentHTML('beforeend', htmlStr), 500000000)
}