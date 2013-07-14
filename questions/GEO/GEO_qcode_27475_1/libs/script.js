var questionInteractive;
var html='';
var interactiveObj;
var angle=0;
var zero;
var divHTML;
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
	

	html+='<div class="points">';
	
interactiveObj.divTop=10;
interactiveObj.divLeft=10;

	for(interactiveObj.i=0;interactiveObj.i<15;interactiveObj.i++)
	{
		for(interactiveObj.j=0;interactiveObj.j<15;interactiveObj.j++)
		{
			//create div over here
			html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px"></div>';
			
			$("#container").html(html);
			interactiveObj.divLeft+=25;

		}
		interactiveObj.divTop+=25;
		interactiveObj.divLeft=10;

	}
	html+='</div>';

	

	html+='<div id="coOrdinates">';
	html+='<div id="pointP" class="circle"><div class="text">P</div></div>';
	html+='<div id="pointQ" class="circle"><div class="text">Q</div></div>';
	html+='<div id="pointR" class="circle"><div class="text">R</div></div>';
	html+='<div id="pointS" class="circle"><div class="text">S</div></div>';
	html+='<div id="pointT" class="circle"><div class="text">T</div></div>';
	html+='<div id="pointU" class="circle"><div class="text">U</div></div>';
	html+='<div id="pointV" class="circle"><div class="text">V</div></div>';
	html+='<div id="pointW" class="circle"><div class="text">W</div></div>';
	html+='<div id="pointX" class="circle"><div class="text">X</div></div>';
	html+='<div id="pointY" class="circle"><div class="text">Y</div></div>';

	html+='</div>';


	html+='<div id="text1">'+promptArr['txt_1']+'</div>';
	html+='<div id="text2">'+promptArr['txt_2']+'</div>';
	html+='<div id="text3">'+promptArr['txt_3']+'</div>';

	html+='<div id="buttons">';
	html+='<div id="anticlockwise" class="button1"></div>';
	html+='<div id="clockwise10" class="button2"></div>';
	html+='<div id="clockwise" class="button3"></div>';
	html+='</div>';

	html+='<div id="scaleHolder"><div id="scale"></div></div>';

	$("#container").html(html);
	$("#scaleHolder").draggable({
		containment:"#container"
	});
	containerResize();
	
	

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


      $(".divBlock").bind("mouseenter touchstart", function () {
          divHTML = $(this).attr('id');
          	$("#"+divHTML).animate({'opacity':'1'},200);
          	$("#"+divHTML).addClass('rightAnswer');

        });

       $(".divBlock").bind("mouseout touchout", function () {
          divHTML = $(this).attr('id');
          	$("#"+divHTML).animate({'opacity':'0.2'},300);
          	$("#"+divHTML).removeClass('rightAnswer');

        });


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
