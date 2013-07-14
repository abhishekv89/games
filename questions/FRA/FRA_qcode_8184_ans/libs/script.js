var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;
var context;
var canvas;

function questionInteractive() 
{
this.startpos=45;// start position of label i.e. 0
this.counter=0;	//numbering starts from
this.iteration=parseInt(100);
this.numerator=0;
this.denominator=0;
this.unitsiteration=40;		//getting the units for iterating fraction
this.startname="X";
this.lineA=50;  //start position of red line
this.digitStart=1;
this.digitStartpos=this.startpos;
this.blackmarker=this.startpos+this.iteration;
this.n1="1";	
this.markerposition=this.iteration/this.denominator;

	if(typeof getParameters['scaleRange']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define scaleRange");
		$("#container").html("<h2><center>Parameter scaleRange Not Set</center></h2>");
	}
	else this.scaleRange =getParameters['scaleRange'].split("-");
	this.start=parseInt(this.scaleRange[0]);
	this.end=parseInt(this.scaleRange[1]);
	
	if(typeof getParameters['labelVal']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define labelVal");
		$("#container").html("<h2><center>Parameter labelVal Not Set</center></h2>");
	}
	else this.labelVal =getParameters['labelVal'].split(":");
		
		this.numerator=parseInt(this.labelVal[0]);
		this.denominator=parseInt(this.labelVal[1]);
	
	if(typeof getParameters['labelName']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define labelName");
		$("#container").html("<h2><center>Parameter labelName Not Set</center></h2>");
	}
	else this.labelName =getParameters['labelName'];
		this.text=this.labelName;
		
		
	if(typeof getParameters['showAnsFlag']=="undefined")
	{
		this.parameterNotSetFlag=1;
		 this.showAnsFlag=0;
		//alert("Define showAnsFlag");
		//$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
	}
	else this.showAnsFlag =getParameters['showAnsFlag'];
	
	
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.parameterNotSetFlag=1;
		 this.numberLanguage='english';
		//alert("Define showAnsFlag");
		//$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
	}
	else this.numberLanguage =getParameters['numberLanguage'];
	
		
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.init=function()
{
	$("#replayButton").hide();
	
	interactiveObj.containerwidth=interactiveObj.end*100+100;
	interactiveObj.limit=interactiveObj.end*interactiveObj.denominator;
	interactiveObj.units=parseInt(interactiveObj.denominator);

	
	//getting the Fration value:-
	interactiveObj.mod=parseInt(interactiveObj.numerator%interactiveObj.denominator);
	interactiveObj.div=parseInt(interactiveObj.numerator/interactiveObj.denominator);

	
	$("#container").css({'width':interactiveObj.containerwidth});
	
	context.beginPath();
	
	context.canvas.width=interactiveObj.containerwidth-50;
	
	context.moveTo(20,175);     //Draw the line
	context.lineWidth='3';
	context.strokeStyle="black";
	context.lineTo(interactiveObj.end*100,175);
	
interactiveObj.endmarker=interactiveObj.end*100;
	
	for(interactiveObj.counter=0;interactiveObj.counter<interactiveObj.end;interactiveObj.counter++)     // calibrating the line
	{
		context.moveTo(interactiveObj.startpos,176);
		context.lineTo(interactiveObj.startpos,190);
		context.font='15px Arial';			
		context.fillText(changeLanguage(interactiveObj.counter,interactiveObj.numberLanguage),interactiveObj.startpos-5,205);
		
		context.fillText(interactiveObj.startname,interactiveObj.blackmarker-3,125);
		context.moveTo(interactiveObj.blackmarker,130);   // Draws the Black Marker
		context.lineTo(interactiveObj.blackmarker,155);
		
		context.moveTo(interactiveObj.blackmarker,155);
		context.lineTo(interactiveObj.blackmarker-7,148);
		
		context.moveTo(interactiveObj.blackmarker,155);
		context.lineTo(interactiveObj.blackmarker+7,148);
		
		context.moveTo(20,175);   //start arrow haeds
		context.lineTo(30,165);
		
		context.moveTo(20,175); //start arrow heads
		context.lineTo(30,185);
		
		context.moveTo(interactiveObj.endmarker,175);    // end arrow heads
		context.lineTo(interactiveObj.endmarker-10,165);
		
		context.moveTo(interactiveObj.endmarker,175);    //end arrow heads
		context.lineTo(interactiveObj.endmarker-10,185);
		
		interactiveObj.startpos+=interactiveObj.iteration;
	
	}
	
	for(interactiveObj.number=0;interactiveObj.number<interactiveObj.limit;interactiveObj.number++)  //getting the least counts
	{
		//context.fillText(interactiveObj.number,interactiveObj.unitsiteration,220);
		
		
		if(interactiveObj.number==interactiveObj.numerator)    // this will get the end postition of line
		{
			context.fillText(interactiveObj.text,interactiveObj.unitsiteration,125);// shows the position of R
			context.lineWidth=2;
			
			
			context.fill();
			context.stroke();
			context.closePath();
			
				context.beginPath();   //draw the red marker and the arrow heads
				context.strokeStyle='red';
				context.lineWidth='2';
				
				context.moveTo(interactiveObj.unitsiteration+2,130);   //draws the marker
				context.lineTo(interactiveObj.unitsiteration+2,155);		//arrow head
				context.lineTo(interactiveObj.unitsiteration-5,150);
				
				context.moveTo(interactiveObj.unitsiteration+2,155);		//arrow head
				context.lineTo(interactiveObj.unitsiteration+8,150);
			
				context.moveTo(interactiveObj.unitsiteration+3,174);					// red marker on number line
				context.lineTo(interactiveObj.unitsiteration+3,184);
				
				context.stroke();
				context.closePath();
		
			interactiveObj.redlinepos=interactiveObj.unitsiteration;
		}
		
		interactiveObj.unitsiteration+=interactiveObj.iteration/interactiveObj.denominator;
	}

	if(interactiveObj.showAnsFlag=='1')
	{
		
	drawLineA=setTimeout("interactiveObj.drawLineA();",2000);
	getDigits=setTimeout("interactiveObj.getDigits();",2000);
	
	}

}
questionInteractive.prototype.drawLineA=function()
{
	
	if(interactiveObj.lineA<=interactiveObj.redlinepos)
	{
		
		context.beginPath();
		
		context.lineWidth='2';
		context.strokeStyle='red';
		context.moveTo(45,160);
		context.lineTo(interactiveObj.lineA+5,160);
		
				
		interactiveObj.lineA+=5;
		
		context.stroke();
		context.closePath();
		drawLineA=setTimeout("interactiveObj.drawLineA();",55);
	
	}
	else{
		clearTimeout(drawLineA);
		//alert("line end");
	}	
}
questionInteractive.prototype.getDigits=function()
{
	//alert(interactiveObj.digitStart); alert(interactiveObj.mod);
	
	interactiveObj.sign="+";
	
	if(interactiveObj.digitStart<=interactiveObj.div)
	{
		
		context.beginPath();
			context.font='14px Arial';

		context.strokeStyle='red';
		context.lineWidth=3;
		context.font='15px';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.n1,interactiveObj.numberLanguage),interactiveObj.digitStartpos+40,90);
		
		if(interactiveObj.digitStart!=interactiveObj.div)
		{
		context.fillText(interactiveObj.sign,interactiveObj.digitStartpos+90,90);	
		}
		
		interactiveObj.digitStartpos+=interactiveObj.iteration;
		interactiveObj.digitStart++;
		context.fill();
		context.stroke();
		context.closePath();
		
		interactiveObj.leftposition=interactiveObj.digitStartpos;   //position where whole number ends
		
		getDigits=setTimeout("interactiveObj.getDigits();",900);
	}
	else
	{
	
		
	if(interactiveObj.mod!=0)
	{
	context.beginPath();
	context.font='15px';
	context.fillStyle='red';
	context.fillText("+",interactiveObj.leftposition-20,90)
	context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.leftposition+20,90);
	context.fillText("_",interactiveObj.leftposition+20,91);
	context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.leftposition+20,105);
	context.fill();
	context.closePath();
	}
	else if(interactiveObj.numerator<interactiveObj.denominator)
	{
	context.beginPath();
	context.font='15px';
	context.fillStyle='red';
	context.fillText(changeLanguage(interactiveObj.numerator,interactiveObj.numberLanguage),interactiveObj.digitStartpos+5,90);
	context.fillText("_",interactiveObj.digitStartpos+5,91);
	context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.digitStartpos+5,105);
	context.fill();
	context.closePath();
	}
	
	clearTimeout(getDigits);

	canvasclearing=setTimeout("interactiveObj.canvasclearing();",3000);
	getDigitsAgain=setTimeout("interactiveObj.getDigitsAgain();",3500);
	}
}
questionInteractive.prototype.canvasclearing=function()
{
	
	interactiveObj.startpos=45;
	interactiveObj.unitsiteration=interactiveObj.redlinepos;
		
	context.beginPath();
		canvas.width=canvas.width;   // canvas cleared
		context.font='15px Arial';
	context.moveTo(20,175);     //RE-Draw the line
	context.lineWidth='2';
	context.strokeStyle="black";
	context.lineTo(interactiveObj.end*100,175);
		
	for(interactiveObj.counter=0;interactiveObj.counter<interactiveObj.end;interactiveObj.counter++)     // calibrating the line
	{
		
	context.fillText(interactiveObj.text,interactiveObj.unitsiteration,125);// shows the position of R
	context.lineWidth=2;
		
	context.moveTo(interactiveObj.startpos,176);
	context.lineTo(interactiveObj.startpos,190);
	context.font='15px Arial';		
	context.fillText(changeLanguage(interactiveObj.counter,interactiveObj.numberLanguage),interactiveObj.startpos-5,205);
	
	context.fillText(interactiveObj.startname,interactiveObj.blackmarker-3,125);
	context.moveTo(interactiveObj.blackmarker,130);   // Draws the Black Marker
	context.lineTo(interactiveObj.blackmarker,155);
	
	context.moveTo(interactiveObj.blackmarker,155);
	context.lineTo(interactiveObj.blackmarker-7,148);
	
	context.moveTo(interactiveObj.blackmarker,155);
	context.lineTo(interactiveObj.blackmarker+7,148);
	
	context.moveTo(20,175);				//start arrow heads
	context.lineTo(30,165);
	
	context.moveTo(20,175);				//end arrow heads
	context.lineTo(30,185);
	
	context.moveTo(interactiveObj.endmarker,175);    // end arrow heads
	context.lineTo(interactiveObj.endmarker-10,165);
	
	context.moveTo(interactiveObj.endmarker,175);    //end arrow heads
	context.lineTo(interactiveObj.endmarker-10,185);
		
		
	interactiveObj.startpos+=interactiveObj.iteration;
		
	context.stroke();
	context.closePath();
	}
	
	context.beginPath();   //Re-draw the red marker and the arrow heads
	context.strokeStyle='red';
	context.lineWidth='2';
	context.moveTo(interactiveObj.unitsiteration+2,130);   //draws the marker
				
	context.lineTo(interactiveObj.unitsiteration+2,155);		//arrow head
	context.lineTo(interactiveObj.unitsiteration-5,150);
			
	context.moveTo(interactiveObj.unitsiteration+2,155);		//arrow head
	context.lineTo(interactiveObj.unitsiteration+8,150);
			
	context.stroke();
	context.closePath();
		
	context.beginPath();
	context.lineWidth='2'; 				//Re-Drawing the red line again
	context.strokeStyle='red';
	context.moveTo(40,160);
	context.lineTo(interactiveObj.redlinepos,160);
				
	context.moveTo(interactiveObj.unitsiteration+3,174);    //red marker on number line
	context.lineTo(interactiveObj.unitsiteration+3,184);
			
	context.stroke();
	context.closePath();						
	
}

