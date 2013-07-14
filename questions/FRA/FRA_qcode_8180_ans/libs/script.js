var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;
var context;
var canvas;

var showAnsFlag;

function questionInteractive() 
{
	this.i=0;
	this.startpos=0;
	this.d=30;
	this.counter=1;

	var imageObj=new Image();
	var imagearrow=new Image();
	
	
	if(typeof getParameters['numberLineLength']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define lineEndLabel");
		$("#container").html("<h2><center>Parameter numberLineLength Not Set</center></h2>");
	}
	else this.numberLineLength =getParameters['numberLineLength'];
	
	if(typeof getParameters['localtionOfPoint']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define localtionOfPoint");
		$("#container").html("<h2><center>Parameter localtionOfPoint Not Set</center></h2>");
	}
	else this.localtionOfPoint =parseFloat(getParameters['localtionOfPoint']);
	
	
	
	if(typeof getParameters['Point']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define Point");
		$("#container").html("<h2><center>Parameter Point Not Set</center></h2>");
	}
	else this.Point =getParameters['Point'];
	
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.numberLanguage='english';
		
	}
	else this.numberLanguage =getParameters['numberLanguage'];

		
		if(typeof getParameters['showAnsFlag']=="undefined")
	{
		this.showAnsFlag='0';
		
	}
	else this.showAnsFlag =getParameters['showAnsFlag'];
	
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.init=function()
{
	
		interactiveObj.point1=parseInt(interactiveObj.localtionOfPoint%10);
		//alert(interactiveObj.point1);
		if(interactiveObj.point1<=0)
		{
			interactiveObj.point1="";
	
		}
		else{
			interactiveObj.point1=parseInt(interactiveObj.localtionOfPoint%10);
		}
		
		interactiveObj.numerator=changeLanguage(1,interactiveObj.numberLanguage);		// for 1
		interactiveObj.denominator=changeLanguage(2,interactiveObj.numberLanguage);		// for 2

	
	interactiveObj.LineLength= parseInt(interactiveObj.numberLineLength)+1;
	
	interactiveObj.lop=parseFloat(interactiveObj.localtionOfPoint);
	interactiveObj.string=interactiveObj.Point;
	
	interactiveObj.iteration=parseInt(480/interactiveObj.LineLength);
	interactiveObj.fixedlength=interactiveObj.LineLength*100;  // gives the length of the line
	interactiveObj.startpos=parseInt(25);
	interactiveObj.startpos1=parseInt(25);  // for second time line drawing
	interactiveObj.endPoint=parseInt(interactiveObj.localtionOfPoint*interactiveObj.iteration);

	context.beginPath();
	context.moveTo(0, 100);   //complete track
	context.lineTo(500,100);
	
	context.moveTo(10,110);
	context.lineTo(0,100);
	context.lineTo(10,90);
	
		
	context.moveTo(490,110);
	context.lineTo(500,100);
	context.lineTo(490,90);
	
	interactiveObj.imagepos=interactiveObj.startpos+interactiveObj.iteration-10;
	
	imageObj=new Image();
	imageObj.src="../assets/arrow.png";
	
	imageObj.onload=function()      //loads the black arrow image
	{
	
		context.font="12px Comic Sans MS  bold ";								//position of X
		context.drawImage(imageObj,interactiveObj.imagepos,55)
		context.fillText("X",interactiveObj.imagepos+5,65);
	}
	
	
	imagearrow=new Image();
	imagearrow.src="../assets/redarrow.png";
	
	imagearrow.onload=function()     //loads the red arrow
	{
		context.beginPath();
		context.fillStyle='red';
		context.fillText(interactiveObj.Point,interactiveObj.endPoint+25,65);
		
		context.moveTo(interactiveObj.endPoint+26,100);			// DRAWS THE ADDITIONAL LINE
		context.lineTo(interactiveObj.endPoint+26,108);
		context.stroke();
		context.closePath();
		context.drawImage(imagearrow,interactiveObj.endPoint+18,55);
		
		
	}

	interactiveObj.lineB=interactiveObj.startpos; 
	  //setting the start position of animated line
	if(interactiveObj.showAnsFlag=='1')
	{
		
	drawLine=setInterval("interactiveObj.drawLine();",70);
	
	//interactiveObj.settingspeed=parseInt(interactiveObj.numberLineLength);
	
	getdigits=setTimeout("interactiveObj.getdigits();",1000);
	}
	context.stroke();
		
	for(interactiveObj.i=0; interactiveObj.i<interactiveObj.LineLength;interactiveObj.i++)   //loop to calibrate the line and print the numbers
	{
		context.moveTo(interactiveObj.startpos, 100);   //complete track
		context.lineTo(interactiveObj.startpos,110);
		context.lineWidth = 2;
		context.font="12px sans-serif";
		context.fillText(changeLanguage(interactiveObj.i,interactiveObj.numberLanguage),interactiveObj.startpos-3,125);
		context.stroke();
		context.strokeStyle="black";
		interactiveObj.startpos+=interactiveObj.iteration;

		context.closePath();	
	}

}

