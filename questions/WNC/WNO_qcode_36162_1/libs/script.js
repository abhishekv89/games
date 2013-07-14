var interactiveObj;
var extraParameters="";
var result = 2;
var img;
var html="";


function questionInteractive()
{
	this.parameterNotSetFlag = 0;
	this.numRangeArr = new Array();
	this.sum=0;
	this.ball=0;
	this.marble=0;
	this.stone=0;
	
	/*
	if(typeof getParameters['numberLanguage']=="undefined") this.numberLanguage = "english";
	else this.numberLanguage = getParameters['numberLanguage'];
	if(typeof getParameters['language']=="undefined") language = "english";
	else language = getParameters['language'];
	if(typeof getParameters['objectname']=="undefined") this.parameterNotSetFlag=1;
	else this.objectname = getParameters['objectname']);
	*/	
	if(typeof getParameters['objects']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Object Not set");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	} 
	else this.objects = getParameters['objects'];
	
	/*if(typeof getParameters['name']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("Object Not set");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	} 
	else this.name = getParameters['name'].split("|");
	*/
	
	if(typeof getParameters['numberofobjects']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		alert("No Of objects Not set");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.numberofobjects =getParameters['numberofobjects'].split("|");
	this.firstnumber=parseInt(this.numberofobjects[0]);
	this.secondnumber=parseInt(this.numberofobjects[1]);
	this.totalobjects=parseInt(this.firstnumber+this.secondnumber);
	
	
	this.sum=parseInt(this.firstnumber)+parseInt(this.secondnumber);
	//alert(this.sum);
	
	
	if(typeof getParameters['colorofobjects']=="undefined") 
	{
		this.parameterNotSetFlag=1; 
		alert("color of objects not set");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.colorofobjects = getParameters['colorofobjects'].split("|");
	this.colorfirst=this.colorofobjects[0];
	this.colorsecond=this.colorofobjects[1];
	
	if(typeof getParameters['names']=="undefined") 
	{
		this.parameterNotSetFlag=1; 
		alert("names not set");
		$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.names = getParameters['names'].split("|");
	this.firstname=this.names[0];
	this.secondname=this.names[1];



}

questionInteractive.prototype.init=function()
{
	
	html="";
	
	loadXML("xml.xml",function(){
        start();
    });
	
	html+='<div id="base" class="base"></div>';
	html+='<div id="pot" class="pot"></div>';
	html+='<div id="pot2" class="po2"></div>';
	
	
	
	if(interactiveObj.objects=="marble")
	{
		//pot 1 marbles
		
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			
			html+='<div id="'+interactiveObj.colorfirst+''+interactiveObj.i+'" class="'+interactiveObj.colorfirst+'" style="left:'+(interactiveObj.i*15)+'px"></div>'
			
		}
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorsecond+''+interactiveObj.i+'" class="'+interactiveObj.colorsecond+'" style="left:'+(interactiveObj.i*15)+'px"></div>'
		}
		
			html+='<div id="namefirst" class="namefirst"><p>'+interactiveObj.firstname+promptArr['name1']+'</p></div>';
			
	
		//pot 2 marbles
	
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorfirst+ '2'+interactiveObj.i+'" class="'+interactiveObj.colorfirst+'" style="left:'+(300+interactiveObj.i*15)+'px"></div>'
			
		}
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorsecond+'2'+interactiveObj.i+'" class="'+interactiveObj.colorsecond+'" style="left:'+(300+interactiveObj.i*15)+'px"></div>'
		}
	
			html+='<div id="namesecond"  class="namesecond"><p>'+interactiveObj.secondname+promptArr['name1']+'</p></div>';
			html +='<div id="replayButton" class="replay" onclick="interactiveObj.animate()"></div>';
			
		
	}$("#container").html(html);
	
	
	
	
	 if(interactiveObj.objects=="ball")
	{

		//pot 1 ball
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorfirst+''+interactiveObj.i+'" class="'+interactiveObj.colorfirst+'"" style="left:'+(interactiveObj.i*20)+'px"></div>'	
		}
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorsecond+''+interactiveObj.i+'" class="'+interactiveObj.colorsecond+'" style="left:'+(interactiveObj.i*18)+'px"></div>'
		}
                        html+='<div id="namefirst" class="namefirst"><p>'+interactiveObj.firstname+promptArr['name1']+'</p></div>';
		
		//pot 2 ball
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			html+='<div id="potball'+interactiveObj.colorfirst+'2'+interactiveObj.i+'" class="'+interactiveObj.colorfirst+'"" style="left:'+(300+interactiveObj.i*20)+'px"></div>'	
		}
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			html+='<div id="potball'+interactiveObj.colorsecond+'2'+interactiveObj.i+'" class="'+interactiveObj.colorsecond+'"  style="left:'+(300+interactiveObj.i*18)+'px"></div>'
		}			html+='<div id="namesecond"  class="namesecond"><p>'+interactiveObj.secondname+promptArr['name1']+'</p></div>';
					html +='<div id="replayButton" class="replay" onclick="interactiveObj.animate()"></div>';
               			      
	} 		 $("#container").html(html); 
		
		

	
	
	
	if(interactiveObj.objects=="stone")
	{
		//pot 1 stone
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorfirst+''+interactiveObj.i+'" class="'+interactiveObj.colorfirst+'"" style="left:'+(interactiveObj.i*20)+'px"></div>'	
		}
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			html+='<div id="'+interactiveObj.colorsecond+''+interactiveObj.i+'" class="'+interactiveObj.colorsecond+'" style="left:'+(interactiveObj.i*18)+'px"></div>'
		}
                       html+='<div id="namefirst" class="namefirst"><p>'+interactiveObj.firstname+promptArr['name1']+'</p></div>';
				//piot 2 stone
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			html+='<div id="potstone'+interactiveObj.colorfirst+'2'+interactiveObj.i+'" class="'+interactiveObj.colorfirst+'""  style="left:'+(300+interactiveObj.i*20)+'px"></div>'	
		}
		
		for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			html+='<div id="potstone'+interactiveObj.colorsecond+'2'+interactiveObj.i+'" class="'+interactiveObj.colorsecond+'""  style="left:'+(300+interactiveObj.i*18)+'px"></div>'
		}  html+='<div id="namesecond"  class="namesecond"><p>'+interactiveObj.secondname+promptArr['name1']+'</p></div>';
			html +='<div id="replayButton" class="replay" onclick="interactiveObj.animate()"></div>';
	}             
	
	$("#container").html(html);
	
	
	
	

	if(interactiveObj.objects=="ball")
			{ 
				startmovingballpot1=setTimeout("interactiveObj.moveball();",1000);
				startmovingballpot2=setTimeout("interactiveObj.moveballpot2();",interactiveObj.sum*1500);
			this.ball=1;
			}
	
	if(interactiveObj.objects=="marble")
			{
				startmovingmarblepot1=setTimeout("interactiveObj.movemarble();",500);
				startmovingmarblepot2=setTimeout("interactiveObj.movemarblepot2();",interactiveObj.sum*1500);
			this.marble=1;
			}
	 if(interactiveObj.objects=="stone")
			{
				startmovingstonepot1=setTimeout("interactiveObj.movestone();",1000);
				startmovingstonepot2=setTimeout("interactiveObj.movestonepot2();",interactiveObj.sum*1500);
			this.stone=1;
			}

}

