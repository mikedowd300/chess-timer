var height = $('.white').css('width');
var innerHeight = $('.inner').css('width');
var modalHeight = (.85 * parseInt(height)) + 'px';
var pWidth = $('p').css('width');
var white = true;
var whiteInt;
var blackInt;
var gameOn = true;
var moveCount = 1;

$('.white').css('height', height);
$('.black').css('height', height);
$('.inner').css('height', innerHeight);
$('.inner').css('line-height', innerHeight);
$('.modal').css('height', modalHeight);
$('time-p').css('width', (parseInt(pWidth) + 40) + 'px' );

var minRayWhite = [];
var secRayWhite = [];
var minRayBlack = [];
var secRayBlack = [];
for(var i = 59; i >= 0; i--) { 
	secRayWhite[59 - i] = i;
	secRayBlack[59 - i] = i;
}

function startClock() {
	var minInit = parseInt($('p').text());
	var whiteDate = new Date();
	var blackdate = new Date();
	for(var i = minInit; i >= 0; i--){
		minRayWhite[minInit - i] = i;
		minRayBlack[minInit - i] = i;
	}
	$('.modal').css('display', 'none');
	$('h1').text($('p').text());
	tickWhite();
}

function endMove(whoPressedMe) {
	if(gameOn) {		
		if(white && whoPressedMe === 'white') {
			$('#move-count').css('visibility', 'visible').css('color', 'white').text(moveCount++);
			white = false;
			//console.log('\u2407');
			clearInterval(whiteInt);
			$('#whiteOutput').removeClass('active');
			$('#whiteOutput').addClass('paused');
			$('#blackOutput').removeClass('paused');
			$('#blackOutput').addClass('active');
			$('.white .inner').removeClass('innerGo');
			$('.white .inner').addClass('innerStop');
			$('.black .inner').removeClass('innerStop');
			$('.black .inner').addClass('innerGo');
			tickBlack();
		} else if(!white && whoPressedMe === 'black'){
			white = true;
			$('#move-count').text(moveCount++).css('color', 'black');
			//console.log('\u2407');
			clearInterval(blackInt);
			$('#blackOutput').removeClass('active');
			$('#blackOutput').addClass('paused');
			$('#whiteOutput').removeClass('paused');
			$('#whiteOutput').addClass('active');
			$('.black .inner').removeClass('innerGo');
			$('.black .inner').addClass('innerStop');
			$('.white .inner').removeClass('innerStop');
			$('.white .inner').addClass('innerGo');
			tickWhite();
		}
	}
}

//looks like refactoring can remove a lot of code if I add some patameters to my functions
function tickBlack() {
	blackInt = setInterval(function(){
		oneSecond();
	}, 1000)	
}

function tickWhite() {
	whiteInt = setInterval(function(){
		oneSecond();
	}, 1000)
}

function moreTime() {
	var minutes = getMinutes() + 1;	
	$('p').text(minutes + ':00');
}

function lessTime() {
	var minutes = getMinutes() - 1;
	if(minutes < 1) minutes = 1;
	$('p').text(minutes + ':00');
}

function getMinutes() {
	return parseInt($('p').text());
}

function oneSecond() {
	var secRay = secRayBlack.slice(0);
	var minRay = minRayBlack.slice(0);
	if(white) {
		secRay = secRayWhite.slice(0);
		minRay = minRayWhite.slice(0);
	}
	var sec = secRay.shift();
	secRay.push(sec);
	if (sec === 59) minRay.shift();	
	if (minRay.length !== 0) { 
		if(minRay[0] > 100) {
			$('h1').css('font-size', '100px');
		}else {
			$('h1').css('font-size', '150px');
		}
		if(sec < 10) sec = '0' + sec;	
		$('h1.active').text(minRay[0] + ':' + sec);
		if(white) {
			secRayWhite = secRay.slice(0);
			minRayWhite = minRay.slice(0);
		} else {
			secRayBlack = secRay.slice(0);
			minRayBlack = minRay.slice(0);
		}	
	} else {
		$('h1.active').css('font-size', '50px').text('You Lose!!' + '\u0007');
		gameOn = false;
	}
}

