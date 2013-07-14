var questionInteractive;
var html='';
var interactiveObj;
var html;
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

	html="";

	html='<div id="basedraggable">';
		html+='<div id="perpendicular"></div>';
		html+='<div id="base"></div>';
	html+='</div>';//closure of base-draggable

	html+='<div id=buttons>';
		html+='<div id="buttonYellow" class="button1" mousedown="interactiveObj.rotateAntiClockwise();"></div>';
		html+='<div id="buttonRed" class="button2" mousedown="interactiveObj.rotateClockwise();" style="margin-left: 106px;"></div>';
		html+='<div id="text_1" class="text1">'+promptArr['txt_1']+'</div>';
		html+='<div id="text_2" class="text2">'+promptArr['txt_2']+'</div>';
	html+='</div>';



	html+='<div class="image"><img src="../assets/triangle.png"/></div>';

	$("#container").html(html);
	$("#basedraggable").draggable();

	containerResize();

	var timer1;
	$("#buttonYellow").on('mousedown touchstart',function() {
	 timer1 = setInterval("interactiveObj.rotateAntiClockwise();",50);
	}).on('mouseup touchend',function() {
	  clearInterval(timer1);  
	}).on('mouseout touchout',function() {
	  clearInterval(timer1);  
	})


	var timer2;
	$("#buttonRed").on('mousedown touchstart',function() {
	 timer2 = setInterval("interactiveObj.rotateClockwise();",50);
	}).on('mouseup touchend',function() {
	  clearInterval(timer2);  
	}).on('mouseout touchout',function() {
	  clearInterval(timer2);  
	})



}
questionInteractive.prototype.rotateAntiClockwise=function()
{
	angle-=2;
	rotate("#basedraggable",angle);
}
questionInteractive.prototype.rotateClockwise=function()
{
	angle+=2;
	rotate("#basedraggable",angle);
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
