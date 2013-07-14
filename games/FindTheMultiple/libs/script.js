var gameObj;
var completed = 0;
var extraParameters ='';
var totalTimeTaken ='';
var score = 0;

function findTheMultiple() 
{	
	this.possibleNumArr = new Array(2,3,4,5,6,7,8,9,10);	
	this.hiddenCardNumArr = new Array(0,2,5,7,8,11,13,14);	
	this.columnArr = new Array();
	this.rowArr = new Array();
	this.productArr = new Array();
	this.userAnsArr = new Array();
	this.blankBoxFlag = 0;
	this.wrongBoxFlag = 0;
	this.attemptCount = 0;
	this.type2AttemptCount = 0; 
	this.type2LastAttemptStatus = ''; 
	this.hideCardCount = 8;
	this.gameType = 'type1';	
	this.giveHelpFlag = 0;	
	this.revealCardCount = 6;
	this.quesHeadingTxt  = '';	
	this.showSystemAnsFlag = 0;
	this.lastQuesTypeInstFlag = 0;
	this.helpCount = 2;
	this.showFillInputBoxes = new Array();
	this.hintMsgFlag = 0;
	this.gameInterval = null;
	this.hideCardCountWiseDataArr = new Array();
	this.hideCardCountWiseDataArr[0] = new Array(0,0);
	this.hideCardCountWiseDataArr[1] = new Array(0,0);
	this.hideCardCountWiseDataArr[2] = new Array(0,0);
		
}

