var completed = 0;
var totalTimeTaken = 0;
var percentage = 0;
var extraParameters = "";
var level1CorrectCount = 0;
var canvas, context, pid;
var FPS = 8; 
var enemyCount = 5; //option count of question 
var shooterHeight=0; //height of shooter in the game
var levelWisePer = ([
						[10,20,25,30,50,75],
						[10,20,25,30,40,50,75]
					]); // level wise given percentage


var stChoosePerArr = new Array(); // whatever student will choose percentage for question that will be save in this array 
var stPerWiseCorrectCountArr = new Array();

var stCurrentLevel = 1; // student current level in game
var score = 0;
var passingCriteria = 60; //60% of 10 quetions
var totalQuesAttempted = 0;
var currentPerQuesCount = 0; // current percentage question count.......
var optPerArr = [10,20,25,30,50,75,100,200]; // possible percentage option val co-responding giving question
var enemiesValArr = new Array();
var quesVal = 0;
var currentPerVal = 10;
var currentPerAttemptedCount = 0;
var correctAnswer = 0;
var currentPerCorrectQueCount = 0;
var totalCorrectQueCount = 0;
var setIntervalObj =null;
var collisionFlag = 0;
var failFlag = 0; // set 1 if student fails to pass the game
var winGameFlag = 0;
var currentPerQueArr = new Array();
var stGivenAnsArr = new Array();
var stCorrectAnsArr = new Array();
var uniqueQueArr = new Array();
var levelwiseWrongQueAnsStrArr = new Array();//store levelwise question and answer pair that student have answered incorrectly 

var blinkTimer = null;
var blinkCount = 0;
var blinkDivID = "";

var minQuesCount = 10;
var osDetectionVal = false;// set true if os are iPad,Android,iphone

//we are using these varibale for just confirming that xml and body have loaded .....
var xmlLoadedFlag = 0;
var callReadyFlag = 0;
 
var sprite = new Image();
sprite.src="../assets/objects.png";
				
function loadXmlCompleted()//start anything from here. this function is called from parsing file.
{
	xmlLoadedFlag = 1;
	if(callReadyFlag == 1)
		init();	
}

$(document).ready(function() {
	callReadyFlag = 1 ;
	if(xmlLoadedFlag == 1)
		init();		
		
});


function init()
{
	canvas=document.getElementById('game_canvas');
	context=canvas.getContext('2d');		
	document.getElementById('gameHeading').innerHTML = instArr['inst1'];	
	document.getElementById('instHeading').innerHTML = instArr['inst2'];
	
	osDetectionVal = osDetection();
	addKeyBoardEvent();
	//alert(osDetectionVal);
	if(osDetectionVal)	
		document.getElementById('instDesc').innerHTML = instArr['inst3_tablet'];
	else
		document.getElementById('instDesc').innerHTML = instArr['inst3'];	
	
	$('#level1txt').html(promptArr['p105']);
	setIntervalObj = setTimeout(function() {
		  	drawAlienForInst();
    }, 500);  
	
	
}



//clear game canvas
function clear()
{
	context.clearRect(0,0,canvas.width,canvas.height);
	canvas.width = canvas.width;
}

function checkForNextScreen()
{
	if(winGameFlag == 1)
	{
		sendData();
		$('#gameOver').show();
		$('#scoreTxt').html(promptArr['p104']);		
		$('#congratsImg').show();
	}
	else if(failFlag == 1)
	{
		if(stChoosePerArr.length < 3 && stCurrentLevel == 1)	
		{
			level1CorrectCount = totalCorrectQueCount;
			extraParameters = "LEVEL1 a.Percent played by the student-:"+implode(",",stChoosePerArr)+"||b.	correct answered count-:"+level1CorrectCount+"|| Ques(incorrect answer)-:"+implode(",",levelwiseWrongQueAnsStrArr);
		}
		
		sendData();
		var txt = promptArr['p101']+" "+(totalCorrectQueCount*10)+".";
		$('#gameOver').show();
		$('#scoreTxt').html(txt);
		$('#improveSkillMsg').html(promptArr['p102']);
	}
	else if(stCurrentLevel == 2)
	{
		//setIntervalObj = setTimeout(function() {
		  	drawAlienForInst();
    //}, 500);
		$('#gameHeading').show();	
		$('#level2Screen').show();
		$('#level2Screen #inst').html(promptArr['p103']);			
		$('#gamePointRelatedInfo').show();		
		$('#playBtn').show();	
	}
	else if(stCurrentLevel == 1)
	{
		$('#instDesc').remove();
		$('#instHeading').css('font-size',24);
		$('#instHeading').html(instArr['inst4']);
		$('#gamePointRelatedInfo').show();
		$('#percentageOpt').show();
		$('#level1txt').show();
		$('#playBtn').hide();	
		
		blinkDivID = "percentageOpt";
		blinkFunc();		
	}
	
}

