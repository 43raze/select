const selects = document.querySelectorAll('select')
const buttons = document.querySelectorAll('button')
const generatedItems = document.querySelectorAll('.generated-item')

selects.forEach((select, index) => {
  select.dataset.selectId = `select-${index + 1}`
  select.addEventListener('change', onChangeSelect)
})

buttons.forEach(button => {
  button.addEventListener('click', onButtonClickDeleteItem)
})

generatedItems.forEach(item => {
  item.addEventListener('click', onDivWrapperClick)
})

function onChangeSelect(e) {
  const selectedOption = e.target.value
  const selectId = e.target.dataset.selectId

  if (selectedOption) {
    renderItem(selectedOption, selectId)
    const selectedIndex = e.target.selectedIndex
    e.target.selectedIndex = 0
    e.target.remove(selectedIndex)
  }
}

function onButtonClickDeleteItem(e) {
  e.stopPropagation()
  const elDivWrapper = e.target.parentElement.parentElement
  elDivWrapper.remove()
}

function onDivWrapperClick(e) {
  renderTitle(e.currentTarget)
}

function renderTitle(elDivWrapper) {
  const h1Element = document.querySelector('h1')
  const textValue = elDivWrapper.querySelector('span').textContent
  const selectId = elDivWrapper.dataset.selectId
  h1Element.textContent = textValue + ' ' + (selectId ? selectId : '')
}

function renderItem(textValue, selectId) {
  const elDivContent = document.querySelector('.content')
  const elItem = generateItem(textValue, selectId)
  elDivContent.appendChild(elItem)
}

function generateItem(textValue, selectId) {
  const elDivWrapper = document.createElement('div')
  const elDivLeft = document.createElement('div')
  const elDivRight = document.createElement('div')
  const elSpan = document.createElement('span')
  const elButton = document.createElement('button')

  elSpan.textContent = textValue
  elButton.textContent = 'X'

  elDivWrapper.dataset.selectId = selectId
  elDivWrapper.classList.add('generated-item')
  elDivLeft.classList.add('gi-left-side')
  elDivRight.classList.add('gi-right-side')

  elButton.addEventListener('click', onButtonClickDeleteItem)
  elDivWrapper.addEventListener('click', onDivWrapperClick)

  elDivWrapper.appendChild(elDivLeft)
  elDivWrapper.appendChild(elDivRight)
  elDivLeft.appendChild(elSpan)
  elDivRight.appendChild(elButton)

  return elDivWrapper
}