findTheMultiple.prototype.loadQuestion = function() { 
	clearInterval(gameObj.gameInterval);
	gameObj.gameInterval = setInterval("gameObj.checkTimer()",1000);
	this.currentQuestion++;
	gameObj.showSystemAnsFlag = 0;
	gameObj.columnArr = new Array();
	gameObj.rowArr = new Array();
	gameObj.productArr = new Array();
	gameObj.userAnsArr = new Array();
	gameObj.blankBoxFlag = 0;
	gameObj.wrongBoxFlag = 0;
	gameObj.attemptCount = 0;
	gameObj.generateNumbers();	
	gameObj.revealCardCount = 6;
		
	var html = '';
	$('#container').html('');
	gameObj.getHiddenCardNumArr();
	
	if(gameObj.lastQuesTypeInstFlag == 1)
	{
		html+='<div class="txtDiv">'+quesArr["q106"]+'</div>';
		html+='<div id="nextBtnDiv"><input id="nextBtn" type="button" title="nextBtn" class="button" value="'+miscArr["next"]+'"/></div>';
		html+='<div id="quitBtnDiv"><input id="quitBtn" type="button" title="quitBtn" class="button" value="'+miscArr["quit"]+'"/></div>';
		$('#container').html(html);	
	}
	else
	{	
		if(gameObj.gameType == 'type1')
			html+='<div class="txtDiv">'+quesArr["q101"]+'</div>';
		else if(gameObj.gameType == 'type2')
		{
			if(gameObj.type2AttemptCount > 0)
				html+='<div class="txtDiv">'+gameObj.quesHeadingTxt+'</div>';	
			else
				html+='<div class="txtDiv">'+quesArr["q102"]+'</div>';		
		}			
		
		if(gameObj.gameType == 'type2')
		{
			if(gameObj.hideCardCount == 8)
				gameObj.hideCardCountWiseDataArr[0][0]+=1;
			else if(gameObj.hideCardCount == 10)
				gameObj.hideCardCountWiseDataArr[1][0]+=1;
			else if(gameObj.hideCardCount == 16)
				gameObj.hideCardCountWiseDataArr[1][0]+=1;		
				
			html +='<div id="rowDragObjDiv" class="rowDropppableArea">' ;
				html+='<div id="rowDrag-1" class="dragObj rowDragObj"><p class="dragNum" value="2">2</p></div>';
				html+='<div id="rowDrag-2" class="dragObj rowDragObj"><p class="dragNum" value="3">3</p></div>';
				html+='<div id="rowDrag-3" class="dragObj rowDragObj"><p class="dragNum" value="4">4</p></div>';
				html+='<div id="rowDrag-4" class="dragObj rowDragObj"><p class="dragNum" value="5">5</p></div>';
				html+='<div id="rowDrag-5" class="dragObj rowDragObj"><p class="dragNum" value="6">6</p></div>';
				html+='<div id="rowDrag-6" class="dragObj rowDragObj"><p class="dragNum" value="7">7</p></div>';
				html+='<div id="rowDrag-7" class="dragObj rowDragObj"><p class="dragNum" value="8">8</p></div>';
				html+='<div id="rowDrag-8" class="dragObj rowDragObj"><p class="dragNum" value="9">9</p></div>';
				html+='<div id="rowDrag-9" class="dragObj rowDragObj"><p class="dragNum" value="10">10</p></div>';		
			html +="</div>";
			
			html +='<div id="columnDragObjDiv" class="columnDropppableArea">' ;
				html+='<div id="columnDrag-1" class="dragObj columnDragObj"><p class="dragNum" value="2">2</p></div>';
				html+='<div id="columnDrag-2" class="dragObj columnDragObj"><p class="dragNum" value="3">3</p></div>';
				html+='<div id="columnDrag-3" class="dragObj columnDragObj"><p class="dragNum" value="4">4</p></div>';
				html+='<div id="columnDrag-4" class="dragObj columnDragObj"><p class="dragNum" value="5">5</p></div>';
				html+='<div id="columnDrag-5" class="dragObj columnDragObj"><p class="dragNum" value="6">6</p></div>';
				html+='<div id="columnDrag-6" class="dragObj columnDragObj"><p class="dragNum" value="7">7</p></div>';
				html+='<div id="columnDrag-7" class="dragObj columnDragObj"><p class="dragNum" value="8">8</p></div>';
				html+='<div id="columnDrag-8" class="dragObj columnDragObj"><p class="dragNum" value="9">9</p></div>';
				html+='<div id="columnDrag-9" class="dragObj columnDragObj"><p class="dragNum" value="10">10</p></div>';		
			html +="</div>";		
		}	
		
		html+='<div id="gamePnl">';
			html+='<div id="rowPnl">';
				html+='<div id="sign" class="cardBG"><p class="num" value="">X</p></div>';
				html+='<div class="line"></div>';
					for(var i=0; i < gameObj.rowArr.length ;i++)
					{
						if(gameObj.gameType == 'type1')
							html+='<div id="rowCard'+i+'" class="cardBG"><p class="num" value="'+gameObj.rowArr[i]+'">'+gameObj.rowArr[i]+'</p></div>';
						else if(gameObj.gameType == 'type2')
							html+='<div id="rowCard'+i+'" class="cardBG rowDropppableArea" dropObjVal="" value="'+gameObj.rowArr[i]+'"><p class="num" value="'+gameObj.rowArr[i]+'"></p></div>';	//'+gameObj.rowArr[i]+'
					}
						
				html+="</div>";
		
			html+='<div id="playPnl">';
				html+='<div id="colmnPnl" style="height:60px;">';
					for(var i=0; i < gameObj.columnArr.length ;i++)
					{
						if(gameObj.gameType == 'type1')
							html+='<div id="columnCard'+i+'" class="cardBG"><p class="num" value="'+gameObj.columnArr[i]+'">'+gameObj.columnArr[i]+'</p></div>';
						else if(gameObj.gameType == 'type2')
							html+='<div id="columnCard'+i+'" class="cardBG columnDropppableArea" dropObjVal="" value="'+gameObj.columnArr[i]+'"><p class="num" value="'+gameObj.columnArr[i]+'"></p></div>';
					}
						
				html+="</div>";
				html+='<div id="cardsDiv">';
					for(var i=0; i < 16 ; i++)
					{
						if(gameObj.gameType == 'type1')
						{							
							if(jQuery.inArray(i, gameObj.showFillInputBoxes)==-1)
								html+='<div id="card'+i+'" class="cardBG"><input type="text" id="inputBox'+i+'" maxLength="3" value="" onblur="gameObj.checkType1Ans();"/></div>';
							else	
							{
									html+='<div id="card'+i+'" class="cardBG" style="background-color:#C0C0C0;color:black;"><input type="text" id="inputBox'+i+'" maxLength="3" value="'+gameObj.productArr[i]+'" readonly disabled/></div>';
							}
								
						}
						else if(gameObj.gameType == 'type2')
						{
							if(jQuery.inArray(i, gameObj.hiddenCardNumArr)==-1)
							{								
								html+='<div id="card'+i+'" class="cardBG" ><p class="num">'+gameObj.productArr[i]+'</p></div>';		
							}
							else
							{
								if(gameObj.hideCardCount == 16)
									html+='<div id="card'+i+'" class="cardBG" ><p class="num">'+gameObj.productArr[i]+'</p><img class="smileyImg" src="../assets/smiley.png" onclick="showNumber('+i+')"></div>';
								else
									html+='<div id="card'+i+'" class="cardBG" ><p class="num">'+gameObj.productArr[i]+'</p><img class="smileyImg" src="../assets/smiley.png"></div>';	
							}
								
						}				
			      	}   		 
				html+='</div>';			
			html+='</div>';
			
			if(gameObj.gameType == 'type2')	
				html+='<div id="instDiv">'+instArr["inst1"]+'</div>';
				
			html+='<div id="submitBtnDiv"><input id="submitBtn" type="button" title="submitBtn" class="button" value="'+miscArr["submit"]+'"/></div>';
		html+='</div>';
		if(gameObj.hideCardCount != 16)
			html+='<div id="nextBtnDiv"><input id="nextBtn" type="button" title="nextBtn" class="button" value="'+miscArr["next"]+'"/></div>';
		
		html+='<div id="quitBtnDiv" onclick="gameObj.feedback();"><input id="quitBtn" type="button" title="quitBtn" class="button" value="'+miscArr["quit"]+'"/></div>';
		
		if(gameObj.hideCardCount == 16)
		{
			html+='<div id="leftOpenCar">'+miscArr["leftOpenCard"].replace('#leftOpenCard#',gameObj.revealCardCount)+'</div>';
			html+='<div id="resetBtnDiv" onclick="gameObj.loadQuestion();"><input id="resetBtn" type="button" title="resetBtn" class="button" value="'+miscArr["reset"]+'"/></div>';
		}
		
		if(gameObj.giveHelpFlag ==1)
		{
			gameObj.giveHelpFlag = 0;
			html+='<div id="helpBtn" onClick="gameObj.helpFunc()">'+miscArr["helpBtn"]+'</div>';//.replace('#helpCount#',gameObj.helpCount)
		}
		
		if(gameObj.gameType == 'type2')	
			html+='<div id="scoreCard">'+miscArr["score"].replace('#score#',score)+'</div>';
		
		html +='<div class="promptContainer" style="display:none">';
			html +='<div class="promptText2"></div>';	            
			html +='<div style="clear:both"></div>';
			html +='<div class="okButton" id="ok" onClick="gameObj.actionOfOkButton();">'+miscArr['ok']+'</div>';	
		html +='</div>';
		$('#container').html(html);		
	  
		$("#nextBtnDiv").hide();
	}
	
	$("input").keypress(function(e) {
	    var a = [];
        var k = e.which;
    
        for (x = 48; x < 58; x++)
            a.push(x);
    
        if (!($.inArray(k,a)>=0) && e.keyCode != 9 && e.keyCode != 8)
            e.preventDefault();
	});

	
	$('.dragObj').each(function() {
	    $(this).draggable({
	        opacity: 1,
	        helper:'clone',             
	        appendTo: 'body',
	        containment: 'body'
	    });
	})
	
	$('.rowDropppableArea').each(function(index) {
	    $(this).droppable({
	        accept: ".rowDragObj",
	        tolerance: "pointer",
	        drop: function(event, ui) {
			   gameObj.wrongBoxFlag = 0;
			   gameObj.hintMsgFlag = 0;
			   gameObj.blankBoxFlag = 0;
			   
	           var targetArea = $(this).attr('id');
			   var dragObjId =$(ui.draggable).attr('id');
			   var dragVal = $('#'+dragObjId+" p ").attr('value');			   		 		   
			  // alert( dragObjId+"--"+dragVal+"--"+$('#'+targetArea).attr('dragObjVal')+" -- "+targetArea+"--");
			   //alert($('#'+targetArea).attr('dragObjVal'));
		   	   for(var i=0; i < gameObj.rowArr.length ;i++)
			   {
			   		if($('#rowCard'+i).attr('dragObjVal') == dragVal)
						$('#rowCard'+i).attr('dragObjVal',"") ;		
			   }
			   
			   gameObj.resetBorder();			
	   	
			  if(gameObj.revealCardCount == 6 && gameObj.hideCardCount == 16)
			  {
			  		gameObj.blankBoxFlag = 1;
					gameObj.showMsg(promptArr['p110']);					
			  }					
			  else if( $(this).hasClass('cardBG') && (typeof $('#'+targetArea).attr('dragObjVal') =="undefined" || $('#'+targetArea).attr('dragObjVal')==""))
			   {
			   		$(ui.draggable).appendTo(this);
					$('#'+targetArea).attr('dragObjVal',dragVal);			  
					$(ui.draggable).css('margin','1px');
				
					var rowIndex = targetArea.substr(targetArea.length-1,1);
					
				   	for(var i=0; i < gameObj.columnArr.length;i++)
				   	{
				   		var indexStr = rowIndex * gameObj.columnArr.length + i;
						if(typeof $('#card'+indexStr).find('img').attr('src') == "undefined")
						{
							if( !(typeof $('#columnCard'+i).attr('dragObjVal') == "undefined" || $('#columnCard'+i).attr('dragObjVal') =="") )
							{								
								//alert(gameObj.productArr[indexStr] +"--"+($('#columnCard'+i).attr('dragObjVal')*dragVal));
								if(($('#columnCard'+i).attr('dragObjVal')*dragVal) !=gameObj.productArr[indexStr])	
								{
									$('#columnCard'+i).css('border',"2px solid red");
									$('#rowCard'+rowIndex).css('border',"2px solid red");									
									$('#card'+indexStr).css('border',"2px solid red");
									gameObj.wrongBoxFlag = 1;
								}									
							}								
						}						
				   	}					
					
					if(gameObj.wrongBoxFlag == 1)
					{
						$("#submitBtnDiv").hide();
						$('#rowDragObjDiv').css('display',"none");
						$('#columnDragObjDiv').css('display',"none");
						gameObj.attemptCount++;
						if(gameObj.attemptCount > 3)
							showCorrectAnswer();
						else 
							gameObj.showMsg(promptArr['p107']);		
					}						
			   }
			   else if(!$(this).hasClass('cardBG'))
			   {
			   		$(ui.draggable).appendTo(this);
					$(ui.draggable).css('margin','5px')
			   }	
			   else
			   {
			   		gameObj.hintMsgFlag = 1;
			   		gameObj.showMsg(promptArr['p108']);	
			   }			   			 
	        }
	    });
	});	
	
	$('.columnDropppableArea').each(function(index) {
	    $(this).droppable({
	        accept: ".columnDragObj",
	        tolerance: "pointer",
	        drop: function(event, ui) {
			   gameObj.wrongBoxFlag = 0;	
			   gameObj.hintMsgFlag = 0;
			   gameObj.blankBoxFlag = 0;
			   
	           var targetArea = $(this).attr('id');
			   var dragObjId =$(ui.draggable).attr('id');
			   var dragVal = $('#'+dragObjId+" p ").attr('value');			   		 		   
			  // alert( dragObjId+"--"+dragVal+"--"+$('#'+targetArea).attr('dragObjVal')+" -- "+targetArea+"--");
			   //alert($('#'+targetArea).attr('dragObjVal'));
			   	for(var i=0; i < gameObj.rowArr.length ;i++)
				{
					if($('#columnCard'+i).attr('dragObjVal') == dragVal)
						$('#columnCard'+i).attr('dragObjVal',"") ;
				}
		   		
			   if(gameObj.revealCardCount == 6 && gameObj.hideCardCount == 16)
			   {
			   		gameObj.blankBoxFlag = 1;
					gameObj.showMsg(promptArr['p110']);					
			   }					
			   else if( $(this).hasClass('cardBG') && (typeof $('#'+targetArea).attr('dragObjVal') =="undefined" || $('#'+targetArea).attr('dragObjVal')==""))
			   {
			   		gameObj.resetBorder();
			   		
					$(ui.draggable).appendTo(this);
					$('#'+targetArea).attr('dragObjVal',dragVal);			  
					$(ui.draggable).css('margin','1px');
					
					var columnIndex = targetArea.substr(targetArea.length-1,1);
					
				   	for(var i=0; i < gameObj.rowArr.length;i++)
				   	{
				   		var indexStr = parseInt(parseInt(i * gameObj.rowArr.length) + parseInt(columnIndex));
						//alert(indexStr+" columnIndex "+columnIndex+"------"+parseInt(i * gameObj.rowArr.length));
						if(typeof $('#card'+indexStr).find('img').attr('src') == "undefined")
						{
							if( !(typeof $('#rowCard'+i).attr('dragObjVal') == "undefined" || $('#rowCard'+i).attr('dragObjVal') =="") )
							{								
								/*alert(gameObj.productArr[indexStr] +"<-->"+($('#rowCard'+i).attr('dragObjVal')*dragVal));*/
								if(($('#rowCard'+i).attr('dragObjVal')*dragVal) !=gameObj.productArr[indexStr])	
								{
									$('#columnCard'+columnIndex).css('border',"2px solid red");
									$('#rowCard'+i).css('border',"2px solid red");									
									$('#card'+indexStr).css('border',"2px solid red");
																		
									gameObj.wrongBoxFlag = 1;
								}
									
							}								
						}						
				   	}						
					
					if(gameObj.wrongBoxFlag == 1)
					{
						$("#submitBtnDiv").hide();
						$('#rowDragObjDiv').css('display',"none");
						$('#columnDragObjDiv').css('display',"none");
						
						gameObj.attemptCount++;
						if(gameObj.attemptCount > 3)
							showCorrectAnswer();
						else 
							gameObj.showMsg(promptArr['p107']);		
					}
					
			   }
			   else if(!$(this).hasClass('cardBG'))
			   {
			   		gameObj.resetBorder();
					
			   		$(ui.draggable).appendTo(this);
					$(ui.draggable).css('margin','5px');
			   }	
			   else
			   {
			   		gameObj.hintMsgFlag = 1;
			   		gameObj.showMsg(promptArr['p108']);	
			   }		         
	        }
	    });
	});
		  	
	$("#submitBtnDiv").click(function(e) {
			
			$("#submitBtnDiv").hide();
			var indexStr = 0;
			gameObj.wrongBoxFlag = 0;
			gameObj.blankBoxFlag = 0 ;
			var tempScore=0;
			if(gameObj.gameType =='type1')
			{
				for(var i=0 ; i < gameObj.rowArr.length ;i++)
				{
					for(var j=0 ; j < gameObj.columnArr.length ;j++)
					{
						indexStr = gameObj.columnArr.length*i+j;
						var userInput = $('#inputBox'+indexStr).val();
						if(userInput == gameObj.productArr[indexStr])
						{
							if(jQuery.inArray(indexStr, gameObj.showFillInputBoxes)==-1)
								$('#inputBox'+indexStr).addClass('greenBorder');							
						}						
						else if(userInput!='')
						{
							gameObj.wrongBoxFlag = 1;
							$('#inputBox'+indexStr).addClass('redBorder');
						}						
						else
							gameObj.blankBoxFlag = 1;		
					}	
				}	
			}
			else if(gameObj.gameType =='type2')
			{
				for(var i=0; i < gameObj.rowArr.length ;i++)
				{
					if( typeof $('#columnCard'+i).attr('dragObjVal') == "undefined" || $('#columnCard'+i).attr('dragObjVal') =="" || typeof  $('#rowCard'+i).attr('dragObjVal') == "undefined" || $('#rowCard'+i).attr('dragObjVal') =="")
					{
						gameObj.blankBoxFlag = 1;
						break;
					}
					else if(!($('#columnCard'+i).attr('dragObjVal') == $('#columnCard'+i).attr('value') && $('#rowCard'+i).attr('dragObjVal') == $('#rowCard'+i).attr('value')))
					{
						gameObj.wrongBoxFlag = 1;
					}					
				}													
			}				
			
			$('#rowDragObjDiv').css('display',"none");
			$('#columnDragObjDiv').css('display',"none");
			
			if(gameObj.blankBoxFlag == 1)
			{
				tempScore = 0;
				if(gameObj.revealCardCount == 6 && gameObj.hideCardCount == 16)
					gameObj.showMsg(promptArr['p110']);		
				else
				{
					if(gameObj.hideCardCount == 16 && gameObj.revealCardCount ==0)
					{
						gameObj.blankBoxFlag = 0;
						gameObj.wrongBoxFlag =1;
						gameObj.attemptCount = 4;
		
						showCorrectAnswer();
						gameObj.showMsg(promptArr['p105']);					
					}
					else
					{
						if(gameObj.hideCardCount == 16 && gameObj.revealCardCount >0)
						{
							gameObj.showMsg(promptArr['p112'].replace('#leftOpenCard#',gameObj.revealCardCount));				
						}
						else
							gameObj.showMsg(promptArr['p101']);		
					}
						
				}	
					
			}				
			else if(gameObj.wrongBoxFlag == 1)
			{
				gameObj.attemptCount++;
				if(gameObj.gameType =='type1')
					gameObj.showMsg(promptArr['p103']);	
				else if(gameObj.gameType =='type2')		
				{
					if(gameObj.attemptCount > 3)
					{
						showCorrectAnswer();
					}
					else if(gameObj.revealCardCount > 0 && gameObj.hideCardCount == 16)
						gameObj.showMsg(promptArr['p112'].replace('#leftOpenCard#',gameObj.revealCardCount));				
					else
						gameObj.showMsg(promptArr['p107']);				
				}
					
			}				
			else
			{
				if(gameObj.gameType =='type1')
					gameObj.showMsg(promptArr['p102']);	
				else if(gameObj.gameType =='type2')	
				{					
					if(gameObj.hideCardCount == 16)
						score +=150;
					else
					{
						if(gameObj.hideCardCount == 8)
							score +=80;	
						else 
							score +=160;		
					}
						
					gameObj.showMsg(promptArr['p104']);	
				}								
			}
			$('#scoreCard').html(miscArr["score"].replace('#score#',score));			
    });	
	
	$("#nextBtnDiv").click(function(e) 
	{
		$('.promptContainer').hide();
		$("#nextBtnDiv").hide();
		if(gameObj.gameType == 'type1')
		{
			gameObj.gameType = 'type2';
			gameObj.loadQuestion();		
		}
		else if(gameObj.gameType == 'type2')
		{
			gameObj.type2AttemptCount++;
		
			if(gameObj.lastQuesTypeInstFlag == 1)
			{
				gameObj.type2AttemptCount--;
				gameObj.lastQuesTypeInstFlag++;
				gameObj.loadQuestion();
			}			
			else if(gameObj.type2LastAttemptStatus =='right' && gameObj.type2AttemptCount== 1)
			{
				gameObj.hideCardCount = 10;
				gameObj.type2AttemptCount = 2;	
				gameObj.quesHeadingTxt = quesArr["q104"];
				gameObj.loadQuestion();					
			}
			else if(gameObj.type2LastAttemptStatus =='wrong' && gameObj.type2AttemptCount== 1)
			{
				gameObj.quesHeadingTxt = quesArr["q105"];
				gameObj.giveHelpFlag = 1;
				gameObj.hideCardCount = 8;
				gameObj.loadQuestion();		
				//give next try
			}
			else if(gameObj.type2LastAttemptStatus =='wrong' && gameObj.type2AttemptCount== 2)
			{
				gameObj.feedback();
				//game quit
			}
			else if( gameObj.type2LastAttemptStatus =='right' && gameObj.type2AttemptCount == 2)
			{
				gameObj.quesHeadingTxt = quesArr["q104"];
				gameObj.hideCardCount = 10;
				gameObj.loadQuestion();		
			}
			else if(gameObj.type2AttemptCount == 3)// gameObj.type2LastAttemptStatus =='wrong' && 
			{
				gameObj.quesHeadingTxt = quesArr["q104"];
				gameObj.hideCardCount = 10;
				gameObj.loadQuestion();		
			}
			else 
			{
				gameObj.quesHeadingTxt = quesArr["q103"];
				gameObj.hideCardCount = 16;
				
				gameObj.lastQuesTypeInstFlag++;
				gameObj.loadQuestion();										
			}					
		}
	});	
}

	
findTheMultiple.prototype.checkType1Ans = function()
{
	for(var i=0 ; i < gameObj.rowArr.length ;i++)
	{
		for(var j=0 ; j < gameObj.columnArr.length ;j++)
		{
			indexStr = gameObj.columnArr.length*i+j;
			var userInput = $('#inputBox'+indexStr).val();
			if(userInput == gameObj.productArr[indexStr])
			{
				if(jQuery.inArray(indexStr, gameObj.showFillInputBoxes)==-1)
					$('#inputBox'+indexStr).addClass('greenBorder');						
			}				
			else if(userInput!='')
				$('#inputBox'+indexStr).addClass('redBorder');		
		}	
	}		
}

