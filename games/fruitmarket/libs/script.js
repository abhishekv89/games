var questionInteractive;
var html="";
var parameterNotSetFlag;
var loadStageDisplay;
var doorOpen;
var html1;
var extraParameters="";

var completed=0;

var correctResponseLevel1=0;
var correctResponseLevel2=0;
var correctResponseLevel3=0;
var score=0;
var id=0;

var lastLevelCleared;

var levelsAttempted=0;      		 //  L1|L2|L3  append if user enters a levels..irrespective whether he completes it or not
var levelWiseScore=0;			// Upadtes after answering every question.  ex: 20|30|10
var levelWiseTimeTaken="";		// Time Taken at each level
var levelWiseStatus=0;			// pipe seprated value   0- In Progress 1- Pass 2- Fail

var level_attempted_1=0;
var level_attempted_2=0;
var level_attempted_3=0;


//------------------//-------------------//
var level_status_1=0;
var level_score_1=0;

var level_status_2=0;
var level_score_2=0;

var level_status_3=0;
var level_score_3=0;

var x;
var LWT=-1;

function questionInteractive()
{
	this.angle=25;
	this.angle1=-9;
	this.counter=0;
	this.counter1=0;
	this.left=285;
	this.left1=74;
	this.n1=0;
	this.n2=0;
	this.n3=0;
	this.n4=0;
	this.n5=0;
	

	this.next_level;
	
	this.y=0;
	this.x=0;
	this.z=0;
	this.currentId="";
	
	if(typeof getParameters['noOfLevels']=="undefined" || parseInt(getParameters['noOfLevels'])!=3)
	{
		this.parameterNotSetFlag=1; 
		
		//alert("Set noOfLevels to 3");
		$("#container").html("<h2><center>Parameter noOfLevels Not Set</center></h2>");
		return;
	}
	else this.noOfLevels =getParameters['noOfLevels'];

	if(typeof getParameters['levelWiseMaxScores']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		
		//alert("levelWiseMaxScores Not Defined");
		$("#container").html("<h2><center>Parameter levelWiseMaxScores Not Set</center></h2>");
		return;
	}
	else this.levelWiseMaxScores =getParameters['levelWiseMaxScores'].split("|");

	if(typeof getParameters['lastLevelCleared']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		
		//alert("lastLevelCleared Not Defined");
		$("#container").html("<h2><center>Parameter lastLevelCleared Not Set</center></h2>");
		return;
	}
	else lastLevelCleared =getParameters['lastLevelCleared'];
	

	if(typeof getParameters['previousLevelLock']=="undefined")
	{
		this.parameterNotSetFlag=1; 
		
		//alert("previousLevelLock Not Defined");
		$("#container").html("<h2><center>Parameter previousLevelLock Not Set</center></h2>");
		return;
	}
	else previousLevelLock =getParameters['previousLevelLock'];
	

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

questionInteractive.prototype.init=function()
{
	
	if(interactiveObj.parameterNotSetFlag==1)
		{
			html="";
		}	
		else
		{
		interactiveObj.load();
		}
}
questionInteractive.prototype.load=function()
{

	html="";
		html+='<div id="background"></div>';
		html+='<div id="rightFence"></div>';
		html+='<div id="leftFence"></div>';
		html+='<div id="road"></div>';
		html+='<div id="title"><span class="title_span">'+replaceDynamicText(promptArr['title'],interactiveObj.numberLanguage,"interactiveObj")+'</span></div>';
		html+='<div id="gate"></div>';
		html+='<div id="girl"></div>';
		html+='<div id="font_page_text"><span class="title_span_1">'+replaceDynamicText(promptArr['title_1'],interactiveObj.numberLanguage,"interactiveObj")+'</span></div>';
	
				doorOpen=setTimeout("interactiveObj.doorOpen();",1500);   // Rotates the Door
	$("#container").html(html);	
}

questionInteractive.prototype.doorOpen=function()
{
	if(interactiveObj.counter<=50)
		{
			interactiveObj.angle+=1;
			
			$("#gate").css('-webkit-transform','rotateY('+interactiveObj.angle+'deg)');
			$("#gate").css('-moz-transform: rotateX('+interactiveObj.angle+'deg)');
			$("#gate").css('transform: rotateX('+interactiveObj.angle+'deg)');
			$("#gate").css('left',interactiveObj.left+'px');

			interactiveObj.left+=1.7;
			interactiveObj.counter++;
			
				doorOpen=setTimeout("interactiveObj.doorOpen();",50);
		}
	else
		{
			loadStageDisplay=setTimeout("interactiveObj.loadStageDisplay();",2000);	
		}

}

questionInteractive.prototype.randomNumberGenerator=function()
{
	interactiveObj.number1=parseInt(Math.floor((Math.random()*8)+2));     //number 1
	interactiveObj.number2=parseInt(Math.floor((Math.random()*5)+1));    //number 2
	
if(interactiveObj.number2==interactiveObj.number1 || interactiveObj.number2==1 || interactiveObj.number2==7)
		{
			interactiveObj.randomNumberGenerator();	
		}
		

	interactiveObj.number3=Math.floor((Math.random()*6)+2);     ////number 3
	interactiveObj.number4=Math.floor((Math.random()*6)+1);	//number 4
	
if(interactiveObj.number4==interactiveObj.number3 || interactiveObj.number4==1 || interactiveObj.number4==7)
		{
			interactiveObj.randomNumberGenerator();
		}
	
	interactiveObj.number5=Math.floor((Math.random()*6)+2);	//number 5
	interactiveObj.number6=Math.floor((Math.random()*8)+2);	//number 6
	
if(interactiveObj.number6==interactiveObj.number2 || interactiveObj.number6==2 || interactiveObj.number6==9)
		{
			interactiveObj.randomNumberGenerator();
		}

}

questionInteractive.prototype.loadStageDisplay=function()
{
	if(levelWiseTimeTaken!="")
			levelWiseTimeTaken+=LWT;	
	else if( interactiveObj.id_global=="three")
			levelWiseTimeTaken+=LWT;	
	
		
	
	html="";
		
		html+='<div id="background"></div>';
		html+='<button id="button1" class="classname" onclick=interactiveObj.StageOne("one");>'+replaceDynamicText(promptArr['Stage1'],interactiveObj.numberLanguage,"interactiveObj")+'</button>';
		html+='<button id="button2" class="classname" onclick=interactiveObj.StageOne("two");>'+replaceDynamicText(promptArr['Stage2'],interactiveObj.numberLanguage,"interactiveObj")+'</button>';
		html+='<button id="button3" class="classname"  onclick=interactiveObj.StageOne("three");>'+replaceDynamicText(promptArr['Stage3'],interactiveObj.numberLanguage,"interactiveObj")+'</button>';
		html+='<img id="lock1"></img>';
		html+='<img id="lock2"></img>';
		html+='<img id="lock3"></img>';
	
	$("#container").html(html);
	
	
	if(lastLevelCleared==0 && previousLevelLock==0)
	{
		$("#button2").attr('disabled',true);
		$("#button2").animate({'opacity':'0.5'},10);
		$("#lock1").animate({'opacity':'1'},10);
		
		
		$("#button3").attr('disabled',true);
		$("#button3").animate({'opacity':'0.5'},10);
		$("#lock2").animate({'opacity':'1'},10);

		$("#lock3").hide();
	}

	if(lastLevelCleared==0 && previousLevelLock==1)
	{
		$("#button2").attr('disabled',true);
		$("#button2").animate({'opacity':'0.5'},10);
		$("#lock1").animate({'opacity':'1'},10);
		
		
		$("#button3").attr('disabled',true);
		$("#button3").animate({'opacity':'0.5'},10);
		$("#lock2").animate({'opacity':'1'},10);

		$("#lock3").hide();
	}
	
	if(lastLevelCleared==1 && previousLevelLock==0)
	{
				
		$("#button3").attr('disabled',true);
		$("#button3").animate({'opacity':'0.5'},10);
		$("#lock2").animate({'opacity':'1'},10);
		$("#lock1").hide();
		$("#lock3").hide();
	}

	if(lastLevelCleared==2 && previousLevelLock==0)
	{
		$("#lock3").hide();
		$("#lock1").hide();
	}
	if(lastLevelCleared==3 && previousLevelLock==0)
	{
		$("#lock3").hide();
		$("#lock1").hide();
		$("#lock2").hide();
	}

	if(lastLevelCleared==1 && previousLevelLock==1)
	{
				
		$("#button1").attr('disabled',true);
		$("#button3").attr('disabled',true);
		$("#button3").animate({'opacity':'0.5'},10);
		$("#button1").animate({'opacity':'0.5'},10);
		$("#lock3").animate({'opacity':'1'},10);
		$("#lock2").animate({'opacity':'1'},10);
	}

	if(lastLevelCleared==2 && previousLevelLock==1)
	{
				
		$("#button1").attr('disabled',true);
		$("#button1").animate({'opacity':'0.5'},10);
		$("#lock3").animate({'opacity':'1'},10);
		
		$("#button2").attr('disabled',true);
		$("#button2").animate({'opacity':'0.5'},10);
		$("#lock1").animate({'opacity':'1'},10);
		$("#lock2").hide();
	}
	if(lastLevelCleared==3 && previousLevelLock==1)
	{
				
		$("#button1").attr('disabled',true);
		$("#button1").animate({'opacity':'0.5'},10);
		$("#lock3").animate({'opacity':'1'},10);
		
		$("#button2").attr('disabled',true);
		$("#button2").animate({'opacity':'0.5'},10);
		$("#lock1").animate({'opacity':'1'},10);
		
		$("#lock2").hide();
	}

}

questionInteractive.prototype.StageOne=function(id)
{
	interactiveObj.randomNumberGenerator();
	
	interactiveObj.id_global=id;
	completed=0;
	
	if(id!=this.currentId)
	{
		if(this.currentId!="")
			//TotalTimeTaken.push(x);
		//console.log(LWT);
		levelWiseTimeTaken+=LWT+"|";
		this.currentId=id;
		if(x)
			clearInterval(x);
		LWT=-1;
	
	if(LWT==-1)
	{
		LWT=0;
		x=window.setInterval(function(){
			LWT++;
			//console.log(LWT);
		},1000);
	}
       }
	
	//--------GENERATING RANDOM VARIABLES------------//
	
	interactiveObj.s1_r1=Math.floor((Math.random()*6)+1);       //------ RANDOM VARIBALE FOR STAGE ONE---------//
	
	interactiveObj.s2_r1=Math.floor((Math.random()*3)+1);	//------ RANDOM VARIBALE FOR STAGE TWO---------//
	interactiveObj.s2_r2=Math.floor((Math.random()*3)+4);
	
	interactiveObj.s3_r1=Math.floor((Math.random()*2)+1);	//------ RANDOM VARIBALE FOR STAGE THREE---------//
	interactiveObj.s3_r2=Math.floor((Math.random()*2)+3);
	interactiveObj.s3_r3=Math.floor((Math.random()*2)+5);
	
	//--------GENERATING RANDOM VARIABLES------------//
	
	var level="";
	
	html="";
	
	if(id=='one')				// Setting the Level Name
		{
			level=replaceDynamicText(promptArr['Level1'],interactiveObj.numberLanguage,"interactiveObj");
			
		}
	else if(id=='two')			// Setting the Level Name
		{
			level=replaceDynamicText(promptArr['Level2'],interactiveObj.numberLanguage,"interactiveObj");

		}
	
	else if(id=='three')			// Setting the Level Name
		{
			level=replaceDynamicText(promptArr['Level3'],interactiveObj.numberLanguage,"interactiveObj");

		}
		
	
	html+='<div id="stallStageOne">';
	
		html+='<div id="header">'+replaceDynamicText(promptArr['title'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
		html+='<div id="level">'+level+'</div>';
		html+='<div id="score">'+replaceDynamicText(promptArr['score1'],interactiveObj.numberLanguage,"interactiveObj")+'</div>';
		html+='<div id="score_value">'+changeLanguage(score,interactiveObj.numberLanguage)+'</div>';
		html+='<div id="girl1"></div>';
		html+='<div id="hand"></div>';
		html+='<div id="message"></div>';
	
		
		
		// Displays the Text According to The Level
		if(id=='one')
		{
			html+='<div id="text">'+replaceDynamicText(promptArr['AlertMessage'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+'   '+replaceDynamicText(promptArr[interactiveObj.s1_r1],interactiveObj.numberLanguage,"interactiveObj")+' ?</div>';
		}
		else if(id=='two')
		{
			html+='<div id="text">'+replaceDynamicText(promptArr['AlertMessage'],interactiveObj.numberLanguage,"interactiveObj")+'   '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+'   '+replaceDynamicText(promptArr[interactiveObj.s2_r2],interactiveObj.numberLanguage,"interactiveObj")+'  and '+changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage)+'   '+replaceDynamicText(promptArr[interactiveObj.s2_r1],interactiveObj.numberLanguage,"interactiveObj")+'    ?</div>';
		}
		
		else if(id=='three')
		{
			
			html+='<div id="text">'+replaceDynamicText(promptArr['AlertMessage'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage)+'  '+replaceDynamicText(promptArr[interactiveObj.s3_r2],interactiveObj.numberLanguage,"interactiveObj")+'     '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+'  '+replaceDynamicText(promptArr[interactiveObj.s3_r1],interactiveObj.numberLanguage,"interactiveObj")+' '+replaceDynamicText(promptArr['and'],interactiveObj.numberLanguage,"interactiveObj")+ '  '+changeLanguage(interactiveObj.number6,interactiveObj.numberLanguage)+'  '+replaceDynamicText(promptArr[interactiveObj.s3_r3],interactiveObj.numberLanguage,"interactiveObj")+'   ?</div>';			
		}
		
		
		html+='<div id="S1_1" class="hideClass">';
			html+='<div id="n1"><div id="q1" class="qty"></div><div class="F_n1">'+replaceDynamicText(promptArr['1'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div>';
			html+='<div id="apple"></div>';
			html+='<div id="n1_n2"></div>';
		html+='</div>';
		
		
		html+='<div id="S1_2" class="hideClass">';
			html+='<div id="n2"><div id="q2" class="qty"></div><div class="F_n1">'+replaceDynamicText(promptArr['2'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div>';
			html+='<div id="banana"></div>';
			html+='<div id="n2_n2"></div>';
		html+='</div>';
		
		
		html+='<div id="S1_3" class="hideClass">';
			html+='<div id="n3"><div id="q3" class="qty"></div><div class="F_n1">'+replaceDynamicText(promptArr['3'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div>';
			html+='<div id="guava"></div>';
			html+='<div id="n3_n2"></div>';
		html+='</div>';
		
		
		html+='<div id="S1_4" class="hideClass">';
			html+='<div id="n4"><div id="q4" class="qty"></div><div class="F_n1">'+replaceDynamicText(promptArr['4'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div>';
			html+='<div id="mango"></div>';
			html+='<div id="n4_n2"></div>';
		html+='</div>';
		
		
		html+='<div id="S1_5" class="hideClass">';
			html+='<div id="n5"><div id="q5" class="qty"></div><div class="F_n1">'+replaceDynamicText(promptArr['5'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div>';
			html+='<div id="melon"></div>';
			html+='<div id="n5_n2"></div>';
		html+='</div>';
		
		
		html+='<div id="S1_6" class="hideClass">';
			html+='<div id="n6"><div id="q6" class="qty"></div><div class="F_n1">'+replaceDynamicText(promptArr['6'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div>';
			html+='<div id="orange"></div>';
			html+='<div id="n6_n2"></div>';
		html+='</div>';
		
		
		//-----------------ANSWER BOX----------------------------.//
		
		html+='<div style="position: absolute;left: 72px;" >';
		html+='<div id="answer"></div>';
		html+='<div id="answer_box" onClick=interactiveObj.checkAnswer();><span id="total">'+replaceDynamicText(promptArr['Total'],interactiveObj.numberLanguage,"interactiveObj")+'</span></div>';     // button to cross check the answer
		html+='<div><input  id="answer_input" type="text" onkeypress=validate(event); ></input></div>';
		html+='<div id="symbol"></div>';
		html+='</div>';
	
	html+='</div>';
	
	
	$("#container").html(html);
	$("#girl1").delay(1000).animate({'left':'40px'},1000);
	
	$("#text").delay(3500).animate({'opacity':'1'},500);
	
	$("#answer_input").focus();

	$('input').keypress(function(e){     // For Binding Enter Key With total
    	if (e.which == 13){
        $("#answer_box").click();
   	 }
	});
	

	
	$("#text").animate({'opacity':'1'},500);
	$("#text").animate({'opacity':'0'},500);
	$("#text").animate({'opacity':'1'},500);
	$("#text").animate({'opacity':'0'},500);
	$("#text").animate({'opacity':'1'},500);
	
	
					//	$("#hand").delay(1500).animate({'opacity':'1'},500);
					//	rotateHand=setTimeout("interactiveObj.rotateHand();",1000);
//---------BLINKING-------------//
	if(id=='one')
	{

		$("#S1_"+interactiveObj.s1_r1).removeClass('hideClass');
		$("#n"+interactiveObj.s1_r1+"_n2").html('<div class="rupee"><div class="price">'+changeLanguage(interactiveObj.number1,interactiveObj.numberLanguage)+'<div class="each">'+replaceDynamicText(promptArr['each'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>');  // Price Of One Unit
		$("#q"+interactiveObj.s1_r1).text(changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage));
		
		$("#q"+interactiveObj.s1_r1).delay(1000).animate({'opacity':'1'},400);
		$("#n"+interactiveObj.s1_r1).delay(1000).animate({'opacity':'1'},400);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'0'},200);
		
		$("#q"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		$("#n"+interactiveObj.s1_r1).animate({'opacity':'1'},200);
		
		

	}
	else if(id=='two')
	{
	// why is the language getting changes automatically..!!!
	
		$("#S1_"+interactiveObj.s2_r1).removeClass('hideClass');
		$("#n"+interactiveObj.s2_r1+"_n2").html('<div class="rupee"><div class="price">'+changeLanguage(interactiveObj.number3,interactiveObj.numberLanguage)+'<div class="each">'+replaceDynamicText(promptArr['each'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>');   // Price Of One Unit
		$("#q"+interactiveObj.s2_r1).text(changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage));
		
		//-----------------------BLINKING-----------------------------------//
		
					$("#q"+interactiveObj.s2_r1).delay(1000).animate({'opacity':'0'},400);
					$("#n"+interactiveObj.s2_r1).delay(1000).animate({'opacity':'0'},400);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s2_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r1).animate({'opacity':'1'},200);


		//-------------------BLINKING-----------------------------//	


		$("#S1_"+interactiveObj.s2_r2).removeClass('hideClass');
		$("#n"+interactiveObj.s2_r2+"_n2").html('<div class="rupee"><div class="price">'+changeLanguage(interactiveObj.number1,interactiveObj.numberLanguage)+'<div class="each">'+replaceDynamicText(promptArr['each'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>');  // Price Of One Unit
		$("#q"+interactiveObj.s2_r2).text(changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage));
		
		//---------------BLINKING--------------------------//
			
					$("#q"+interactiveObj.s2_r2).delay(1000).animate({'opacity':'0'},400);
					$("#n"+interactiveObj.s2_r2).delay(1000).animate({'opacity':'0'},400);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s2_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s2_r2).animate({'opacity':'1'},200);

		
		//-----------------BLINKING------------------------//
		
		
	}
	
	else if(id=='three')
	{
		
		$("#S1_"+interactiveObj.s3_r1).removeClass('hideClass');
		$("#n"+interactiveObj.s3_r1+"_n2").html('<div class="rupee"><div class="price">'+changeLanguage(interactiveObj.number1,interactiveObj.numberLanguage)+'<div class="each">'+replaceDynamicText(promptArr['each'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>');   // Price Of One Unit
		$("#q"+interactiveObj.s3_r1).text(changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage));
		
			//-----------------BLINKING------------------------//
					$("#q"+interactiveObj.s3_r1).delay(1000).animate({'opacity':'0'},400);
					$("#n"+interactiveObj.s3_r1).delay(1000).animate({'opacity':'0'},400);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r1).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r1).animate({'opacity':'1'},200);

			
			//-----------------BLINKING------------------------//
		
		$("#S1_"+interactiveObj.s3_r2).removeClass('hideClass');
		$("#n"+interactiveObj.s3_r2+"_n2").html('<div class="rupee"><div class="price">'+changeLanguage(interactiveObj.number3,interactiveObj.numberLanguage)+'<div class="each">'+replaceDynamicText(promptArr['each'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>');   // Price Of One Unit
		$("#q"+interactiveObj.s3_r2).text(changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage));
		
		//-----------------BLINKING------------------------//
					$("#q"+interactiveObj.s3_r2).delay(1000).animate({'opacity':'0'},400);
					$("#n"+interactiveObj.s3_r2).delay(1000).animate({'opacity':'0'},400);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r2).animate({'opacity':'1'},200);
			
		//-----------------BLINKING------------------------//
		
		$("#S1_"+interactiveObj.s3_r3).removeClass('hideClass');
		$("#n"+interactiveObj.s3_r3+"_n2").html('<div class="rupee"><div class="price">'+changeLanguage(interactiveObj.number5,interactiveObj.numberLanguage)+'<div class="each">'+replaceDynamicText(promptArr['each'],interactiveObj.numberLanguage,"interactiveObj")+'</div></div></div>');   // Price Of One Unit
		$("#q"+interactiveObj.s3_r3).text(changeLanguage(interactiveObj.number6,interactiveObj.numberLanguage));
		
		//-----------------BLINKING------------------------//
					$("#q"+interactiveObj.s3_r3).delay(1000).animate({'opacity':'0'},400);
					$("#n"+interactiveObj.s3_r3).delay(1000).animate({'opacity':'0'},400);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'0'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'0'},200);
					
					$("#q"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
					$("#n"+interactiveObj.s3_r3).animate({'opacity':'1'},200);
			//-----------------BLINKING------------------------//

	}
//---------BLINKING-------------//	
}
questionInteractive.prototype.checkAnswer=function()
{

	interactiveObj.answer=0;
	interactiveObj.correct_answer=0;
	html1="";
		$("#answer_box").attr('onClick',true);
		$("#answer_input").attr('disabled',true);
		$("#answer_box").animate({'opacity':'0.5'},10)   // Still Working Flag
		//$("#answer_input").attr('readonly',true);
		$("#answer_input").animate({'opacity':'0.5'},10)



interactiveObj.answer=parseInt($("#answer_input").val());


//---------------------------------STAGE ONE STARTS FROM HERE---------------------------------------//


if(interactiveObj.id_global=='one')			// WHEN ID IS SET TO ONE
{
  interactiveObj.correct_answer=parseInt(interactiveObj.number1*interactiveObj.number2);    // CORRECT ANSWER CALCULATION LEVEL 1

	level_attempted_1=1; 		  // shows that the level is attempted
	level_status_1=0;			// shows that the level is in progress
	
	levelWiseStatus=level_status_1;        // stats the levelWiseStatus
	levelsAttempted="L1";
	levelWiseScore=0;
	extraParameters="0";
			

	if(interactiveObj.answer==interactiveObj.correct_answer)
	{
		correctResponseLevel1+=1;
		score+=10;			// computes the total score of the game
		level_score_1+=10;
		levelWiseScore=level_score_1;

		
			if(correctResponseLevel1==7)
			{
				
				level_status_1=1;   //shows that the users has completed this level
				
				levelWiseStatus=level_status_1+"|"+level_status_2;    // sets the levelWiseStatus
				levelsAttempted="L1|L2";
				levelWiseScore=level_score_1+"|"+level_score_2;
	
				interactiveObj.next_level="two";

				html1+='<div id="display_message">'+replaceDynamicText(promptArr['Message1'],interactiveObj.numberLanguage,"interactiveObj")+'';
				html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("'+interactiveObj.next_level+'")><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span></div>';
				html1+='<div id="finger11"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
				html1+='</div>';
				
				
			}
			else
			{
				html1+='<div id="display_message">'+replaceDynamicText(promptArr['GoodMessage'],interactiveObj.numberLanguage,"interactiveObj")+'';
					html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("one")><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
					html1+='<div id="finger1"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
				html1+='</div>';
			}
		
		
		$("#message").html(html1);
	
	
	}
	else
			{

					html1+='<div id="display_message">'+replaceDynamicText(promptArr['Incorrect'],interactiveObj.numberLanguage,"interactiveObj")+'<br/> '+replaceDynamicText(promptArr['Price'],interactiveObj.numberLanguage,"interactiveObj")+''+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+' '+replaceDynamicText(promptArr[interactiveObj.s1_r1],interactiveObj.numberLanguage,"interactiveObj")+' = '+changeLanguage(interactiveObj.number1,interactiveObj.numberLanguage)+' x '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+'<br/>'+replaceDynamicText(promptArr['Pay'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.correct_answer,interactiveObj.numberLanguage)+'';
				
					html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("one");><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
					html1+='<div id="finger1"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
					html1+='</div>';
					
				$("#message").html(html1);


	
			}
}



//----------------------------------- STAGE TWO STARTS FROM HERE------------------------------------//



if(interactiveObj.id_global=='two')   // Start checking from here
{	

	html1="";
	interactiveObj.correct_answer=parseInt(interactiveObj.number3*interactiveObj.number4)+parseInt(interactiveObj.number1*interactiveObj.number2);
	
	level_attempted_2=1;
	level_status_2=0;
	
	extraParameters="0|0";
	
	if(level_attempted_1==1)
	{
		levelWiseStatus=level_status_1+"|"+level_status_2;
		levelsAttempted="L1|L2";
		levelWiseScore=level_score_1+"|"+level_score_2;
	}
	else
	{
		levelWiseStatus=level_status_2;
		levelsAttempted="L2";
		levelWiseScore=level_score_2;
	}

	
		if(interactiveObj.answer==interactiveObj.correct_answer)
		{
			correctResponseLevel2+=1;
			
			level_score_2+=10;
			score+=10;
							if(level_attempted_1==1)
							{
								levelWiseScore=level_score_1+"|"+level_score_2;
							}
							else
							{
								levelWiseScore=level_score_2;
							}


			if(correctResponseLevel2==7)
				{
					
					level_status_2=1;
					
						if(level_attempted_1==1)
						{
							levelWiseStatus=level_status_1+"|"+level_status_2+"|"+level_status_3;
							levelsAttempted="L1|L2|L3"
							levelWiseScore=level_score_1+"|"+level_score_2+"|"+level_score_3;
						}
						else
						{
							levelWiseStatus=level_status_2+"|"+level_status_3;
							levelsAttempted="L2|L3";
							levelWiseScore=level_score_2+"|"+level_score_3;
						}

						
						interactiveObj.next_level="three";
					
						html1+='<div id="display_message">'+replaceDynamicText(promptArr['Message2'],interactiveObj.numberLanguage,"interactiveObj")+'';
							html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("'+interactiveObj.next_level+'")><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
							html1+='<div id="finger"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
						html1+='</div>';	
									
				}
				else
				{
			
					html1+='<div id="display_message">'+replaceDynamicText(promptArr['GoodMessage'],interactiveObj.numberLanguage,"interactiveObj")+'';
						html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("two")><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
						html1+='<div id="finger"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
					html1+='</div>';
			}

				$("#message").html(html1);
		}
		
		else
		{
			
				
					html1+='<div id="display_message">'+replaceDynamicText(promptArr['Incorrect'],interactiveObj.numberLanguage,"interactiveObj")+'<br/> '+replaceDynamicText(promptArr['Price'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage)+' '+replaceDynamicText(promptArr[interactiveObj.s2_r1],interactiveObj.numberLanguage,"interactiveObj")+' '+replaceDynamicText(promptArr['and'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+' '+replaceDynamicText(promptArr[interactiveObj.s2_r2],interactiveObj.numberLanguage,"interactiveObj")+' = '+changeLanguage(interactiveObj.number3,interactiveObj.numberLanguage)+' x '+changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage)+'&nbsp;+&nbsp;'+changeLanguage(interactiveObj.number1,interactiveObj.numberLanguage)+' x '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+' <br/><br/>'+replaceDynamicText(promptArr['Pay'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.correct_answer,interactiveObj.numberLanguage)+' ' ;
					
					html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("two");><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
					html1+='<div id="finger"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
					html1+='</div>';
					
				$("#message").html(html1);
	
		}
		
	}


//----------------------------------STAGE THREE STARTS FROM HERE--------------------------------------//


else if(interactiveObj.id_global=='three')
{
	

		html1="";
	
		interactiveObj.correct_answer=parseInt(interactiveObj.number4*interactiveObj.number3)+parseInt(interactiveObj.number2*interactiveObj.number1)+parseInt(interactiveObj.number6*interactiveObj.number5)
		
			extraParameters="0|0|0";	
			level_attempted_3=1;
			level_status_3=0;
			
			
			if(level_attempted_1==1 && level_attempted_2==1 && level_attempted_3==1)
			{
				levelWiseStatus=level_status_1+"|"+level_status_2+"|"+level_status_3;
				levelsAttempted="L1|L2|L3";
				levelWiseScore=level_score_1+"|"+level_score_2+"|"+level_score_3;
			} 
			else if(level_attempted_1==0 && level_attempted_2==1 && level_attempted_3==1)
			{
				levelWiseStatus=level_status_2+"|"+level_status_3;
				levelsAttempted="L2|L3";
				levelWiseScore=level_score_2+"|"+level_score_3;
			}
			else if(level_attempted_1==0 && level_attempted_2==0 && level_attempted_3==1)
			{
				levelWiseStatus=level_status_3;
				levelsAttempted="L3";
				levelWiseScore=level_score_3;
			}
				
		if(interactiveObj.answer==interactiveObj.correct_answer)
			{
					correctResponseLevel3+=1;
					score+=10;	
					level_score_3+=10;
				
			
					if(level_attempted_1==1 && level_attempted_2==1 && level_attempted_3==1)
									{
									
										levelWiseScore=level_score_1+"|"+level_score_2+"|"+level_score_3;
									} 
									else if(level_attempted_1==0 && level_attempted_2==1 && level_attempted_3==1)
									{
									
										levelWiseScore=level_score_2+"|"+level_score_3;
									}
									else if(level_attempted_1==0 && level_attempted_2==0 && level_attempted_3==1)
									{
									
										levelWiseScore=level_score_3;
									}	

	
					if(correctResponseLevel3==5)
						{
							level_status_3=1;
							completed=1;
							
									if(level_attempted_1==1 && level_attempted_2==1 && level_attempted_3==1)
									{
										levelWiseStatus=level_status_1+"|"+level_status_2+"|"+level_status_3;
										levelsAttempted="L1|L2|L3";
										levelWiseScore=level_score_1+"|"+level_score_2+"|"+level_score_3;
									} 
									else if(level_attempted_1==0 && level_attempted_2==1 && level_attempted_3==1)
									{
										levelWiseStatus=level_status_2+"|"+level_status_3;
										levelWiseScore=level_score_2+"|"+level_score_3;
									}
									else if(level_attempted_1==0 && level_attempted_2==0 && level_attempted_3==1)
									{
										levelWiseStatus=level_status_3;
										levelWiseScore=level_score_3;
									}	
							
											
							html1+='<div id="display_message">'+replaceDynamicText(promptArr['End'],interactiveObj.numberLanguage,"interactiveObj")+'';
							html1+='<div id="next_question_button" onclick=interactiveObj.EndPage();><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span></div>';
							html1+='<div id="fingerFinal"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
							html1+='</div>';	

							
							//Setting the Variables For Next Use
					
							score=0;						// sets the score to 0 for next start
							
							correctResponseLevel1=0;		// re-sets the attempts at every level 
							correctResponseLevel2=0		// re-sets the attempts at every level 
							correctResponseLevel3=0;		// re-sets the attempts at every level 
							
							level_attempted_1=0;
							level_attempted_2=0;
							level_attempted_3=0;
							
							level_status_1=0;
							level_status_2=0;
							level_status_3=0;
							
							level_score_1=0;
							level_score_2=0;
							level_score_3=0;
							

							finalscore=0;

					
							interactiveObj.next_level="";
						
						
						
					//--------------------------------------------------------------------//				

							$("#message").html(html1);	
								
							$("#display_message").animate({'opacity':'0'},300);
							$("#display_message").animate({'opacity':'1'},300);
							$("#display_message").animate({'opacity':'0'},300);
							$("#display_message").animate({'opacity':'1'},300);
							$("#display_message").animate({'opacity':'0'},300);
							$("#display_message").animate({'opacity':'1'},300);
							$("#display_message").animate({'opacity':'0'},300);
							$("#display_message").animate({'opacity':'1'},300);
										
						}
					else
						{
							html1+='<div id="display_message">'+replaceDynamicText(promptArr['GoodMessage'],interactiveObj.numberLanguage,"interactiveObj")+'';
								html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("three")><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
								html1+='<div id="fingerlast1"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
							html1+='</div>';			
			}
				
			$("#message").html(html1);	
			}
				
			else
				{
		
				html1+='<div id="display_message">'+replaceDynamicText(promptArr['Incorrect'],interactiveObj.numberLanguage,"interactiveObj")+'<br/> '+replaceDynamicText(promptArr['Price'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage)+' '+replaceDynamicText(promptArr[interactiveObj.s3_r2],interactiveObj.numberLanguage,"interactiveObj")+' '+replaceDynamicText(promptArr['and'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+' '+replaceDynamicText(promptArr[interactiveObj.s3_r1],interactiveObj.numberLanguage,"interactiveObj")+ ' '+replaceDynamicText(promptArr['and'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.number6,interactiveObj.numberLanguage)+ ' '+replaceDynamicText(promptArr[interactiveObj.s3_r3],interactiveObj.numberLanguage,"interactiveObj")+' is=<br/> '+changeLanguage(interactiveObj.number4,interactiveObj.numberLanguage)+' x '+changeLanguage(interactiveObj.number3,interactiveObj.numberLanguage)+' + '+changeLanguage(interactiveObj.number2,interactiveObj.numberLanguage)+' x '+changeLanguage(interactiveObj.number1,interactiveObj.numberLanguage)+' + '+changeLanguage(interactiveObj.number6,interactiveObj.numberLanguage)+' x '+changeLanguage(interactiveObj.number5,interactiveObj.numberLanguage)+'<br/>'+replaceDynamicText(promptArr['Pay'],interactiveObj.numberLanguage,"interactiveObj")+' '+changeLanguage(interactiveObj.correct_answer,interactiveObj.numberLanguage)+' ' ;
				
						html1+='<div id="next_question_button" onclick=interactiveObj.StageOne("three");><span class="OK">'+replaceDynamicText(promptArr['OK'],interactiveObj.numberLanguage,"interactiveObj")+'</span</div>';
						html1+='<div id="fingerlast"><span id="fingerText">&nbsp;'+promptArr['Click']+'</span></div>';
					html1+='</div>';

				$("#message").html(html1);	
					
				}

}

}

questionInteractive.prototype.EndPage=function()
{
	html='';
	html2='';
	$("#container").html(html);


	html='<div id="EndPage"><div><img src="../assets/sparkie.gif"/></div><div id="endText">'+promptArr['endPage']+'</div></div>';
	$("#container").html(html);
}

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
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
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});		
}