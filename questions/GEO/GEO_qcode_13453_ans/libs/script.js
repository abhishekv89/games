var questionInteractive;
var html='';
var interactiveObj;
var html;

function questionInteractive()
{
	this.language=getParameters['language'];
	this.x=0;

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
	
	interactiveObj.width=4;
	interactiveObj.top=0;

	html="";
	html+='<div id="lineContainer">';
		html+='<div id="lineSegment"> </div>';
	
		
		html+='<div id="Arrow1">&#9668;</div>';
		
		html+='<div id="Point1"></div>';
		html+='<div id="pointP">'+promptArr['txt_1']+'</div>';
		html+='<div id="Point2"></div>';
		html+='<div id="Point3"></div>';
		html+='<div id="Point4"></div>';
		html+='<div id="Point5"></div>';
		html+='<div id="Point6"></div>';
		html+='<div id="pointR">'+promptArr['txt_3']+'</div>';
		html+='<div id="pointQ">'+promptArr['txt_2']+'</div>';
		html+='<div id="Arrow2">&#9658;</div>';

		html+='<div id="drawLine">';
		html+='<div id="startArrow">&#9668;</div>';
		html+='<div id="line"></div>';
		html+='<div id="endArrow">&#9658;</div>';
		html+='</div>';
	
	html+='</div>';

	$("#container").html(html);

	//$("#line").css('height',interactiveObj.lineHeight+'px');
	containerResize();

	setTimeout("drawLine()",500);
}
/*questionInteractive.prototype.drawLineWidth=function()
{
	$("#line").css('width',interactiveObj.lineHeight+'px');

	if(interactiveObj.width<500)
	{
		interactiveObj.width+=10;
		interactiveObj.top+=2;

		$("#line").css('width',interactiveObj.width+'px');
		$("#line").css('top',interactiveObj.top+'px');
		//$("#line").css('margin-top',interactiveObj.lineHeight+'px');

		clearTimeout(drawLineWidth);
		drawLineWidth=setTimeout("interactiveObj.drawLineWidth();",50);		
	}
	else
	{
		clearTimeout(drawLineWidth);
	}
}*/
function drawLine()
{
//top: 195->160
//width: 0-449
var temp1=195;
var temp2 = 0;
var time = setInterval(function(){
	temp2 = temp2+13;
	temp1 = temp1-1;
	$('#line').css('top',temp1+'px');
	$('#line').css('width',temp2+'px');
	if(temp2>430){
		clearInterval(time);
		$('#line').css('width','442px');
		//next();
	}
},100);
}


