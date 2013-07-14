var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;
var context;
var canvas;
var drawA;
var drawB;
var drawC;
var showAnsFlag=0;
function questionInteractive() 
{
	this.lineB=0;
	this.line1x=0;
	this.line1xx=0;
	this.line1y=0;
	this.line1yy=0;
	
	this.line2x=0;
	this.line2xx=0;
	this.line2y=0;
	this.line2yy=0;
	
	this.line3x=0;
	this.line3xx=0;
	this.line3y=0;
	this.line3yy=0;
	
	
	
	if(typeof getParameters['lineEndLabel']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define lineEndLabel");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.lineEndLabel =getParameters['lineEndLabel'];
	
	if(getParameters['showAnsFlag']=="undefined")
		{
			//this.parameterNotSetFlag=1; 
			alert("Define showAnsFlag");
			$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
		}
	else 	showAnsFlag=getParameters['showAnsFlag'];
	
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.loadimage=function()
{
	

	var imageObj = new Image();
	
	imageObj.src="../assets/a.png";
	interactiveObj.s1="A";
	interactiveObj.s2="B";
	interactiveObj.s3="C";
	
	imageObj.onload=function()
	{
		
		interactiveObj.canvaswidth=this.width;
		interactiveObj.canvasheight=this.height;
		
		interactiveObj.line1x=92;     interactiveObj.line1xx=102;    // line c
		interactiveObj.line1y=1;		interactiveObj.line1yy=1;
		
		interactiveObj.line2x=95;     interactiveObj.line2xx=105;    // line b
		interactiveObj.line2y=113;		interactiveObj.line2yy=113;  //chganges here height of point B
		
		interactiveObj.line3x=100;     interactiveObj.line3xx=110;    // line a
		interactiveObj.line3y=224;		interactiveObj.line3yy=224;
		
		
		context.beginPath();
		context.drawImage(imageObj, 0, 0);
		
		context.font="15px bold";
		
		context.moveTo(interactiveObj.line1x,interactiveObj.line1y);
		context.lineTo(interactiveObj.line1xx,interactiveObj.line1yy);
		context.lineWidth=3;
		context.fillText(interactiveObj.s3,105,12); //C   
		
		context.moveTo(interactiveObj.line2x,interactiveObj.line2y);
		context.lineTo(  interactiveObj.line2xx,interactiveObj.line2yy);
		context.fillText(interactiveObj.s2,105,115); //B 
		
		context.moveTo(interactiveObj.line3x,interactiveObj.line3y);
		context.lineTo(interactiveObj.line3xx,interactiveObj.line3yy);			//alert("in onload");
		context.fillText(interactiveObj.s1,110,224); //A 
		
		
		context.strokeStyle='black';
		context.stroke()
		context.closePath();
		
	if(showAnsFlag==1)
		{
			interactiveObj.linedraw();
		}
			
	}
	
}


questionInteractive.prototype.linedraw=function()
{
	
	interactiveObj.endlabel=interactiveObj.lineEndLabel;
	
	interactiveObj.lineB=interactiveObj.line3yy;
	
	//	interactiveObj.lineC=interactiveObj.line2yy;
	//alert(interactiveObj.lineB);
	
	if(interactiveObj.endlabel=='b')
	{
		
		drawB=setInterval("interactiveObj.drawBline();",20);	
		
	}
	
	if(interactiveObj.endlabel=='c')
	{
		drawC=setInterval("interactiveObj.drawCline();",20);
	}
	
	if(interactiveObj.endlabel=='a')
	{
		drawA=setInterval("interactiveObj.drawAline();",20);
	}
}


questionInteractive.prototype.drawBline=function()
{
	

	if(interactiveObj.lineB>=interactiveObj.line2yy)
	{
			
		//alert("drawing Line b");
	
		context.beginPath();
		
		context.moveTo(interactiveObj.line3xx+45,interactiveObj.line3yy);
		context.lineTo(interactiveObj.line3xx+45,interactiveObj.lineB);	
		context.lineWidth = 3;
		context.strokeStyle='red';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB-=1;
	}
	else
	{

	clearInterval(drawB);
	
	$('#replayButton').delay(400).animate({
			opacity:1
		}, 100);	
	}
}

questionInteractive.prototype.drawCline=function()
{
	if(interactiveObj.lineB>=interactiveObj.line1yy)
	{
			
		//alert("drawing Line c");
	
		context.beginPath();
		
		context.moveTo(interactiveObj.line3xx+45,interactiveObj.line3yy);
		context.lineTo(interactiveObj.line3xx+45,interactiveObj.lineB);	
		context.lineWidth = 3;
		context.strokeStyle='red';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB-=1;
	}
	else
	{
	
	clearInterval(drawC);
	$('#replayButton').delay(400).animate({
			opacity:1
		}, 100);	
		}
}

questionInteractive.prototype.drawAline=function()
{
	
	if(interactiveObj.lineB>=interactiveObj.line3yy)
	{
			
		//alert("drawing Line a");
	
		context.beginPath();
		
		context.moveTo(interactiveObj.line3xx+45,interactiveObj.line3yy);
		context.lineTo(interactiveObj.line3xx+45,interactiveObj.lineB);	
		context.lineWidth = 3;
		context.strokeStyle='red';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB-=1;
	}
	else
	{
		
	
	clearInterval(drawA);
	clearInterval(drawC);
	$('#replayButton').delay(400).animate({
			opacity:1
		}, 100);
		}
}


questionInteractive.prototype.animate=function()
{
	$('#replayButton').delay(10).animate({
			opacity:0
		}, 100);
	
	clearInterval(drawA);
	clearInterval(drawB);
	clearInterval(drawC);
	
	canvas.width=canvas.width;
	
	interactiveObj = new questionInteractive();
	interactiveObj.loadimage(); 
	
	
	
	
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
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});		
}