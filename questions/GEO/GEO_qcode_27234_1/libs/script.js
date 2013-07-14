var questionInteractive;
var html='';
var interactiveObj;
var angle=0;
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
	html+='<div id="scaleHolder"><div id="scale"></div></div>';

	html+='<div class="points">';
	html+='<div id="pointM" class="circle"><div class="mark">'+promptArr['txt_M']+'</div></div>';
	html+='<div id="pointS" class="circle"><div class="mark">'+promptArr['txt_S']+'</div></div>';
	html+='<div id="pointN" class="circle"><div class="mark">'+promptArr['txt_N']+'</div></div>';
	html+='<div id="pointL" class="circle"><div class="mark">'+promptArr['txt_L']+'</div></div>';
	html+='<div id="pointT" class="circle"><div class="mark">'+promptArr['txt_T']+'</div></div>';
	html+='<div id="pointP" class="circle"><div class="mark">'+promptArr['txt_P']+'</div></div>';
	html+='</div>';

	html+='<div id="text1">'+promptArr['txt_1']+'</div>';
	html+='<div id="text2">'+promptArr['txt_2']+'</div>';
	html+='<div id="text3">'+promptArr['txt_3']+'</div>';

	html+='<div id="buttons">';
	html+='<div id="anticlockwise" class="button1"></div>';
	html+='<div id="clockwise10" class="button2"></div>';
	html+='<div id="clockwise" class="button3"></div>';
	html+='</div>';

	$("#container").html(html);
	
	$("#scaleHolder").draggable({
		containment:"#body"
	});

	$(".button1").on('mouseenter touchstart',function(){
  	$("#text1").animate({"opacity": "1"},200);
	});
	$(".button1").on('mouseleave touchout',function(){
	  $("#text1").animate({"opacity": "0"},200);
	});

	$(".button2").on('mouseenter touchstart',function(){
  	$("#text2").animate({"opacity": "1"},200);
	});
	$(".button2").on('mouseleave touchout',function(){
	  $("#text2").animate({"opacity": "0"},200);
	});

	$(".button3").on('mouseenter touchstart',function(){
  	$("#text3").animate({"opacity": "1"},200);
	});
	$(".button3").on('mouseleave touchout',function(){
	  $("#text3").animate({"opacity": "0"},200);
	});

	var timer1;
	$("#anticlockwise").on('mousedown touchstart',function() {
	 timer1 = setInterval("interactiveObj.rotateAntiClockwise();",50);
	}).on('mouseup touchend',function() {
	  clearInterval(timer1);  
	}).on('mouseout touchout',function() {
	  clearInterval(timer1);  
	})

	var timer1;
	$("#clockwise10").on('mousedown touchstart',function() {
	 timer1 = setInterval("interactiveObj.rotateAntiClockwise10();",50);
	}).on('mouseup touchend',function() {
	  clearInterval(timer1);  
	}).on('mouseout touchout',function() {
	  clearInterval(timer1);  
	})

		var timer1;
	$("#clockwise").on('mousedown touchstart',function() {
	 timer1 = setInterval("interactiveObj.rotateClockwise1();",50);
	}).on('mouseup touchend',function() {
	  clearInterval(timer1);  
	}).on('mouseout touchout',function() {
	  clearInterval(timer1);  
	})


}

questionInteractive.prototype.rotateAntiClockwise=function()
{
	//turn 1degree anticlockwise
	angle-=1;
	rotate("#scaleHolder",angle);
	
}
questionInteractive.prototype.rotateAntiClockwise10=function()
{
	//turn 1degree anticlockwise
	angle-=10;
	rotate("#scaleHolder",angle);
	
}
questionInteractive.prototype.rotateClockwise1=function()
{
	//turn 1degree anticlockwise
	angle+=1;
	rotate("#scaleHolder",angle);
	
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
