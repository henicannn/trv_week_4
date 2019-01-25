var animateButton, buttonHolder, beenRun, topLeft, topRight, bottomLeft, bottomRight, leftAnim, rightAnim, blAnim, brAnim,imageHolder, mainWrapper, myDelay;

var idArray = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

function init() {	
	beenRun = false;
	myDelay = 0;
	animateButton = document.getElementById("playButton2");
	buttonHolder = document.getElementById("buttonHolder");
	mainWrapper = document.getElementById("wrapper");
	
	if (animateButton.addEventListener) {
		buttonHolder.addEventListener("click", setImages);
	} else {
		buttonHolder.onclick = setImages;
	}
	
	for (i=0; i<4; i++) {
		console.log("now setting all of set " + i);
		for (j=0; j<4; j++) {
			var newPuzzleImage = document.createElement("img");
			var idName = idArray[j] + i;
			newPuzzleImage.id = idName;
			newPuzzleImage.src = "images/" + idName + ".jpg";
			newPuzzleImage.classList.add("initialScale");
			newPuzzleImage.classList.add("makeMeAbsolute");
			newPuzzleImage.classList.add("blur");
			var randomX = getRandomArbitary(0, 500);
			var randomY = getRandomArbitary(0, 300);
			console.log("randoms: ", randomX, randomY);
			newPuzzleImage.style.left = randomX + "px"; 
			newPuzzleImage.style.top = randomY + "px"; 
			newPuzzleImage.style.opacity = Math.floor((Math.random() * 100)) / 100;
			mainWrapper.appendChild(newPuzzleImage);
			console.log(idName);
			console.log("opacity: ", newPuzzleImage.style.opacity); 
		}	
	}
}

function runAnim() {
	beenRun = true;	
	
	leftAnim = TweenMax.to(topLeft, 1, {delay:myDelay, css:{ scaleX:1, scaleY:1, opacity:1, left:102, top:68, zIndex:2}});
	leftAnim.play();
	rightAnim = TweenMax.to(topRight, 1, {delay:myDelay, css:{scaleX:1, scaleY:1, opacity:1, left:300, top:68, zIndex:2}});
	rightAnim.play();
	blAnim = TweenMax.to(bottomLeft, 1, {delay:myDelay, css:{scaleX:1, scaleY:1, opacity:1, left:102, top:200, zIndex:2}});
	blAnim.play();
	brAnim = TweenMax.to(bottomRight, 1, {delay:myDelay, css:{scaleX:1, scaleY:1, opacity:1, left:300, top:200, zIndex:2}});
	brAnim.play();
	
	myDelay = 1;
}

function setImages(e) {
	if (beenRun) {
		resetAnim();
	}
	
	topLeft = document.getElementById("topLeft" + e.target.id);
	topRight = document.getElementById("topRight" + e.target.id);
	bottomLeft = document.getElementById("bottomLeft" + e.target.id);
	bottomRight = document.getElementById("bottomRight" + e.target.id);
	
	toggleBlur();
	
	runAnim();
	
	setBackground(e.target.id);
}

function resetAnim() {
			console.log("resetAnim fired");
			toggleBlur();
			leftAnim.reverse();
			rightAnim.reverse();
			blAnim.reverse();
			brAnim.reverse();
			beenRun = false;
		}

function toggleBlur() {
	for (i=0; i<idArray.length; i++) {
		(window[idArray[i]]).classList.toggle("blur");
	}
	/*topLeft.classList.toggle("blur");
	topRight.classList.toggle("blur");
	bottomLeft.classList.toggle("blur");
	bottomRight.classList.toggle("blur");*/
}

function getRandomArbitary (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setBackground(target) {
	console.log("set background fired");
	var nextBackground = document.getElementById("bgImage2");
	nextBackground.src = "images/backGround" + target + ".jpg";
	
	var currentBackground = document.getElementById("bgImage");
	TweenMax.to(currentBackground, 1, {delay:myDelay, css:{opacity:0}, onComplete:srcFlip});
	
	function srcFlip() {
		console.log("srcFlip fired");
		currentBackground.src = nextBackground.src;
		currentBackground.style.opacity  = 1;
	}
}

window.onload = init;