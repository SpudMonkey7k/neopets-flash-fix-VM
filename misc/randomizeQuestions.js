function randomizeAnswer() {
	for (var rX = 1;  rX <= 8; rX++) {
		var select = document.getElementById('ap' + rX);
		var items = select.getElementsByTagName('option');
		var index = Math.floor(Math.random() * (items.length-1)) + 1;

		select.selectedIndex = index;
	}
}
function randomizeQuestion() {
	for (var rX = 1;  rX <= 10; rX++) {
		var select = document.getElementById('ap' + rX);
		var items = select.getElementsByTagName('option');
		var index = Math.floor(Math.random() * (items.length-1)) + 1;

		select.selectedIndex = index;
	}
}
document.addEventListener('DOMContentLoaded', function() {
	randomizeQuestion();
	randomizeAnswer();
}, false);

// Minified
// function randomizeAnswer(){for(var e=1;e<=8;e++){var n=document.getElementById("ap"+e),o=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1))+1;n.selectedIndex=o}}function randomizeQuestion(){for(var e=1;e<=10;e++){var n=document.getElementById("ap"+e),o=Math.floor(Math.random()*(n.getElementsByTagName("option").length-1))+1;n.selectedIndex=o}}document.addEventListener("DOMContentLoaded",function(){randomizeQuestion(),randomizeAnswer()},!1);