//----------------------------------MOVING STONE FROM POT 1-------------------------------------------//

questionInteractive.prototype.movestone=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorfirst + interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'60px','left':'160px'},800);
			$('#'+interactiveObj.colorfirst + interactiveObj.i).animate({'top':'60px','left':'190px'},600);
			$('#'+interactiveObj.colorfirst + interactiveObj.i).animate({'top':'90px','left':'190px','opacity':'0'},400);
			
		}
		startmovingsecondcolorstone=setTimeout("interactiveObj.secondcolorstone();",interactiveObj.firstnumber*1300);
	
	
}

questionInteractive.prototype.secondcolorstone=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorsecond + interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'60px','left':'160px'},800);
			$('#'+interactiveObj.colorsecond + interactiveObj.i).animate({'top':'60px','left':'190px'},600);
			$('#'+interactiveObj.colorsecond + interactiveObj.i).animate({'top':'90px','left':'190px','opacity':'0'},400);
			
		}clearTimeout(startmovingstonepot1);
		clearTimeout(startmovingsecondcolorstone);
	
}

//---------------------------------------MOVING POT 2 STONES-----------------------------------//

questionInteractive.prototype.movestonepot2=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
		
		//alert('#'+interactiveObj.colorsecond +'2'+interactiveObj.i);
			
			$('#potstone'+interactiveObj.colorsecond +'2'+interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'72px','left':'425px'},800);
			$('#potstone'+interactiveObj.colorsecond +'2'+interactiveObj.i).animate({'top':'72px','left':'477px'},600);
			$('#potstone'+interactiveObj.colorsecond +'2'+interactiveObj.i).animate({'top':'86px','left':'477px','opacity':'0'},400);
			
		}
		
		startmovingpot2stonesecond=setTimeout("interactiveObj.movestonepot2second();",interactiveObj.secondnumber*1300);
	
}

