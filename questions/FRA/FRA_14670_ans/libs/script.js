var interactiveObj;
var extraParameters="";
var result = 2;
var img;
var html="";
var text="";
var getText;
var	displaySquaresRow1;
var	displaySquaresRow2;
var	displaySquaresRow3;
var	displaySquaresRow4;
var	loadGreenImage;
var moveBoxes;

function questionInteractive()
{
	
	this.j=1;
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		this.numberLanguage='english';
		
	} 
	else this.numberLanguage = getParameters['numberLanguage'];
	
	if(typeof getParameters['language']=="undefined")
	{
		
		this.language='english';
		
	} 
	else this.language = getParameters['language'];
	
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		
		this.language='english';
		
	} 
	else this.numberLanguage = getParameters['numberLanguage'];

}

questionInteractive.prototype.init=function()
{
 		html="";
	
		loadcanvas=setTimeout("interactiveObj.loadcanvas();",100);
	
}

questionInteractive.prototype.getText=function()
{
	
	if(interactiveObj.j<=11)
	{
		
		if(interactiveObj.j==9 || interactiveObj.j>9)
			{
				$("#stop").text(replaceDynamicText(interactiveObj.j,interactiveObj.numberLanguage,"interactiveObj"));
				interactiveObj.j+=0.5;	
			}
			else
			{	$("#stop").text(replaceDynamicText(interactiveObj.j,interactiveObj.numberLanguage,"interactiveObj"));
				interactiveObj.j+=1;
			}
	}
	
	else
	{
		clearInterval(getText);
	}
}


