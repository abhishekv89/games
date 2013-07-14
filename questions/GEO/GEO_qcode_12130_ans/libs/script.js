var questionInteractive;
var interactiveObj;
var canvas;
var context;
var  point1_x;
var  point1_y;
function questionInteractive()
{


if(typeof getParameters['numberLanguage']=="undefined")
{
	this.numberLanguage='english'; 
}
else this.numberLanguage=getParameters['numberLanguage'];
//------------//

if(typeof getParameters['language']=="undefined")
{
	this.language='english'; 
}
else this.language=getParameters['language'];
//------------//

if (typeof getParameters['showEqualSides'] == "undefined")
{
    this.parameterNotSetFlag = 1;

   $("#container").html("<h2><center>Parameter showEqualSides Not Set.</center></h2>");
    return;
}
else this.showEqualSides = getParameters['showEqualSides'];
//------------//

if (typeof getParameters['side'] == "undefined")
{
    this.parameterNotSetFlag = 1;
      
    $("#container").html("<h2><center>Parameter side Not Set.</center></h2>");
    return;
}
else this.side = getParameters['side'];
//------------//
    
if (typeof getParameters['points'] == "undefined")
{
	this.parameterNotSetFlag = 1;
       
	$("#container").html("<h2><center>Parameter points Not Set.</center></h2>");
    return;
}
else this.points = getParameters['points'].split('|');

  //------------//  

if (typeof getParameters['blinkAngle'] == "undefined")
{
   	this.parameterNotSetFlag = 1;

        $("#container").html("<h2><center>Parameter blinkAngle Not Set.</center></h2>");
        return;
}
else this.blinkAngle = getParameters['blinkAngle'];

//------------//
if (typeof getParameters['rotation'] == "undefined")
{
    this.parameterNotSetFlag = 1;
     
    $("#container").html("<h2><center>Parameter rotation Not Set.</center></h2>");
    return;
}
else this.rotation = getParameters['rotation'];

//------------//


    canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

}

questionInteractive.prototype.init=function()
{
	
	interactiveObj.PString=interactiveObj.points[0]+interactiveObj.points[1]+interactiveObj.points[2];
	
	interactiveObj.canvasId=canvas.id;
	interactiveObj.startX=100;
	interactiveObj.startY=250;
	interactiveObj.scaleFactor=44;
	interactiveObj.triangleName=interactiveObj.PString;
	interactiveObj.angleValueString='||';
	interactiveObj.sideValueString=interactiveObj.side;
	interactiveObj.rotateoffsetAngle='';
	interactiveObj.arcFlagString='1|1|1';
	interactiveObj.angleColorString='red|blue|green';
	interactiveObj.sideColorString='black|black|black';
	interactiveObj.sideLabelString='||';


	interactiveObj.sideNo='2';
	interactiveObj.noOfTimes=5;
	interactiveObj.angleNo='2';


context.beginPath();

	interactiveObj.tempCoord=drawTriangle(
	    	interactiveObj.canvasId,
	    	interactiveObj.startX,
	    	interactiveObj.startY,	
	    	interactiveObj.scaleFactor,
	    	interactiveObj.triangleName,
	    	interactiveObj.angleValueString,
	    	interactiveObj.sideValueString,
	    	interactiveObj.rotateoffsetAngle,
	    	interactiveObj.arcFlagString,
	    	interactiveObj.angleColorString,
	    	interactiveObj.sideColorString,
	    	interactiveObj.sideLabelString).split('|');

//interactiveObj.temp=interactiveObj.temp.split('|');
interactiveObj.doubleArc=interactiveObj.tempCoord[1];
interactiveObj.doubleArc=interactiveObj.doubleArc.split(',');

 point1_x=parseFloat(interactiveObj.doubleArc[0]);
 point1_y=parseFloat(interactiveObj.doubleArc[1]);

	
	window.setTimeout("interactiveObj.sideblink();",600);
	window.setTimeout("interactiveObj.angleblink();",500);

context.closePath();

context.beginPath();


 /* if (interactiveObj.rotateoffsetAngle=='')
  {
		context.moveTo(point1_x,point1_y);
		context.arc(point1_x, point1_y, 20, ang2Value, ang2Value + ang1Value, false);
		context.closePath();
	
		context.stroke();
	
  }*/
    
    context.closePath();
 
}

questionInteractive.prototype.sideblink=function()
{
	interactiveObj.sideColorString='black|red|black';
	
	blinkSide(interactiveObj.sideNo,
			interactiveObj.noOfTimes,
			interactiveObj.canvasId,
	    	interactiveObj.startX,
	    	interactiveObj.startY,	
	    	interactiveObj.scaleFactor,
	    	interactiveObj.triangleName,
	    	interactiveObj.angleValueString,
	    	interactiveObj.sideValueString,
	    	interactiveObj.rotateoffsetAngle,
	    	interactiveObj.arcFlagString,
	    	interactiveObj.angleColorString,
	    	interactiveObj.sideColorString,
	    	interactiveObj.sideLabelString);
	window.clearTimeout();

	interactiveObj.sideColorString='black|black|black';
}
questionInteractive.prototype.angleblink=function()
{
	interactiveObj.angleColorString='red|white|green';

	blinkAngle(interactiveObj.angleNo,
			interactiveObj.noOfTimes,
			interactiveObj.canvasId,
	    	interactiveObj.startX,
	    	interactiveObj.startY,	
	    	interactiveObj.scaleFactor,
	    	interactiveObj.triangleName,
	    	interactiveObj.angleValueString,
	    	interactiveObj.sideValueString,
	    	interactiveObj.rotateoffsetAngle,
	    	interactiveObj.arcFlagString,
	    	interactiveObj.angleColorString,
	    	interactiveObj.sideColorString,
	    	interactiveObj.sideLabelString);

	window.clearTimeout();
	interactiveObj.angleColorString='red|blue|green';
}