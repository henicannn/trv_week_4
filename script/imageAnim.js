(() => {
	// set up the puzzle pieces and boards
	let pieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	const piecesBoard = document.querySelector('.puzzle-pieces');
	const puzzleBoard = document.querySelector('.puzzle-board');
	const puzzleSelectors = document.querySelectorAll('#buttonHolder img');
	const dropZones = document.querySelectorAll('.drop-zone');

	function createPuzzlePieces(pictureIndex) {
		pieces.forEach((piece, index) => {
			// create a new puzzle piece (an image)
			let newPuzzleImage = `<img id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="puzzle piece" draggable>`;
			piecesBoard.innerHTML += newPuzzleImage;
		});

		// set the background image to the current puzzle
		puzzleBoard.style.backgroundImage = `url(images/backGround${pictureIndex}.jpg)`;

		initDrag();
	}

	function resetPuzzlePieces() {
		piecesBoard.innerHTML = "";

		createPuzzlePieces(this.dataset.puzzleindex);
	}

	// handle drag and drop
	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener('dragstart', function(e) {
				console.log('draggin...');
				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', function(e) {
			e.preventDefault();
			//e.dataTransfer.setData("text/plain", this.getAttribute('src'));
			e.dataTransfer.dropEffect = "move";
		});

		zone.addEventListener('drop', function(e) {
			e.preventDefault();
			console.log('you dropped sumpin on me!');
			let piece = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${piece}`));
		});
	});

	createPuzzlePieces(0);
})();
