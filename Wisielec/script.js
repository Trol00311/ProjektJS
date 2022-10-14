const letterContainer = document.getElementById("letterContainer")
const optionsContainer = document.getElementById("optionsContainer")
const userInputSection = document.getElementById("userInputSection")
const newGameContainer = document.getElementById("newGameContainer")
const newGameButton = document.getElementById("newGameButton")
const canvas = document.getElementById("canvas")
const resultText = document.getElementById("resultText")
//Options values for buttons
let options = {
	Owoce: [
		"Malina",
		"Brzoskwinia",
		"Mandarynka",
		"Gruszka",
		"Grejfrut",
		"Arbuz",
	],
	Zwierzeta: [
		"Pies",
		"Krokodyl",
		"Owca",
		"Baran",
		"Hipopotam",
		"Zebra",
		"Królik",
	],
	Panstwa: ["Polska", "Niemcy", "Szwajcaria", "Norwegia", "Szwecja", "Ukraina"],
}

let winLength = 0
let errors = 0
let chosenWord = ""

//Wyświetl przyciski
const optionsDisplay = () => {
	optionsContainer.innerHTML += `<h3>Wybierz kategorie</h3>`
	let buttonCon = document.createElement("div")
	for (let value in options) {
		buttonCon.innerHTML += `<button class="options" onclick="wordGenerate('${value}')">${value}</button>`
	}
	optionsContainer.appendChild(buttonCon)
}

//Blokuje przyciski
const block = () => {
	let optionsButtons = document.querySelectorAll(".options")
	let letterButtons = document.querySelectorAll(".letters")
	//Odblokowuje przyciski
	optionsButtons.forEach(button => {
		button.disabled = true
	})

	//Odblokowuje litery
	letterButtons.forEach(button => {
		button.disabled.true
	})
	newGameContainer.classList.remove("hide")
}

//Generator słów
const wordGenerate = optionValue => {
	let optionsButtons = document.querySelectorAll(".options")
	optionsButtons.forEach(button => {
		if (button.innerText.toLowerCase() === optionValue) {
			button.classList.add("active")
		}
		button.disabled = true
	})

	//Ukryj litery na początku
	letterContainer.classList.remove("hide")
	userInputSection.innerText = ""

	let optionArray = options[optionValue]
	//Wybierz losowe słowo
	chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)]
	chosenWord = chosenWord.toUpperCase()

	//Zamienia każdą litere na _
	let letterDisplay = chosenWord.replace(/./g, '<span class="dashes">_</span>')

	userInputSection.innerHTML = letterDisplay
}

//Start gry
const start = () => {
	winLength = 0
	errors = 0

	//Ustawienia początkowe
	userInputSection.innerHTML = ""
	optionsContainer.innerHTML = ""
	letterContainer.classList.add("hide")
	newGameContainer.classList.add("hide")
	letterContainer.innerHTML = ""

	//Tworzenie liter
	for (let i = 65; i < 91; i++) {
		let button = document.createElement("button")
		button.classList.add("letters")
		//65-91 to litery a-z
		button.innerText = String.fromCharCode(i)
		button.addEventListener("click", () => {
			let charArray = chosenWord.split("")
			let dashes = document.getElementsByClassName("dashes")
			//zastąp _ litera
			if (charArray.includes(button.innerText)) {
				charArray.forEach((char, index) => {
					if (char === button.innerText) {
						dashes[index].innerText = char
						winLength += 1
						//winlength = długosc słowa wygrałeś
						if (winLength == charArray.length) {
							resultText.innerHTML = `<h2 class='win-msg'>Wygrales :)</h2><p>Twoje slowo to: <span>${chosenWord}</span></p>`
							block()
						}
					}
				})
			} else {
				//Przegrałeś
				errors += 1
				drawMan(errors)
				if (errors == 6) {
					resultText.innerHTML = `<h2 class='lose-msg'>Przegrales :(</h2><p>Twoje slowo to: <span>${chosenWord}</span></p>`
					block()
				}
			}
			button.disabled = true
		})
		letterContainer.append(button)
	}

	optionsDisplay()
	//Utworzenie gry od nowa
	let { Drawing } = Creator()
	Drawing()
}

const Creator = () => {
	let context = canvas.getContext("2d")
	context.beginPath()
	context.strokeStyle = "#000"
	context.lineWidth = 2

	//Kreator rysowania lini
	const drawLine = (fromX, fromY, toX, toY) => {
		context.moveTo(fromX, fromY)
		context.lineTo(toX, toY)
		context.stroke()
	}

	//rysowanie szubienicy
	const Drawing = () => {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height)
		//Podłoga
		drawLine(10, 130, 130, 130)
		//lewa
		drawLine(10, 10, 10, 131)
		//górna
		drawLine(10, 10, 70, 10)
		//sznurek
		drawLine(70, 10, 70, 20)
	}

	const head = () => {
		context.beginPath()
		context.arc(70, 30, 10, 0, Math.PI * 2, true)
		context.stroke()
	}

	const body = () => {
		drawLine(70, 40, 70, 80)
	}

	const leftArm = () => {
		drawLine(70, 50, 50, 70)
	}

	const rightArm = () => {
		drawLine(70, 50, 90, 70)
	}

	const leftLeg = () => {
		drawLine(70, 80, 50, 110)
	}

	const rightLeg = () => {
		drawLine(70, 80, 90, 110)
	}

	return { Drawing, head, body, leftArm, rightArm, leftLeg, rightLeg }
}

//draw the man
const drawMan = errors => {
	let { head, body, leftArm, rightArm, leftLeg, rightLeg } = Creator()
	switch (errors) {
		case 1:
			head()
			break
		case 2:
			body()
			break
		case 3:
			leftArm()
			break
		case 4:
			rightArm()
			break
		case 5:
			leftLeg()
			break
		case 6:
			rightLeg()
			break
		default:
			break
	}
}

//Nowa Gra
newGameButton.addEventListener("click", start)
window.onload = start
