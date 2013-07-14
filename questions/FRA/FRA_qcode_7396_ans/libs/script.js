var interactiveObj;
var extraParameters="";
var result = 2;
var imgObj;
var canvas;
var context;
var alpha=0;
var html="";
var html2="";
var loadimage;

function questionInteractive()

{
	this.parameterNotSetFlag = 0;
	this.numRangeArr = new Array();

	
	if(typeof getParameters['numberLanguage']=="undefined") 
	{
		this.numberLanguage = "english";
		
	}
	else this.numberLanguage = getParameters['numberLanguage'];

	if(typeof getParameters['language']=="undefined")
	
	this. language = "english";
	
	else 
	{
		this.language = getParameters['language'];
	}


	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
}


questionInteractive.prototype.init=function()
{
	loadXML("xml.xml",function(){
			start();
		});
		
	 alpha=0;
	var imgObj=new Image();

	html='<div id="textright">'+promptArr['text1']+'</div>';
	
	html2='<div id="textleft"> <div class="fraction"><div id="a1"><div class="frac numerator">9</div><div class="frac">12</div></div><div id="t2">'+promptArr['text2']+'</div><div id="a2"><div class="frac numerator">3</div><div class="frac">4</div></div></div></div>';
	
	
	
	loadarrow=setTimeout("interactiveObj.loadarrow();",2500);
	
	$("#left").html(html2);
	$("#right").html(html);
	
	$("#textleft").delay(2000).animate({'opacity':'1'},500);
	$("#textright").delay(2000).animate({'opacity':'1'},500);
	
	$('#replayButton').delay(3000).animate({
			opacity:1
		}, 100);
	
	imgObj.src="../assets/choco.png";
	imgObj.onload=function()
	{
		context.beginPath();
		context.drawImage(imgObj,110,20);
		context.closePath();
		loadimage=setTimeout("interactiveObj.fading();",1000);
	}
	
	
	
}

questionInteractive.prototype.loadarrow=function()
{

	var imagearrow=new Image();
	imagearrow.src="../assets/arrow.png";
	imagearrow.onload=function()
	{
		context.beginPath();
		context.drawImage(imagearrow,40,60);
		context.closePath();
	}
	
	clearTimeout(loadarrow);
}

questionInteractive.prototype.fading=function()
{
	

	if(alpha<0.5)
	{
		context.fillStyle = "rgba(255,255,255, "+alpha+")";
		context.fillRect(110,20,117,123.5);
		alpha+=0.1;
		context.fill();	
		context.closePath();
	
		loadimage=setTimeout("interactiveObj.fading();",100);
	}
	else{
		clearTimeout(loadimage);
	}

}
function start()
{
	return ;  
    
}
questionInteractive.prototype.animate=function()
{
	$('#replayButton').delay(10).animate({
			opacity:0
		}, 100);
	
	clearTimeout(loadimage);
	clearTimeout(loadarrow);
	
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