questionInteractive.prototype.getdigits=function()
{
	context.beginPath();
	context.font="12px sans-serif";

	if(interactiveObj.counter<interactiveObj.localtionOfPoint)
	{
		context.fillText(changeLanguage("1",interactiveObj.numberLanguage),interactiveObj.d,25);
		context.fillText("+",interactiveObj.d+45,25);
		context.stroke();
		interactiveObj.counter++;
		interactiveObj.d+=interactiveObj.iteration;
		
		getdigits=setTimeout("interactiveObj.getdigits();",2000);
		
		context.closePath();	
	
	}
	else{
		
	clearTimeout(getdigits);
	
		context.moveTo(interactiveObj.endPoint+20,24);
		context.font="12px sans-serif";
		
		context.fillText(interactiveObj.numerator,interactiveObj.endPoint+21,20);
		context.lineTo(interactiveObj.endPoint+30,24);
		context.fillText(interactiveObj.denominator,interactiveObj.endPoint+21,35);
		context.stroke();	
		context.lineWidth=2;
		
	
		
		restoringcanvas=setTimeout("interactiveObj.restorecanvas();",2000);
		
	}

	
}

questionInteractive.prototype.restorecanvas=function()
{	
	context.beginPath();
	
	context.rect(0,10, interactiveObj.lineB+25,32);
     	context.fillStyle = 'white';
     	context.fill();
	
	//context.moveTo(25,40);
	//context.lineTo(interactiveObj.lineB,40);
	//context.strokeStyle="blue";
	//context.stroke();
	context.closePath();
	canvas.width=canvas.width;
	
	context.moveTo(0, 100);   //complete track
	context.lineTo(500,100);
	
	context.moveTo(10,110);
	context.lineTo(0,100);
	context.lineTo(10,90);
	
		
	context.moveTo(490,110);
	context.lineTo(500,100);
	context.lineTo(490,90);
	
	imageObj=new Image();
	imageObj.src="../assets/arrow.png";
	
	imageObj.onload=function()      //loads the black arrow image
	{
	
		context.font="12px Comic Sans MS  bold ";								//position of X
		context.drawImage(imageObj,interactiveObj.imagepos,55)
		context.fillText("X",interactiveObj.imagepos+5,65);
	}
	
	
	imagearrow=new Image();
	imagearrow.src="../assets/redarrow.png";
	
	imagearrow.onload=function()     //loads the red arrow
	{
		context.beginPath();
		context.fillStyle='red';
		context.fillText(interactiveObj.Point,interactiveObj.endPoint+25,65);
		
		context.moveTo(interactiveObj.endPoint+26,100);
		context.lineTo(interactiveObj.endPoint+26,108);
		context.stroke();
		
		context.closePath();
		context.drawImage(imagearrow,interactiveObj.endPoint+18,55);
		
		// previous position]
	}

	
	for(interactiveObj.i=0; interactiveObj.i<interactiveObj.LineLength;interactiveObj.i++)   //loop to calibrate the line and print the numbers
	{
		context.moveTo(interactiveObj.startpos1, 100);   //complete track
		context.lineTo(interactiveObj.startpos1,110);
		context.lineWidth = 2;
		context.font="12px sans-serif";
		context.fillText(changeLanguage(interactiveObj.i,interactiveObj.numberLanguage),interactiveObj.startpos1-3,125);
		context.stroke();
		context.strokeStyle="black";
		interactiveObj.startpos1+=interactiveObj.iteration;

		context.closePath();	
	}
	
	
	clearTimeout(restoringcanvas);
		
		drawlineagain=setTimeout("interactiveObj.drawlineagain();",1000);	
}

