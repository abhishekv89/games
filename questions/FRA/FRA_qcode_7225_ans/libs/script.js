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

	loadXML("xml.xml",function(){
			start();
		});


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
	
	this.smalliteration=42.5;
	this.smallLimit=0;
	this.smallnumber=0;
	
	this.name=promptArr['text1'];
	this.name2=promptArr['name'];
	this.name3=promptArr['name'];

	this.markerposition=this.iteration/this.denominator;
	this.redlinestart=45;



	if(typeof getParameters['scaleRange']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		//alert("Define scaleRange");
		$("#container").html("<h2><center>Parameter scaleRange Not Set</center></h2>");
	}
	else this.scaleRange =getParameters['scaleRange'].split("-");
	this.start=parseInt(this.scaleRange[0]);
	this.end=parseInt(this.scaleRange[1]);
	
	if(typeof getParameters['labelVal']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		//alert("Define labelVal");
		$("#container").html("<h2><center>Parameter labelVal Not Set</center></h2>");
	}
	else this.labelVal =getParameters['labelVal'].split(":");
		
	this.numerator=parseInt(this.labelVal[0]);   //eqivalent to line length
	this.denominator=parseInt(this.labelVal[1]);  //eqivalent to noOf Units
	
	if(typeof getParameters['labelName']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		//alert("Define labelName");
		$("#container").html("<h2><center>Parameter labelName Not Set</center></h2>");
	}
	else this.labelName =getParameters['labelName'];
	this.text=this.labelName;
	
		
		
	if(typeof getParameters['showAnsFlag']=="undefined")
	{
		this.parameterNotSetFlag=1;
		this.showAnsFlag=0;
		////alert("Define showAnsFlag");
		//$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
	}
	else this.showAnsFlag =getParameters['showAnsFlag'];
	
	
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.parameterNotSetFlag=1;
		this.numberLanguage='english';
		////alert("Define showAnsFlag");
		//$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
	}
	else this.numberLanguage =getParameters['numberLanguage'];
	
		
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.init=function()
{

	
	////alert(interactiveObj.name);
	
	$("#replayButton").hide();
	
	interactiveObj.containerwidth=interactiveObj.end*100+120;
	interactiveObj.limit=interactiveObj.end*interactiveObj.denominator;		
	interactiveObj.units=parseInt(interactiveObj.denominator);
	
	interactiveObj.smallnumber=0; 				
					
	interactiveObj.smallLimit=interactiveObj.end*interactiveObj.denominator;	
	interactiveObj.smalliteration+=parseInt(interactiveObj.iteration/interactiveObj.denominator);
	
	//getting the Fration value:-
	interactiveObj.mod=parseInt(interactiveObj.numerator%interactiveObj.denominator);
	interactiveObj.div=parseInt(interactiveObj.numerator/interactiveObj.denominator);
	
	$("#container").css({'width':interactiveObj.containerwidth});
	$("#container").css({'height':'234px;'});
	
	context.beginPath();
	
	context.canvas.width=interactiveObj.containerwidth;
	
	context.moveTo(20,175);     //Draw the line
	context.lineWidth='5';
	context.strokeStyle="black";
	context.lineTo(interactiveObj.end*100+70,175);
	
	interactiveObj.endmarker=interactiveObj.end*100;
	
	for(interactiveObj.counter=0;interactiveObj.counter<=interactiveObj.end;interactiveObj.counter++)     // calibrating the line
	{
		context.moveTo(interactiveObj.startpos,176);
		context.lineTo(interactiveObj.startpos,190);
		context.font='15px Comic Sans MS';			
		context.fillText(changeLanguage(interactiveObj.counter,interactiveObj.numberLanguage),interactiveObj.startpos-5,205);
		
			
		context.moveTo(20,175);   //start arrow haeds
		context.lineTo(30,165);
		
		context.moveTo(20,175); //start arrow heads
		context.lineTo(30,185);
		
		context.moveTo(interactiveObj.endmarker+70,175);    // end arrow heads
		context.lineTo(interactiveObj.endmarker-10+65,165);
		
		context.moveTo(interactiveObj.endmarker+70,175);    //end arrow heads
		context.lineTo(interactiveObj.endmarker-10+65,185);
		
		interactiveObj.startpos+=interactiveObj.iteration;
	
	}
	interactiveObj.smalliteration=interactiveObj.unitsiteration+3;

	for(interactiveObj.number=0;interactiveObj.number<interactiveObj.limit;interactiveObj.number++)  //getting the least counts
	{
		
		context.fillText("i",interactiveObj.unitsiteration+3,185);
		
		
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
				
				
				
			context.moveTo(interactiveObj.unitsiteration+5,130);   //draws the marker
			context.lineTo(interactiveObj.unitsiteration+5,155);		//arrow head
			context.lineTo(interactiveObj.unitsiteration-2,150);
				
			context.moveTo(interactiveObj.unitsiteration+5,155);		//arrow head
			context.lineTo(interactiveObj.unitsiteration+12,150);
			
			context.moveTo(interactiveObj.unitsiteration+5,174);					// red marker on number line
			context.lineTo(interactiveObj.unitsiteration+5,184);
				
			context.stroke();
			context.closePath();
		
			interactiveObj.redlinepos=interactiveObj.unitsiteration;
			////alert(interactiveObj.redlinepos);
			
			
		}
		interactiveObj.unitsiteration+=interactiveObj.iteration/interactiveObj.denominator;
	}
	
	if(interactiveObj.showAnsFlag=='1')
	{
	
		interactiveObj.x=interactiveObj.iteration+45;	
		drawLineA=setTimeout("interactiveObj.drawLineA();",2000);
	
		getDigits=setTimeout("interactiveObj.getDigits();",2000);
	
	}

}
questionInteractive.prototype.drawLineA=function()
{
	
	if(interactiveObj.lineA<=interactiveObj.redlinepos)
	{
	
		if(interactiveObj.lineA<interactiveObj.x)
		{

			context.beginPath();
		
			context.lineWidth='2';
			context.strokeStyle='red';
			context.moveTo(interactiveObj.redlinestart,160);
			context.lineTo(interactiveObj.lineA+3.5,160);
		
				
			interactiveObj.lineA+=5;
		
			context.stroke();
			context.closePath();
			drawLineA=setTimeout("interactiveObj.drawLineA();",45);
		}
		
		else
		{
			////alert("segment");
			interactiveObj.x+=interactiveObj.iteration;
			interactiveObj.redlinestart+=parseInt(interactiveObj.iteration+10);
			drawLineA=setTimeout("interactiveObj.drawLineA();",700);
				
		}
	
	}
	else{
		clearTimeout(drawLineA);
		////alert("line end");
	}	
	
	
}

