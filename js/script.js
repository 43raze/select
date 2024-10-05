const listSelects = document.querySelectorAll('select')
const listButtonsDeleteItem = document.querySelectorAll('button')
const listItems = document.querySelectorAll('.generated-item')

listSelects.forEach(select => {
  select.addEventListener('change', onChangeSelect)
})

listButtonsDeleteItem.forEach(button => {
  button.addEventListener('click', onClickButtonDeleteItem)
})

listItems.forEach(item => {
  item.addEventListener('click', onClickDivItem)
})

function onChangeSelect(e) {
  const selectValue = e.target.value
  const selectId = e.target.id
  renderItem(selectValue, selectId)
  e.target.remove(e.target.selectedIndex)
  e.target.value = ''
}

function onClickButtonDeleteItem(e) {
  e.stopPropagation()

  const elDivWrapper = e.target.parentElement.parentElement
  const elSpan = elDivWrapper.querySelector('span')
  const text = elSpan.textContent
  const selectId = elDivWrapper.dataset.selectId

  renderSelect(selectId, text)
  elDivWrapper.remove()
}

function onClickDivItem(e) {
  const elDivItem = e.currentTarget
  const elSpan = elDivItem.querySelector('span')
  const selectId = elDivItem.dataset.selectId
  renderTitle(elSpan.textContent, selectId)
}

function renderTitle(textValue, selectId) {
  const elH1 = document.querySelector('h1')
  elH1.textContent = `${textValue} ${selectId || ''}`
}

function renderItem(textValue, selectId) {
  const elDivContent = document.querySelector('.content')
  const elItem = generateItem(textValue, selectId)
  elDivContent.appendChild(elItem)
}

function renderSelect(selectId, text) {
  const elSelect = document.getElementById(selectId)

  if (!elSelect) return null

  const nextValue =
    'my_value_' +
    (+text.replace('my_value_', '') + 1).toString().padStart(2, '0')

  const beforeOption = elSelect.querySelector(`[value="${nextValue}"]`)

  const option = generateOption(text)
  elSelect.insertBefore(option, beforeOption)
}

function generateItem(textValue, selectId) {
  const elDivItem = document.createElement('div')
  const elDivLeft = document.createElement('div')
  const elDivRight = document.createElement('div')
  const elSpan = document.createElement('span')
  const elButton = document.createElement('button')

  elSpan.textContent = textValue
  elButton.textContent = 'X'

  elDivItem.dataset.selectId = selectId
  elDivItem.classList.add('generated-item')
  elDivLeft.classList.add('gi-left-side')
  elDivRight.classList.add('gi-right-side')

  elButton.addEventListener('click', onClickButtonDeleteItem)
  elDivItem.addEventListener('click', onClickDivItem)

  elDivItem.appendChild(elDivLeft)
  elDivItem.appendChild(elDivRight)
  elDivLeft.appendChild(elSpan)
  elDivRight.appendChild(elButton)

  return elDivItem
}

function generateOption(text) {
  const elOption = document.createElement('option')
  elOption.textContent = text
  elOption.value = text
  return elOption
}