questionInteractive.prototype.getDigitsAgain=function()
{
	interactiveObj.center=parseInt(interactiveObj.redlinepos/2)+20;
	
	
	if(interactiveObj.mod!=0 && interactiveObj.div!=0)
	{
	
		context.beginPath();
		context.font='15px Arial';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.center+5,90);
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.center-5,98);
		context.fillText("_",interactiveObj.center+5,90);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.center+5,105);

		//filling below the number line//

		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.unitsiteration+3,200);//numerator
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.unitsiteration-5,206);//whole
		context.fillText("_",interactiveObj.unitsiteration+3,200);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.unitsiteration+3,215);//denom

		//filling below the number line//

		context.fill();
		context.stroke();
		context.closePath();
		
		$("#replayButton").show();
		$("#replayButton").css({'left':interactiveObj.containerwidth-20});
	
	}
	else if(interactiveObj.mod==0)
	{
	
		context.beginPath();
		context.font='15px Arial';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.center+5,90);

		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.unitsiteration+3,200);

		context.fill();
		context.stroke();
		context.closePath();
		
		$("#replayButton").show();
		$("#replayButton").css({'left':interactiveObj.containerwidth-20});
	}
	else if(interactiveObj.mod!=0 && interactiveObj.div==0)
	{
		
		context.beginPath();
		context.font='14px Arial';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.center+5,90);
		context.fillText("_",interactiveObj.center+5,91);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.center+5,105);


		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.unitsiteration,200);
		context.fillText("_",interactiveObj.unitsiteration,200);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.unitsiteration,215);


		context.fill();
		context.stroke();
		context.closePath();
			
		$("#replayButton").show();	
		$("#replayButton").css({'left':interactiveObj.containerwidth-20});
	}
	
}

questionInteractive.prototype.animate=function()
{
	
	$("#replayButton").hide();
	
	clearTimeout(drawLineA);
	clearTimeout(getDigits);
	clearTimeout(canvasclearing);
	clearTimeout(getDigitsAgain);
	
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