function hideChoosePercentageOpt()
{
	window.clearTimeout(blinkTimer);
	$('#gameHeading').hide();
	$('#instHeading').hide();
	$('#gamePointRelatedInfo').hide();
	$('#percentageOpt').hide();
	$('#percentageOpt').css('visibility','hidden');
	$('#level1txt').hide();
	
	//$('#playBtn').hide();
}

function showChoosePercentageOpt()
{
	///setIntervalObj = setTimeout(function() {
		  	drawAlienForInst();
   // }, 500);
	$('#gameHeading').show();
	$('#instHeading').show();
	$('#gamePointRelatedInfo').show();
	$('#percentageOpt').show();
	$('#percentageOpt').css('visibility','visible');
	$('#level1txt').show();
	blinkDivID = "percentageOpt";
	blinkFunc();
	///$('#playBtn').show();
}

function initializeGame()
{	
	clear();	
	
	percentage = totalCorrectQueCount;
	
	showQueCounter = 0;	
	bulletArr = [];
	enemiesArr = [];
	collisionFlag = 0;
	if(stCurrentLevel == 1)
		minQuesCount = 5;
	else
		minQuesCount = 10;
			
	if(currentPerQuesCount < minQuesCount)
	{
		totalQuesAttempted++;
		currentPerQuesCount++;
		generateQuesVal();
		//alert(buletCount+"---"+currentPerQuesCount);
		
		showQues();
  		setTimeout(startGame,2000);		
			
	}
	else
	{
		stGivenAnsArr = new Array();
		stCorrectAnsArr = new Array();
		uniqueQueArr = new Array();
		
		currentPerQueArr = new Array();
		currentPerAttemptedCount++;	
	 	var checkPerCorrect = (currentPerCorrectQueCount/currentPerQuesCount)*100;
		
		if(stChoosePerArr.length == 3 && stCurrentLevel == 1)	
		{
			stCurrentLevel = 2;
			level1CorrectCount = totalCorrectQueCount;
			extraParameters = "LEVEL1 a.Percent played by the student-:"+implode(",",stChoosePerArr)+" b.	correct answered count-:"+level1CorrectCount+"|| Ques(incorrect answer)-:"+implode(",",levelwiseWrongQueAnsStrArr);
			levelwiseWrongQueAnsStrArr = new Array();
		}
			
	
		if((currentPerAttemptedCount == 1 && stCurrentLevel==1))
			stPerWiseCorrectCountArr.push(currentPerCorrectQueCount);
		if(stCurrentLevel == 1)
			currentPerCorrectQueCount = 0;
		
		currentPerQuesCount = 0;
			
		if(stCurrentLevel == 2)	
		{
			if(currentPerAttemptedCount == 1)
			{
				currentPerCorrectQueCount = 0;
				checkForNextScreen();	
			}							
			else 
			{
				stChoosePerArr.push(currentPerVal);
				stPerWiseCorrectCountArr.push(currentPerCorrectQueCount);
				
				if(checkPerCorrect >= passingCriteria )
				 	winGameFlag = 1;
				else
				 	failFlag = 1;
				
				extraParameters +="|| LEVEL2 a. correct answered count-:"+(totalCorrectQueCount-level1CorrectCount)+"|| Ques(incorrect answer)-:"+implode(",",levelwiseWrongQueAnsStrArr);
				checkForNextScreen();	
			}				
		}
		else if(checkPerCorrect >= passingCriteria )
		{
			currentPerQuesCount = 0;
			currentPerAttemptedCount = 0;
			showChoosePercentageOpt();			
		}
		else if(currentPerAttemptedCount == 1)
		{
			$('#secondAttemtedTxt').empty();
			$('#secondAttemtedTxt').show();
			$('#secondAttemtedTxt').html(promptArr['p106']);
			
			setTimeout(function() {
				$('#secondAttemtedTxt').hide();
		  		initializeGame();		
    		}, 4000);
			
		}		
		else 
		{
			failFlag = 1;
			checkForNextScreen();
		}
		
	}
	
} 

