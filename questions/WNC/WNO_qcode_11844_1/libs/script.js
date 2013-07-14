var interactiveObj;
var extraParameters="";
var result = 2;
var img;
var context;
var canvas;

var html="";



			
function questionInteractive()
{

	this.parameterNotSetFlag = 0;
	this.numRangeArr = new Array();
	
	this.length1=0;
			
	if(typeof getParameters['boardname']=="undefined")
	{
		alert('Parameter Missing'); 
		parameterMissing=true;
		$("#container").html("<h2><center>Enter Board Name</center></h2>");
		return;
	}
	else this.board = getParameters['boardname'];

 		 lang=getParameters['language'];
 
}

questionInteractive.prototype.init = function()

{

	//loadXML("xml.xml",function(){start();});

	interactiveObj.length1=parseInt(promptArr['text1'].length)+370;
	interactiveObj.length2=parseInt(promptArr['text2'].length)+370;
	
	
	if(interactiveObj.length1>interactiveObj.length2)
	{
		interactiveObj.final=interactiveObj.length1;  
	}
	else{
		interactiveObj.final=interactiveObj.length2;   
	}
	
	
	//alert(interactiveObj.length1);
	
	
	//var containerwidth= interactiveObj.width+interactiveObj.widthbutton+300+interactiveObj.final;
	var containerwidth=600;
	var containerheight=interactiveObj.height+50;
	
	
	
	html+='<div id="imageload" class=side><img id="image" src="../assets/'+interactiveObj.board+'"/></div>';
	html+='<div id="rules" style="float: left; display:inline"><p id="p1" style="display: none">'+promptArr['text1']+'<br/><br/>'+promptArr['text2']+'<br/><br/></p><button id="b1"  class="button">'+promptArr['text3']+'</button></div>';
	
	
		
	

	$("#container").html(html);
	$("#container").css({'width':containerwidth,'height':containerheight});
	
	$("#b1").click(function(){
   		 $("#p1").slideToggle(200);
		if($(this).text()==promptArr['text3'])
		{
			$(this).text(promptArr['text4']);
			
		}
		else
		{
				$(this).text(promptArr['text3']);	
			
		}
    		//var text = $(this).text() == 'Rules' ? 'Back' : 'Rules';
    		//$(this).text(text).toggleClass("active");
		//$(this).text=text;

	});

}

questionInteractive.prototype.loadbody=function()
{
	
      
	var img=new Image();
	
	img.src="../assets/"+interactiveObj.board;
	img.onload=function()

	{
		interactiveObj.width=this.width;
		interactiveObj.height=this.height;
		var img2=new Image();
	
		img2.src="../assets/d.png";
		img2.onload=function()

		{
			interactiveObj.widthbutton=this.width;
			interactiveObj.heightbutton=this.height;
	
			interactiveObj.init();

		}

	}
	
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

	
	/*if("#b1".text()=="Back")
	{
	("#b1").text("Rules");
	}
	else
	{
	$("#b1").text("Back");	
	}*/
	
							