questionInteractive.prototype.loadcanvas=function()
{	
		html+='<div id="content">';
		html+='<div id="text"><p>'+replaceDynamicText(promptArr['p1'],interactiveObj.numberLanguage,"interactiveObj")+'</p></div>'; 		// text on right side
		html+='<div id="text1"><p>'+replaceDynamicText(16,interactiveObj.numberLanguage,"interactiveObj")+'</p></div>'; 
		html+='<div id="text2"><p>'+replaceDynamicText(promptArr['p2'],interactiveObj.numberLanguage,"interactiveObj")+'</p></div>'; 	
		html+='<div id="stop"><p>..</p></div>'; 	
		html+='<div id="text3">'+replaceDynamicText(promptArr['p3'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
		html+='<div id="textAdditional"><p>'+promptArr['p5']+'</p></div>';
		html+='<div id="division"><div class="fraction"><div class="frac numerator">'+changeLanguage(11,interactiveObj.numberLanguage)+'</div><div class="frac">'+replaceDynamicText(16,interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>';
		html+='<div id="finaltext"><p>'+replaceDynamicText(1,interactiveObj.numberLanguage,"interactiveObj")+' - </p><div  id="n1" class="fraction"><div class="frac numerator">'+replaceDynamicText(11,interactiveObj.numberLanguage,"interactiveObj")+'</div><div class="frac">'+replaceDynamicText(16,interactiveObj.numberLanguage,"interactiveObj")+'</div></div><div id="assingment">=</div><div id="n2" class="fraction"><div class="frac numerator">'+replaceDynamicText(5,interactiveObj.numberLanguage,"interactiveObj")+'</div><div class="frac">'+replaceDynamicText(16,interactiveObj.numberLanguage,"interactiveObj")+'</div></div><div id="assingment2"> = </div><div id="n3" class="fraction"><div class="frac numerator">'+replaceDynamicText(10,interactiveObj.numberLanguage,"interactiveObj")+'</div><div class="frac">'+replaceDynamicText(32,interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>';
		
		html+='<div id="finaltext2">'+replaceDynamicText(promptArr['p4'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
		
		
		html+='<div id="greenimage"><img src="../assets/arrow.png"/></div>';
		
		// hALF IMAGES
		
		html+='<div id="upperhalf23" class="upperhalf"></div>';
		html+='<div id="upperhalf32" class="upperhalf"></div>'; 
		
		html+='<div id="lowerhalf34" class="lowerhalf"></div>';
		html+='<div id="lowerhalf43" class="lowerhalf"></div>';
		
		
		html+='<div id="base" class="canvas"></div>';     //BACKGROUND                
	
		//FIRST ROW SQUARES
	
			html+='<div id="square1" class="square"></div>';
			html+='<div id="square2" class="square"></div>';
			html+='<div id="square3" class="square"></div>';
			html+='<div id="square4" class="square"></div>';
			
	//SECOND ROW SQUARES
	
			html+='<div id="square21" class="square"></div>';
			html+='<div id="square22" class="square"></div>';
			html+='<div id="square23" class="square"></div>';
			html+='<div id="square24" class="square"></div>';
	
	//THIRD ROW
	
			html+='<div id="square31" class="square"></div>';
			html+='<div id="square32" class="square"></div>';
			html+='<div id="square33" class="square"></div>';
			html+='<div id="square34" class="square"></div>';
	
	
	//FOURTH ROW
	
			html+='<div id="square41" class="square"></div>';
			html+='<div id="square42" class="square"></div>';
			html+='<div id="square43" class="square"></div>';
			html+='<div id="square44" class="square"></div>';

	//BACKGROUND COLOURED
	
			html+='<div id="coloredback" class="coloredback"></div>'
			
			html+='<div id="replayButton" class="replay" onclick="interactiveObj.animate()"></div>';
	
	
			html+='</div>';
	
			$("#container").html(html);
	
			$("#replayButton").hide();	
	
	displaySquaresRow1=setTimeout("interactiveObj.displaySquaresRow1();",1000);
}

questionInteractive.prototype.displaySquaresRow1=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=4;interactiveObj.i++)
	{
		
		$('#square'+interactiveObj.i).delay(interactiveObj.i*400).animate({'opacity':'1'},500);

	}
		clearTimeout(displaySquaresRow1);
		
		displaySquaresRow2=setTimeout("interactiveObj.displaySquaresRow2();",2000);
}

questionInteractive.prototype.displaySquaresRow2=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=4;interactiveObj.i++)
	{
		
		$('#square2'+interactiveObj.i).delay(interactiveObj.i*400).animate({'opacity':'1'},500);

	}
		clearTimeout(displaySquaresRow2);
		
		displaySquaresRow3=setTimeout("interactiveObj.displaySquaresRow3();",2000);
}	

questionInteractive.prototype.displaySquaresRow3=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=4;interactiveObj.i++)
	{
		
		$('#square3'+interactiveObj.i).delay(interactiveObj.i*400).animate({'opacity':'1'},500);

	}
		clearTimeout(displaySquaresRow3);
		
		displaySquaresRow4=setTimeout("interactiveObj.displaySquaresRow4();",2000);
}	

questionInteractive.prototype.displaySquaresRow4=function()
{
	
	for(interactiveObj.i=1;interactiveObj.i<=4;interactiveObj.i++)
	{
		
		$('#square4'+interactiveObj.i).delay(interactiveObj.i*400).animate({'opacity':'1'},500);

	}
		clearTimeout(displaySquaresRow4);
	
	
	$("#coloredback").delay(5*400).animate({'opacity':'1'},500);
	
	$("#text1").delay(2500).animate({'opacity':'1'},500);
	$("#text1").animate({'opacity':'0'},500);
	$("#text1").animate({'opacity':'1'},500);
	$("#text1").animate({'opacity':'0'},500);
	$("#text1").animate({'opacity':'1'},500);
	
	$("#text2").delay(5500).animate({'opacity':'1'},500);
	
	loadGreenImage=setTimeout("interactiveObj.loadGreenImage();",6000);
	
}	

questionInteractive.prototype.loadGreenImage=function()
{
	$("#greenimage").animate({'opacity':'1'},500);
	$("#text1").animate({'opacity':'0'},500);
	$("#stop").animate({'opacity':'1'},500);
	clearTimeout(loadGreenImage);
	
	
	$("#square23").animate({'opacity':'0'},10);
	$("#upperhalf23").animate({'opacity':'1'},100);
		
	$("#square34").animate({'opacity':'0'},10);
	$("#lowerhalf34").animate({'opacity':'1'},100);	
	
	$("#square32").animate({'opacity':'0'},10);
	$("#upperhalf32").animate({'opacity':'1'},100);	
	
	$("#square43").animate({'opacity':'0'},100);	
	$("#lowerhalf43").animate({'opacity':'1'},100);	
		
	moveBoxes=setTimeout("interactiveObj.moveBoxes();",2000);
}

