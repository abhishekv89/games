var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;
var context;
var canvas;
var image;
var alpha=0;
var html="";
var html2="";

function questionInteractive() 
{

	if(typeof getParameters['showAnsFlag']=="undefined")
	{
		this.parameterNotSetFlag=1;
		this.showAnsFlag=0;
		//alert("Define showAnsFlag");
		//$("#container").html("<h2><center>Parameter showAnsFlag Not Set</center></h2>");
	}
	else this.showAnsFlag =getParameters['showAnsFlag'];


	this.lineB=0;
	this.lineC=0;
	
	this.language=getParameters['language'];
	
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
							
}

questionInteractive.prototype.init=function()
{

	alpha=0;
	
	/*loadXML("xml.xml",function(){
			start();
		});*/
	
	$('#replayButton').hide();
	
	image1= new Image();
	
	image1.src="../assets/image1.png";
	
	
	image1.onload=function()
	{
		
		context.beginPath();
	
		context.drawImage(image1,0,0,300,300);
	
		interactiveObj.imagewidth=this.width-208;
		interactiveObj.imageheight=this.height-208;
	
		context.closePath();

		if(interactiveObj.showAnsFlag==1)
		{
			drawStroke=setTimeout("interactiveObj.drawStroke();",1000);
			drawStroke2=setTimeout("interactiveObj.drawStroke2();",3000);	


		}	
		else
		{
			html='<div id="data">'+promptArr['text']+'</div>';
			html2+='<div id="Overlay"></div>';
			$("#text").html(html);
			$("#data").animate({'opacity':'1'},10);
			
			$("#container").append(html2);
			$("#Overlay").css('visibility','visible');

		}
	
	}
	
}
questionInteractive.prototype.drawStroke2=function()
{
	
	if(interactiveObj.lineC<=interactiveObj.imageheight/2)
	{
			
		//alert("drawing Line c");
	
		context.beginPath();
		
		context.moveTo(interactiveObj.lineC,interactiveObj.imageheight/2);
		
		interactiveObj.lineC+=4;
		context.lineTo(interactiveObj.lineC,interactiveObj.imageheight/2);	
		interactiveObj.lineC+8;
		context.lineWidth = 4;
		context.strokeStyle='black';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineC+=3;
		drawStroke2=setTimeout("interactiveObj.drawStroke2();",50);
	}
	else
	{
		clearTimeout(drawStroke2);
		
		fading=setTimeout("interactiveObj.fading();",1000);
	
	}

}
questionInteractive.prototype.fading=function()
{

	if(alpha<0.4)
	{
		
		context.beginPath();
		
			
		context.fillStyle = "rgba(255,255,255, " + alpha + ")";
		context.fillRect(0,151,interactiveObj.imagewidth/2,148);

		context.fill()
		context.closePath();
		alpha+=0.09;
	
		fading=setTimeout("interactiveObj.fading();",100);
	}
	else
	{
		
		clearTimeout(fading);
		
		html='<div id="data">'+promptArr['text']+'</div>';
		
		$("#text").html(html);
		$("#data").delay(150).animate({'opacity':'1'},500)
		
		/*$('#replayButton').delay(1500).animate({
		opacity:1
		}, 100);*/
		
		$('#replayButton').show();
		
		
		$('#data').delay(100).animate({
				opacity:1
			}, 100);
		
		
		
	}

	
}

questionInteractive.prototype.drawStroke=function()
{
	
	if(interactiveObj.lineB<=interactiveObj.imageheight)
	{
			
		//alert("drawing Line A");
	
		context.beginPath();
		
		context.moveTo(interactiveObj.imagewidth/2,interactiveObj.lineB);
		
		interactiveObj.lineB+=4;
		context.lineTo(interactiveObj.imagewidth/2,interactiveObj.lineB);	
		interactiveObj.lineB+8;
		context.lineWidth = 4;
		context.strokeStyle='black';
		
		context.stroke();
		context.closePath();	
	
		interactiveObj.lineB+=3;
		drawStroke=setTimeout("interactiveObj.drawStroke();",50);
	}
	else
	{
		clearTimeout(drawStroke);
	
	}
}

/*function start()
{
	return ;  
    
}*/
questionInteractive.prototype.animate=function()
{
	/*$('#replayButton').delay(10).animate({
	opacity:0
	}, 100);
	*/	
	$('#replayButton').hide();
		
	$('#data').delay(10).animate({
			opacity:0
		}, 100);

	
	clearTimeout(drawStroke);
	clearTimeout(drawStroke2);
	clearTimeout(fading);


	
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
