var questionInteractive;
var html='';
var interactiveObj;
var html;
var canvas;
var angle=0;
var context=new Array();
var canvas=new Array();
var angle2=0;

function questionInteractive()
{
	this.language=getParameters['language'];
	this.x=0;
	this.i=0;
	this.j=0;

	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.numberLanguage='english'; 
			
	}
	else this.numberLanguage=getParameters['numberLanguage'];


	if(typeof getParameters['language']=="undefined")
	{
		this.language='english'; 
			
	}
	else this.language=getParameters['language'];

	if(typeof getParameters['showAnsFlag']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
	}
	else this.showAnsFlag=getParameters['showAnsFlag'];


	if(typeof getParameters['triangleCount']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter triangleCount Not Set</center></h2>");
	}
	else this.triangleCount=getParameters['triangleCount'];

	if(typeof getParameters['side1']=="undefined")	//side 1
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter side1 Not Set</center></h2>");
	}
	else this.side1=getParameters['side1'].split('|');   

	if(typeof getParameters['side2']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter side2 Not Set</center></h2>");
	}
	else this.side2=getParameters['side2'].split('|');	//side 2

	if(typeof getParameters['side3']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter side3 Not Set</center></h2>");
	}
	else this.side3=getParameters['side3'].split('|');	//side 3

	if(typeof getParameters['rotation']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter rotation Not Set</center></h2>");
	}
	else this.rotation=getParameters['rotation'].split('|');

	this.sideString=new Array();
	this.T_rotation=new Array();

	this.startX=new Array();
	this.startY=new Array();
}

questionInteractive.prototype.init=function()
{

	if(interactiveObj.showAnsFlag==0)
	{
		interactiveObj.startAnimation();
	}
	else if(interactiveObj.showAnsFlag==1)
	{
		interactiveObj.startProof();
	}

}

