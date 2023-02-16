const localStorageKey = 'to-do-list-gt'

function validateIfExistsNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById('input-new-task').value;
  let exists = values.find(x => x.name == inputValue)
  return !exists ? false : true

}

function newTask() {
  let input = document.getElementById('input-new-task');
  input.style.border = ""
  //validation
  if (!input.value) {
    input.style.border = "1px solid red"
    alert('digite algo em sua lista')
  }
  else if (validateIfExistsNewTask()) {
    alert('Já existe uma task com essa descrição')
  }
  else {
    // increment to localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
      name: input.value
    })
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
  }
  input.value = ''
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let list = document.getElementById('to-do-list')
  list.innerHTML = ''
  for (let i = 0; i < values.length; i++) {
    list.innerHTML += `<li>${values[i]['name']}<button id="btn-ok" onclick='removeItem("${values[i]['name']}")'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-check" viewBox="0 0 16 16">
  <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
</svg>
    </></li>`
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let index = values.findIndex(x => x.name == data)
  values.splice(index, 1)
  localStorage.setItem(localStorageKey, JSON.stringify(values))
  showValues()
}

showValues()