var interactiveObj;
var extraParameters="";
var result = 2;
var imgsrc;

function questionInteractive()

{
	this.parameterNotSetFlag = 0;
	this.numRangeArr = new Array();
	this.firstno=0;
	this.secondno=0;
	this.operation=0;
	this.result=0;	
	this.counter=0;
	this.counter2=0;
	
	if(typeof getParameters['numberLanguage']=="undefined") 
		this.numberLanguage = "english";
	else 
		this.numberLanguage = getParameters['numberLanguage'];
	
	
	if(typeof getParameters['firstno']=="undefined")
	{ 
		this.parameterNotSetFlag=1;
		alert("Set First No:-");
		$("#container").html("<h2><center>Parameter --First Number--Not Set</center></h2>");
	}
	else 
	{
		this.firstno = parseInt(getParameters['firstno']);   //sets the first number
		
	}

	//---------------------------------
	
	if(typeof getParameters['secondno']=="undefined")
	{ 
		this.parameterNotSetFlag=1;
		alert("Set Second No:-");
		$("#container").html("<h2><center>Parameter --Second Number--Not Set</center></h2>");
	}
	else this.secondno = parseInt(getParameters['secondno']);  //sets the second number	

	//---------------------------------
	
	if(typeof getParameters['operation']=="undefined")
	{ 
		this.parameterNotSetFlag=1;
		alert("Set operation:-");
		$("#container").html("<h2><center>Parameter --operation--Not Set</center></h2>");
	}
	else this.operation = getParameters['operation'];	//sets the operation
	
	
	
	if(typeof getParameters['delay']=="undefined")
	{ 
		this.parameterNotSetFlag=1;
		alert("Set Delay:-");
		$("#container").html("<h2><center>Parameter --operation--Not Set</center></h2>");
	}
	else this.delay = (parseInt(getParameters['delay'])*1000);

	
	
	/*lang=getParameters['numberLanguage'];*/

}

questionInteractive.prototype.init = function()
{
	//printresult();
	
	if(interactiveObj.parameterNotSetFlag==0)
	{
		
		interactiveObj.printresult();
	
	}
	else 
	{
		return false;
	}
}
// -------------- fucntion.init Closure
questionInteractive.prototype. printresult=function()
{
	var img= new Image();
	img.src="../assets/questionmark.png";
	img.onload=function()
	{
		interactiveObj.width=this.width;
		interactiveObj.height=this.height;
		
		/*interactiveObj.loadbody();*/
		interactiveObj.countdigits();
	}
	

}


questionInteractive.prototype.countdigits=function()
{
	
	interactiveObj.a=interactiveObj.firstno;
	interactiveObj.b=interactiveObj.secondno;
	
	while (interactiveObj.a > 0 )

      {
         interactiveObj.a =parseInt(interactiveObj.a / 10);
         interactiveObj.counter++;
      }
	
      
	
	while (interactiveObj.b > 0 )

      {
         interactiveObj.b =parseInt(interactiveObj.b / 10);
         interactiveObj.counter2++;
      }
	// alert(interactiveObj.counter); alert(interactiveObj.counter2);

	interactiveObj.loadbody();
}

questionInteractive.prototype.loadbody=function()
{
	
	var html="";
	
	interactiveObj.letterwidth=(interactiveObj.counter+interactiveObj.counter2)*65;
	
	//alert(interactiveObj.letterwidth);
	
	interactiveObj.containerwidth=interactiveObj.width+150+interactiveObj.letterwidth;
	interactiveObj.containerheight=interactiveObj.height+100;
	
	//alert(interactiveObj.containerwidth);
	
	
	html+='<div id="firstnumber"class="no">'+changeLanguage(interactiveObj.firstno,interactiveObj.numberLanguage)+'</div>';
	html+='<div id="operation" class="no">'+replace(interactiveObj.operation)+'</div>';
	html+='<div id="secondnumber"class="no">'+changeLanguage(interactiveObj.secondno,interactiveObj.numberLanguage)+'</div>';
	html+='<div id="assignment"class="no">=</div>';
	html+='<div id="symbol"class="image"></div>';
	
	
	$("#container").html(html);
	$("#container").css({'width':this.containerwidth,'height':this.containerheight});
	
	

	
	$("#container").animate({'opacity':'0'},interactiveObj.delay);
}


function replace(str)
{
	if(str=='add')
	{
		str='+';
	}
	else if(str=='sub')
	{
		str='-';
	}
	else if(str=='mult')
	{
		str='&#215;';
	}
	else if(str=='div')
	{

		str='/';
	}

		return str;

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
