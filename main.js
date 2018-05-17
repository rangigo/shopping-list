// Global list items
//If there are some local saves, initialize list with them
//else an empty new array
const list = localStorage.getItem('list')
  ? JSON.parse(localStorage.getItem('list'))
  : []
const doneList = localStorage.getItem('doneList')
  ? JSON.parse(localStorage.getItem('doneList'))
  : []

//Iterate through list to append new items to the DOM
;(() => {
  let htmlStr = ''

  for (let item of list) {
    htmlStr += `
      <div class='item'>
        <div class='check-box-container'>
          <input type="checkbox" name="check-box" onClick='doneButton(event)'>Done
          <span class="checkmark"></span>
        </div>
        <div contenteditable='true' onclick='editFunc(event)'>${item.name}</div>  
        <div contenteditable='true' onclick='editFunc(event, true)'>${
          item.quantity
        }</div>
        <div class='delete-container'>
          <button class='delete-button' onClick='deleteButton(event)'>DELETE</button>
        </div>
      </div>
      `
  }

  document
    .querySelector('.shopping-list')
    .insertAdjacentHTML('beforeend', htmlStr)

  htmlStr = ''
  for (let item of doneList) {
    htmlStr += `<div class="done-item">
    <div class="undone-container">
      <button class="undone-button" onClick='undoneButton(event)'>UNDONE</button>
    </div>
    <div class="done-item-name">${item.name}</div>
    <div class="done-quantity">${item.quantity}</div>
    <div class="delete-container">
      <button class="delete-button" onClick='deleteButtonDL(event)'>DELETE</button>
    </div>
  </div>`
  }

  document.querySelector('.done-list').insertAdjacentHTML('beforeend', htmlStr)
})()

//regex to check validation of quantity
const regex = /^[0-9]+$/

/*
Open/close Modal which is the Form
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
  //Validate quantity
  if (regex.test(formQuantity.value)) {
    if (
      list.findIndex(
        e => e.name == formName.value && e.quantity == formQuantity.value
      ) == -1
    ) {
      //Close modal
      modal.style.display = 'none'
      //Add new item to the list
      list.push({
        name: formName.value,
        quantity: formQuantity.value
      })
      //Append item to the DOM list
      let htmlStr = `
      <div class='item'>
        <div class='check-box-container'>
          <input type="checkbox" name="check-box" onClick='doneButton(event)'>Done
          <span class="checkmark"></span>
        </div>
        <div onfocusout='editFunc(event) keydown='enterKey(event)'>${
          formName.value
        }</div>
        <div onfocusout='editFunc(event, true) keydown='enterKey(event)''>${
          formQuantity.value
        }</div>
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

      //Save new list
      localStorage.setItem('list', JSON.stringify(list))
    } else alert('Duplicate item! Pls re-enter')
  } else alert('Invalid quantity. Please only enter positive value')
}

//Add function to delete button
const deleteButton = e => {
  let item = e.currentTarget.parentNode.parentNode
  const name = item.children[1].textContent
  const quantity = item.children[2].textContent
  item.remove()

  //Delete item from list
  list.splice(list.findIndex(e => e.name == name && e.quantity == quantity), 1)

  //Save new list
  localStorage.setItem('list', JSON.stringify(list))
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
  //Save new list
  localStorage.setItem('doneList', JSON.stringify(doneList))
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

  //Save lists to localStorage
  localStorage.setItem('list', JSON.stringify(list))
  localStorage.setItem('doneList', JSON.stringify(doneList))
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
      <div onfocusout='editFunc(event)'>${name}</div>
      <div onfocusout='editFunc(event)'>${quantity}</div>
      <div class='delete-container'>
        <button class='delete-button' onClick='deleteButton(event)'>DELETE</button>
      </div>
    </div>
  `

  document
    .querySelector('.shopping-list')
    .insertAdjacentHTML('beforeend', htmlStr)

  //Save lists to localStorage
  localStorage.setItem('list', JSON.stringify(list))
  localStorage.setItem('doneList', JSON.stringify(doneList))
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

//Edit items

const editFunc = (e, isQuantity) => {
  const name = e.target.parentNode.children[1].textContent
  const quantity = e.target.parentNode.children[2].textContent
  const index = list.findIndex(e => e.name == name && e.quantity == quantity)

  e.target.addEventListener('focusout', function func(e2) {
    if (isQuantity) {
      console.log(e2.target.textContent)
      if (regex.test(e2.target.textContent)) {
        //Get the object in the list correspond to the current target
        //and assign new value
        list[index].quantity = e2.target.textContent
      } else {
        alert('Please enter valid quantity (no negative number and text)')
        e2.target.textContent = list[index].quantity
      }
    } else {
      list[index].name = e2.target.textContent
    }

    //Save list
    localStorage.setItem('list', JSON.stringify(list))

    e.target.removeEventListener('focusout', func, false)
  })
}

document.querySelector('div[contenteditable]').keydown(function(e) {
  console.log('a')

  const key = e.keyCode || e.charCode // ie||others
  if (key == 13) {
    // if enter key is pressed
    e.preventDefault()
    e.currentTarget.blur()
    console.log('here')

    return false
  }
})
