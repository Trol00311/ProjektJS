let todoInput, todoEdit
let errorInfo
let addBtn
let ulList
let popup, popupInfo, popupInput, popupAddBtn, popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	//pobieranie elementów
	todoInput = document.querySelector(".todo-input") //wpisywanie treści zadania
	errorInfo = document.querySelector(".error-info") // info o braku zadania
	addBtn = document.querySelector(".btn-add") // przycisk Add
	ulList = document.querySelector(".todolist ul") //lista zadań
	popup = document.querySelector(".popup") //popup
	popupInfo = document.querySelector(".popup-info") // tekst w popup
	popupInput = document.querySelector(".popup-input") //input w popup
	popupAddBtn = document.querySelector(".accept") //przycisk zatwierdz w popup
	popupCloseBtn = document.querySelector(".cancel") //przycisk zamknij w popup
}

const prepareDOMEvents = () => {
	//nasłuchiwanie
	addBtn.addEventListener("click", addnewTask)
	ulList.addEventListener("click", checkClick)
	popupCloseBtn.addEventListener("click", closePopup)
	popupAddBtn.addEventListener("click", changeToDo)
	todoInput.addEventListener("keyup", enterKeyCheck)
}

const addnewTask = () => {
	if (todoInput.value !== "") {
		const newTodo = document.createElement("li")
		newTodo.textContent = todoInput.value
		createToolsArea(newTodo)
		ulList.append(newTodo)

		errorInfo.textContent = ""
		todoInput.value = ""
	} else {
		errorInfo.textContent = "Wpisz treść zadania do wykonania"
	}
}

const createToolsArea = x => {
	const toolsPanel = document.createElement("div")
	toolsPanel.classList.add("tools")

	const completeBtn = document.createElement("button")
	completeBtn.classList.add("complete")
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement("button")
	editBtn.classList.add("edit")
	editBtn.textContent = "EDIT"

	const deleteBtn = document.createElement("button")
	deleteBtn.classList.add("delete")
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	x.append(toolsPanel)
	toolsPanel.append(completeBtn, editBtn, deleteBtn)
}

const checkClick = e => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed")
		e.target.classList.toggle("completed")
	} else if (e.target.matches(".edit")) {
		editToDo(e)
	} else if (e.target.matches(".delete")) {
		deleteTodo(e)
	}
}

const editToDo = e => {
	todoEdit = e.target.closest("li")
	popupInput.value = todoEdit.firstChild.textContent
	popup.style.display = "flex"
}

const closePopup = () => {
	popup.style.display = "none"
	popupInfo.textContent = ""
}

const changeToDo = () => {
	if (popupInput.value !== "") {
		todoEdit.firstChild.textContent = popupInput.value
		popup.style.display = "none"
		popupInfo.textContent = ""
	} else {
		popupInfo.textContent = "Musisz podać jakieś zadanie"
	}
}

const deleteTodo = e => {
	e.target.closest("li").remove()

	const allTodos = ulList.querySelectorAll("li")

	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście."
	}
}

const enterKeyCheck = e => {
	if (e.key === "Enter") {
		addnewTask()
	}
}

document.addEventListener("DOMContentLoaded", main)
