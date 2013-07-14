var interactiveObj;
var extraParameters="";
var result = 2;
var img;
var context;
var canvas;
var alpha;

function questionInteractive()

{
	this.parameterNotSetFlag = 0;
	this.numRangeArr = new Array();
	this.i=0;
	this.w=0;
	this.h=0;
	this.q=0;
	this.z=0;
	this.j=0;
	this.sum=0;
	this.strokecount=0;
	this.x=0;this.x1=0;
	this.y=0;this.y1=0;
	this.yy=0;
	this.xx=0;
	this.fadearea=0;
	this.namepos=35;
	this.fadeX=0;
	this.fadeY=0;
	this.a=0;
	this.xander=0;
	
	/*if(typeof getParameters['numberLanguage']=="undefined") this.numberLanguage = "english";
	else this.numberLanguage = getParameters['numberLanguage'];
	if(typeof getParameters['language']=="undefined") language = "english";
	else language = getParameters['language'];
	*/
	
	if(typeof getParameters['objectname']=="undefined")
	{ 
		this.parameterNotSetFlag=1;
		alert("Define Object");
		$("#container").html("<h2><center>Parameter --objectname--Not Set</center></h2>");
	}
	else this.objectname = getParameters['objectname'];
	
	//--------------	
	
	if(typeof getParameters['names']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define Names");
		$("#container").html("<h2><center>Parameter --names--Not Set</center></h2>");
	}
	else this.names =getParameters['names'].split("|");
	
	//----------------
	
	if(typeof getParameters['equalparts']=="undefined") 
	{
		this.parameterNotSetFlag=1; 
		alert("Defina Equal Parts");
		$("#container").html("<h2><center>Parameter --equalparts--Not Set</center></h2>");
	}
	else this.equalparts = getParameters['equalparts'].split("|");
	
	//-----------------
	
	if(typeof getParameters['partsfaded']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define Parts to be faded");
		$("#container").html("<h2><center>Parameter --partsfaded--Set</center></h2>");
	} 
	else this.partsfaded = getParameters['partsfaded'].split("|");
	
	//--------------------
	
	/*lang=getParameters['numberLanguage'];*/	

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
}
questionInteractive.prototype.init = function()
{
	if(interactiveObj.objectname=="choco")
	{
		img=[];

		interactiveObj.containerwidth= 120*interactiveObj.names.length;
		interactiveObj.containerheight=150;
	
		$("#container").css('width',interactiveObj.containerwidth);
		$("#container").css('height',interactiveObj.containerheight);
	
		$('#replayButton').css('width', interactiveObj.containerwidth);
		$("#replayButton").css('margin-left',interactiveObj.containerwidth-10);
		
		
		timerchocolate=setInterval("loadchoco();",2000);
	}
	else 
	{
		alert("Wrong Object Name");
		$("#container").html("<h2><center>Wrong Object Name</center></h2>");
	}
}
// -------------- fucntion.init Closure

function loadchoco()
{
	if(interactiveObj.i<interactiveObj.names.length)
	{
		img[interactiveObj.i] = new Image();
		var imageObj = img[interactiveObj.i];
		
		imageObj.src="../assets/chocoeven.png"; 
		//alert("image loaded");
		imageObj.onload =function()
		
		{
			context.drawImage(imageObj, interactiveObj.x,interactiveObj.y );
			
			context.font = 'bold 10pt Calibri';
			context.textAlign = 'center';
			context.fillStyle = 'black';
				
			context.fillText(interactiveObj.names[interactiveObj.i], interactiveObj.namepos,140);  // displays the name
			
			//context.fillText(promptArr["name"].replace("#name#",interactiveObj.names[interactiveObj.i].split("%20").join("")),interactiveObj.namepos,140);
		
			interactiveObj.namepos+=120;  	//for changing the name position of the object
			
			interactiveObj.w=imageObj.width;
			interactiveObj.h=imageObj.height;
			
			interactiveObj.q=interactiveObj.equalparts[interactiveObj.z];  // saved the no of equal parts 
			interactiveObj.sum=(interactiveObj.q/2)+1;
			interactiveObj.strokecount=interactiveObj.q-interactiveObj.sum;    //strokes to be drawn on the Image
	
				//alert(interactiveObj.xx);
	
			interactiveObj.yy=interactiveObj.h/(interactiveObj.strokecount+1);
			interactiveObj.x1+=interactiveObj.w;
	
				//alert(interactiveObj.x1);
	
			interactiveObj.y1=interactiveObj.h/(interactiveObj.strokecount+1);

			for(interactiveObj.j=0;interactiveObj.j<interactiveObj.strokecount;interactiveObj.j++)
			{	
					
				context.beginPath();
				context.moveTo(interactiveObj.xx, interactiveObj.yy);
				context.lineTo(interactiveObj.x1,interactiveObj.y1);
				context.lineWidth = 2;
				context.strokeStyle='white';
				context.stroke();
		
				interactiveObj.yy+=interactiveObj.h/(interactiveObj.strokecount+1);
				interactiveObj.y1+=interactiveObj.h/(interactiveObj.strokecount+1);
			} 
			
			interval2=setInterval("fadechoco();",400);
		}
	}else clearInterval(timerchocolate);
}

function fadechoco()
{
	
	interactiveObj.a=interactiveObj.partsfaded[interactiveObj.i];
	interactiveObj.xander=interactiveObj.h/(interactiveObj.strokecount+1);
	interactiveObj.fadearea=interactiveObj.xander*interactiveObj.a;
	alpha=0.4;
	
	//-----------------------------//
	context.beginPath();
	context.rect(interactiveObj.fadeX, interactiveObj.fadeY, interactiveObj.w/2,interactiveObj.fadearea);   //context.rect(x, y, width, height);
	context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
	context.fill()
	context.closePath();
	
		interactiveObj.fadeX+=120;  //postition of next fade

		interactiveObj.xx+=120;
		interactiveObj.x1+=42;		 
	
		interactiveObj.x+=120;  // position of next image
		interactiveObj.z++;
		interactiveObj.i++; //loads the next image
	
		//increments done		
		//clearInterval(intervalslow);
		clearInterval(interval2);
		
		clearInterval(timerchocolate);
		timerchocolate=setInterval("loadchoco();",1000);
	
	//-----------------------------//
	//intervalslow=setInterval("fadeslow();",100);
//code code<>	
}


/*function fadeslow()
{
	
	context.beginPath();
	context.rect(interactiveObj.fadeX, interactiveObj.fadeY, interactiveObj.w/2,interactiveObj.fadearea);   //context.rect(x, y, width, height);
	context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
	context.fill()
	context.closePath();
	if(alpha>0.1)
	{
		alpha-=0.1;
	}
	else
	{

		interactiveObj.fadeX+=120;  //postition of next fade

		interactiveObj.xx+=120;
		interactiveObj.x1=120;		 
	
		interactiveObj.x+=120;  // position of next image
		interactiveObj.z++;
		interactiveObj.i++; //loads the next image
	
		//increments done		
		clearInterval(intervalslow);
		clearInterval(interval2);
		
		clearInterval(timerchocolate);
		timerchocolate=setInterval("loadchoco();",2000);
	}
}*/

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

questionInteractive.prototype.animate=function()
{	
	
	//clearInterval(intervalslow);
	clearInterval(timerchocolate);
	clearInterval(interval2);
	canvas.width=canvas.width;
	interactiveObj= new questionInteractive();
	interactiveObj.init();
	
}