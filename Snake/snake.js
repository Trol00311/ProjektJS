window.addEventListener("load", () => {
	let snake, move, nextMove, apple, running, score
	const canv = document.getElementById("snake").getContext("2d")
	setDefault()
	addEventListener()
	setInterval(renderFrame, 100) // poruszanie się sneka co 100ms

	function setDefault() {
		// utworzenie początkowego stanu gry
		snake = [{ x: 10, y: 10 }]
		;[move, nextMove] = Array(2).fill({ x: 0, y: 0 })
		score = 0
		running = false
		apple = generateAppleLocation()
	}

	function addEventListener() {
		// nasłuchiwanie na wciśnięcia przycisku
		window.addEventListener("keydown", e => {
			if (e.code.startsWith("Arrow")) {
				e.preventDefault() // anuluje zdażenie
				running = true // poruszanie się snakem rozpoczęte
			}
			switch (e.code) {
				case "ArrowLeft":
					nextMove = { x: -1, y: 0 }
					break
				case "ArrowRight":
					nextMove = { x: 1, y: 0 }
					break
				case "ArrowDown":
					nextMove = { x: 0, y: 1 }
					break
				case "ArrowUp":
					nextMove = { x: 0, y: -1 }
			}
		})
	}

	function generateAppleLocation() {
		// generowanie punktów
		let location
		do {
			location = { x: generateRandomNumber(19), y: generateRandomNumber(19) }
		} while (
			snake.filter(square => square.x === location.x && square.y === location.y)
				.length > 0
		)
		return location
	}

	function generateRandomNumber(max) {
		return Math.floor(Math.random() * (max + 1))
	}

	function renderFrame() {
		if (running) {
			if (nextMove.x !== -move.x || nextMove.y !== -move.y) {
				move = nextMove // zmiana kierunku
			}
			snake.push({
				// widok poruszania sie
				x: processWall(head().x + move.x),
				y: processWall(head().y + move.y),
			})
			if (
				//kolizja z wezem
				snake.filter(square => square.x === head().x && square.y === head().y)
					.length >= 2
			) {
				setDefault()
			} else {
				console.log(head())
				if (head().x === apple.x && head().y === apple.y) {
					score++
					apple = generateAppleLocation()
				}
				score <= 0 ? snake.shift() : score--
			}
		}

		canv.fillStyle = "black" //tlo czarne
		canv.fillRect(0, 0, canv.canvas.width, canv.canvas.height)
		canv.fillStyle = "yellow" //waz zolty
		snake.forEach(square => canv.fillRect(square.x * 20, square.y * 20, 18, 18)) // Utworzenie węża 18x18 na srodku
		canv.fillStyle = "red" // jablko czerwone
		canv.fillRect(apple.x * 20, apple.y * 20, 18, 18) // utworzenie jablka 18x18
	}

	function head() {
		//wyznaczenie glowy
		return snake[snake.length - 1]
	}

	function processWall(xOrY) {
		//przechodzenie przez ściany
		if (xOrY > 19) {
			return 0
		} else if (xOrY < 0) {
			return 19
		}
		return xOrY
	}
})
