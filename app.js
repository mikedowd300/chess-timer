var height = $('.white').css('width');
var innerHeight = $('.inner').css('width');
var modalHeight = (.85 * parseInt(height)) + 'px';
var pWidth = $('p').css('width');
var white = true;
var int;

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
	// var minRay = [];
	var minInit = parseInt($('p').text());
	var whiteDate = new Date();
	var blackdate = new Date();
	for(var i = minInit; i >= 0; i--){
		minRayWhite[minInit - i] = i;
		minRayBlack[minInit - i] = i;
	}
	$('.modal').css('display', 'none');
	$('h1').text($('p').text());

	int = setInterval(function(){
		oneSecond();
	}, 1000)
}

function endMove() {
	console.log('endMove');
	if(white) white = false;
	clearInterval(int);

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
	if(sec < 10) sec = '0' + sec;	
	$('h1.active').text(minRay[0] + ':' + sec);
	if(white) {
		secRayWhite = secRay.slice(0);
		minRayWhite = minRay.slice(0);
	} else {
		secRayBlack = secRay.slice(0);
		minRayBlack = minRay.slice(0);
	}
}