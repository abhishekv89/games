var questionInteractive;
var sparkiemove;
var showreplaybutton;

function questionInteractive()
{

	this.counter=1;
	this.language=getParameters['language'];
	this.x=0;
	
	if(typeof getParameters['numberLanguage']=="undefined")
	{
		this.numberLanguage='english';
	}
	else this.numberLanguage =getParameters['numberLanguage'];
	
	if(typeof getParameters['language']=="undefined")
	{
		this.language='english';
	}
	else this.language =getParameters['language'];
	
	
}


questionInteractive.prototype.init = function() 
{

	interactiveObj.counter=1;
	interactiveObj. x =  promptArr['text'].length;
	interactiveObj.bubblewidth=parseInt((interactiveObj.x*10)/9);
	
	$("#container").css('width','620px');
	$("#container").css('height','320px');
	$("#replayButton").css('top','305px');
	$("#replayButton").css('left','600px');
	
	sparkiemove=setTimeout("interactiveObj.sparkiemove();",2000);

		$("#replayButton").hide();

	interactiveObj.StartAnimation();
	
	window.setTimeout(function(){$('b').removeClass('dispNone');},800);

}

questionInteractive.prototype.sparkiemove=function()
{
	
	if(interactiveObj.counter%2==0)
	{
		$("#sparkie").animate({'top':'45px'},300);
		interactiveObj.counter++;
		sparkiemove=setTimeout("interactiveObj.sparkiemove();",300);
	}
	
	else
	{
		$("#sparkie").animate({'top':'40px'},300);
		interactiveObj.counter++;
		sparkiemove=setTimeout("interactiveObj.sparkiemove();",300);
	}
	
}



questionInteractive.prototype.StartAnimation=function()
{
	
	
		$('#callOut').animate({'width':'350px','height':interactiveObj.bubblewidth/2+40},1200,function(){
		
		
		
		$('#text1').html(replaceDynamicText(promptArr["text"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text1').delay(1000).animate({'opacity':'1'});
		$('#text1').delay(6000).animate({'opacity':'0'});
		
		$('#text2').html(replaceDynamicText(promptArr["text2"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text2').delay(7500).animate({'opacity':'1'});
		$('#text2').delay(9000).animate({'opacity':'0'});
		
		$('#text3').html(replaceDynamicText(promptArr["text3"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text3').delay(17500).animate({'opacity':'1'});
		$('#text3').delay(8000).animate({'opacity':'0'});
		
		//$('#text10').html(replaceDynamicText(promptArr["text10"],interactiveObj.numberLanguage,"interactiveObj"));
		//$('#text10').delay(7000).animate({'opacity':'1'});
		//$('#text10').delay(2000).animate({'opacity':'0'});
		
		
		
		$('#text4').html(replaceDynamicText(promptArr["text4"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text4').delay(26000).animate({'opacity':'1'});
		$('#text4').delay(8000).animate({'opacity':'0'});
		
		$('#text5').html(replaceDynamicText(promptArr["text5"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text5').delay(34500).animate({'opacity':'1'});
		$('#text5').delay(8000).animate({'opacity':'0'});
		
		$('#text6').html(replaceDynamicText(promptArr["text6"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text6').delay(43500).animate({'opacity':'1'});
		$('#text6').delay(5000).animate({'opacity':'0'});
		
		$('#text7').html(replaceDynamicText(promptArr["text7"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text7').delay(49000).animate({'opacity':'1'});
		$('#text7').delay(10000).animate({'opacity':'0'});
		
		$('#text8').html(replaceDynamicText(promptArr["text8"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text8').delay(60500).animate({'opacity':'1'});
		$('#text8').delay(6300).animate({'opacity':'0'});
		
		$('#text9').html(replaceDynamicText(promptArr["text9"],interactiveObj.numberLanguage,"interactiveObj"));
		$('#text9').delay(67500).animate({'opacity':'1'});
		//$('#text9').delay(3000).animate({'opacity':'0'});
		
		//$('#text10').html(replaceDynamicText(promptArr["text10"],interactiveObj.numberLanguage,"interactiveObj"));
		//$('#text10').delay(46500).animate({'opacity':'1'});
		//$('#text10').delay(2000).animate({'opacity':'0'});
		
	showreplaybutton=setTimeout("interactiveObj.showreplaybutton();",69000);	

	});
}	
questionInteractive.prototype.showreplaybutton=function()
{
	
	$("#replayButton").show();
	
}

questionInteractive.prototype.replay=function()
{			
		$("#replayButton").hide();
		$('#text9').animate({'opacity':'0'});
		//clearInterval(sparkiemove);
		clearTimeout(showreplaybutton);

		//$("#replayButton").delay(100).animate({'opacity':'0'},10);

			$('#callOut').css({'width':'0px','height':'0px'});
			$('#text1').html("");
			interactiveObj.StartAnimation();	
			window.setTimeout(function(){$('b').removeClass('dispNone');},10);
		
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
