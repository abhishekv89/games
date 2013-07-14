var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;

function questionInteractive() {

	if(typeof getParameters['number']=="undefined") {
		alert('Parameter needed: number'); 
		parameterMissing=true;
		return;
	}
	else this.number = getParameters['number'];	
	this.bundles = this.number/10;	
	extraParameters = "correctResponse="+ correctResponse + ",userResponse=" + userResponse;						
}

questionInteractive.prototype.init = function() {
	var html = '';
	if(parameterMissing == true) return;
	html+='<div id="content">';
	var i;	
	for(i=0; i< interactiveObj.bundles; i++){
			html+='<div id="pencil' + (i+1) + '" class="pencil" style="top: 0px; left: ' + (10 +  i*90 )+ 'px;"/>'; 
	}
	html+='</div>';

	html +='<div id=replayButton class="replay" onclick="interactiveObj.animate()">';
	
	$('#container').html(html);	
	$('#replayButton').css('left', i*90 + 30);
	interactiveObj.animate();
}

questionInteractive.prototype.animate = function() {
	$("#replayButton").css('opacity', '0');
	$(".pencil").css('opacity', '0');
	var i;
	for(i=0; i<interactiveObj.bundles;i++){
		$('#pencil' + (i+1)).delay(1000 + i*2000).animate({opacity: 1}, 2000);
	}
	$('#replayButton').delay(i*2000).animate({opacity:1}, 100);
	
}

function resize()
{ 
	if(window.innerHeight < 600) {
		scaleFactor = parseFloat(window.innerHeight/600); 
	} else if(window.innerWidth < 800) {
		scaleFactor = parseFloat(window.innerWidth/800);
	} else{
		scaleFactor = 1 ;									
	} 	
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});		
}