var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;
var context;
var canvas;
var html="";
var alpha=0;
//var alpha1=1;
var xander=0;
var html2="";

function questionInteractive() 
{
	this.lineB=0;
	this.lineC=0;
	this.lineA=5;
	this.lineD=5;
	
	this.lineBB=0;
	this.lineCC=0;
	this.lineAA=5;
	this.lineDD=5;
	
	this.counter=0;
	
	
	var imageObj=new Image();
	var imagearrow=new Image();
	var imageObj1=new Image();
	
	
	
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.numberLanguage='english';
	}
	else this.numberLanguage =getParameters['numberLanguage'];
	
	/*if(typeof getParameters['language']=="undefined")
	{
		this.language='english';
	}
	else this.language =getParameters['language'];
	*/
	
	
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.init=function()
{
	loadXML("xml.xml",function(){
			start();
		});
		
	$('#replayButton').hide();	
	
	alpha=0;
	
	imageObj=new Image();

	imageObj.src="../assets/choco.png";
	imageObj.onload=function()
	{
	
		interactiveObj.imagewidth=this.width;
		interactiveObj.imageheight=this.height;
		
		
		
		context.drawImage(imageObj,0,0);
		context.drawImage(imageObj,93.5,0,93.5,48.5,93.5,0,93.5,48.5);
	
		
	}
	interactiveObj.start=0;
	stroke=setTimeout("interactiveObj.stroke();",3000);
	stroke1=setTimeout("interactiveObj.stroke1();",3000);
	stroke2=setTimeout("interactiveObj.stroke2();",3000);
	stroke3=setTimeout("interactiveObj.stroke3();",3000);
	
	
	
	fading=setTimeout("interactiveObj.fading();",6000);
}

questionInteractive.prototype.fading=function()
{
	
	
	if(alpha<0.4)
	{
		
		context.beginPath();
		
			
		context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
		context.fillRect(0,0,187,194);
	
		imageObj=new Image();
	
		imageObj.src="../assets/choco.png";
	
		imageObj.onload=function()
		{

			context.drawImage(imageObj,93.5,0,93.5,48.5,93.5,0,93.5,48.5);
		
		}
		context.fill()
		context.closePath();
		alpha+=0.09;
	
		fading=setTimeout("interactiveObj.fading();",100);
	}
	else
	{
		
		clearTimeout(fading);
	
		showfracation=setTimeout("interactiveObj.showfraction();",2000);	
				
		blinker=setTimeout("interactiveObj.blinker();",3500);
		
	}
	
}
questionInteractive.prototype.showfraction=function()
{
	
	interactiveObj.numerator=changeLanguage(1,interactiveObj.numberLanguage);
	interactiveObj.denominator=changeLanguage(8,interactiveObj.numberLanguage);

	context.beginPath();
	
	context.fillStyle='black';
	context.font = '20px Calibri';
	context.fillText(interactiveObj.numerator,228,20);
	
	context.lineWidth=2;
	
	context.moveTo(228,22);
	context.lineTo(240,22);		//fraction line
	
	context.moveTo(200,22);
	context.lineTo(220,22);		//arrow
	
	context.moveTo(200,22)
	context.lineTo(210,15);
	
	context.moveTo(200,22);
	context.lineTo(210,30);
	
	context.strokeStyle='black';
	context.stroke();
	
	context.fillText(interactiveObj.denominator,228,38);
	context.fillText(promptArr['t1'],245,27);
	
	
	context.fill();
	context.closePath();
	
	
}



questionInteractive.prototype.blinker=function()
{
	
	if(interactiveObj.counter%2==0 && interactiveObj.counter<=20)
	{
	
		imageObj=new Image();
	
		imageObj.src="../assets/choco.png";
	
		imageObj.onload=function()
		{

			context.drawImage(imageObj,93.5,0,93.5,48.5,93.5,0,93.5,48.5);
			
			blinker=setTimeout("interactiveObj.blinker();",200);
			interactiveObj.counter++;
		}
		
		
	}
	
	else if(interactiveObj.counter%2!=0 && interactiveObj.counter<=20)
	{

		context.beginPath();
		context.fillStyle='white';
		context.fillRect(93,0,96,interactiveObj.imageheight/4);
		context.fill();
		context.closePath();
		
		interactiveObj.counter++;
		
		blinker=setTimeout("interactiveObj.blinker();",200);
		
		
	}
	
	else
	{
		restoreimage=setTimeout("interactiveObj.restoreimage();",2000);	
		
	}
	

}	

	
questionInteractive.prototype.restoreimage=function()
{
		
		html2='<div id="dottedimage"></div>';
		html3='<div id="covered"></div>';
		
		$("#image").html(html2);
		//$("#cover").html(html3);
		
		
		
		$("#dottedimage").animate({'opacity':'1'},500);
	//	$("#covered").animate({'opacity':'1'},500);
		
		/*$('#replayButton').delay(1500).animate({
			opacity:1
		}, 100);
		*/
		
		$('#replayButton').show();
		
		context.beginPath();
		canvas.width=canvas.width;
		context.closePath();
}