questionInteractive.prototype.getDigits=function()
{
	////alert(interactiveObj.digitStart); //alert(interactiveObj.mod);
	
	interactiveObj.sign="+";
	
	if(interactiveObj.digitStart<=interactiveObj.div)
	{
		
		context.beginPath();
		context.font='14px Comic Sans MS';

		context.strokeStyle='red';
		context.lineWidth=3;
		context.font='15px Comic Sans MS';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.n1,interactiveObj.numberLanguage),interactiveObj.digitStartpos+40,90);
		context.fillText(interactiveObj.name,interactiveObj.digitStartpos+54,90);
		
		if(interactiveObj.digitStart!=interactiveObj.div)
		{
			context.fillText(interactiveObj.sign,interactiveObj.digitStartpos+100,90);	
		}
		
		interactiveObj.digitStartpos+=interactiveObj.iteration;
		interactiveObj.digitStart++;
		context.fill();
		context.stroke();
		context.closePath();
		
		interactiveObj.leftposition=interactiveObj.digitStartpos;   //position where whole number ends
		
		getDigits=setTimeout("interactiveObj.getDigits();",1500);
	}
	else
	{
	
		
		if(interactiveObj.mod!=0)
		{
			context.beginPath();
			context.font='15px Comic Sans MS';
			context.fillStyle='red';
			context.fillText("+",interactiveObj.leftposition-5,90)
			context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.leftposition+20,83);
			context.fillText("_",interactiveObj.leftposition+20,85);
			context.fillText(interactiveObj.name,interactiveObj.leftposition+35,90)
			context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.leftposition+20,100);
			context.fill();
			context.closePath();
		}
		else if(interactiveObj.numerator<interactiveObj.denominator)
		{
			context.beginPath();
			context.font='15px Comic Sans MS';
			context.fillStyle='red';
			context.fillText(changeLanguage(interactiveObj.numerator,interactiveObj.numberLanguage),interactiveObj.digitStartpos+5,88);
			context.fillText("_",interactiveObj.digitStartpos+5,90);
			context.fillText(interactiveObj.name,interactiveObj.digitStartpos+15,91)
			context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.digitStartpos+5,95);
			context.fill();
			context.closePath();
		}
	
		clearTimeout(getDigits);

		canvasclearing=setTimeout("interactiveObj.canvasclearing();",3000);
		getDigitsAgain=setTimeout("interactiveObj.getDigitsAgain();",3500);
		
		interactiveObj.resultPosition=interactiveObj.digitStartpos;
		interactiveObj.digitReStart=1;
		interactiveObj.digitStartpos=45;
		
		getResult=setTimeout("interactiveObj.getResult();",4000);
		
		
	}
	
}