questionInteractive.prototype.startAnimation=function()
{
	interactiveObj.Tcount=interactiveObj.triangleCount;
	interactiveObj.containerWidth=interactiveObj.Tcount*200+150;
	html='';
	

	$("#container").css('width',interactiveObj.containerWidth+'px'); //setting container width
	containerResize();
	
	for(interactiveObj.i=0;interactiveObj.i<interactiveObj.Tcount;interactiveObj.i++) //canvas created
	{
		html+='<canvas id="myCanvas'+interactiveObj.i+'" width="200px" height="250px" class="canvas"></canvas>';
		
	}

	html+='<div id="buttonsClickable">';
	html+='<div id="buttonRed" class="button1"></div>';
	html+='<div id="buttonYellow" class="button2"></div>';
	html+='<div id="buttonBlue" class="button3"></div>';
	html+='</div>';

	html+='<div id="scale"><img src=../assets/05.png></img></div>';
	
	$("#container").html(html);

	$("#scale").draggable();

	var timer1;
	$("#buttonRed").on('mousedown',function() {
	 timer1 = setInterval("interactiveObj.rotateAntiClockwise();",50);
	}).on('mouseup',function() {
	  clearInterval(timer1);  
	}).on('mouseout',function() {
	  clearInterval(timer1);  
	})


	var timer2;
	$("#buttonYellow").on('mousedown',function() {
	 timer2 = setInterval("interactiveObj.rotateAntiClockwise10();",50);
	}).on('mouseup',function() {
	  clearInterval(timer2);  
	}).on('mouseout',function() {
	  clearInterval(timer2);  
	})
	
	var timer3;
	$("#buttonBlue").on('mousedown',function() {
	 timer2 = setInterval("interactiveObj.rotateClockwise1();",50);
	}).on('mouseup',function() {
	  clearInterval(timer2);  
	}).on('mouseout',function() {
	  clearInterval(timer2);  
	})
	

	for(interactiveObj.i=0;interactiveObj.i<interactiveObj.Tcount;interactiveObj.i++)  // context of each canvas created
	{
		canvas[interactiveObj.i] = document.getElementById('myCanvas'+interactiveObj.i);
		context[interactiveObj.i] = canvas[interactiveObj.i].getContext('2d');
	}

	//getting the coordinates of each canvas traingle

	if(interactiveObj.Tcount==2)
	{
		interactiveObj.sideString1=interactiveObj.side1[0]+interactiveObj.side2[0]+interactiveObj.side3[0];
		interactiveObj.sideString2=interactiveObj.side1[1]+interactiveObj.side2[1]+interactiveObj.side3[1];
	}
	if(interactiveObj.Tcount==3)
	{
		interactiveObj.sideString1=interactiveObj.side1[0]+interactiveObj.side2[0]+interactiveObj.side3[0];
		interactiveObj.sideString2=interactiveObj.side1[1]+interactiveObj.side2[1]+interactiveObj.side3[1];	
		interactiveObj.sideString3=interactiveObj.side1[2]+interactiveObj.side2[2]+interactiveObj.side3[2];	
	}
	if(interactiveObj.Tcount==4)
	{
		interactiveObj.sideString[0]=interactiveObj.side1[0]+"|"+interactiveObj.side2[0]+"|"+interactiveObj.side3[0];
		interactiveObj.sideString[1]=interactiveObj.side1[1]+"|"+interactiveObj.side2[1]+"|"+interactiveObj.side3[1];
		interactiveObj.sideString[2]=interactiveObj.side1[2]+"|"+interactiveObj.side2[2]+"|"+interactiveObj.side3[2];	
		interactiveObj.sideString[3]=interactiveObj.side1[3]+"|"+interactiveObj.side2[3]+"|"+interactiveObj.side3[3];

		interactiveObj.T_rotation[0]=interactiveObj.rotation[0];
		interactiveObj.T_rotation[1]=interactiveObj.rotation[1];
		interactiveObj.T_rotation[2]=interactiveObj.rotation[2];
		interactiveObj.T_rotation[3]=interactiveObj.rotation[3];

		interactiveObj.startX[0]=50;
		interactiveObj.startY[0]=50;

		interactiveObj.startX[1]=50;
		interactiveObj.startY[1]=50;

		interactiveObj.startX[2]=100;
		interactiveObj.startY[2]=210;

		interactiveObj.startX[3]=50;
		interactiveObj.startY[3]=50;

		
		for(interactiveObj.i=0;interactiveObj.i<interactiveObj.Tcount;interactiveObj.i++)
		{
			context[interactiveObj.i].beginPath();

			context[interactiveObj.i].lineWidth='2';
			
				interactiveObj.canvasId='myCanvas'+interactiveObj.i;
				interactiveObj.startPos=interactiveObj.startX[interactiveObj.i];
				interactiveObj.endPos=interactiveObj.startY[interactiveObj.i];
				interactiveObj.scaleFactor=44;
				interactiveObj.triangleName='   ';
		    	interactiveObj.angleValueString='||';
		    	interactiveObj.sideValueString=interactiveObj.sideString[interactiveObj.i];
		    	interactiveObj.rotateoffsetAngle=interactiveObj.T_rotation[interactiveObj.i];
		    	interactiveObj.arcFlagString='||';
		    	interactiveObj.angleColorString='||';
		    	interactiveObj.sideColorString='black|black|black';
		    	interactiveObj.sideLabelString='||';

			
				drawTriangle(
		    	interactiveObj.canvasId,
		    	interactiveObj.startPos,
		    	interactiveObj.endPos,	
		    	interactiveObj.scaleFactor,
		    	interactiveObj.triangleName,
		    	interactiveObj.angleValueString,
		    	interactiveObj.sideValueString,
		    	interactiveObj.rotateoffsetAngle,
		    	interactiveObj.arcFlagString,
		    	interactiveObj.angleColorString,
		    	interactiveObj.sideColorString,
		    	interactiveObj.sideLabelString)

			context[interactiveObj.i].closePath();
		}
	
	}
}
questionInteractive.prototype.rotateAntiClockwise=function()
{
	//turn 1degree anticlockwise
	angle-=1;
	rotate("#scale",angle);
}
questionInteractive.prototype.rotateAntiClockwise10=function()
{
	//turn 1degree anticlockwise
	angle-=10;
	rotate("#scale",angle);
}
questionInteractive.prototype.rotateClockwise1=function()
{
	//turn 1degree anticlockwise
	angle+=1;
	rotate("#scale",angle);
}
function rotate(id,angle)
{
	$(id).css({
		"transform": "rotate("+angle+"deg)",
	"-ms-transform": "rotate("+angle+"deg)", /* IE 9 */
	"-webkit-transform": "rotate("+angle+"deg)", /* Safari and Chrome */
	 "-o-transform": "rotate("+angle+"deg)", /* Opera */
   "-moz-transform": "rotate("+angle+"deg)" /* Firefox */
	});
}
questionInteractive.prototype.startProof=function()
{
	interactiveObj.Tcount=interactiveObj.triangleCount;
	interactiveObj.containerWidth=interactiveObj.Tcount*200+150;
	html='';
	
	$("#container").css('background-color','#D1EEEE');

	$("#container").css('width',interactiveObj.containerWidth+'px'); //setting container width
	containerResize();
	
	for(interactiveObj.i=0;interactiveObj.i<interactiveObj.Tcount;interactiveObj.i++) //canvas created
	{
		html+='<canvas id="myCanvas'+interactiveObj.i+'" width="200px" height="250px" class="canvas"></canvas>';
	
	}
	html+='<div id="scale"><img src=../assets/05.png></img></div>';

	html+='<div id="explain1" ><div class="proofButton" onclick=interactiveObj.ProofOne();><span>EXPLAIN</span></div></div>';
	html+='<div id="explain2" ><div class="proofButton" onclick=interactiveObj.ProofTwo();><span>EXPLAIN</span></div></div>';
	html+='<div id="explain3" ><div class="proofButton" onclick=interactiveObj.ProofThree();><span>EXPLAIN</span></div></div>';
	html+='<div id="explain4" ><div class="proofButton" onclick=interactiveObj.ProofFour();><span>EXPLAIN</span></div></div>';
	
	$("#container").html(html);

	$("#scale").css('position','absolute');
	$("#scale").css('top','379px');
	$("#scale").css('left','159px');

	for(interactiveObj.i=0;interactiveObj.i<interactiveObj.Tcount;interactiveObj.i++)  // context of each canvas created
	{
		canvas[interactiveObj.i] = document.getElementById('myCanvas'+interactiveObj.i);
		context[interactiveObj.i] = canvas[interactiveObj.i].getContext('2d');
	}

	//getting the coordinates of each canvas traingle

	/*if(interactiveObj.Tcount==2)
	{
		interactiveObj.sideString1=interactiveObj.side1[0]+interactiveObj.side2[0]+interactiveObj.side3[0];
		interactiveObj.sideString2=interactiveObj.side1[1]+interactiveObj.side2[1]+interactiveObj.side3[1];
	}
	if(interactiveObj.Tcount==3)
	{
		interactiveObj.sideString1=interactiveObj.side1[0]+interactiveObj.side2[0]+interactiveObj.side3[0];
		interactiveObj.sideString2=interactiveObj.side1[1]+interactiveObj.side2[1]+interactiveObj.side3[1];	
		interactiveObj.sideString3=interactiveObj.side1[2]+interactiveObj.side2[2]+interactiveObj.side3[2];	
	}*/
	if(interactiveObj.Tcount==4)
	{
		interactiveObj.sideString[0]=interactiveObj.side1[0]+"|"+interactiveObj.side2[0]+"|"+interactiveObj.side3[0];
		interactiveObj.sideString[1]=interactiveObj.side1[1]+"|"+interactiveObj.side2[1]+"|"+interactiveObj.side3[1];
		interactiveObj.sideString[2]=interactiveObj.side1[2]+"|"+interactiveObj.side2[2]+"|"+interactiveObj.side3[2];	
		interactiveObj.sideString[3]=interactiveObj.side1[3]+"|"+interactiveObj.side2[3]+"|"+interactiveObj.side3[3];

		interactiveObj.T_rotation[0]=interactiveObj.rotation[0];
		interactiveObj.T_rotation[1]=interactiveObj.rotation[1];
		interactiveObj.T_rotation[2]=interactiveObj.rotation[2];
		interactiveObj.T_rotation[3]=interactiveObj.rotation[3];

		interactiveObj.startX[0]=50;
		interactiveObj.startY[0]=50;

		interactiveObj.startX[1]=50;
		interactiveObj.startY[1]=50;

		interactiveObj.startX[2]=100;
		interactiveObj.startY[2]=210;

		interactiveObj.startX[3]=50;
		interactiveObj.startY[3]=50;

		
		for(interactiveObj.i=0;interactiveObj.i<interactiveObj.Tcount;interactiveObj.i++)
		{
			context[interactiveObj.i].beginPath();

			context[interactiveObj.i].lineWidth='2';
			
				interactiveObj.canvasId='myCanvas'+interactiveObj.i;
				interactiveObj.startPos=interactiveObj.startX[interactiveObj.i];
				interactiveObj.endPos=interactiveObj.startY[interactiveObj.i];
				interactiveObj.scaleFactor=44;
				interactiveObj.triangleName='   ';
		    	interactiveObj.angleValueString='||';
		    	interactiveObj.sideValueString=interactiveObj.sideString[interactiveObj.i];
		    	interactiveObj.rotateoffsetAngle=interactiveObj.T_rotation[interactiveObj.i];
		    	interactiveObj.arcFlagString='||';
		    	interactiveObj.angleColorString='||';
		    	interactiveObj.sideColorString='black|black|black';
		    	interactiveObj.sideLabelString='||';

			
				drawTriangle(
		    	interactiveObj.canvasId,
		    	interactiveObj.startPos,
		    	interactiveObj.endPos,	
		    	interactiveObj.scaleFactor,
		    	interactiveObj.triangleName,
		    	interactiveObj.angleValueString,
		    	interactiveObj.sideValueString,
		    	interactiveObj.rotateoffsetAngle,
		    	interactiveObj.arcFlagString,
		    	interactiveObj.angleColorString,
		    	interactiveObj.sideColorString,
		    	interactiveObj.sideLabelString)

			context[interactiveObj.i].closePath();
		}
	
	}
}