questionInteractive.prototype.stroke=function()
{
	
	if(interactiveObj.lineB<(interactiveObj.imageheight-5))
	{
		
	
		context.beginPath();
		context.moveTo(interactiveObj.imagewidth/2,interactiveObj.lineB);
		interactiveObj.lineB+=4
		context.lineTo(interactiveObj.imagewidth/2,interactiveObj.lineB);
		context.lineWidth=3;
	
		context.strokeStyle="white";
		interactiveObj.lineB+=4;
		context.stroke();
		context.closePath();
	
		stroke=setTimeout("interactiveObj.stroke();",25);
	}
	else
	{
	
		clearTimeout(stroke);
	}
	
}
questionInteractive.prototype.stroke1=function()
{
	
	if(interactiveObj.lineA<(interactiveObj.imagewidth-5))
	{
		
		//alert("in here");
		context.beginPath();
		context.moveTo(interactiveObj.lineA,interactiveObj.imageheight/4);
	
		interactiveObj.lineA+=4;
	
		context.lineTo(interactiveObj.lineA,interactiveObj.imageheight/4);
	
		context.lineWidth=3;
	
		context.strokeStyle="white";
	
		interactiveObj.lineA+=4;
	
	
		context.stroke();
		context.closePath();
	
		stroke1=setTimeout("interactiveObj.stroke1();",50);
	}
	else
	{
		//alert("cleared");
		clearInterval(stroke1);
	}
	
	
}
questionInteractive.prototype.stroke2=function()
{
	
	if(interactiveObj.lineC<(interactiveObj.imagewidth-5))
	{
		
		//alert("in here");
		context.beginPath();
		context.moveTo(interactiveObj.lineC,interactiveObj.imageheight/2);
	
		interactiveObj.lineC+=4;
	
		context.lineTo(interactiveObj.lineC,interactiveObj.imageheight/2);
		context.lineWidth=3;
	
		context.strokeStyle="white";
		interactiveObj.lineC+=4;
		context.stroke();
		context.closePath();
	
		stroke2=setTimeout("interactiveObj.stroke2();",50);
	}
	else
	{
		//alert("cleared");
		clearInterval(stroke2);
		
		
	}
	
	
}



questionInteractive.prototype.stroke3=function()
{
	if(interactiveObj.lineD<(interactiveObj.imagewidth-5))
	{
		
		//alert("in here");
		context.beginPath();
		context.moveTo(interactiveObj.lineD,(interactiveObj.imageheight/4)*3);
		interactiveObj.lineD+=4
		context.lineTo(interactiveObj.lineD,(interactiveObj.imageheight/4)*3);
		context.lineWidth=3;
	
		context.strokeStyle="white";
		interactiveObj.lineD+=4;
		context.stroke();
		context.closePath();
	
		stroke3=setTimeout("interactiveObj.stroke3();",50);
	}
	else
	{
		//alert("cleared");
		clearInterval(stroke3);
	}
	
}

function start()
{
	return ;  
    
}

questionInteractive.prototype.animate=function()
{
	/*$('#replayButton').delay(10).animate({
			opacity:0
		}, 100);*/
		
	$('#replayButton').hide();
	
		$('#covered').delay(10).animate({
			opacity:0
		}, 100);
		
		$('#dottedimage').delay(10).animate({
			opacity:0
		}, 100);
		
	/*	$('#image').delay(10).animate({
			opacity:0
		}, 100);
		$('#cover').delay(10).animate({
			opacity:0
		}, 100);
	*/	
	
clearTimeout(stroke);
clearTimeout(stroke1);
clearTimeout(stroke2);
clearTimeout(stroke3);
clearTimeout(fading);
clearTimeout(showfracation);
clearTimeout(blinker);

	
	canvas.width=canvas.width;

	interactiveObj = new questionInteractive();
	interactiveObj.init();
	
	
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