questionInteractive.prototype.moveBoxes=function()
{
		getText=setInterval("interactiveObj.getText();",1300);
		
		showReplayButton=setTimeout("interactiveObj.showReplayButton();",25000);
		
		
		$("#square4").delay(1000).animate({'top':'104px','left':'420px'},500);
		//$("#T1").animate({'opacity':'1'},10);
		$("#square4").animate({'opacity':'0'},100);
		

		$("#square3").delay(2500).animate({'top':'104px','left':'420px'},500);
		$("#square3").animate({'opacity':'0'},100);
		
		$("#square2").delay(3500).animate({'top':'104px','left':'420px'},500);
		$("#square2").animate({'opacity':'0'},100);
		
		$("#square2").delay(4300).animate({'top':'104px','left':'420px'},500);
		$("#square2").animate({'opacity':'0'},100);
		
		$("#square1").delay(5100).animate({'top':'104px','left':'420px'},500);
		$("#square1").animate({'opacity':'0'},100);
		
		$("#square21").delay(6300).animate({'top':'104px','left':'420px'},500);
		$("#square21").animate({'opacity':'0'},100);
		
		$("#square22").delay(7300).animate({'top':'104px','left':'420px'},500);
		$("#square22").animate({'opacity':'0'},100);
		
		$("#square31").delay(8900).animate({'top':'104px','left':'420px'},500);
		$("#square31").animate({'opacity':'0'},100);
		
		$("#square41").delay(9900).animate({'top':'104px','left':'420px'},500);
		$("#square41").animate({'opacity':'0'},100);
		
		$("#square44").delay(11400).animate({'top':'104px','left':'420px'},500);
		$("#square44").animate({'opacity':'0'},100);
		


		$("#upperhalf23").delay(13100).animate({'top':'104px','left':'420px'},500);
		$("#lowerhalf34").delay(14000).animate({'top':'104px','left':'420px'},500);

		
		$("#lowerhalf34").delay(200).animate({'opacity':'0'},100);
		$("#upperhalf23").delay(1000).animate({'opacity':'0'},100);
		
		$("#upperhalf32").delay(15500).animate({'top':'104px','left':'420px'},500);
		$("#lowerhalf43").delay(16500).animate({'top':'104px','left':'420px'},500);
		
		$("#upperhalf32").delay(1000).animate({'opacity':'0'},100);
		$("#lowerhalf43").delay(600).animate({'opacity':'0'},100);
		
		$("#stop").delay(20000).animate({'opacity':'0'});
		$("#text3").delay(18000).animate({'opacity':'1'});
		
		$("#textAdditional").delay(20000).animate({'opacity':1});   // line added
		$("#textAdditional").delay(2000).animate({'opacity':0});   // line added
		$("#text").delay(19200).animate({'opacity':'0'});
		$("#division").delay(20000).animate({'opacity':'1'},500);
		$("#division").delay(2000).animate({'opacity':'0'},500);
		
		$("#finaltext").delay(23500).animate({'opacity':'1'});
		
		$("#finaltext2").delay(23000).animate({'opacity':'1'});

}

questionInteractive.prototype.showReplayButton=function()
{
	
	$("#replayButton").show();
	
}

questionInteractive.prototype.animate=function()
{

	$("#replayButton").hide();	
		
		
	clearTimeout(loadcanvas);
	clearInterval(getText);
	clearTimeout(displaySquaresRow1);
	clearTimeout(displaySquaresRow2);
	clearTimeout(displaySquaresRow3);
	clearTimeout(displaySquaresRow4);
	clearTimeout(loadGreenImage);
	clearTimeout(moveBoxes);
	
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




