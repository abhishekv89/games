var interactiveObj;
var extraParameters="";
var html="";
var parameterMissing = false;

function questionInteractive()
{
	this.i=0;
    
	if(typeof getParameters['fadeparts']=="undefined")
	{
		alert('Parameter Missing'); 
		parameterMissing=true;
		$("#body").html("<h2><center>Parameter fadeparts Not Set</center></h2>");
		return;
	}
	else this.fadeparts = getParameters['fadeparts'];
} 
 
questionInteractive.prototype.init=function()
{
		
	interactiveObj.containerwidth=interactiveObj.imagewidth+50;
	interactiveObj.containerheight=interactiveObj.imageheight;
	
	html+='<div id="board" class="board"></div>';
	
	html+='<div id="c1" class="c1" ></div>';
	
	html+='<div id="c2" class="c2" ></div>';
	
	html+='<div id="c3" class="c3" ></div>';
		
	html+='<div id="c4" class="c4" ></div>';
	
	html+='<div id="c5" class="c5" ></div>';
	
	html+='<div id="c6" class="c6" ></div>';
	
	html+='<div id="c7" class="c7" ></div>';
	
	html+='<div id="c8" class="c8" ></div>';
	
	html+='<div id="c9" class="c9" ></div>';
	
	html+='<div id="c10" class="c10" ></div>';
	
	
	html +='<div id="replayButton" onclick="interactiveObj.animate()"></div>';
	
	$('#replayButton').css({'left':interactiveObj.containerwidth});
	$("#container").html(html);
	$("#container").css({'width':this.containerwidth,'height':this.containerheight});
	
	fadetimeout=setTimeout("interactiveObj.fadechocolate();",2000);
}


questionInteractive.prototype.fadechocolate=function()
{
	interactiveObj.fade=parseInt(interactiveObj.fadeparts);
	
	
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.fade;interactiveObj.i++)
	{
	
		$('#c' + (interactiveObj.i)).delay(100 + interactiveObj.i*300).animate({
				opacity: 0.2
			}, 200);
	
	}clearTimeout(fadetimeout);
	
		
		buttonappear=setTimeout("interactiveObj.buttonappear();",interactiveObj.fade*400);
		
		
}

questionInteractive.prototype.buttonappear=function()
{
	$('#replayButton').animate({
			opacity:1
		}, 1500);
		
		clearTimeout(buttonappear);
}


questionInteractive.prototype.animate=function()
{

	$("#replayButton").css('opacity', '0');

	clearTimeout(fadetimeout);
	html="";
	
	 interactiveObj = new questionInteractive();
        interactiveObj.loadimage();  		
	
	
	
}




questionInteractive.prototype.loadimage=function()
{
	
	var img=new Image();
	img.src="../assets/bg.png";
	img.onload=function()
	{
		interactiveObj.imagewidth=this.width;
		interactiveObj.imageheight=this.height;
	 
		interactiveObj.init();
	}
	
}
function resize()
{ 
	if(window.innerHeight < $("#container").height()) {
		scaleFactor = parseFloat(window.innerHeight/$("#container").height()); 
	} else if(window.innerWidth < $("#container").width()) {
		scaleFactor = parseFloat(window.innerWidth/$("#container").width());
	} else{
		scaleFactor = 1 ;									
	} 	
	$("#container").css({
			"-webkit-transform": "scale("+scaleFactor+")"
		});
	$("#container").css({
			"-moz-transform": "scale("+scaleFactor+")"
		});	
	$("#container").css({
			"-o-transform": "scale("+scaleFactor+")"
		});	
	$("#container").css({
			"-ms-transform": "scale("+scaleFactor+")"
		});	
	$("#container").css({
			"transform": "scale("+scaleFactor+")"
		});	 
}