questionInteractive.prototype.movestonepot2second=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
		
		//alert('#'+interactiveObj.colorfirst +'2'+interactiveObj.i);
		
			$('#potstone'+interactiveObj.colorfirst +'2'+interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'72px','left':'425px'},800);
			$('#potstone'+interactiveObj.colorfirst +'2'+interactiveObj.i).animate({'top':'72px','left':'477px'},600);
			$('#potstone'+interactiveObj.colorfirst +'2'+interactiveObj.i).animate({'top':'86px','left':'477px','opacity':'0'},400);
			
		}clearTimeout(startmovingstonepot2);
		clearTimeout(startmovingpot2stonesecond);
		
		$('#replayButton').delay(interactiveObj.totalobjects*1000+500).animate({
				opacity:1
			}, 100);	
	
}


//--------------------------POT 2 STONES MOVED----------------------------------//






//----------------------MOVING BALL OF POT 1 FROM HERE---------------------------------//

questionInteractive.prototype.moveball=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorfirst + interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'70px','left':'115px'},800);
			$('#'+interactiveObj.colorfirst + interactiveObj.i).animate({'top':'70px','left':'166px'},600);
			$('#'+interactiveObj.colorfirst + interactiveObj.i).animate({'top':'90px','left':'166px','opacity':'0'},400);
			
		}
		
		startmovingsecondcolor=setTimeout("interactiveObj.movingsecondcolor();",interactiveObj.firstnumber*1300);
}


questionInteractive.prototype.movingsecondcolor=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorsecond + interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'70px','left':'165px'},800);
			$('#'+interactiveObj.colorsecond + interactiveObj.i).animate({'top':'70px','left':'190px'},600);
			$('#'+interactiveObj.colorsecond + interactiveObj.i).animate({'top':'90px','left':'190px','opacity':'0'},400);
			
		}
			clearTimeout(startmovingballpot1);
		clearTimeout(startmovingsecondcolor);	
		
		
}

//--------------------------POT 1 BALLS MOVED----------------------------------------------------------//

//------------------------MOVING POT 2 BALLS-------------------------//

questionInteractive.prototype.moveballpot2=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			$('#potball'+interactiveObj.colorsecond +'2'+interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'65px','left':'385px'},800);
			$('#potball'+interactiveObj.colorsecond +'2'+interactiveObj.i).animate({'top':'65px','left':'465px'},600);
			$('#potball'+interactiveObj.colorsecond +'2'+interactiveObj.i).animate({'top':'78px','left':'465px','opacity':'0'},400);
			
		}
		startmovingsecondcolorpot2=setTimeout("interactiveObj.movingsecondcolorpot2();",interactiveObj.secondnumber*1300);
	
	
}

