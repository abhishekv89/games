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
var html="";
var html2="";

var imageFlag=new Image();

function questionInteractive() 
{

	if(typeof getParameters['lineEndLabel']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Define lineEndLabel");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.lineEndLabel =getParameters['lineEndLabel'];
	
	this.language=getParameters['language'];
	
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.loadimage=function()
{
	loadXML("xml.xml",function(){
			start();
		});
	
	var imageObj = new Image();
	imageFlag=new Image();
	
	imageFlag.src="../assets/flag.png";
	
	imageObj.src="../assets/start.png";
	
	
	html2='<div id="start">'+promptArr['start']+'</div>';
	$("#startflag").html(html2);
	
	interactiveObj.s1=promptArr['point1'];
	interactiveObj.s2=promptArr['point2'];
	interactiveObj.s3=promptArr['point3'];
	
	imageObj.onload=function()
	{
		
		
		
		interactiveObj.containerwidth=this.width;
		interactiveObj.containerheight=this.height;
		
		context.drawImage(imageObj, 2, 0);
	
		
		
		context.beginPath();
		
		context.lineWidth = 2;
		
	
		
		context.moveTo(3, 80);   //complete track
		context.lineTo(450,80);
		
		context.font = 'bold 17px Calibri';
		
		
		context.moveTo(2,50);   //start 
		context.lineTo(2,100);
		
		context.moveTo(450,50); //end
		context.lineTo(450,100);
		
		
		
		context.moveTo(223,60); //arrow head
		context.lineTo(215,50);
			 
			context.fillText(interactiveObj.s1, 218, 30);
			
			context.moveTo(223,35);
			context.lineTo(223,60);  //1st checkpoint
			
		context.moveTo(223,60); //arrow head
		context.lineTo(230,50);
		
		

		context.moveTo(375,50); // second arrow head
		context.lineTo(385,60);
			
			context.fillText(interactiveObj.s2, 385, 30);
			
			context.moveTo(385,35);
			context.lineTo(385,60);  //2nd checkpoint
		
		context.moveTo(385,60); // second arrow head
		context.lineTo(395,50);
		
		
		
		context.moveTo(440,30); // third arrow head
		context.lineTo(450,40);
		
				context.fillText(interactiveObj.s3, 444, 18);
				
				context.moveTo(450,22);
				context.lineTo(450,40);  //3rd checkpoint
	
		context.moveTo(450,40); // third arrow head
		context.lineTo(460,30);
		
		
		context.stroke();
		
		
		interactiveObj.lineB=0;
		
		context.closePath();
		
	}
	
	imageFlag.onload=function()
	{	
		//alert("inside Image flag");
		
		interactiveObj.drawLine();
	}
		
	
}

questionInteractive.prototype.drawLine=function()
{
	
	if(interactiveObj.lineEndLabel=='a' || interactiveObj.lineEndLabel=='A')
	{
		drawA=setInterval("interactiveObj.drawLineA();",50);
	}
	
	if(interactiveObj.lineEndLabel=='b'  || interactiveObj.lineEndLabel=='B')
	{
		drawB=setInterval("interactiveObj.drawLineB();",50);
	}
	
	if(interactiveObj.lineEndLabel=='c'  || interactiveObj.lineEndLabel=='C')
	{
		drawC=setInterval("interactiveObj.drawLineC();",50);
	}
	
}

questionInteractive.prototype.drawLineA=function()
{
	
	if(interactiveObj.lineB<=223)
	{
			
		//alert("drawing Line A");
	
		context.beginPath();
		
		context.moveTo(20,68);
		context.lineTo(interactiveObj.lineB,68);	
		context.lineWidth = 2;
		context.strokeStyle='red';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB+=3;
	}
	else
	{
		clearInterval(drawA);
		context.drawImage(imageFlag,452,5);	
		
		html+='<div id="flag">'+promptArr['finish']+'</div>';
		
		$("#finishflag").html(html);		
		
		$("#finishflag").animate({'opacity':'1'},10);
	
		$('#replayButton').delay(400).animate({
				opacity:1
			}, 100);
		
		
	}

}
	

questionInteractive.prototype.drawLineB=function()
{
	
	if(interactiveObj.lineB<=385)
	{
			
		//alert("drawing Line b");
	
		context.beginPath();
		
		context.moveTo(4,68);
		context.lineTo(interactiveObj.lineB,68);	
		context.lineWidth =2;
		context.strokeStyle='red';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB+=3;
	}
	else
	{
		clearInterval(drawB);
		context.drawImage(imageFlag,452,5);
		
		html+='<div id="flag">'+promptArr['finish']+'</div>';
		
		$("#finishflag").html(html);		
		
		$("#finishflag").animate({'opacity':'1'},10);
	
		$('#replayButton').delay(400).animate({
				opacity:1
			}, 100);

	}
	
	
}
questionInteractive.prototype.drawLineC=function()
{
	
	if(interactiveObj.lineB<=449)
	{
			
		//alert("drawing Line c");
	
		context.beginPath();
		
		context.moveTo(4,68);
		context.lineTo(interactiveObj.lineB,68);	
		context.lineWidth = 2;
		context.strokeStyle='red';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB+=3;
	}
	else
	{
		clearInterval(drawC);
		context.drawImage(imageFlag,452,5);
		
		html+='<div id="flag">'+promptArr['finish']+'</div>';
		
		$("#finishflag").html(html);		
		
		$("#finishflag").animate({'opacity':'1'},10);
	
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
		
		$('#finishflag').delay(10).animate({
			opacity:0
		}, 10);
	
	clearInterval(drawA);
	clearInterval(drawB);
	clearInterval(drawC);
	
	canvas.width=canvas.width;

	interactiveObj = new questionInteractive();
	interactiveObj.loadimage();
	
	
}
function start()
{
	return ;  
    
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