var questionInteractive;
var html='';
var interactiveObj;
var html;
var angle=0;
var canvas;
var context;
var blink1;
var blink2;
var blink3;
var blink4;
var showAngle34;
var wedge;
var wedge2;
var wedge3;
var wedge4;
var layer;
var stage;
function questionInteractive()
{
	this.language=getParameters['language'];
	this.x=0;
  this.i=0;
  this.j=0;
  this.l=0;
  this.k=0;

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
}
questionInteractive.prototype.init=function()
{
	html='';

	html+='<div id="lineTop">';
		html+='<div id="lineTop_arrowStart" class="arrow_left"></div>';
		html+='<div id="Line" class="lineSegment"></div><span>'+replaceDynamicText(promptArr['txt_7'],interactiveObj.numberLanguage,"interactiveObj")+'</span>';
		html+='<div id="lineTop_arrowEnd" class="arrow_right"></div>';
	html+='</div>';

	html+='<div id="lineTop2">';
		html+='<div id="lineTop_arrowStart2" class="arrow_left"></div>';
		html+='<div id="Line2" class="lineSegment"></div><span>'+replaceDynamicText(promptArr['txt_8'],interactiveObj.numberLanguage,"interactiveObj")+'</span>';
		html+='<div id="lineTop_arrowEnd2" class="arrow_right"></div>';
	html+='</div>';


	html+='<div id="lineTop3">';
		html+='<div id="lineTop_arrowStart3" class="arrow_left"></div>';
		html+='<div id="Line3" class="lineSegment"></div><span id="labelDiagonal">'+replaceDynamicText(promptArr['txt_9'],interactiveObj.numberLanguage,"interactiveObj")+'</span>';
		html+='<div id="lineTop_arrowEnd3" class="arrow_right"></div>';
	html+='</div>';

  html+='<div id="textLineOne">'+replaceDynamicText(promptArr['txt_1'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
  html+='<div id="textLineTwo">'+promptArr['txt_2']+'</div>';

  html+='<div id="label1">'+replaceDynamicText(promptArr['txt_3'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
  html+='<div id="label2">'+replaceDynamicText(promptArr['txt_4'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
  html+='<div id="label3">'+replaceDynamicText(promptArr['txt_5'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
  html+='<div id="label4">'+replaceDynamicText(promptArr['txt_6'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';

  html+='<div id="replayButton" class="replay" onclick="interactiveObj.replay()"></div>';

	$("#container").html(html);
  containerResize();
  $("#textLineOne").delay(2000).animate({'opacity':'1'},200);

  $("#label1").delay(4000).animate({'opacity':'1'},200); 
  $("#label3").delay(4000).animate({'opacity':'1'},200); 

  $("#label2").delay(10000).animate({'opacity':'1'},200); 
  $("#label4").delay(10000).animate({'opacity':'1'},200); 

   $("#textLineTwo").delay(9000).animate({'opacity':'1'},200);

  getAngles=setTimeout("interactiveObj.getAngles();",4000);
  blinkLabels=setTimeout("interactiveObj.blinkLabels();",4500);
  blinkSecondLabels=setTimeout("interactiveObj.blinkSecondLabels();",11500)
}
questionInteractive.prototype.blinkSecondLabels=function()
{
  $("#label2").delay(500).animate({'opacity':'0'},170); 
    $("#label4").delay(500).animate({'opacity':'0'},170); 
   $("#label2").animate({'opacity':'1'},170); 
    $("#label4").animate({'opacity':'1'},170); 
   $("#label2").animate({'opacity':'0'},170); 
    $("#label4").animate({'opacity':'0'},170); 
   $("#label2").animate({'opacity':'1'},170);
    $("#label4").animate({'opacity':'1'},170); 
   $("#label2").animate({'opacity':'0'},170); 
    $("#label4").animate({'opacity':'0'},170); 
   $("#label2").animate({'opacity':'1'},170); 
    $("#label4").animate({'opacity':'1'},170); 
   $("#label2").animate({'opacity':'0'},170); 
    $("#label4").animate({'opacity':'0'},170); 
   $("#label2").animate({'opacity':'1'},170); 
    $("#label4").animate({'opacity':'1'},170); 
   $("#label2").animate({'opacity':'0'},170);
    $("#label4").animate({'opacity':'0'},170);
   $("#label2").animate({'opacity':'1'},170); 
    $("#label4").animate({'opacity':'1'},170);  

    clearTimeout(blinkSecondLabels);
}
questionInteractive.prototype.blinkLabels=function()
{
   $("#label1").delay(500).animate({'opacity':'0'},170); 
    $("#label3").delay(500).animate({'opacity':'0'},170); 
   $("#label1").animate({'opacity':'1'},170); 
    $("#label3").animate({'opacity':'1'},170); 
   $("#label1").animate({'opacity':'0'},170); 
    $("#label3").animate({'opacity':'0'},170); 
   $("#label1").animate({'opacity':'1'},170);
    $("#label3").animate({'opacity':'1'},170); 
   $("#label1").animate({'opacity':'0'},170); 
    $("#label3").animate({'opacity':'0'},170); 
   $("#label1").animate({'opacity':'1'},170); 
    $("#label3").animate({'opacity':'1'},170); 
   $("#label1").animate({'opacity':'0'},170); 
    $("#label3").animate({'opacity':'0'},170); 
   $("#label1").animate({'opacity':'1'},170); 
    $("#label3").animate({'opacity':'1'},170); 
   $("#label1").animate({'opacity':'0'},170);
    $("#label3").animate({'opacity':'0'},170);
   $("#label1").animate({'opacity':'1'},170); 
    $("#label3").animate({'opacity':'1'},170); 

    clearTimeout(blinkLabels); 
}
questionInteractive.prototype.getAngles=function()
{
    stage = new Kinetic.Stage({
        container: 'container',
        width: 610,
        height: 338
      });

       layer = new Kinetic.Layer();

       wedge = new Kinetic.Wedge({
        x:159,
        y:81,
        radius: 20,
        angleDeg: 62,
        fill: 'pink',
        stroke: 'black',
        strokeWidth: 1,
        rotationDeg: 0
      });
       wedge2 = new Kinetic.Wedge({
        x:156,
        y:81,
        radius: 25,
        angleDeg: 120,
        fill: 'orange',
        stroke: 'black',
        strokeWidth: 1,
        rotationDeg: 60
      });
        wedge3 = new Kinetic.Wedge({
        x:236.7,
        y:232,
        radius: 25,
        angleDeg: 62,
        fill: 'blue',
        stroke: 'black',
        strokeWidth: 1,
        rotationDeg: 180
      });
         wedge4 = new Kinetic.Wedge({
        x:238,
        y:232,
        radius: 25,
        angleDeg: 119,
        fill: 'cyan',
        stroke: 'black',
        strokeWidth: 1,
        rotationDeg: -119
      });
      // add the shape to the layer
      layer.add(wedge);
      layer.add(wedge2);
      layer.add(wedge3);
      layer.add(wedge4);

      wedge2.setOpacity(0);
      wedge3.setOpacity(0);
  
      stage.add(layer);

      blink1=setTimeout("interactiveObj.blink1();",1000);
      blink2=setTimeout("interactiveObj.blink2();",1000);
      showAngle34=setTimeout("interactiveObj.showAngle34();",6000);
      blink3=setTimeout("interactiveObj.blink3();",8000);
      blink4=setTimeout("interactiveObj.blink4();",8000);
}
questionInteractive.prototype.showAngle34=function()
{
  wedge2.setOpacity(1);
  layer.draw();
  wedge3.setOpacity(1);
  layer.draw();
}
questionInteractive.prototype.blink1=function()
{
  if(interactiveObj.i<=20)
  {
    if(interactiveObj.i%2==0)
    {
      wedge.setOpacity(1);
      layer.draw();
      clearTimeout(blink1);
      interactiveObj.i++;
      blink1=setTimeout("interactiveObj.blink1();",100);
    }
    else
    {
      wedge.setOpacity(0);
      layer.draw();
       clearTimeout(blink1);
       interactiveObj.i++;
      blink1=setTimeout("interactiveObj.blink1();",100);
    }
  }
  else
  {
    clearTimeout(blink1);
  }
}
questionInteractive.prototype.blink2=function()
{
  if(interactiveObj.j<=20)
  {
    if(interactiveObj.j%2==0)
    {
      wedge4.setOpacity(1);
      layer.draw();
      clearTimeout(blink2);
      interactiveObj.j++;
      blink2=setTimeout("interactiveObj.blink2();",100);
    }
    else
    {
      wedge4.setOpacity(0);
      layer.draw();
       clearTimeout(blink2);
       interactiveObj.j++;
      blink2=setTimeout("interactiveObj.blink2();",100);
    }
  }
  else
  {
    clearTimeout(blink2);
  }
}
questionInteractive.prototype.blink3=function()
{
  
  

  if(interactiveObj.k<=20)
  {
    if(interactiveObj.k%2==0)
    {
      wedge2.setOpacity(1);
      layer.draw();
      clearTimeout(blink3);
      interactiveObj.k++;
      blink3=setTimeout("interactiveObj.blink3();",100);
    }
    else
    {
      wedge2.setOpacity(0);
      layer.draw();
       clearTimeout(blink3);
       interactiveObj.k++;
      blink3=setTimeout("interactiveObj.blink3();",100);
    }
  }
  else
  {
    clearTimeout(blink3);
  }
}
questionInteractive.prototype.blink4=function()
{
  if(interactiveObj.l<=20)
  {
    if(interactiveObj.l%2==0)
    {
      wedge3.setOpacity(1);
      layer.draw();
      clearTimeout(blink4);
      interactiveObj.l++;
      blink4=setTimeout("interactiveObj.blink4();",100);
    }
    else
    {
      wedge3.setOpacity(0);
      layer.draw();
       clearTimeout(blink4);
       interactiveObj.l++;
      blink4=setTimeout("interactiveObj.blink4();",100);
    }
  }
  else
  {
    clearTimeout(blink4);

    showReplay=setTimeout("interactiveObj.showReplay();",1000);
  }
}
questionInteractive.prototype.replay=function()
{

  clearTimeout(blink1);
  clearTimeout(blink2);
  clearTimeout(blink3);
  clearTimeout(blink4);
  clearTimeout(showAngle34);

  interactiveObj = new questionInteractive();
  interactiveObj.init();
}
questionInteractive.prototype.showReplay=function()
{
  $("#replayButton").show();
}