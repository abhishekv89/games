var questionInteractive;
var html='';
var interactiveObj;
var html;
var angle=0;
var x;
var y;
var temp;
var angleBase=0;
var angleHypotnuse=0;
var angleppd=0;
var bcolor='white';
var angleRotate=0;
var angleRotate2=0;
var angleRotate3=0;
var angleRotate4=0;
var angleRotate5=0;
var angleRotate6=0;
var angleRotate7=0;
var angleRotat7=0;
function questionInteractive()
{
	this.language=getParameters['language'];
	this.x=0;
	this.parameteNotSetFlag=0;
	this.counter=0;

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

	if(typeof getParameters['sides']=="undefined")
	{	
        this.parameteNotSetFlag=1;
        $("#container").html("<h2><center>Parameter sides Not Set</center></h2>");
        return;
	}
	else this.sides=getParameters['sides'].split('|');


	if(typeof getParameters['orientation']=="undefined")
	{	
        this.parameteNotSetFlag=1;
        $("#container").html("<h2><center>Parameter orientation Not Set</center></h2>");
        return;
	}
	else this.orientation=getParameters['orientation'];

	if(typeof getParameters['label']=="undefined")
	{	
       this.parameteNotSetFlag=1;
        $("#container").html("<h2><center>Parameter label Not Set</center></h2>");
        return;
	}
	else this.label=getParameters['label'].split('|');

	if(typeof getParameters['animType']=="undefined")
	{	
       this.parameteNotSetFlag=1;
        $("#container").html("<h2><center>Parameter animType Not Set</center></h2>");
        return;
	}
	else this.animType=getParameters['animType'];
}
questionInteractive.prototype.init=function()
{
	html='';
	$("#container").html(html);
	if(interactiveObj.parameteNotSetFlag == 0)
	{
		if(interactiveObj.animType==1)
		{
			interactiveObj.loadType1();
		}
		else if(interactiveObj.animType == 2)
		{
			interactiveObj.loadType2();
		}
		else if(interactiveObj.animType == 3)
		{
			interactiveObj.loadType3();
		}
	}
	else
	{
	 $("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
}
questionInteractive.prototype.loadType1=function()
{
	var angleBase=0;
	var angleppd=90;
	var angleHypotnuse=37;
	var angleGridHolder1=37;
	var angleGridHolder2=0;
	var angleGridHolder3=0;


	html='';
	html+='<div id="baseHolder">';
	html+='<div id="gridHolder1" style="opacity:0">'+gridGenerator(10,10,"")+'</div>';
	html+='<div id="gridHolder2" style="opacity:0">'+gridGenerator(8,8,"blue")+'</div>';
	html+='<div id="gridHolder3" style="opacity:0">'+gridGenerator(6,6,"orange")+'</div>';

	html+='<div id="gridMove1" style="opacity:0">'+gridGenerator2(8,8,"blue")+'</div>';
	html+='<div id="gridMove2" style="opacity:0">'+gridGenerator2(2,6,"orange")+'</div>';
	html+='<div id="gridMove3" style="opacity:0">'+gridGenerator2(2,4,"orange")+'</div>';
	html+='<div id="gridMove4" style="opacity:0">'+gridGenerator2(2,2,"orange")+'</div>';
	html+='<div id="gridMove5" style="opacity:0">'+gridGenerator2(2,6,"orange")+'</div>';


	html+='<div class=base></div>';
	html+='<div class=hypotnuse></div>';
	html+='<div class=ppd></div>';
	html+='<div class="labelBase">'+interactiveObj.sides[1]+'</div>';
	html+='<div class="labelHypo">'+interactiveObj.sides[2]+'</div>';
	html+='<div class="labelppd">'+interactiveObj.sides[0]+'</div>';
	html+='<div id="replayButton" class=replay onclick=interactiveObj.animate();></div>'

	html+='</div>';

	$("#container").html(html);

	$(".base").css('width',interactiveObj.sides[1]*20)
	$(".hypotnuse").css('width',interactiveObj.sides[2]*20)
	$(".ppd").css('width',interactiveObj.sides[0]*20)


	$(".base").css({
		"transform": "rotate("+angleBase+"deg)",
		"-ms-transform": "rotate("+angleBase+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleBase+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleBase+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleBase+"deg)" /* Firefox */
	});

	$(".hypotnuse").css({
		"transform": "rotate("+angleHypotnuse+"deg)",
		"-ms-transform": "rotate("+angleHypotnuse+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleHypotnuse+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleHypotnuse+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleHypotnuse+"deg)" /* Firefox */
	});

	$(".ppd").css({
		"transform": "rotate("+angleppd+"deg)",
		"-ms-transform": "rotate("+angleppd+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleppd+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleppd+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleppd+"deg)" /* Firefox */
	});

	$("#gridHolder1").css({
		"transform": "rotate("+angleGridHolder1+"deg)",
		"-ms-transform": "rotate("+angleGridHolder1+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleGridHolder1+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleGridHolder1+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleGridHolder1+"deg)" /* Firefox */
	});

	$("#gridHolder2").delay(5000).animate({
		'opacity':'1'
	},500)

	$("#gridHolder3").delay(10000).animate({
		'opacity':'1'
	},500)
	
	$("#gridHolder1").delay(15000).animate({
		'opacity':'1'
	},500)



	$("#gridMove1").delay(15500).animate({
		'opacity':'1'
	},50)
	$("#gridMove2").delay(15500).animate({
		'opacity':'1'
	},50)
	$("#gridMove3").delay(15500).animate({
		'opacity':'1'
	},50)
	$("#gridMove4").delay(15500).animate({
		'opacity':'1'
	},50)
	$("#gridMove5").delay(15500).animate({
		'opacity':'1'
	},50)

	startMovingType1=setTimeout("interactiveObj.startMovingType1();",20000);
}
questionInteractive.prototype.startMovingType1=function()
{
	window.setTimeout(function setBackGroundWhite(){
		$(".divBlock").css('background-color','white');
		clearTimeout();
	},10);

	$("#gridMove1").animate({
		'top':'24px',
		'left':'264px'
	},2000)

	window.setInterval(function rotateGrid(){
		
		if(angleRotate<=36)
		{
			angleRotate+=1;
			$("#gridMove1").css({
				"transform": "rotate("+angleRotate+"deg)",
				"-ms-transform": "rotate("+angleRotate+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout(startMovingType1);

		}
	},50);

	window.setTimeout("interactiveObj.gridMove2();",5000); //done
	window.setTimeout("interactiveObj.gridMove3();",10000);
	window.setTimeout("interactiveObj.gridMove4();",15000);
	window.setTimeout("interactiveObj.gridMove5();",20000);
}
questionInteractive.prototype.gridMove5=function()
{
	$("#gridMove5").animate({
		'top':'171px',
		'left':'403px'
	},3000)

	window.setInterval(function rotateGrid(){
		
		if(angleRotate5<=126)
		{
			angleRotate5+=1;
			$("#gridMove5").css({
				"transform": "rotate("+angleRotate5+"deg)",
				"-ms-transform": "rotate("+angleRotate5+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate5+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate5+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate5+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
			showReplay=setTimeout("interactiveObj.showReplay();",3000);			
		}
	},10);
}
questionInteractive.prototype.gridMove4=function()
{
	$("#gridMove4").animate({
		'top':'120px',
		'left':'391px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate4<=36)
		{
			angleRotate4+=1;
			$("#gridMove4").css({
				"transform": "rotate("+angleRotate4+"deg)",
				"-ms-transform": "rotate("+angleRotate4+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate4+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate4+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate4+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMove3=function()
{
	$("#gridMove3").animate({
		'top':'65px',
		'left':'382px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate3<=36)
		{
			angleRotate3+=1;
			$("#gridMove3").css({
				"transform": "rotate("+angleRotate3+"deg)",
				"-ms-transform": "rotate("+angleRotate3+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate3+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate3+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate3+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMove2=function()
{
	$("#gridMove2").animate({
		'top':'-7px',
		'left':'287px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate2<=36)
		{
			angleRotate2+=1;
			$("#gridMove2").css({
				"transform": "rotate("+angleRotate2+"deg)",
				"-ms-transform": "rotate("+angleRotate2+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate2+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate2+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate2+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.loadType2=function()
{
	console.log("In type 2")

	var angleBase=0;
	var angleppd=90;
	var angleHypotnuse=-53;
	var angleGridHolder1=-53;
	var angleGridHolder2=0;
	var angleGridHolder3=0;


	html='';
	html+='<div id="baseHolder" style="top: -118px;">';
	html+='<div id="gridHolder1" style="opacity:0;top: 267px;left: 171px;">'+gridGenerator(3,3,"orange")+'</div>';
	html+='<div id="gridHolder2" style="opacity:0;top: 189px;left: 232px;">'+gridGenerator(4,4,"blue")+'</div>';
	html+='<div id="gridHolder3" style="opacity:0;top: 211px;left: 93px;">'+gridGenerator(5,5,"")+'</div>';

	html+='<div id="gridMove1" style="opacity:0;top: 189px;left: 232px;">'+gridGenerator2(4,4,"blue")+'</div>';
	html+='<div id="gridMove2" style="opacity:0;top: 267px;left: 171px;">'+gridGenerator2(1,3,"orange")+'</div>';
	html+='<div id="gridMove3" style="opacity:0;top: 286px;left: 171px;">'+gridGenerator2(1,2,"orange")+'</div>';
	html+='<div id="gridMove4" style="opacity:0;top: 286px;left: 211px;">'+gridGenerator2(1,1,"orange")+'</div>';
	html+='<div id="gridMove5" style="opacity:0;top: 306px;left: 171px;">'+gridGenerator2(1,3,"orange")+'</div>';

	html+='<div class=base style=""></div>';
	html+='<div class=hypotnuse style="top: 227px;left: 151px;"></div>';
	html+='<div class=ppd style="top: 227px;left: 191px;"></div>';

	html+='<div class="labelBase" style="top: 250px;left: 209px;">'+interactiveObj.sides[1]+'</div>';
	html+='<div class="labelHypo" style="top: 231px;left: 196px;">'+interactiveObj.sides[2]+'</div>';
	html+='<div class="labelppd" style="top: 213px;left: 220px;">'+interactiveObj.sides[0]+'</div>';
	
	html+='<div id="replayButton" class=replay onclick=interactiveObj.animate();></div>'

	html+='</div>';

	$("#container").html(html);

	$("#container").css('width', '417px');
	$("#container").css('height', '246px');


	$("#replayButton").css('top','327px')
	$("#replayButton").css('left','360px')

	$(".base").css('width',interactiveObj.sides[1]*20)
	$(".hypotnuse").css('width',interactiveObj.sides[2]*20)
	$(".ppd").css('width',interactiveObj.sides[0]*20)

	$("#gridHolder1").delay(1000).animate({
		'opacity':'1'
	},500)
	$("#gridHolder2").delay(5000).animate({
		'opacity':'1'
	},500)
	$("#gridHolder3").delay(10000).animate({
		'opacity':'1'
	},500)

	$("#gridMove1").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove2").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove3").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove4").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove5").delay(12000).animate({
		'opacity':'1'
	},10)



	$(".hypotnuse").css({
		"transform": "rotate("+angleHypotnuse+"deg)",
		"-ms-transform": "rotate("+angleHypotnuse+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleHypotnuse+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleHypotnuse+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleHypotnuse+"deg)" /* Firefox */
	});
	$(".ppd").css({
		"transform": "rotate("+angleppd+"deg)",
		"-ms-transform": "rotate("+angleppd+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleppd+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleppd+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleppd+"deg)" /* Firefox */
	});
	$("#gridHolder3").css({
		"transform": "rotate("+angleGridHolder1+"deg)",
		"-ms-transform": "rotate("+angleGridHolder1+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleGridHolder1+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleGridHolder1+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleGridHolder1+"deg)" /* Firefox */
	});

	startMovingType2=setTimeout("interactiveObj.startMovingType2();",15000);
}
questionInteractive.prototype.startMovingType2=function()
{
	window.setTimeout(function setBackGroundWhite(){
		$(".divBlock").css('background-color','white');
		clearTimeout();
	},10);


	$("#gridMove1").animate({
		'top':'195px',
		'left':'105px'
	},3000)

	window.setInterval(function rotateGrid(){
		
		if(angleRotate>=-52)
		{
			angleRotate-=1;
			$("#gridMove1").css({
				"transform": "rotate("+angleRotate+"deg)",
				"-ms-transform": "rotate("+angleRotate+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout(startMovingType2);
		}
	},50);

	window.setTimeout("interactiveObj.gridMoveType2();",5000); //done
	window.setTimeout("interactiveObj.gridMoveType3();",10000);
	window.setTimeout("interactiveObj.gridMoveType4();",15000);
	window.setTimeout("interactiveObj.gridMoveType5();",20000);
}
questionInteractive.prototype.gridMoveType2=function()
{	
	$("#gridMove2").animate({
		'top':'225px',
		'left':'178px'
	},1000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate2>=-52)
		{
			angleRotate2-=1;
			$("#gridMove2").css({
				"transform": "rotate("+angleRotate2+"deg)",
				"-ms-transform": "rotate("+angleRotate2+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate2+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate2+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate2+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMoveType3=function()
{
	$("#gridMove3").animate({
		'top':'257px',
		'left':'154px'
	},1000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate3>=-52)
		{
			angleRotate3-=1;
			$("#gridMove3").css({
				"transform": "rotate("+angleRotate3+"deg)",
				"-ms-transform": "rotate("+angleRotate3+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate3+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate3+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate3+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);	
}
questionInteractive.prototype.gridMoveType4=function()
{
	$("#gridMove4").animate({
		'top':'228px',
		'left':'151px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate4<=36)
		{
			angleRotate4+=1;
			$("#gridMove4").css({
				"transform": "rotate("+angleRotate4+"deg)",
				"-ms-transform": "rotate("+angleRotate4+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate4+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate4+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate4+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMoveType5=function()
{
	$("#gridMove5").animate({
		'top':'247px',
		'left':'141px'
	},3000)

	window.setInterval(function rotateGrid(){
		
		if(angleRotate5>=-142)
		{
			angleRotate5-=1;
			$("#gridMove5").css({
				"transform": "rotate("+angleRotate5+"deg)",
				"-ms-transform": "rotate("+angleRotate5+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate5+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate5+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate5+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
			showReplay=setTimeout("interactiveObj.showReplay();",3000);			
		}
	},10);
}
questionInteractive.prototype.loadType3=function()
{
	console.log("In type 3")
	var angleBase=0;
	var angleppd=90;
	var angleHypotnuse=22;
	var angleGridHolder1=22;
	var angleGridHolder2=0;
	var angleGridHolder3=0;


	html='';
	html+='<div id="baseHolder" style="top: -86px;">';
	html+='<div id="gridHolder1" style="opacity:0;top: 267px;left: 170px;">'+gridGeneratorCase3(12,12,"blue")+'</div>';
	html+='<div id="gridHolder2" style="opacity:0;top: 217px;left: 120px;">'+gridGeneratorCase3(5,5,"green")+'</div>';
	html+='<div id="gridHolder3" style="opacity:0;top: 96px;left: 218px;">'+gridGeneratorCase3(13,13,"")+'</div>';

	html+='<div id="gridMove1" style="opacity:0;top: 267px;left: 170px;">'+gridGeneratorCase3_2(12,12,"blue")+'</div>';
	html+='<div id="gridMove2" style="opacity:0;top: 217px;left: 120px;">'+gridGeneratorCase3_2(1,5,"green")+'</div>';
	html+='<div id="gridMove3" style="opacity:0;top: 227px;left: 120px;">'+gridGeneratorCase3_2(1,5,"green")+'</div>';
	html+='<div id="gridMove4" style="opacity:0;top: 237px;left: 120px;">'+gridGeneratorCase3_2(1,3,"green")+'</div>';
	html+='<div id="gridMove5" style="opacity:0;top: 237px;left: 150px;">'+gridGeneratorCase3_2(1,2,"green")+'</div>';
	html+='<div id="gridMove6" style="opacity:0;top: 246px;left: 120px;">'+gridGeneratorCase3_2(1,5,"green")+'</div>';
	html+='<div id="gridMove7" style="opacity:0;top: 256px;left: 121px;">'+gridGeneratorCase3_2(1,5,"green")+'</div>';

	html+='<div class=base style=""></div>';
	html+='<div class=hypotnuse style="top: 241px;left: 166px;"></div>';
	html+='<div class=ppd style="top: 241px;left: 146px;"></div>';

	//html+='<div class="labelBase" style="top: 250px;left: 209px;">'+interactiveObj.sides[1]+'</div>';
	//html+='<div class="labelHypo" style="top: 231px;left: 196px;">'+interactiveObj.sides[2]+'</div>';
	//html+='<div class="labelppd" style="top: 213px;left: 220px;">'+interactiveObj.sides[0]+'</div>';
	
	html+='<div id="replayButton" class=replay onclick=interactiveObj.animate();></div>'

	html+='</div>';

	$("#container").html(html);

	$("#container").css('width', '417px');
	$("#container").css('height', '330px');


	$("#replayButton").css('top','327px')
	$("#replayButton").css('left','360px')

	$(".base").css('width',interactiveObj.sides[1]*10)
	$(".hypotnuse").css('width',interactiveObj.sides[2]*10)
	$(".ppd").css('width',interactiveObj.sides[0]*10)

	$(".hypotnuse").css({
		"transform": "rotate("+angleHypotnuse+"deg)",
		"-ms-transform": "rotate("+angleHypotnuse+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleHypotnuse+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleHypotnuse+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleHypotnuse+"deg)" /* Firefox */
	});
	$(".ppd").css({
		"transform": "rotate("+angleppd+"deg)",
		"-ms-transform": "rotate("+angleppd+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleppd+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleppd+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleppd+"deg)" /* Firefox */
	});

	$("#gridHolder3").css({
		"transform": "rotate("+angleGridHolder1+"deg)",
		"-ms-transform": "rotate("+angleGridHolder1+"deg)", /* IE 9 */
		"-webkit-transform": "rotate("+angleGridHolder1+"deg)", /* Safari and Chrome */
		 "-o-transform": "rotate("+angleGridHolder1+"deg)", /* Opera */
	   "-moz-transform": "rotate("+angleGridHolder1+"deg)" /* Firefox */
	});

	$("#gridHolder1").delay(1000).animate({
		'opacity':'1'
	},500)
	$("#gridHolder2").delay(5000).animate({
		'opacity':'1'
	},500)
	$("#gridHolder3").delay(10000).animate({
		'opacity':'1'
	},500)

	$("#gridMove1").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove2").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove3").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove4").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove5").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove6").delay(12000).animate({
		'opacity':'1'
	},10)
	$("#gridMove7").delay(12000).animate({
		'opacity':'1'
	},10)

	startMovingType3=setTimeout("interactiveObj.startMovingType3();",15000);
}
questionInteractive.prototype.startMovingType3=function()
{
	window.setTimeout(function setBackGroundWhite(){
		$(".divBlock").css('background-color','white');
		clearTimeout();
	},10);


	$("#gridMove1").animate({
		'top':'105px',
		'left':'214px'
	},3000)

	window.setInterval(function rotateGrid(){
		
		if(angleRotate<=21)
		{
			angleRotate+=1;
			$("#gridMove1").css({
				"transform": "rotate("+angleRotate+"deg)",
				"-ms-transform": "rotate("+angleRotate+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout(startMovingType3);
		}
	},50);

	window.setTimeout("interactiveObj.gridMoveCase3_1();",5000); //done
	window.setTimeout("interactiveObj.gridMoveCase3_2();",10000);
	window.setTimeout("interactiveObj.gridMoveCase3_3();",15000);
	window.setTimeout("interactiveObj.gridMoveCase3_4();",20000);
	window.setTimeout("interactiveObj.gridMoveCase3_5();",25000);
	window.setTimeout("interactiveObj.gridMoveCase3_6();",30000);	
}
questionInteractive.prototype.gridMoveCase3_1=function()
{
	$("#gridMove2").animate({
		'top':'95px',
		'left':'219px'
	},1000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate2<=21)
		{
			angleRotate2+=1;
			$("#gridMove2").css({
				"transform": "rotate("+angleRotate2+"deg)",
				"-ms-transform": "rotate("+angleRotate2+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate2+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate2+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate2+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMoveCase3_2=function()
{
	$("#gridMove3").animate({
		'top':'114px',
		'left':'265px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate3<=21)
		{
			angleRotate3+=1;
			$("#gridMove3").css({
				"transform": "rotate("+angleRotate3+"deg)",
				"-ms-transform": "rotate("+angleRotate3+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate3+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate3+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate3+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMoveCase3_3=function()
{
	$("#gridMove4").animate({
		'top':'133px',
		'left':'311px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate4<=21)
		{
			angleRotate4+=1;
			$("#gridMove4").css({
				"transform": "rotate("+angleRotate4+"deg)",
				"-ms-transform": "rotate("+angleRotate4+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate4+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate4+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate4+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},50);
}
questionInteractive.prototype.gridMoveCase3_4=function()
{
	$("#gridMove5").animate({
		'top':'154px',
		'left':'336px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate5<=111)
		{
			angleRotate5+=1;
			$("#gridMove5").css({
				"transform": "rotate("+angleRotate5+"deg)",
				"-ms-transform": "rotate("+angleRotate5+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate5+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate5+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate5+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},10);
}
questionInteractive.prototype.gridMoveCase3_5=function()
{
	$("#gridMove6").animate({
		'top':'172px',
		'left':'329px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate6<=111)
		{
			angleRotate6+=1;
			$("#gridMove6").css({
				"transform": "rotate("+angleRotate6+"deg)",
				"-ms-transform": "rotate("+angleRotate6+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate6+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate6+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate6+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
		}
	},10);
}
questionInteractive.prototype.gridMoveCase3_6=function()
{
	$("#gridMove7").animate({
		'top':'219px',
		'left':'310px'
	},2000)
	window.setInterval(function rotateGrid(){
		
		if(angleRotate7<=111)
		{
			angleRotate7+=1;
			$("#gridMove7").css({
				"transform": "rotate("+angleRotate7+"deg)",
				"-ms-transform": "rotate("+angleRotate7+"deg)", /* IE 9 */
				"-webkit-transform": "rotate("+angleRotate7+"deg)", /* Safari and Chrome */
			 "-o-transform": "rotate("+angleRotate7+"deg)", /* Opera */
		   		"-moz-transform": "rotate("+angleRotate7+"deg)" /* Firefox */
			});
		}
		else
		{
			window.clearInterval();
			window.clearTimeout();
			showReplay=setTimeout("interactiveObj.showReplay();",3000);
		}
	},10);
}
function gridGenerator(x,y,bcolor)
{
	interactiveObj.counter+=1;
	temp='<div class="points'+interactiveObj.counter+'">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=1;interactiveObj.i<=x;interactiveObj.i++)
			{
				for(interactiveObj.j=1;interactiveObj.j<=y;interactiveObj.j++)
				{
					//create div over here
					temp+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color:'+bcolor+'"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=20;;

				}
				interactiveObj.divTop+=19;
				interactiveObj.divLeft=0;

			}
	temp+='</div>';

	return temp;
}
function gridGenerator2(x,y,bcolor)
{
	interactiveObj.counter+=1;
	temp='<div class="points'+interactiveObj.counter+'">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=1;interactiveObj.i<=x;interactiveObj.i++)
			{
				for(interactiveObj.j=1;interactiveObj.j<=y;interactiveObj.j++)
				{
					//create div over here
					temp+='<div class="divBlock2" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color:'+bcolor+'"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=20;;

				}
				interactiveObj.divTop+=19;
				interactiveObj.divLeft=0;

			}
	temp+='</div>';

	return temp;
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
function gridGeneratorCase3(x,y,bcolor)
{
	interactiveObj.counter+=1;
	temp='<div class="points'+interactiveObj.counter+'">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=1;interactiveObj.i<=x;interactiveObj.i++)
			{
				for(interactiveObj.j=1;interactiveObj.j<=y;interactiveObj.j++)
				{
					//create div over here
					temp+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color:'+bcolor+';width:9px;height:9px;"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=10;;

				}
				interactiveObj.divTop+=10;
				interactiveObj.divLeft=0;

			}
	temp+='</div>';

	return temp;
}
function gridGeneratorCase3_2(x,y,bcolor)
{
	interactiveObj.counter+=1;
	temp='<div class="points'+interactiveObj.counter+'">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=1;interactiveObj.i<=x;interactiveObj.i++)
			{
				for(interactiveObj.j=1;interactiveObj.j<=y;interactiveObj.j++)
				{
					//create div over here
					temp+='<div class="divBlock2" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color:'+bcolor+';width:9px;height:9px;"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=10;;

				}
				interactiveObj.divTop+=10;
				interactiveObj.divLeft=0;

			}
	temp+='</div>';

	return temp;
}
questionInteractive.prototype.showReplay=function()
{
	clearTimeout(showReplay);
	$("#replayButton").css('visibility','visible');
}
questionInteractive.prototype.animate=function()
{
	interactiveObj = new questionInteractive();
	interactiveObj.init();
}