questionInteractive.prototype.ProofOne=function()
{
	
	html='';
	angle=0;
	canvas[0] = document.getElementById('myCanvas'+0);
	context[0] = canvas[0].getContext('2d');

	$("#container").html(html);
	html+='<canvas id="myCanvas0" width="200px" height="250px" class="canvas"></canvas>';

	html+='<div id="measure1">z cm</div>';
	html+='<div id="measure2">x cm</div>';
	html+='<div id="measure3">y cm</div>';

	html+='<div id="backButton" class="proofButton" onclick=interactiveObj.startProof();><span>BACK</span></div>';

	html+='<div id="scale"><img src=../assets/05.png></img></div>';


	$("#container").html(html);

	//$("#myCanvas0").css('border','2px solid red');
	$("#myCanvas0").css('position','absolute');
	$("#myCanvas0").css('top','49px');
	$("#myCanvas0").css('left','299px');

	$("#scale").css('position','absolute');
	$("#scale").css('top','376px');
	$("#scale").css('left','299px');

	//$("#scale").draggable();
	context[0].beginPath();

			context[0].lineWidth='4';
			
				interactiveObj.canvasId='myCanvas'+0;
				interactiveObj.startPos=interactiveObj.startX[0];
				interactiveObj.endPos=interactiveObj.startY[0];
				interactiveObj.scaleFactor=44;
				interactiveObj.triangleName='   ';
		    	interactiveObj.angleValueString='||';
		    	interactiveObj.sideValueString=interactiveObj.sideString[0];
		    	interactiveObj.rotateoffsetAngle=interactiveObj.T_rotation[0];
		    	interactiveObj.arcFlagString='||';
		    	interactiveObj.angleColorString='||';
		    	interactiveObj.sideColorString='black|black|black';
		    	interactiveObj.sideLabelString='||';

			
				drawTriangle(
		    	interactiveObj.canvasId,
		    	interactiveObj.startPos,
		    	interactiveObj.endPos,	
		    	interactiveObj.scaleFactor,
		    	interactiveObj.triangleName,
		    	interactiveObj.angleValueString,
		    	interactiveObj.sideValueString,
		    	interactiveObj.rotateoffsetAngle,
		    	interactiveObj.arcFlagString,
		    	interactiveObj.angleColorString,
		    	interactiveObj.sideColorString,
		    	interactiveObj.sideLabelString)

	context[0].closePath();

	$("#scale").delay(500).animate(
	{
		'top':'224px'		
	},1000);
	$("#scale").delay(1000).animate(
	{
		'left':'406px'		
	},1000);
	$("#scale").delay(1500).animate(
	{
		'top':'249px'		
	},800);

	$("#measure1").delay(5000).animate(
	{
		'opacity':'1'		
	},500);

	$("#scale").delay(2000).animate(
	{
		'opacity':'0',
		'top':'376px',
		'left':'299px'			
	},10);

	$("#scale").delay(1000).animate(
	{
		'opacity':'1'
		
	},500);

	$("#scale").delay(1000).animate({
		'position': 'absolute',
		'top': '210px',
		'left': '597px'
	},1000)

	rotate1=setTimeout("interactiveObj.rotate1();",12000);

	$("#scale").delay(3800).animate({
		
		'top': '134px',
		'left': '520px'
	},1000)

	$("#scale").delay(4200).animate({
		
		'top': '104px',
		'left': '544px'
	},1000)

	$("#measure2").delay(21000).animate(
	{
		'opacity':'1'		
	},500);

	$("#scale").delay(1000).animate(
	{
		'opacity':'0',
		'top':'376px',
		'left':'299px'
		
	},500);
	resetRotate=setTimeout("interactiveObj.resetRotate();",24000);

	$("#scale").delay(1000).animate(
	{
		'opacity':'1'

	},10);

	$("#scale").delay(3000).animate(
	{
		'top':'128px',
		'left':'319px'
		
	},500);

	rotate2=setTimeout("interactiveObj.rotate2();",29000);

	$("#scale").delay(7000).animate(
	{
		'top':'145px',
		'left':'271px'
		
	},500);
	$("#measure3").delay(35000).animate(
	{
		'opacity':'1'	
	},50);
	$("#scale").animate(
	{
		'opacity':'0'
		
	},500);
}
questionInteractive.prototype.ProofTwo=function()
{
	alert("In 2");
}
questionInteractive.prototype.ProofThree=function()
{
	alert("In 3");
}
questionInteractive.prototype.ProofFour=function()
{
	alert("In 4");
}
questionInteractive.prototype.rotate2=function()
{
	console.log("called"+interactiveObj.j)
	angle2+=1;
	if(interactiveObj.j<61)
	{
		interactiveObj.j++;
		$("#scale").css({
		"transform": "rotate("+angle2+"deg)",
	"-ms-transform": "rotate("+angle2+"deg)", /* IE 9 */
	"-webkit-transform": "rotate("+angle2+"deg)", /* Safari and Chrome */
	 "-o-transform": "rotate("+angle2+"deg)", /* Opera */
   "-moz-transform": "rotate("+angle2+"deg)" /* Firefox */
	});	


		clearTimeout(rotate2);
		rotate2=setTimeout("interactiveObj.rotate2();",50);
	}
	else
	{
		clearTimeout(rotate2);
		//rotate1=setTimeout("interactiveObj.rotate1();",50);	
	}
}
questionInteractive.prototype.resetRotate=function()
{
	$("#scale").css({
		"transform": "rotate(0deg)",
	"-ms-transform": "rotate(0deg)", /* IE 9 */
	"-webkit-transform": "rotate(0deg)", /* Safari and Chrome */
	 "-o-transform": "rotate(0deg)", /* Opera */
   "-moz-transform": "rotate(0deg)" /* Firefox */
	});
}
questionInteractive.prototype.rotate1=function()
{
	angle-=1;
	if(interactiveObj.i<155)
	{
		interactiveObj.i++;
		$("#scale").css({
		"transform": "rotate("+angle+"deg)",
	"-ms-transform": "rotate("+angle+"deg)", /* IE 9 */
	"-webkit-transform": "rotate("+angle+"deg)", /* Safari and Chrome */
	 "-o-transform": "rotate("+angle+"deg)", /* Opera */
   "-moz-transform": "rotate("+angle+"deg)" /* Firefox */
	});	


		clearTimeout(rotate1);
		rotate1=setTimeout("interactiveObj.rotate1();",50);
	}
	else
	{
		clearTimeout(rotate1);
		//rotate1=setTimeout("interactiveObj.rotate1();",50);	
	}
}