findTheMultiple.prototype.helpFunc = function()
{
	gameObj.helpCount--;
	if(gameObj.helpCount >= 0)
	{
		gameObj.hiddenCardNumArr = arrayShuffle(gameObj.hiddenCardNumArr);
		var removeHiddenIndex = gameObj.hiddenCardNumArr.splice(0,1);
		//$("#helpBtn").html(miscArr["helpBtn"].replace('#helpCount#',gameObj.helpCount));
		$('#card'+removeHiddenIndex+" img").remove();
	}
	
	if(gameObj.helpCount <= 0)
		$('#helpBtn').css("display","none");
}
	
function showNumber(cardId)
{	
	gameObj.revealCardCount--; 
	if(gameObj.revealCardCount >=0)
	{
		$("#leftOpenCar").html(miscArr["leftOpenCard"].replace('#leftOpenCard#',gameObj.revealCardCount));
		$('#card'+cardId+" img").remove();
	}	
}	

findTheMultiple.prototype.getHiddenCardNumArr = function() 
{
	//gameObj.hideCardCount = 10;
	gameObj.hiddenCardNumArr = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
	
	var rowIndexArr = new Array(0,1,2,3);	
	var columnIndexArr = new Array(0,1,2,3);	
	var showCardNumArr = new Array();
	
	rowIndexArr = arrayShuffle(rowIndexArr);
	columnIndexArr = arrayShuffle(columnIndexArr);

	if(gameObj.hideCardCount == 8)
	{
		gameObj.hiddenCardNumArr = new Array(0,2,5,7,8,11,13,14);	
		
		/*showCardNumArr.push(parseInt((rowIndexArr[0]*4+columnIndexArr[0])));
		showCardNumArr.push(parseInt((rowIndexArr[1]*4+columnIndexArr[0])));
		showCardNumArr.push(parseInt((rowIndexArr[2]*4+columnIndexArr[1])));
		showCardNumArr.push(parseInt((rowIndexArr[3]*4+columnIndexArr[1])));
		do
		{
			var tempRow1 = rowIndexArr[Math.round((Math.random()*3))];
			var tempRow2 = rowIndexArr[Math.round((Math.random()*3))];		
		}while(tempRow1 == tempRow2)
		
		showCardNumArr.push(parseInt((tempRow1*4+columnIndexArr[2])));
		showCardNumArr.push(parseInt(((tempRow1-1)*4+columnIndexArr[2])));
		showCardNumArr.push(parseInt((tempRow2*4+columnIndexArr[3])));	
		
		gameObj.hiddenCardNumArr = $.disjoin(gameObj.hiddenCardNumArr,showCardNumArr);		*/
	}
	else if(gameObj.hideCardCount == 10)
	{
		showCardNumArr.push(parseInt((rowIndexArr[0]*4+columnIndexArr[0])));
		showCardNumArr.push(parseInt((rowIndexArr[1]*4+columnIndexArr[0])));
		showCardNumArr.push(parseInt((rowIndexArr[2]*4+columnIndexArr[1])));
		showCardNumArr.push(parseInt((rowIndexArr[3]*4+columnIndexArr[1])));
		do
		{
			var tempRow1 = rowIndexArr[Math.round((Math.random()*3))];
			var tempRow2 = rowIndexArr[Math.round((Math.random()*3))];		
		}while(tempRow1 == tempRow2)
		showCardNumArr.push(parseInt((tempRow1*4+columnIndexArr[2])));
		showCardNumArr.push(parseInt((tempRow2*4+columnIndexArr[3])));	
				
		gameObj.hiddenCardNumArr = $.disjoin(gameObj.hiddenCardNumArr,showCardNumArr);		
	}
}