questionInteractive.prototype.canvasclearing=function()
{
	
	interactiveObj.startpos=45;
	interactiveObj.unitsiteration=interactiveObj.redlinepos;
		
	context.beginPath();
	canvas.width=canvas.width;   // canvas cleared
	context.font='15px Comic Sans MS';
	context.moveTo(20,175);     //RE-Draw the line
	context.lineWidth='2';
	context.strokeStyle="black";
	context.lineTo(interactiveObj.end*100+70,175);
		
	for(interactiveObj.counter=0;interactiveObj.counter<=interactiveObj.end;interactiveObj.counter++)     // calibrating the line
	{
		
		context.fillText(interactiveObj.text,interactiveObj.unitsiteration,125);// shows the position of R
		context.lineWidth=2;
		
		context.moveTo(interactiveObj.startpos,176);
		context.lineTo(interactiveObj.startpos,190);
		context.font='15px Comic Sans MS';		
		context.fillText(changeLanguage(interactiveObj.counter,interactiveObj.numberLanguage),interactiveObj.startpos-5,205);


		context.moveTo(20,175);				//start arrow heads
		context.lineTo(30,165);
		
		context.moveTo(20,175);				//end arrow heads
		context.lineTo(30,185);
		
		context.moveTo(interactiveObj.endmarker+70,175);    // end arrow heads
		context.lineTo(interactiveObj.endmarker-10+65,165);
		
		context.moveTo(interactiveObj.endmarker+70,175);    //end arrow heads
		context.lineTo(interactiveObj.endmarker-10+65,185);
		
		
		interactiveObj.startpos+=interactiveObj.iteration;
		
		context.stroke();
		context.closePath();
	
	}
	
	
	for(interactiveObj.smallnumber=1;interactiveObj.smallnumber<=interactiveObj.smallLimit;interactiveObj.smallnumber++)  //getting the least counts
	{
		context.beginPath();
	
		context.fillText("i",interactiveObj.smalliteration,185);
		
		context.fill();
		context.stroke();
		context.closePath();
		
		interactiveObj.smalliteration+=interactiveObj.iteration/interactiveObj.denominator;

	}
	
	context.beginPath();   //Re-draw the red marker and the arrow heads
	context.strokeStyle='red';
	context.lineWidth='2';
	context.moveTo(interactiveObj.unitsiteration+5,130);   //draws the marker
				
	context.lineTo(interactiveObj.unitsiteration+5,155);		//arrow head
	context.lineTo(interactiveObj.unitsiteration-2,150);
				
	context.moveTo(interactiveObj.unitsiteration+5,155);		//arrow head
	context.lineTo(interactiveObj.unitsiteration+12,150);
			
	context.stroke();
	context.closePath();
		
	context.beginPath();
	context.lineWidth='2'; 				//Re-Drawing the red line again
	context.strokeStyle='red';
	context.moveTo(45,160);
	context.lineTo(interactiveObj.redlinepos+4,160);
				
	context.moveTo(interactiveObj.unitsiteration+5,174);    //red marker on number line
	context.lineTo(interactiveObj.unitsiteration+5,184);
				
	context.stroke();
	context.closePath();						
	
}