questionInteractive.prototype.drawlineagain=function()
{
	
	context.beginPath();
	
	context.moveTo(25,40);
	context.lineTo(interactiveObj.lineB,40);
	context.strokeStyle="red";
	context.lineWidth=1;
	context.stroke();
	context.stroke();
 	context.closePath();
	

gettingfractiondigit=setTimeout("interactiveObj.gettingfractiondigit();",300);	
	
}

questionInteractive.prototype.gettingfractiondigit=function()
{
	interactiveObj.redlength=parseInt(interactiveObj.lineB/2);
	context.beginPath();
		context.moveTo(interactiveObj.redlength,22);
	
		context.lineTo(interactiveObj.redlength+8,22);

		context.font="12px sans-serif";
		context.fillStyle = 'red';
		context.strokeStyle="red";
		
		context.fillText(interactiveObj.numerator,interactiveObj.redlength,20);

		context.fillText(changeLanguage(interactiveObj.point1,interactiveObj.numberLanguage),interactiveObj.redlength-8,25);
		
		context.fillText(interactiveObj.denominator,interactiveObj.redlength,34);
		
		context.lineWidth=2;
		
		context.stroke();
		
		//context.fillText(interactiveObj.localtionOfPoint,interactiveObj.endPoint+22,120);
		
		context.closePath();
		//magic loop//
		context.beginPath();		// this would do the additional labelling of the fraction on the number line
		context.strokeStyle='red';
		context.fillText(1,interactiveObj.endPoint+24,118);				
		context.fillText(changeLanguage(interactiveObj.point1,interactiveObj.numberLanguage),interactiveObj.endPoint+15,125);  // FRACTION PART
		context.fillText(2,interactiveObj.endPoint+24,132)
		context.stroke();
		context.moveTo(interactiveObj.endPoint+22,120);
		context.lineTo(interactiveObj.endPoint+32,120);
		context.stroke();
		context.closePath();
		
		
		
	
	$('#replayButton').delay(450).animate({
				opacity:1
			}, 100);	
	$('#replayButton').css('visibility','visible');
	
}

questionInteractive.prototype.drawLine=function()
{
	if(interactiveObj.lineB<=interactiveObj.endPoint+25)
	{
		context.beginPath();
		context.moveTo(25,40);						// draws the line depending upon the fraction
		context.lineTo(interactiveObj.lineB,40);
		context.strokeStyle="red";
		
		context.lineWidth=1;
		context.stroke();	// draws the line depending upon the fraction	
		interactiveObj.lineB+=3;
		context.closePath();
	}
	else{
		clearInterval(drawLine);
		
	}
	
}
questionInteractive.prototype.animate=function()
{
	$('#replayButton').delay(10).animate({
			opacity:0
		}, 100);
	
	$('#replayButton').css('visibility','hidden');
	
	clearInterval(drawLine);
	clearTimeout(getdigits);
	clearTimeout(restoringcanvas);
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
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});		
}