questionInteractive.prototype.movingsecondcolorpot2=function()
{ 
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			$('#potball'+interactiveObj.colorfirst +'2'+interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'65px','left':'380px'},800);
			$('#potball'+interactiveObj.colorfirst +'2'+interactiveObj.i).animate({'top':'65px','left':'455px'},600);
			$('#potball'+interactiveObj.colorfirst +'2'+interactiveObj.i).animate({'top':'80px','left':'455px','opacity':'0'},400);
			
		}clearTimeout(startmovingballpot2);
		clearTimeout(startmovingsecondcolorpot2);
		$('#replayButton').delay(interactiveObj.totalobjects*1000+500).animate({
				opacity:1
			}, 100);
	
}

//--------------------------------------------------- POT 2 BALLS MOVED--------------------------------------------------------//


//------------------------------------MOVING MARBLES POT 1----------------------------------//

questionInteractive.prototype.movemarble=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorfirst + interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'73px','left':'148px'},800);
			$('#'+interactiveObj.colorfirst + interactiveObj.i).animate({'top':'73px','left':'188px'},600);
			$('#'+interactiveObj.colorfirst + interactiveObj.i).animate({'top':'90px','left':'188px','opacity':'0'},400);
			
		}
		startmovingmarblesecondcolor=setTimeout("interactiveObj.movemarblesecondcolor();",interactiveObj.firstnumber*1300);

}

questionInteractive.prototype.movemarblesecondcolor=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorsecond + interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'73px','left':'135px'},800);
			$('#'+interactiveObj.colorsecond + interactiveObj.i).animate({'top':'73px','left':'190px'},600);
			$('#'+interactiveObj.colorsecond + interactiveObj.i).animate({'top':'90px','left':'190px','opacity':'0'},400);
			
		}clearTimeout(startmovingmarblepot1);
		clearTimeout(startmovingmarblesecondcolor);
	
}

//------------------------------MOVING POT 2 MARBLES----------------------------//

questionInteractive.prototype.movemarblepot2=function()
{
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.secondnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorsecond +'2'+interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'71px','left':'414px'},800);
			$('#'+interactiveObj.colorsecond +'2'+interactiveObj.i).animate({'top':'71px','left':'465px'},600);
			$('#'+interactiveObj.colorsecond +'2'+interactiveObj.i).animate({'top':'80px','left':'465px','opacity':'0'},400);
			
		}
	startmovingmarblepot2secondcolor=setTimeout("interactiveObj.movingsecondcolorpot22();",interactiveObj.firstnumber*1800+1000);
	
}

questionInteractive.prototype.movingsecondcolorpot22=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=interactiveObj.firstnumber;interactiveObj.i++)
		{
			$('#'+interactiveObj.colorfirst +'2'+interactiveObj.i).delay(100 + interactiveObj.i*1200).animate({'top':'71px','left':'414px'},800);
			$('#'+interactiveObj.colorfirst +'2'+interactiveObj.i).animate({'top':'71px','left':'460px'},600);
			$('#'+interactiveObj.colorfirst +'2'+interactiveObj.i).animate({'top':'80px','left':'460px','opacity':'0'},400);
			
		}
		clearTimeout(startmovingmarblepot2);
		clearTimeout(startmovingmarblepot2secondcolor);
		$('#replayButton').delay(interactiveObj.totalobjects*1000+500).animate({
				opacity:1
			}, 100);
	
}

//------------------------------POT 2 MARBLES MOVED-------------------------------------------------//

questionInteractive.prototype.animate=function()
{
	$('#replayButton').delay(10).animate({
			opacity:0
		}, 100);
	
	if(interactiveObj.ball==1)
	{
	clearTimeout(startmovingballpot1);
	clearTimeout(startmovingballpot2);	
	clearTimeout(startmovingsecondcolor);
	clearTimeout(startmovingsecondcolorpot2);
	}
	if(interactiveObj.marble==1)
	{
	clearTimeout(startmovingmarblepot1);
	clearTimeout(startmovingmarblepot2);
	clearTimeout(startmovingmarblesecondcolor);
	clearTimeout(startmovingmarblepot2secondcolor);
	}
	if(interactiveObj.stone==1)
	{
	clearTimeout(startmovingstonepot1);
	clearTimeout(startmovingstonepot2);	
	clearTimeout(startmovingsecondcolorstone);
	clearTimeout(startmovingpot2stonesecond);
	}
	

	
	
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

function start()
{
    return ;  
    
}