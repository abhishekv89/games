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

	if(typeof getParameters['sourceContainer']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter sourceContainer Not Set</center></h2>");
	}
	else this.sourceContainer=getParameters['sourceContainer'];

	if(typeof getParameters['destContainer']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter destContainer Not Set</center></h2>");
	}
	else this.destContainer=getParameters['destContainer'];

	if(typeof getParameters['objectName']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter sourceContainer Not Set</center></h2>");
	}
	else this.objectName=getParameters['objectName'];

	if(typeof getParameters['noOfObjects']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter noOfObjects Not Set</center></h2>");
	}
	else this.noOfObjects=getParameters['noOfObjects'].split("|");

		this.totalObjects=parseInt(this.noOfObjects[0])+parseInt(this.noOfObjects[1]);

	if(typeof getParameters['fallSequence']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter fallSequence Not Set</center></h2>");
	}
	else this.fallSequence=getParameters['fallSequence'];

	if(typeof getParameters['reArrangeAfterFall']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter reArrangeAfterFall Not Set</center></h2>");
	}
	else this.reArrangeAfterFall=getParameters['reArrangeAfterFall'].split('|');

	if(typeof getParameters['containerName']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		$("#container").html("<h2><center>Parameter containerName Not Set</center></h2>");
	}
	else this.containerName=getParameters['containerName'].split('|');

}
questionInteractive.prototype.init=function()
{
	if(interactiveObj.sourceContainer=='NULL')
	{
		if(interactiveObj.objectName=='pokemon')
		{
			html='<div id="base">';
			interactiveObj.abc=0;
			// loads the objects
			html+='<div id="linearContainer">';
			for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
			{
				html+='<div id="object'+interactiveObj.i+'" style="position:absolute;top:-84px;left:'+(interactiveObj.i*4+interactiveObj.abc)+'px">';
					html+='<div class='+interactiveObj.objectName+' ></div>'; 
				html+='</div>';
				interactiveObj.abc+=60;
			}
			html+='</div>';
			 // loads the objects
			//loading the destination containers
			html+='<div id="destContainer">';
				html+='<div id="container1" class='+interactiveObj.destContainer+' style="top:70px"><span class="nameLabel" style="left:23px">'+interactiveObj.containerName[0]+'</span></div>';
				html+='<div id="container2" class='+interactiveObj.destContainer+' style="top:70px"><span class="nameLabel" style="left:23px">'+interactiveObj.containerName[1]+'</span></div>';
			html+='</div>';
			//loading the destination containers
			html+='<div id="replayButton" class="replay" onclick="interactiveObj.animate();"></div>';
			html+='</div>'; //base closure
				
			$("#container").html(html);
			containerResize();
			$("#linearContainer").css('width',interactiveObj.totalObjects*70+'px');
			$("#container").css('width',(interactiveObj.totalObjects*70)+'px');
			$("#container").css('height','390px');

			$("#replayButton").css('top','360px');
			$("#replayButton").css('left','730px');
			$("#replayButton").css('visibility','hidden');

			startAnimation=setTimeout("interactiveObj.startAnimation();",1000);
			showReplay=setTimeout("interactiveObj.showReplay();",22000);
		}
		if(interactiveObj.objectName=='book')
		{
			interactiveObj.containerName1=interactiveObj.containerName[0].split('%20');
			interactiveObj.containerName2=interactiveObj.containerName[1].split('%20');
			interactiveObj.leftCounter=0;
			html='<div id="base">';
			// loads the objects
			html+='<div id="linearContainer">';
			for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
			{
				html+='<div id="object'+interactiveObj.i+'" style="position:absolute;top:-90px;left:'+(interactiveObj.i*10+interactiveObj.leftCounter)+'px">';
					html+='<div class='+interactiveObj.objectName+'></div>'; 
				html+='</div>';
				interactiveObj.leftCounter+=35;
			}
			html+='</div>';

			html+='<div id="destContainer">';
				html+='<div id="container1" ><span class="nameLabel" style="color: red;width: 148px;left: -22px;top: -140px;">'+interactiveObj.containerName1+'</span></div>';
				html+='<div id="container2" ><span class="nameLabel" style="color: red;width: 148px;left: 28px;top: -140px;">'+interactiveObj.containerName2+'</span></div>';
			html+='</div>';
			//loading the destination containers
			html+='<div id="replayButton" class="replay" onclick="interactiveObj.animate();"></div>';

			html+='</div>'; //base closure

			$("#container").html(html);
			containerResize();
			$("#container").css('width',(interactiveObj.totalObjects*60+50)+'px');
			$("#container").css('height','300px');
			$("#replayButton").css('top','273px');
			$("#replayButton").css('left','720px');
			$("#replayButton").css('visibility','hidden');
			
			startAnimationSeqBook2=setTimeout("interactiveObj.startAnimationSeqBook2();",1000);
			window.setTimeout(function(){
				$("#replayButton").css('visibility','visible');
			},10000);
		}
	}
	else if(interactiveObj.sourceContainer=='box')
	{
				
		interactiveObj.j=50;
		interactiveObj.k=0;
				//interactiveObj.j=20;
				
				if(interactiveObj.objectName=='ball' || interactiveObj.objectName=='yellowFlower')
				{
					html='<div id="base">';
					html+='<div id="linearContainer" class=bigBox style="height:152px;left:185px">';

					if(interactiveObj.objectName=='ball')
						{
							interactiveObj.multiplier=parseInt(20);
							interactiveObj.delay=21000;
						}
					else
						{
							interactiveObj.multiplier=parseInt(35);
							interactiveObj.delay=17000;
						}
				
					for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
						{
							html+='<div id="object'+interactiveObj.i+'" style="position:absolute;top:'+interactiveObj.j+'px;left:'+(interactiveObj.k*interactiveObj.multiplier+30)+'px">';
								html+='<div class='+interactiveObj.objectName+' ></div>'; 
							html+='</div>';
							interactiveObj.k++;
							if(interactiveObj.i==2)
							{
								interactiveObj.j=90;
								interactiveObj.k=0;

							}
						}
						html+='</div>'; 

					html+='<div id="destContainer">';
						html+='<div id="container1" class='+interactiveObj.destContainer+'><span class="nameLabel">'+interactiveObj.containerName[0]+'</span></div>';
						html+='<div id="container2" class='+interactiveObj.destContainer+'><span class="nameLabel">'+interactiveObj.containerName[1]+'</span></div>';
					html+='</div>';

					html+='<div id="replayButton" class="replay" onclick="interactiveObj.animate();"></div>';
					html+='</div>'; //base closure

					$("#container").html(html);
					containerResize();

					$("#container1").css('top','100px');
					$("#container2").css('top','100px');
					$("#container2").css('left','300px');
					$(".nameLabel").css('left','4px');

					$("#container").css('height','400px');

					$("#replayButton").css('top','360px');
					$("#replayButton").css('left','450px');
					$("#replayButton").css('visibility','hidden');

					startAnimationSeq2=setTimeout("interactiveObj.startAnimationSeq2();",1000);
					showReplay=setTimeout("interactiveObj.showReplay();",interactiveObj.delay);
				}
				if(interactiveObj.objectName=='steelBall')
				{
					interactiveObj.j=135;
					html='<div id="base">';
						html+='<div id="linearContainer" class="bigBox" style="left:153px;height:163px">';
						html+='</div>';


					for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
						{
							html+='<div id="object'+interactiveObj.i+'" style="position:absolute;top:'+interactiveObj.j+'px;left:'+(interactiveObj.k*25+175)+'px">';
								html+='<div class='+interactiveObj.objectName+' ></div>'; 
							html+='</div>';
							interactiveObj.k++;
							if(interactiveObj.i%4==0)
							{
								interactiveObj.j+=25;
								interactiveObj.k=0;

							}
						}		

					html+='<div id="destContainer">';
						html+='<div id="container1" class='+interactiveObj.destContainer+' style="top:100px; left:-10px"><span class="nameLabel" style="left:6px">'+interactiveObj.containerName[0]+'</span></div>';
						html+='<div id="container2" class='+interactiveObj.destContainer+' style="top:100px; left:300px"><span class="nameLabel" style="left:6px">'+interactiveObj.containerName[1]+'</span></div>';
					html+='</div>';

					html+='<div id="replayButton" class="replay" onclick="interactiveObj.animate();"></div>';

					html+='</div>'; //base closure

					$("#container").html(html);
					
					$("#container").css('height','400px');
					containerResize();
					$("#replayButton").css('top','380px');
					$("#replayButton").css('left','450px');
					$("#replayButton").css('visibility','hidden');

					startAnimationSeqSteelBall=setTimeout("interactiveObj.startAnimationSeqSteelBall();",1000);
					showReplay=setTimeout("interactiveObj.showReplay();",44000);
				}
	}
}
questionInteractive.prototype.startAnimationSeqBook2=function()
{
	//move first three
		$("#object1").animate({
			'top':'100px'
		},800);
		$("#object2").animate({
			'top':'100'
		},800);
		$("#object3").animate({
			'top':'100'
		},800);
		$("#object4").delay(2000).animate({
			'top':'100',
			'left':'620px'
		},1000);

		$("#object5").delay(3500).animate({
			'top':'50px',
			'left':'20px'
		},800);
		$("#object6").delay(3500).animate({
			'top':'50px',
			'left':'75px'
		},800);
		$("#object7").delay(3500).animate({
			'top':'50px',
			'left':'130px'
		},800);

		$("#object8").delay(5500).animate({
			'top':'100',
			'left':'565px'
		},800);

		$("#object9").delay(6500).animate({
			'top':'0px',
			'left':'20px'
		},800);
		$("#object10").delay(6500).animate({
			'top':'0px',
			'left':'75px'
		},800);
		$("#object11").delay(6500).animate({
			'top':'0px',
			'left':'130px'
		},800);

		$("#object12").delay(7800).animate({
			'top':'100px',
			'left':'509px'
		},800);
}
questionInteractive.prototype.startAnimationSeqSteelBall=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
	{
		
		if(interactiveObj.i%4!=0)
		{
			$("#object"+interactiveObj.i).delay(interactiveObj.i*2500+500).animate({
			'top': '50px',
			'left': '175px'
			},interactiveObj.i*20+500);

			$("#object"+interactiveObj.i).delay(100).animate({
				'top': '50px',
				'left': '45px'
			},500)

			$("#object"+interactiveObj.i).delay(500).animate({
				'top': '300px',
				'left': '45px'
			},600)

			$("#object"+interactiveObj.i).animate({
				'opacity':'0'
			},100)
		}
		else
		{
		
			$("#object"+interactiveObj.i).delay(interactiveObj.i*2500+500).animate({
			'top': '50px',
			'left': '289px'
			},interactiveObj.i*10+500);

			$("#object"+interactiveObj.i).delay(100).animate({
				'top': '50px',
				'left': '370px'
			},300)

			$("#object"+interactiveObj.i).delay(500).animate({
				'top': '300px',
				'left': '370px'
			},600)

			$("#object"+interactiveObj.i).animate({
				'opacity':'0'
			},100)
		}

		
	}
}
questionInteractive.prototype.startAnimationSeq2=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.noOfObjects[1];interactiveObj.i++)
	{
		
		$("#object"+interactiveObj.i).delay(interactiveObj.i*2000+500).animate({
			'top': '-50px',
			'left': '9px',
			'opacity':'1'
		},interactiveObj.i*100+500);

		$("#object"+interactiveObj.i).delay(100).animate({
			'top': '-50px',
			'left': '-84px'
		},300)

		$("#object"+interactiveObj.i).delay(500).animate({
			'top': '200px',
			'left': '-84px'
		},1000)

		$("#object"+interactiveObj.i).animate({
			'opacity':'0'
		},100)
	}

	moveSecondSeq2=setTimeout("interactiveObj.moveSecondSeq2();",1500);
}
questionInteractive.prototype.moveSecondSeq2=function()
{
	interactiveObj.start=parseInt(interactiveObj.totalObjects)-parseInt(interactiveObj.noOfObjects[1]);
	interactiveObj.noOfObjects=parseInt(interactiveObj.noOfObjects[1]);

	for(interactiveObj.i=interactiveObj.start;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
	{
		
		$("#object"+interactiveObj.i).delay(interactiveObj.i*2000+500).animate({
			'top': '-50px',
			'left': '68px'
		},interactiveObj.i*100+500);

		$("#object"+interactiveObj.i).delay(100).animate({
			'top': '-50px',
			'left': '168px'
		},300)

		$("#object"+interactiveObj.i).delay(500).animate({
			'top': '200px',
			'left': '168px'
		},1000)

		$("#object"+interactiveObj.i).animate({
			'opacity':'0'
		},100)
	}
}
questionInteractive.prototype.startAnimation=function()
{

	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.noOfObjects[0];interactiveObj.i++)
	{
		
		$("#object"+interactiveObj.i).delay(interactiveObj.i*1500+500).animate({
			'top':'135px',
			'left':'67px'
		},interactiveObj.i*100+500)

		$("#object"+interactiveObj.i).animate({
			'opacity':'0'
		},100)
	}

	moveSecond=setTimeout("interactiveObj.moveSecond();",1500);
}
questionInteractive.prototype.moveSecond=function()
{
	interactiveObj.start=parseInt(interactiveObj.totalObjects)-parseInt(interactiveObj.noOfObjects[0]);
	interactiveObj.noOfObjects=parseInt(interactiveObj.noOfObjects[1]);

	for(interactiveObj.i=interactiveObj.start;interactiveObj.i<=interactiveObj.totalObjects;interactiveObj.i++)
	{

		$("#object"+interactiveObj.i).delay(interactiveObj.i*1500+500).animate({
			'top':'135px',
			'left':'520px'
		},700)

		$("#object"+interactiveObj.i).animate({
			'opacity':'0'
		},100)
	}
}
questionInteractive.prototype.showReplay=function()
{
	$("#replayButton").css('visibility','visible');
}
questionInteractive.prototype.animate=function()
{
	interactiveObj = new questionInteractive();
	interactiveObj.init();
}