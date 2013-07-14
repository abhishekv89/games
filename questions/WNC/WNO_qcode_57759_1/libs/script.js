var questionInteractive;
var html='';
/* Constructor created */
function questionInteractive()
{
	this.language=getParameters['language'];
	this.x=0;
	
	if(typeof getParameters['qcode']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		//this.qcode=57900;
		$("#container").html("<h2><center>Parameter qcode Not Set</center></h2>");
		
	}
	else this.qcode=getParameters['qcode'];
}


questionInteractive.prototype.init = function() 
{

	interactiveObj. x=promptArr[interactiveObj.qcode].length;
	interactiveObj.bubblewidth=parseInt((interactiveObj.x*10)/9);
	
	$("#container").css('width','500px');
	$("#container").css('height',interactiveObj.bubblewidth+150);
	$("#replayButton").css('top',interactiveObj.bubblewidth+30);
	$("#replayButton").css('left','481px');
	
		$("#replayButton").hide();
	
	
	html=promptArr[interactiveObj.qcode];
	
	StartAnimation();
	window.setTimeout(function(){$('b').removeClass('dispNone');},800);
}

function showreplaybutton()
{
	
	$("#replayButton").show();
	//$("#replayButton").delay(1000).animate({'opacity':'1'},500);	
}

function StartAnimation()
{
	
	
	$('#callOut').animate({'width':'300px','height':interactiveObj.bubblewidth/2+40},1200,function(){
		$('#text1').html(html);
		
		showreplaybutton();
	
	});
}	

questionInteractive.prototype.replay=function()
{			
		$("#replayButton").hide();

		//$("#replayButton").delay(100).animate({'opacity':'0'},10);

			$('#callOut').css({'width':'0px','height':'0px'});
			$('#text1').html("");
			StartAnimation();	
			window.setTimeout(function(){$('b').removeClass('dispNone');},10);
			//replay=setTimeout("showreplaybutton();",1000);	
			//interactiveObj = new questionInteractive();	
			//interactiveObj.init();
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