$.disjoin = function(a, b) {
	    return $.grep(a, function($e) { return $.inArray($e, b) == -1; });
	};
	
findTheMultiple.prototype.resetBorder = function() 
{
   for(var i=0; i < gameObj.rowArr.length;i++)
   {
   		var indexStr ;
   		$('#rowCard'+i).css('border',"2px solid black");		
		for(var j=0; j < gameObj.columnArr.length;j++)
	   	{			
			indexStr = i * gameObj.columnArr.length+j;   
	   		$('#columnCard'+j).css('border',"2px solid black");														
			$('#card'+indexStr).css('border',"2px solid black");
	    }	
	}
}

function showCorrectAnswer()
{
	gameObj.actionOfOkButton();	
}
	
findTheMultiple.prototype.actionOfOkButton = function() 
{
	$('.promptContainer').hide();
	$("#submitBtnDiv").show();
	
	if(gameObj.hintMsgFlag == 1)
	{
		if(gameObj.gameType == 'type2')
		{			
			$('#rowDragObjDiv').css('display',"block");
			$('#columnDragObjDiv').css('display',"block");
		}
	}
	else if(gameObj.blankBoxFlag == 1)
	{		
		if(gameObj.gameType == 'type2')
		{			
			$('#rowDragObjDiv').css('display',"block");
			$('#columnDragObjDiv').css('display',"block");
		}
	}
	else if(gameObj.wrongBoxFlag == 1)
	{
		if(gameObj.gameType == 'type1')
			gameObj.systemCorrectAns();
		else if(gameObj.gameType == 'type2')
		{
			if(gameObj.attemptCount > 3)
			{
				
				if(gameObj.showSystemAnsFlag == 0)
				{
					gameObj.showSystemAnsFlag = 1;
					gameObj.type2LastAttemptStatus = 'wrong';
				   //alert("show correct answer");
				   
				   for(var i=0; i <= 15;i++)
				   {
				   		$('#card'+i+" img").css('display',"none");
						$('#card'+i).css("border","2px solid black");					    	
				   }
					
				   for(var i=0; i < gameObj.rowArr.length;i++)
				   {
				   		$('#rowCard'+i+" .num").html(gameObj.rowArr[i]);
						
						if($('#rowCard'+i).attr('dragObjVal') !=gameObj.rowArr[i])	
							$('#rowCard'+i).css("border","2px solid blue");
						else	
						{
							if(gameObj.hideCardCount != 16)
							{
								if(gameObj.hideCardCount == 10)
									score +=20;
								else
									score +=10;			
							}		
							//alert(score+" row "+i+"--"+gameObj.hideCardCount)	;				
							$('#rowCard'+i).css("border","2px solid green");
						}					
					}
						
					for(var j=0; j < gameObj.columnArr.length;j++)
				   	{			
						$('#columnCard'+j+" .num").html(gameObj.columnArr[j]);	
					
						if($('#columnCard'+j).attr('dragObjVal') !=gameObj.columnArr[j])	
							$('#columnCard'+j).css("border","2px solid blue");
						else	
						{
							$('#columnCard'+j).css("border","2px solid green");
							if(gameObj.hideCardCount != 16)
							{
								if(gameObj.hideCardCount == 10)
									score +=20;
								else
									score +=10;			
							}
							//alert(score+" column "+j+" --"+gameObj.hideCardCount);	
						}						
					}		
					
					if(gameObj.type2LastAttemptStatus =='wrong' && gameObj.type2AttemptCount== 0)
						gameObj.showMsg(promptArr['p106']);	
					else
						gameObj.showMsg(promptArr['p105']);		
						
					$('#scoreCard').html(miscArr["score"].replace('#score#',score));			
						
				}	
				$("#submitBtnDiv").hide();
				$("#nextBtnDiv").show();			
			}
			else
			{
				$('#rowDragObjDiv').css('display',"block");
				$('#columnDragObjDiv').css('display',"block");
			}
		}			
	}		
	else 
	{
		if(gameObj.gameType =='type2')
		{
		   for(var i=0; i <= 15;i++)
		   {
		   		$('#card'+i+" img").css('display',"none");
				$('#card'+i).css("border","2px solid black");					    	
		   }
		   
			gameObj.type2LastAttemptStatus = 'right';
			if(gameObj.hideCardCount == 8)
				gameObj.hideCardCountWiseDataArr[0][1]+=1;
			else if(gameObj.hideCardCount == 10)
				gameObj.hideCardCountWiseDataArr[1][1]+=1;
			else if(gameObj.hideCardCount == 16)
				gameObj.hideCardCountWiseDataArr[1][1]+=1;	
		}
		$("#submitBtnDiv").hide();
		$("#nextBtnDiv").show();
	}	
}	
	
	
findTheMultiple.prototype.systemCorrectAns = function() 
{
	for(var i=0 ; i < gameObj.rowArr.length ;i++)
	{
		for(var j=0 ; j < gameObj.columnArr.length ;j++)
		{
			indexStr = gameObj.columnArr.length*i+j;
			var userInput = $('#inputBox'+indexStr).val();
			if(userInput != gameObj.productArr[indexStr])
			{
				$('#inputBox'+indexStr).val(gameObj.productArr[indexStr]);
				$('#inputBox'+indexStr).addClass('blueBorder');
			}			
		}	
	}		
	$("#submitBtnDiv").hide();
	$("#nextBtnDiv").show();
}



