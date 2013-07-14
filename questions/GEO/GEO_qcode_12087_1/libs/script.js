var questionInteractive;
var html='';
var interactiveObj;
var html;
var angle=0;
function questionInteractive()
{
	this.language=getParameters['language'];
	this.x=0;
	this.parameteNotSetFlag=0;

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
}

questionInteractive.prototype.init=function()
{
	if(interactiveObj.parameteNotSetFlag==0)
	{
		

		if(interactiveObj.sides[0]==6 && interactiveObj.sides[1]==8 && interactiveObj.sides[2]==10)
		{
			
			html='';

			html+='<div id="holder">';
		
			//lines of the triangle
			html+='<div id="traingleHolder">';
			html+='<div class="base"></div>';
			html+='<div class="ppd"></div>';
			html+='<div class="hypotnuse"></div>';

			html+='<span class="labelBase">'+interactiveObj.sides[1]+'</span>';
			html+='<span class="labelPpd">'+interactiveObj.sides[0]+'</span>';
			html+='<span class="labelHypotnuse">'+interactiveObj.sides[2]+'</span>';

			html+='<span class="side1">'+interactiveObj.label[0]+'</span>';
			html+='<span class="side2">'+interactiveObj.label[1]+'</span>';
			html+='<span class="side3">'+interactiveObj.label[2]+'</span>';

			html+='</div>';
			html+='<div id="replayButton" class=replay onclick="interactiveObj.replayAnimation();"></div>';	
			html+='</div>';// base closure
			$("#container").html(html);

			$(".points").css('width','110px');
			$(".points").css('height','110px');
		
			containerResize();

			rotate(".ppd",90);
			rotate(".hypotnuse",38);
			getGrid2=setTimeout("interactiveObj.getGrid2();",5000);
			getGrid3=setTimeout("interactiveObj.getGrid3();",10000);
			getGrid=setTimeout("interactiveObj.getGrid();",15000);
		}
		else if(interactiveObj.sides[0]==5 && interactiveObj.sides[1]==12 && interactiveObj.sides[2]==13)
		{
			html='';

			html+='<div id="holder" style="position: absolute;top: 49px;left: -76px;">';
		
			//lines of the triangle
			html+='<div id="traingleHolder">';
			html+='<div class="base"></div>';
			html+='<div class="ppd"></div>';
			html+='<div class="hypotnuse"></div>';

			html+='<span class="labelBase">'+interactiveObj.sides[1]+'</span>';
			html+='<span class="labelPpd">'+interactiveObj.sides[0]+'</span>';
			html+='<span class="labelHypotnuse">'+interactiveObj.sides[2]+'</span>';

			html+='<span class="side1">'+interactiveObj.label[0]+'</span>';
			html+='<span class="side2">'+interactiveObj.label[1]+'</span>';
			html+='<span class="side3">'+interactiveObj.label[2]+'</span>';

			html+='</div>';
			html+='<div id="replayButton" class=replay onclick="interactiveObj.replayAnimation();"></div>';	
			//html+='</div>';// base closure
			$("#container").html(html);

			$(".points").css('width','110px');
			$(".points").css('height','110px');
			
			containerResize();

			$("#container").css('height','407px');
			$("#container").css('width','444px');

			$(".base").css('width',interactiveObj.sides[1]*13+'px');
			$(".ppd").css('width',interactiveObj.sides[0]*13+'px');
			$(".ppd").css('top','63px');
			$(".ppd").css('left','-23px');
			$(".hypotnuse").css('width',interactiveObj.sides[2]*13+'px');
			$(".hypotnuse").css('top','63px');
			$(".hypotnuse").css('left','3px');

			$(".labelHypotnuse").css('top','52px');
			$(".labelHypotnuse").css('left','49px');

			$(".side2").css('left','176px');
			//$(".side2").css('left','49px');
			$(".side3").css('top','13px');

			rotate(".ppd",90);
			rotate(".hypotnuse",22);

			getGridCase22=setTimeout("interactiveObj.getGridCase22();",5000);
			getGridCase21=setTimeout("interactiveObj.getGridCase21();",11000);
			getGridCase23=setTimeout("interactiveObj.getGridCase23();",15000);
		}
		else if(interactiveObj.sides[0]==5 && interactiveObj.sides[1]==4 && interactiveObj.sides[2]==3)
		{
			html='';

			html+='<div id="holder">';
		
			//lines of the triangle
			html+='<div id="traingleHolder">';
			html+='<div class="base"></div>';
			html+='<div class="ppd"></div>';
			html+='<div class="hypotnuse"></div>';

			html+='<span class="labelBase" style="left:68px">'+interactiveObj.sides[1]+'</span>';
			html+='<span class="labelPpd"style="left:70px">'+interactiveObj.sides[0]+'</span>';
			html+='<span class="labelHypotnuse" style="left:106px">'+interactiveObj.sides[2]+'</span>';

			html+='<span class="side1">'+interactiveObj.label[0]+'</span>';
			html+='<span class="side2">'+interactiveObj.label[1]+'</span>';
			html+='<span class="side3" style="top: -12px;left: 128px;">'+interactiveObj.label[2]+'</span>';

			html+='</div>';
			html+='<div id="replayButton" class=replay onclick="interactiveObj.replayAnimation();"></div>';	
			html+='</div>';// base closure
	
			html+='<div class="points" style="opacity:0">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=0;interactiveObj.i<4;interactiveObj.i++)
			{
				for(interactiveObj.j=0;interactiveObj.j<4;interactiveObj.j++)
				{
					//create div over here
					html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #e988a1;width:17px;height:17px"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=18;

				}
				interactiveObj.divTop+=18;
				interactiveObj.divLeft=0;

			}
			html+='</div>';

			html+='<div class="points2"  style="left: 286px;top: 123px;opacity:0">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=0;interactiveObj.i<3;interactiveObj.i++)
			{
				for(interactiveObj.j=0;interactiveObj.j<3;interactiveObj.j++)
				{
					//create div over here
					html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #00aedb;width:17px;height:17px"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=18;

				}
				interactiveObj.divTop+=18;
				interactiveObj.divLeft=0;

			}
			html+='</div>';

			html+='<div class="points3" style="left: 160px;top: 108px;opacity:0">';

			interactiveObj.divTop=0;
			interactiveObj.divLeft=0;
			for(interactiveObj.i=0;interactiveObj.i<5;interactiveObj.i++)
			{
				for(interactiveObj.j=0;interactiveObj.j<5;interactiveObj.j++)
				{
					//create div over here
					html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #6dc066;width:17px;height:17px"></div>';
					
					$("#container").html(html);
					interactiveObj.divLeft+=18;

				}
				interactiveObj.divTop+=18;
				interactiveObj.divLeft=0;

			}
			html+='</div>';


			$("#container").html(html);

			$(".points").css('width','110px');
			$(".points").css('height','110px');
			$(".points").css('top','178px');
			$(".points").css('left','216px');
			
			containerResize();

			$("#container").css('height','304px');
			$("#container").css('width','492px');
			$(".base").css('width',interactiveObj.sides[1]*18+'px');
			$(".ppd").css('width',interactiveObj.sides[2]*18+'px');
			$(".hypotnuse").css('width',interactiveObj.sides[0]*18+'px');
			$(".hypotnuse").css('top','67px');
			$(".hypotnuse").css('left','1px');
			rotate(".ppd",90);
			rotate(".hypotnuse",-38);
			rotate(".points3",-38);
			$(".ppd").css('top','68px');
			$(".ppd").css('left','54px');
			$(".side2").css('left','87px');
			$(".side3").css('top','18px');
			$(".side3").css('left','81px');

			$(".labelBase").css('top','77px');
			$(".labelBase").css('left','58px');
			$(".labelPpd").css('top','59px');
			$(".labelPpd").css('left','52px');
			$(".labelHypotnuse").css('top','52px');
			$(".labelHypotnuse").css('left','71px');


			$(".points").delay(5000).animate({
				'opacity':'1'
			},500)
			$(".points3").delay(10000).animate({
				'opacity':'1'
			},500)
			$(".points2").delay(15000).animate({
				'opacity':'1'
			},500)
		
			window.setTimeout(function showReplay(){
				$("#replayButton").css('visibility','visible')
			},15000)
		}

	}
	else
	{
	 $("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
}
questionInteractive.prototype.getGridCase23=function()
{	
	html+='<div class="points3">';

		interactiveObj.divTop=0;
		interactiveObj.divLeft=0;
		for(interactiveObj.i=0;interactiveObj.i<12;interactiveObj.i++)
		{
			for(interactiveObj.j=0;interactiveObj.j<12;interactiveObj.j++)
			{
				//create div over here
				html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #e988a1;"></div>';
				
				$("#container").html(html);
				interactiveObj.divLeft+=14;

			}
			interactiveObj.divTop+=14;
			interactiveObj.divLeft=0;

		}
		html+='</div>';

		html+='</div>';

		$("#container").html(html);

			$(".points").css('top','111px');
			$(".points").css('left','150px');
			$(".points3").css('top','-42px');
			$(".points3").css('left','279px');

			$(".base").css('width',interactiveObj.sides[1]*13+'px');
			$(".ppd").css('width',interactiveObj.sides[0]*13+'px');
			$(".ppd").css('top','63px');
			$(".ppd").css('left','-23px');
			$(".hypotnuse").css('width',interactiveObj.sides[2]*13+'px');
			$(".hypotnuse").css('top','63px');
			$(".hypotnuse").css('left','3px');

			$(".labelHypotnuse").css('top','52px');
			$(".labelHypotnuse").css('left','49px');

			$(".side2").css('left','176px');
			//$(".side2").css('left','49px');
			$(".side3").css('top','13px');

			rotate(".ppd",90);
			rotate(".hypotnuse",22);
			rotate(".points3",22);
			clearTimeout(getGridCase23);
			$("#replayButton").css('visibility','visible');
}
questionInteractive.prototype.getGridCase22=function()
{
		html+='<div class="points2">';

		interactiveObj.divTop=0;
		interactiveObj.divLeft=0;
		for(interactiveObj.i=0;interactiveObj.i<12;interactiveObj.i++)
		{
			for(interactiveObj.j=0;interactiveObj.j<12;interactiveObj.j++)
			{
				//create div over here
				html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #00aedb;width:12px;height:12px;"></div>';
				
				$("#container").html(html);
				interactiveObj.divLeft+=13;

			}
			interactiveObj.divTop+=13;
			interactiveObj.divLeft=0;

		}
		html+='</div>';

		$("#container").html(html);

			$(".points").css('top','111px');
			$(".points").css('left','150px');
			$(".base").css('width',interactiveObj.sides[1]*13+'px');
			$(".ppd").css('width',interactiveObj.sides[0]*13+'px');
			$(".ppd").css('top','63px');
			$(".ppd").css('left','-23px');
			$(".hypotnuse").css('width',interactiveObj.sides[2]*13+'px');
			$(".hypotnuse").css('top','63px');
			$(".hypotnuse").css('left','3px');


			$(".labelHypotnuse").css('top','52px');
			$(".labelHypotnuse").css('left','49px');

			$(".side2").css('left','176px');
			//$(".side2").css('left','49px');
			$(".side3").css('top','13px');

			rotate(".ppd",90);
			rotate(".hypotnuse",22);
			clearTimeout(getGridCase22);
}
questionInteractive.prototype.getGridCase21=function()
{
		html+='<div class="points">';

		interactiveObj.divTop=0;
		interactiveObj.divLeft=0;
		for(interactiveObj.i=0;interactiveObj.i<5;interactiveObj.i++)
		{
			for(interactiveObj.j=0;interactiveObj.j<5;interactiveObj.j++)
			{
				//create div over here
				html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #6dc066;width:12px;height:12px3"></div>';
				
				$("#container").html(html);
				interactiveObj.divLeft+=13;

			}
			interactiveObj.divTop+=13;
			interactiveObj.divLeft=0;

		}
		html+='</div>';

			$("#container").html(html);
			$(".points").css('top','111px');
			$(".points").css('left','150px');
			$(".base").css('width',interactiveObj.sides[1]*13+'px');
			$(".ppd").css('width',interactiveObj.sides[0]*13+'px');
			$(".ppd").css('top','63px');
			$(".ppd").css('left','-23px');
			$(".hypotnuse").css('width',interactiveObj.sides[2]*13+'px');
			$(".hypotnuse").css('top','63px');
			$(".hypotnuse").css('left','3px');

			$(".labelHypotnuse").css('top','52px');
			$(".labelHypotnuse").css('left','49px');

			$(".side2").css('left','176px');
			//$(".side2").css('left','49px');
			$(".side3").css('top','13px');

			rotate(".ppd",90);
			rotate(".hypotnuse",22);
	
			clearTimeout(getGridCase21);
}
questionInteractive.prototype.getGrid=function()
{
	html+='<div class="points">';

		interactiveObj.divTop=0;
		interactiveObj.divLeft=0;
		for(interactiveObj.i=0;interactiveObj.i<10;interactiveObj.i++)
		{
			for(interactiveObj.j=0;interactiveObj.j<10;interactiveObj.j++)
			{
				//create div over here
				html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #6dc066;"></div>';
				
				$("#container").html(html);
				interactiveObj.divLeft+=14;

			}
			interactiveObj.divTop+=14;
			interactiveObj.divLeft=0;

		}
		html+='</div>';
		$("#container").html(html);
		$(".points3").css('left','131px');
		$(".points3").css('top','93px');
				$(".points").css('top','-18px');
		rotate(".ppd",90);
		rotate(".hypotnuse",38);
		rotate(".points",38);
		clearTimeout(getGrid);
		$("#replayButton").css('visibility','visible');
}
questionInteractive.prototype.getGrid2=function()
{
		html+='<div class="points2">';
		interactiveObj.divTop=0;
		interactiveObj.divLeft=0;
		for(interactiveObj.i=0;interactiveObj.i<8;interactiveObj.i++)
		{
			for(interactiveObj.j=0;interactiveObj.j<8;interactiveObj.j++)
			{
				//create div over here
				html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #00aedb;"></div>';
				
				$("#container").html(html);
				interactiveObj.divLeft+=14;

			}
			interactiveObj.divTop+=14;
			interactiveObj.divLeft=0;

		}
		html+='</div>';
		$("#container").html(html);
		rotate(".ppd",90);
		rotate(".hypotnuse",38);
		rotate(".points",38);
		rotate(".points2",0);
		clearTimeout(getGrid2);
}
questionInteractive.prototype.getGrid3=function()
{
		html+='<div class="points3">';
		interactiveObj.divTop=0;
		interactiveObj.divLeft=0;
		for(interactiveObj.i=0;interactiveObj.i<6;interactiveObj.i++)
		{
			for(interactiveObj.j=0;interactiveObj.j<6;interactiveObj.j++)
			{
				//create div over here
				html+='<div class="divBlock" id='+interactiveObj.i+''+interactiveObj.j+' style="top:'+interactiveObj.divTop+'px;left:'+interactiveObj.divLeft+'px;background-color: #f47835;"></div>';
				
				$("#container").html(html);
				interactiveObj.divLeft+=14;

			}
			interactiveObj.divTop+=14;
			interactiveObj.divLeft=0;

		}
		html+='</div>';
		$("#container").html(html);
		$(".points3").css('left','131px');
		$(".points3").css('top','93px');

		rotate(".ppd",90);
		rotate(".hypotnuse",38);
		rotate(".points",38);
		rotate(".points2",0);
		clearTimeout(getGrid3);
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
questionInteractive.prototype.replayAnimation=function()
{

	html='';
	$("#container").html();
	interactiveObj = new questionInteractive();
	interactiveObj.init();
}