function startGame()
{
	addKeyBoardEvent();
	
	shooterObj = new shooter();
	shooterObj.init();
	shooterObj.dx =(canvas.width/2)-shooterObj.dw/2;
	shooterObj.dy = canvas.height - shooterObj.dh;
	shooterHeight = shooterObj.dh;
	
	canvas.addEventListener('touchstart',touchStart,false);
	
	makeEnemyObject();
	
	setIntervalObj = setInterval(function() {
		     update();	    			  		
	       }, 1000/FPS);
}

//------------------------------------------------Start SHOOTER -------------------------------------------------------------------------
//Declare class definition of shooter 
var shooter=function() {
	var dx;
	var dy;
	var sw;
	var sh;
	var dw;
	var dh;
	var sx;
	var sy;
};
//shooter initialize function 
shooter.prototype.init=function() {
	this.sw=81;
	this.sh=102;
	this.dw=81;	
	this.dh=102;
	this.sx=0;
	this.sy=250;
}

//draw shooter in canvas 
shooter.prototype.draw=function() {
	context.beginPath();
	context.drawImage(sprite,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
	//draw red dot for fire bullet in tablet/ipad
	if(osDetectionVal)
	{
		context.fillStyle='red';
		context.arc((this.dx+this.dw/2+5),this.dy-15,10,0,2*Math.PI,true);
		context.fill();	
	}	
	context.closePath();
};

function drawAlienForInst()
{	
	context.beginPath();
	context.drawImage(sprite,80,500,57,138,150,10,57,138);
	context.drawImage(sprite,80,500,57,138,600,10,57,138);
	context.closePath();
}
//------------------------------------------------ END SHOOTER -------------------------------------------------------------------------



//------------------------------------------------ Start Bullet -------------------------------------------------------------------------

bulletArr = [];

//Declare class definition of bullet 
var bullet=function()
{
	this.sx=0;
	this.sy=500;
	this.sw=8;
	this.sh=46;
	this.dx=0;
	this.dy=0;
	this.dw=8;
	this.dh=46;	
	this.yVelocity = 40; //Enemy Movement in y axis 
	this.active = true; //set false when bullet hit the space or he has crossed the shooter
	this.age = 0;  //movement count in y axis side 
};

//draw bullet in canvas 
bullet.prototype.draw = function()
{
	context.beginPath();
	context.drawImage(sprite,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
	context.closePath();
};

//update bullet y position 
bullet.prototype.update = function() 
{
    this.dy -= this.yVelocity;

    this.age++;

    this.active = !this.inBounds();
	if(this.active == false)
		bulletArr = [];	
		
 };  

bullet.prototype.inBounds = function()
{
	return (this.dy <= this.dh);
};

//------------------------------------------------ END Bullet -------------------------------------------------------------------------




//------------------------------------------------Start ENEMY -------------------------------------------------------------------------
enemiesArr = []; //enemies array

//Declare class definition of enemies 
var enemy=function(x,y)
{
	this.sx=0;
	this.sy=125;
	this.sw=142;
	this.sh=102;
	this.dx=x;
	this.dy=y;
	this.dw=142;
	this.dh=102;	
	this.yVelocity = 1; // Enemy Movement in y axis 
	this.correctAnsFlag = 0; // set 1 for correct answer other wise set 0
	this.gap = 20; // gap between two objects
	this.txtVal;
	this.active = true; //set false when bullet hit the space or he has crossed the shooter
	this.age = 0;  // movement count in y axis side 
};

//draw enemies in canvas 
enemy.prototype.draw = function()
{
	context.beginPath();
	context.drawImage(sprite,this.sx,this.sy,this.sw,this.sh,this.dx,this.dy,this.dw,this.dh);
	context.closePath();
};

//update enemies y position 
enemy.prototype.update = function() 
{
    this.dy += this.yVelocity;

    this.age++;

    this.active = !this.inBounds();	
 };
  
enemy.prototype.inBounds = function()
{
	
	return ((this.dy+ this.dh)>= (canvas.height-shooterHeight));
};

//explode of enemies
enemy.prototype.drawExplode = function()
{
	context.beginPath();
	context.clearRect(this.dx,this.dy,this.dw,121);
	context.drawImage(sprite,0,375,105,105,this.dx+((this.dw-105)/2),this.dy,105,105);
	context.closePath();
};

//show alien 
enemy.prototype.showAlien = function()
{
	context.beginPath();
	context.drawImage(sprite,0,0,this.dw,121,this.dx,this.dy,this.dw,121);
	context.closePath();
};


//------------------------------------------------ END ENEMY -------------------------------------------------------------------------
 
//choose percentage click event action......
$('#percentageOpt div').live('click',function(){
	$(this).hide();
	var value = $(this).text();
	value = value.replace("%", "");
	currentPerVal = value;
	stChoosePerArr.push(currentPerVal);
	hideChoosePercentageOpt()
	initializeGame();	
});	

$('#continueBtn').live('click',function()
{	
	removeKeyBoardEvent();
	contiueBtnFunc();
});

function contiueBtnFunc()
{
	$('#tableRelatedTxt').hide();
	$('#userQuesResponse').hide();
	$('#tableRelatedTxt').empty();
	$('#userQuesResponse').empty();
	$('#continueBtn').hide();
	initializeGame();
}

$('#playBtn').live('click',function()
{	
	removeKeyBoardEvent();
	playClickFunc();				
});

function playClickFunc()
{
	$('#playBtn').hide();
	if(stCurrentLevel == 1)
		checkForNextScreen();
	else if(stCurrentLevel == 2)
	{
		$('#instDesc').remove();
		$('#instHeading').hide();
		$('#gamePointRelatedInfo').hide();
		$('#percentageOpt').hide();
		$('#level1txt').hide();
		$('#playBtn').hide();
		//currentPerVal = ;
		var minIndex = -1;
		var minVal = 1000;
		for(var i=0 ; i < stPerWiseCorrectCountArr.length ; i++)
		{
			if(stPerWiseCorrectCountArr[i]<minVal)	
			{
				minVal = stPerWiseCorrectCountArr[i];
				minIndex = i ;
			}
		}
		for(var k=0; k <stChoosePerArr.length;k++)
		{
			levelWisePer[1] = removeByElement(levelWisePer[1],stChoosePerArr[k]);
		}
		if(minVal !=10)
			levelWisePer[1].push(stChoosePerArr[minIndex]);
		
		currentPerVal = '';//levelWisePer[1][Math.round(Math.random()*levelWisePer[1].length)];			
		
		$('#gameHeading').hide();	
		$('#level2Screen').hide();
		$('#level2Screen #inst').hide();			
		$('#gamePointRelatedInfo').hide();		
		$('#playBtn').hide();		
		initializeGame();
	}	
}


function removeKeyBoardEvent()
{
	$(document).unbind('keydown');
}

function addKeyBoardEvent()
{
	//Key events
	$(document).bind('keydown',function(evt) {
		//37, 38, 39, 40 for arrow keys
		//87, 65, 83, 68 for WASD
		//32 space key
		
		if(evt.keyCode==13) {
			evt.preventDefault();
			if($('#playBtn').css('display') !='none')
			{
				playClickFunc();			
			}
			else if($('#continueBtn').css('display') !='none')
				contiueBtnFunc();			
				
		}	
		else if(evt.keyCode==37 || evt.keyCode==65) {
			evt.preventDefault();
			shooterObj.dx = shooterObj.dx-10;
		}
		
		else if(evt.keyCode==39 || evt.keyCode==68) {
			evt.preventDefault();
			shooterObj.dx = shooterObj.dx+10;
		}		
		else if(evt.keyCode==32) {
			evt.preventDefault();
			if(bulletArr.length == 0)
				makeBulletObject();		
		}	
		
		if(shooterObj.dx)
		{
			//shooter max right movement Limit	
			if(shooterObj.dx >(canvas.width - shooterObj.dw))
				shooterObj.dx = (canvas.width - shooterObj.dw);
			//shooter max left movement Limit	
			if(shooterObj.dx < 0)
				shooterObj.dx = 0;	
		}
				
	});
	
}

//update objects position in canvas		
function update()
{
	enemiesArr.forEach(function(enemy) 
	 {
	 	enemy.update();
	 });	
	
	bulletArr.forEach(function(bullet) 
	{
	 	bullet.update();
    });	
	
	draw();
}


//draw all objects in canvas
function draw()
{
	clear();
	handleCollisions();
	showQues();
	
	shooterObj.draw();
	
	enemiesArr.forEach(function(enemy) 
	{
		
		/*var metrics = context.measureText(enemy.txtVal);
		metrics = context.measureText(enemy.txtVal);
        var width = metrics.width;*/
		//alert(width);
      	
		var width = textWidth(enemy.txtVal);	 
		
		if(enemy.correctAnsFlag == 1 && collisionFlag !=0 && enemy.active == true)
		{
			enemy.showAlien();
			showFillText(enemy.txtVal,(enemy.dx+enemy.dw/2-width/2),(enemy.dy+enemy.dh/2 + 30),'#000',20);									
		}			
		else
		{
			if(enemy.active || (enemy.active == false && bulletArr.length == 0))
			{
				enemy.draw();
				showFillText(enemy.txtVal,(enemy.dx+enemy.dw/2-width/2),(enemy.dy+enemy.dh/2 + 15),'#000',20);				
			}				
		}			
		var tempStr = "";
		if(!enemy.active)
		{
			if(bulletArr.length > 0)
			{
					
				stGivenAnsArr[currentPerQuesCount-1] = enemy.txtVal;
							
				if(enemy.correctAnsFlag == 1)
				{
					enemy.showAlien();				
					setTimeout(function() {
						enemy.drawExplode();			
		    		}, 500);
					totalCorrectQueCount++;
					currentPerCorrectQueCount++;						
				}		
				else
				{
					enemy.drawExplode();			
					tempStr = quesVal+"("+enemy.txtVal+")";
					levelwiseWrongQueAnsStrArr.push(tempStr);					
				}				
			}		
			
			if(stCurrentLevel == 1)
				minQuesCount = 5;
			else
				minQuesCount = 10;	
								
			removeKeyBoardEvent();
			
			if(bulletArr.length==0)
			{
				tempStr = quesVal+"(N)";
				levelwiseWrongQueAnsStrArr.push(tempStr);					
					
				$('#secondAttemtedTxt').empty();
				$('#secondAttemtedTxt').html(promptArr['p107']);
				$('#secondAttemtedTxt').show();				
				setTimeout(function() {
						$('#secondAttemtedTxt').hide();
						if(currentPerQuesCount == minQuesCount)
							showTableFunc();	
						else
							initializeGame();				
		    		}, 4000);	
			}
			else
			{
				if(currentPerQuesCount == minQuesCount)
					setTimeout(showTableFunc,2000);	
				else
					setTimeout(initializeGame,2000);				
			}	
			
		}	
		
		if(enemy.correctAnsFlag == 1)
			stCorrectAnsArr[currentPerQuesCount-1] = enemy.txtVal;
		
     });
	 
	 if(bulletArr.length == 0)
	 	stGivenAnsArr[currentPerQuesCount-1] = "-";				
			
	 showFillText(miscArr["m101"]+(totalCorrectQueCount*10),620,30,'#FFF',20);				
		
	 bulletArr.forEach(function(bullet) 
	 {
		if(bullet.active)
			bullet.draw();			
     });	
	
};



function handleCollisions() 
{
  enemiesArr.forEach(function(enemy) {
  	 if(enemy.active == false)
	 {
	 	clearInterval(setIntervalObj);	
		collisionFlag = 2;
	 }
   	 	
  });
  
   bulletArr.forEach(function(bullet) {
    enemiesArr.forEach(function(enemy) {
      if(collides(bullet, enemy)) {
        // enemy.explode();
		bullet.active = false;
		enemy.active = false;
		clearInterval(setIntervalObj);
		collisionFlag = 1;
      }
    });
  });
}


function collides(a, b) 
{
    return a.dx < b.dx + b.dw &&
    a.dx + a.dw > b.dx &&
    a.dy < b.dy + b.dh &&
    a.dy + a.dh > b.dy;
}


//make enemies object and give initial position of object
function makeEnemyObject()
{
	enemiesArr = [];
	enemiesValArr = generateOpt();
	for(var i=0; i < enemyCount ; i++)
	{
		var enemyObj = new enemy(0,0);
        var xPos = parseInt(0+parseInt(enemyObj.dw*i));
		var yPos = Math.floor((Math.random()*60)+80);
		enemyObj.dx = xPos + enemyObj.gap*i;
		enemyObj.dy = yPos;
		enemyObj.yVelocity = Math.random()*2+1;		
		enemiesArr.push(enemyObj);	
		if(correctAnswer == enemiesValArr[i])
			enemyObj.correctAnsFlag = 1;
			
		enemyObj.txtVal = enemiesValArr[i];
		showFillText(enemyObj.txtVal,(xPos+enemyObj.dw/2),(yPos+enemyObj.dh/2),'#000',20);
	}	
}

function makeBulletObject()
{
	var bulletObj = new bullet();
	bulletObj.dx = shooterObj.dx + shooterObj.dw/2 + 2;
	bulletObj.dy = shooterObj.dy - bulletObj.dh + 10;		
	bulletArr.push(bulletObj);		
}

function showFillText(txt,xPos,yPos,color,fontSize) 
{
	context.fillStyle = color;//'#000';
	context.beginPath();
    context.font=fontSize+"pt Arial Unicode MS";
    context.fillText(txt, xPos, yPos);
    context.closePath();
}

var showQueCounter = 0;
//show question text 
function showQues()
{
	showQueCounter++;
	if(showQueCounter == 1)
	{
		var width = textWidth("What is \n"+currentPerVal+"% of "+quesVal+"?");
		width = width*4.5;	
		showFillText("What is \n"+currentPerVal+"% of "+quesVal+"?",(canvas.width/2-width/2),300,'#FFF',35);	
	}
	else
	{
		var width = textWidth("What is \n"+currentPerVal+"% of "+quesVal+"?");	
		showFillText("What is \n"+currentPerVal+"% of "+quesVal+"?",(canvas.width/2-width),30,'#FFF',20);						
	}	
}


function generateQuesVal()
{	
	var randomMultiple = 0;
	var upperLimit = 0;	
	//Should be multiple of given percentage value
	var loopCount = 0;
	var mulOf100Arr = new Array(100,200,300,400,500);
	mulOf100Arr = arrayShuffle(mulOf100Arr);
	
	do{
		loopCount++;
		if(loopCount > 100)
		{
			loopCount = 0;
			currentPerQueArr = new Array();	
		}
		
		if(stCurrentLevel == 1)
		{
			var divisibleNum = 0;
			for(var i=0; i < mulOf100Arr.length ; i++)
			{
				if(parseInt(mulOf100Arr[i]/currentPerVal) == parseFloat(mulOf100Arr[i]/currentPerVal))
				{
					divisibleNum = mulOf100Arr[i]/currentPerVal;
					break;
				}
			}
			
			lowerLimit = Math.floor(divisibleNum/currentPerVal);
			upperLimit = Math.floor(500/divisibleNum);//parseInt(500/currentPerVal);
			randomMultiple = Math.ceil((Math.random()*(upperLimit-lowerLimit))+lowerLimit);	
			quesVal = divisibleNum * randomMultiple;			
		}	
		else if(stCurrentLevel == 2)
		{
			var previousCurrentPerVal = currentPerVal;
			if(currentPerVal!='')
				levelWisePer[1] = removeByElement(levelWisePer[1],currentPerVal);
			currentPerVal = levelWisePer[1][Math.round(Math.random()*(levelWisePer[1].length-1))];
			if(previousCurrentPerVal!='')
				levelWisePer[1].push(previousCurrentPerVal);
				
			quesVal = Math.ceil(Math.random()*500);	
		}
			
				  		 
	}while(in_array(quesVal,currentPerQueArr))
	
	uniqueQueArr.push(quesVal);
	currentPerQueArr.push(quesVal);	
}


//generate option value
function generateOpt(level)
{
	var optValArr = new Array();
	var tempOptPerArr = optPerArr;
	tempOptPerArr = removeByElement(tempOptPerArr,currentPerVal);
	tempOptPerArr = arrayShuffle(tempOptPerArr);
	for(var i=0; i < enemyCount-1 ; i++)
	{
		optValArr[i] = parseFloat(parseFloat(quesVal*tempOptPerArr[i])/100);			
	}
		
	optPerArr.push(currentPerVal);
	optValArr[i] = parseFloat(parseFloat(quesVal*currentPerVal)/100);	
	correctAnswer = optValArr[i];
	optValArr = arrayShuffle(optValArr);
	return optValArr;
}

function textWidth(txt)
{
	var metrics = context.measureText(txt);
	metrics = context.measureText(txt); 
	return metrics.width;
}

function showTableFunc()
{
	clear();	
	if(stCurrentLevel == 1)
	{
		addKeyBoardEvent();
		
		$('#tableRelatedTxt').empty();
		$('#userQuesResponse').empty();
		$('#userQuesResponse').show();
		$('#tableRelatedTxt').show();
		$('#tableRelatedTxt').html(promptArr["p1"+currentPerVal]);
		blinkDivID = "tableRelatedTxt";
		blinkFunc();
		makeTable("userQuesResponse", stGivenAnsArr.length, 4,"tableID","userAnsTable","userAnsTd") 
		$('#continueBtn').show();	
	}
	else if(stCurrentLevel == 2)
	{
		initializeGame();	
	}	
}

function blinkFunc()
{
	blinkCount++;
	$('#'+blinkDivID).fadeOut().fadeIn();
	if(blinkCount < 3)
		blinkTimer = window.setTimeout(blinkFunc,250);	
	else
	{
		blinkCount = 0;	
		blinkDivID = "";
	}
		
}
 
function makeTable(parentID, row_num, cell_num,tableID,tableCss,cellCss) 
{

	row=new Array();
	cell=new Array();
	headRowValArr = new Array("Question","Percentage","Your answer","Correct Answer");
	var iD;
	var index;
	var count = 0;
	
	tab=document.createElement('table');
	tab.setAttribute('id',tableID);
	tab.setAttribute('class', tableCss);
	tho=document.createElement('thead');
	headRow=document.createElement('tr');
	
	for(k=0;k<cell_num;k++) 
	{
		cell[k]=document.createElement('td');
		cont=document.createTextNode(headRowValArr[k]);
		cell[k].setAttribute('class',cellCss);
		cell[k].appendChild(cont);
		headRow.appendChild(cell[k]);	
	}
	tho.appendChild(headRow);
	tab.appendChild(tho);		
	
	tbo=document.createElement('tbody');
	
	for(c=0;c<row_num;c++)
	{
		row[c]=document.createElement('tr');
	
		for(k=0;k<cell_num;k++) 
		{
			cell[k]=document.createElement('td');
			iD = c+"_"+k;
			index=(c*4)+k;
			cell[k].setAttribute('id',iD);
			cell[k].setAttribute('class',cellCss);
			
			if(k == 0)
				cont=document.createTextNode(uniqueQueArr[c]);
			else if(k == 1)
				cont=document.createTextNode(currentPerVal+"%");
			else if(k == 2)
			{
				cont=document.createTextNode(stGivenAnsArr[c]);	
				if(stCorrectAnsArr[c] == stGivenAnsArr[c])
					cell[k].setAttribute('class',cellCss+' correctAnswerBorder');		
				else
					cell[k].setAttribute('class',cellCss+' wrongAnswerBorder');			
			}			
			else if(k == 3)
			{
				cont=document.createTextNode(stCorrectAnsArr[c]);	
				cell[k].setAttribute('class',cellCss+' correctAnswerBorder');				
			}			
			cell[k].appendChild(cont);
			row[c].appendChild(cell[k]);			
			
			count++;
		}
		tbo.appendChild(row[c]);
	}
	tab.appendChild(tbo);
	document.getElementById(parentID).appendChild(tab);
}

/*------------------------------------------------------- Touch event -----------------------------------------------------------------------------------*/
var triggerElementID = null; // this variable is used to identity the triggering element
var fingerCount = 0;
var startX = 0;
var startY = 0;
var curX = 0;
var curY = 0;
var minLength = 20; // the shortest distance the user may swipe
var swipeLength = 0;
var swipeAngle = null;
var swipeDirection = null;

function touchStart(event)
 {
 	// disable the standard ability to select the touched object
	event.preventDefault();
	// get the total number of fingers touching the screen
	fingerCount = event.touches.length;
	// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
	// check that only one finger was used
	if ( fingerCount == 1 ) {
		// get the coordinates of the touch
		if(shooterObj.dx)
		{
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			var touchFlag=0;
			//alert("startX "+startX+" shooterObj.dx "+shooterObj.dx+" --- "+(shooterObj.dx+shooterObj.dw)+" startY "+startY+" shooterObj.dy "+shooterObj.dy+"---"+(shooterObj.dy+shooterObj.dh));
			if(startX > shooterObj.dx && startX < (shooterObj.dx+shooterObj.dw) && startY > shooterObj.dy && startY < (shooterObj.dy+shooterObj.dh))
				touchFlag = 1;
			//alert("startX "+startX+" shooterObj.dx "+(shooterObj.dx+shooterObj.dw/2-10)+" --- "+(shooterObj.dx+shooterObj.dw/2+25)+" startY "+startY+" >> "+(shooterObj.dy-30)+"---"+(shooterObj.dy-5));	
			if(startX > (shooterObj.dx+shooterObj.dw/2-30) && startX < (shooterObj.dx+shooterObj.dw/2+35) && startY > (shooterObj.dy-50) && startY < (shooterObj.dy-5))	
			{
				touchFlag = 0;
				//alert("fire");
				if(bulletArr.length == 0)
					makeBulletObject();	
			}
			
			if(touchFlag == 1)	
			{
				canvas.addEventListener('touchmove',touchMove,false);
				canvas.addEventListener('touchend',touchEnd,false);
			}	
		}
		

		
		// store the triggering element ID
		//triggerElementID = passedName;
	} else {
		// more than one finger touched so cancel
		touchCancel(event);
	}
}

function touchMove(event)
 {
	event.preventDefault();
	if (event.touches.length == 1 ) {
		curX = event.touches[0].pageX;
		curY = event.touches[0].pageY;
		swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
		caluculateAngle();
		determineSwipeDirection();
		processingRoutine();	
		startX = curX;
		startY = curY;		
	} else {
		touchCancel(event);
	}
}

function touchEnd(event) 
{
	event.preventDefault();
	canvas.removeEventListener('touchmove',touchMove,false);
	canvas.removeEventListener('touchend',touchEnd,false);
	touchCancel(event);
	
	//alert("end")	;
	// check to see if more than one finger was used and that there is an ending coordinate
	/*if ( fingerCount == 1 && curX != 0 ) {
		// use the Distance Formula to determine the length of the swipe
		swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
		// if the user swiped more than the minimum length, perform the appropriate action
		if ( swipeLength >= minLength ) {
			caluculateAngle();
			determineSwipeDirection();
			processingRoutine();
			touchCancel(event); // reset the variables
		} else {
			touchCancel(event);
		}
	} else {
		touchCancel(event);
	}*/
}	

function caluculateAngle() {
	var X = startX-curX;
	var Y = curY-startY;
	var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
	var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
	swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
	if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
}

function determineSwipeDirection() {
	if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
		swipeDirection = 'left';
	} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
		swipeDirection = 'left';
	} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
		swipeDirection = 'right';
	} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
		swipeDirection = 'down';
	} else {
		swipeDirection = 'up';
	}
}

function processingRoutine() {
	var swipedElement = document.getElementById(triggerElementID);
	if ( swipeDirection == 'left' ) {
		// REPLACE WITH YOUR ROUTINES
		shooterObj.dx = shooterObj.dx-swipeLength;
	} else if ( swipeDirection == 'right' ) {
		// REPLACE WITH YOUR ROUTINES
		shooterObj.dx = shooterObj.dx+swipeLength;
	} 
	
	if(shooterObj.dx >(canvas.width - shooterObj.dw))
		shooterObj.dx = (canvas.width - shooterObj.dw);
	//shooter max left movement Limit	
	if(shooterObj.dx < 0)
		shooterObj.dx = 10;
}



function touchCancel(event) 
{
	// reset the variables back to default values
	triggerElementID = null; // this variable is used to identity the triggering element
	fingerCount = 0;
	startX = 0;
	startY = 0;
	curX = 0;
	curY = 0;
	minLength = 20; // the shortest distance the user may swipe
	swipeLength = 0;
	swipeAngle = null;
	swipeDirection = null;
}

function sendData()
{
      completed=1;
}