findTheMultiple.prototype.showMsg = function(msgTxt) 
{
	$('.promptContainer').show();							
	$('.promptText2').html(msgTxt);
};


findTheMultiple.prototype.checkTimer = function() {
	totalTimeTaken++;
	extraParameters = "RevealCard8=("+gameObj.hideCardCountWiseDataArr[0]+"),RevealCard6=("+gameObj.hideCardCountWiseDataArr[1]+"),RevealCard0=("+gameObj.hideCardCountWiseDataArr[2]+")";
	if(totalTimeTaken > 900000) {
		gameObj.feedback();
	} 
}


findTheMultiple.prototype.feedback = function() 
{
	if(gameObj.type2AttemptCount > 3)
	{
		var html='';
		html+='<div class="txtDiv">'+quesArr["q107"];
		html +='&nbsp;<select id="dropDownFeedback">';	
			html +='<option value="">'+miscArr["selectOne"]+'</option>';	
			html +='<option value="yes">'+miscArr["yes"]+'</option>';	
			html +='<option value="no">'+miscArr["no"]+'</option>';	
		html +="</select>";	
		html+='</div>';
		html+='<BR><BR><div class="txtDiv">'+quesArr["q107_part2"]+'</div>';
		html+='<BR><BR><textArea id="feedback" cols="70" rows="10" style="margin-left:100px;"></textArea>';
		html+='<div id="submitBtnDiv2" onclick="gameObj.gameOver();"><input id="submitBtn" type="button" title="submitBtn" class="button" value="'+miscArr["submit"]+'"/></div>';
		$('#container').html(html);		
	}
	else
		gameObj.gameOver();
	
	clearInterval(gameObj.gameInterval);	
};

