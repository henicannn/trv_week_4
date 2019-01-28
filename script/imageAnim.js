(() => {
	console.log('fired');
	window.addEventListener("load", changeHeadline);

	const theButton = document.querySelector("#buttonHolder img");

	function changeHeadline() {
		document.querySelector("h1").textContent = "Hey There from JS!";
		document.querySelector('p').textContent = "this is the subhead";
	}
	// set up the puzzle pieces and boards
	//
		theButton.addEventListener("click", changeHeadline);

}	)();