questionInteractive.prototype.getDigitsAgain=function()
{
	interactiveObj.center=parseInt(interactiveObj.redlinepos/2)+20;
	
	
	if(interactiveObj.mod!=0 && interactiveObj.div!=0)
	{
		////alert(11);
		if(((interactiveObj.denominator*interactiveObj.div)+interactiveObj.mod)/interactiveObj.denominator>1)
		{
			interactiveObj.name3=promptArr['nameX'];
		}
		context.beginPath();
		context.font='15px Comic Sans MS';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.center+5,90);
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.center-5,98);
		context.fillText("_",interactiveObj.center+5,90);
		context.fillText(interactiveObj.name3,interactiveObj.center+23,94);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.center+5,105);
		context.fill();
		context.stroke();
		context.closePath();
	
	
	}
	else if(interactiveObj.mod==0)
	{
		////alert("22");
		if(interactiveObj.div>1)
		{
			interactiveObj.name=promptArr['nameX'];
		}
		
		context.beginPath();
		context.font='15px Comic Sans MS';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.center+5,90);
		context.fillText(interactiveObj.name,interactiveObj.center+20,90);
		context.fill();
		context.stroke();
		context.closePath();
	
	
	}
	else if(interactiveObj.mod!=0 && interactiveObj.div==0)
	{
		////alert(33);
		context.beginPath();
		context.font='14px Comic Sans MS';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.center+5,250);
		context.fillText("_",interactiveObj.center+5,250);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.center+3,265);
		context.fillText(interactiveObj.name,interactiveObj.center+20,256);
		context.fill();
		context.stroke();
		context.closePath();
		

	}
	
}
questionInteractive.prototype.getResult=function()
{
	interactiveObj.sign="+";

	
	
	//alert("inside getResult");
	interactiveObj.namex=promptArr['text1'];
	
	if(interactiveObj.digitReStart<=interactiveObj.div)
	{
		////alert(1);

		context.beginPath();
		context.font='14px Comic Sans MS';

		context.strokeStyle='red';
		context.lineWidth=3;
		context.font='15px';
		context.fillStyle='red';
		context.fillText(changeLanguage(interactiveObj.n1,interactiveObj.numberLanguage),interactiveObj.digitStartpos+40,250);
		context.fillText(interactiveObj.namex,interactiveObj.digitStartpos+54,250);
		
		if(interactiveObj.digitReStart!=interactiveObj.div)
		{
			context.fillText(interactiveObj.sign,interactiveObj.digitStartpos+100,250);	
		}
		
		interactiveObj.digitStartpos+=interactiveObj.iteration;
		interactiveObj.digitReStart++;
		context.fill();
		context.stroke();
		context.closePath();
	

		interactiveObj.leftposition=interactiveObj.digitStartpos;   //position where whole number ends
		
		getResult=setTimeout("interactiveObj.getResult();",1000);
	}
	else
	{

		if(interactiveObj.mod!=0)
		{////alert(2);
			context.beginPath();
			context.font='15px Comic Sans MS';
			context.fillStyle='red';
			context.fillText("+",interactiveObj.leftposition-5,250)
			context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.leftposition+20,243);
			context.fillText("_",interactiveObj.leftposition+20,244);
			context.fillText(interactiveObj.namex,interactiveObj.leftposition+35,249)
			context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.leftposition+20,259);
			context.fill();
			context.closePath();
		}
		else if(interactiveObj.numerator<interactiveObj.denominator)
		{////alert(3);
			context.beginPath();
			context.font='15px Comic Sans MS';
			context.fillStyle='red';
			context.fillText(changeLanguage(interactiveObj.numerator,interactiveObj.numberLanguage),interactiveObj.digitStartpos+5,250);
			context.fillText("_",interactiveObj.digitStartpos+5,251);
			context.fillText(interactiveObj.namex,interactiveObj.digitStartpos+15,251)
			context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.digitStartpos+5,265);
			context.fill();
			context.closePath();
		}
		
		clearTimeout(getResult);
		
		getDigitsAgain2=setTimeout("interactiveObj.getDigitsAgain2();",1000);
	
	}

}
questionInteractive.prototype.getDigitsAgain2=function()
{
	interactiveObj.center=interactiveObj.resultPosition+120;
	////alert(interactiveObj.resultPosition);
	//alert("ingetDigitsAgain2");
	
	if(interactiveObj.mod!=0 && interactiveObj.div!=0)
	{
		//alert(1);
		interactiveObj.name2=promptArr['nameX'];

		context.beginPath();
		context.font='15px Comic Sans MS';
		context.fillStyle='red';
		context.fillText("=",interactiveObj.center-50,250);
		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.center-20,242);//2
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.center-30,249);
		context.fillText("_",interactiveObj.center-20,243);  
		context.fillText(interactiveObj.name2,interactiveObj.center-5,247);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.center-20,258);
		context.fill();
		context.stroke();
		context.closePath();
	
		$("#replayButton").show();
		$("#replayButton").css({'left':interactiveObj.containerwidth-50});
		$("#replayButton").css({'top':'212px'});
	}
	else if(interactiveObj.mod==0)
	{
		//alert("2");

		if(interactiveObj.div>1)
		{
			interactiveObj.name2=promptArr['nameX'];
		}
		else interactiveObj.name2=promptArr['text1'];
		
		context.beginPath();
		context.font='15px Comic Sans MS';
		context.fillStyle='red';
		context.fillText("=",interactiveObj.center-80,250);
		context.fillText(changeLanguage(interactiveObj.div,interactiveObj.numberLanguage),interactiveObj.center-40,250);
		context.fillText(interactiveObj.name2,interactiveObj.center-15,250);
		context.fill();
		context.stroke();
		context.closePath();
	
		$("#replayButton").show();
		$("#replayButton").css({'left':interactiveObj.containerwidth-10});

	}
	else if(interactiveObj.mod!=0 && interactiveObj.div==0)
	{
			//alert(3);
			if(interactiveObj.mod>1)
			{
				interactiveObj.name2=promptArr['nameX'];
			}
			else if(interactiveObj.mod==1)
			{
				interactiveObj.name2=promptArr['text1'];
			}
		context.beginPath();
		context.font='14px Comic Sans MS';
		context.fillStyle='red';
		context.fillText("=",interactiveObj.center-50,254);
		context.fillText(changeLanguage(interactiveObj.mod,interactiveObj.numberLanguage),interactiveObj.center-40,250);
		
		context.fillText("_",interactiveObj.center-40,250);
		context.fillText(changeLanguage(interactiveObj.denominator,interactiveObj.numberLanguage),interactiveObj.center-42,265);
		
		context.fillText(interactiveObj.name2,interactiveObj.center-20,253);
		context.fill();
		context.stroke();
		context.closePath();
		
		$("#replayButton").show();	
		$("#replayButton").css({'left':interactiveObj.containerwidth-30});
	}
		
}
questionInteractive.prototype.animate=function()
{
	
	$("#replayButton").hide();
	
	clearTimeout(drawLineA);
	clearTimeout(getDigits);
	clearTimeout(canvasclearing);
	clearTimeout(getDigitsAgain);
	clearTimeout(getResult);
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

function start()
{
	return ;  
    
}