findTheMultiple.prototype.gameOver = function() 
{
	if($("#dropDownFeedback").val()!="" || gameObj.type2AttemptCount<=3)
	{
		var html='';
		html ='<div class="gameOver">'+miscArr["gameOver"]+'</div>';
		$('#container').html(html);	
		
		completed = 1;
		extraParameters += "dropDownVal="+$("#dropDownFeedback").val()+",userResponse="+$("#feedback").val();	
	}
	else
	{
		alert(promptArr['p109']);		
	}
	
};




findTheMultiple.prototype.generateNumbers = function() 
{	
	this.possibleNumArr = arrayShuffle(this.possibleNumArr);
	for(var i=0; i < 4 ;i++)
	{
		this.columnArr.push(this.possibleNumArr[i]);
	}
	
	
	
	this.possibleNumArr = arrayShuffle(this.possibleNumArr);
	for(var i=0; i < 4 ;i++)
	{
		this.rowArr.push(this.possibleNumArr[i]);
	}
	
	var indexStr = 0;
	for(var i=0 ; i < this.rowArr.length ;i++)
	{
		for(var j=0 ; j < this.columnArr.length ;j++)
		{
			indexStr = this.columnArr.length*i+j;
			this.productArr[indexStr] = this.rowArr[i]*this.columnArr[j];
		}	
	}	
	var tempArr = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
	tempArr = arrayShuffle(tempArr);
	this.showFillInputBoxes = new Array(tempArr[0],tempArr[1],tempArr[2],tempArr[3],tempArr[4],tempArr[5],tempArr[6],tempArr[7]);	
};


function getRandomDigit(minVal, maxVal) 
{
    return Math.round(Math.random() * (maxVal - minVal) + minVal);
}

function resize()
{ 
	if(window.innerHeight < 600) {
		scaleFactor = parseFloat(window.innerHeight/600); //console.log("height "+window.innerWidth+'-'+window.innerHeight+"-"+scaleFactor);
	} else if(window.innerWidth < 800) {
		scaleFactor = parseFloat(window.innerWidth/800); //console.log("width "+window.innerWidth+'-'+window.innerHeight+"-"+scaleFactor);
	} else{
		scaleFactor = 1 ;									
	} 	
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});	
	
}
