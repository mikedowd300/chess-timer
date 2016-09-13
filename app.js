var height = $('.white').css('width');
var innerHeight = $('.inner').css('width');
var modalHeight = (.85 * parseInt(height)) + 'px';
var pWidth = $('p').css('width');

$('.white').css('height', height);
$('.black').css('height', height);
$('.inner').css('height', innerHeight);
$('.inner').css('line-height', innerHeight);
$('.modal').css('height', modalHeight);
$('time-p').css('width', (parseInt(pWidth) + 40) + 'px' );

var secRay = [];
for(var i = 59; i >= 0; i--) {
	secRay[59 - i] = i;
}

function startClock() {
	var minRay = [];
	var minInit = parseInt($('p').text());
	var whiteDate = new Date();
	var blackdate = new Date();
	for(var i = minInit; i >= 0; i--){
		minRay[minInit - i] = i;
	}
	$('.modal').css('display', 'none');
	$('h1').text($('p').text());
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

function playNoteArray() { 
  var timeLength = 1000; 
  var totalTime = 0;
  n = 0;

  while( n < noteRay.length-1){
  playTimedNote = setTimeout(playSingleNote, totalTime + TimeLength);
  totalTime += noteTimeLength;     
  n++;
  }
}