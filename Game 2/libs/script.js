var html='';
var html2='';
var clickCoutner=0;
//var objectArray=['blueTub.png','mug.png','orangeGirl.png','redDress.png','brownDog.png','duck.png','blueToothbrush.png','blueToothbrush.png','bluePen.png','pencil.png','chalk.png','yellowSock.png','greenTree.png','leaf.png'];
var objectArray=['blueTub.png','mug.png','orangeGirl.png','redDress.png','brownDog.png','duck.png','blueToothbrush.png'];
objectArray=shuffle(shuffle(objectArray));
var questionArray=['yellowSock.png','leaf.png','shoe.png','chalk.png','chalk.png','bluePen.png','greenTree.png','redDress.png','simpleVase.png'];
var moveText;
var correctAnswerArray=new Array();
var getIdentifier='';
var getAnswer='';
var getAnswer2='';
var correctCounter=0;
var rotateThis='';
var rotateCounter=0;
function gameInteractive()
{
	this.objectArrayCount=objectArray.length;
	this.questionArrayCount=questionArray.length;
	this.i=0;
}
gameInteractive.prototype.init = function()
{
	html+='<div class="button"></div>';

	html+='<div class="introduction">';
		html+='<div class="textHolder">';
			html+='<span class="text">';
				html+='Let us find <br/> identical objects';
			html+='</span>';
		html+='</div>';
	html+='</div>';

	$("#container").html(html);
	$("#myModal").draggable({containment:"#container"});
  	$('document').ready(function(){

  		moveText=setTimeout("mangoObj.moveText();",2000);

  	});
}
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
gameInteractive.prototype.moveText=function()
{
	$(".textHolder").delay(1000).animate({'left':'152px','opacity':'1'},1000);
	$(".textHolder").delay(2000).animate({'opacity':'1'},1000,function(){
		$(".text").remove();
		$(".textHolder").remove();
		mangoObj.getData();
	});
}
gameInteractive.prototype.getData=function()
{
	html='<div class="questions">';
		html+='<div class="screenOne">';
			html+='<div class="firstBar">';
				for(mangoObj.i=0;mangoObj.i<7;mangoObj.i++)
				{
					html+='<div id="imageTop'+mangoObj.i+'" class="imagesTop" data-imageName='+objectArray[mangoObj.i]+'><img class="realImage" src=../img/'+objectArray[mangoObj.i]+'></img></div>&nbsp;';
				}
			html+='</div>';
			html+='<div class="guideText"><p id="demoText">Match the objects having similar color from below</p></div>';
			html+='<div class="secondBar">';
			objectArray=shuffle(shuffle(objectArray));//shuffling the array	
				for(mangoObj.i=0;mangoObj.i<7;mangoObj.i++)
				{
					html+='<div id="imageBelow'+mangoObj.i+'" class="imagesBelow" data-imageName='+objectArray[mangoObj.i]+'><img class="realImage" src=../img/'+objectArray[mangoObj.i]+'></img></div>&nbsp;';
				}
			html+='</div>';
		html+='</div>';
	html+='</div>';

	$(".introduction").html(html);

	var showImages=setTimeout("mangoObj.showImages();",1000);

}
gameInteractive.prototype.showImages=function()
{	
	objectArray=shuffle(shuffle(objectArray));
	mangoObj.makeClickable();
	
	for(mangoObj.i=0;mangoObj.i<7;mangoObj.i++)
	{
		$("#imageTop"+mangoObj.i).delay(mangoObj.i*500).animate({'opacity':'1'},500,function(){
			$(".guideText").delay(3000).animate({'opacity':'1'},500,function(){
				for(mangoObj.i=0;mangoObj.i<7;mangoObj.i++)
				{
					$("#imageBelow"+mangoObj.i).delay(mangoObj.i*500).animate({'opacity':'1'},500);
					$("#demoText").delay(3000).animate({'opacity':'1'},10,function(){
						$("#demoText").html("Start Matching");
						//mangoObj.makeClickable();
					});
				}
			});
		});
	}
}
gameInteractive.prototype.makeClickable=function()
{	
	
	$(".imagesTop").click(function(){
		clickCoutner+=1;
		$.playSound('../sounds/click.mp3');
		
		rotateThis=$(this).attr('id');
		mangoObj.rotateImage(rotateThis); //this would rotate the image when clicked or
										  // touched

		if($(this).hasClass('clicked')) //if the images in the top row is already clicked
		{
			correctAnswerArray=[];
			clickCoutner=0;
			$("#resultText").html('You have already done it..!!!');
			$('#myModal').modal();
			$.playSound('../sounds/wrong.mp3');
		}
		else
		{
			$(this).toggleClass('clicked');
			getAnswer=$(this).attr('data-imageName');
			correctAnswerArray.push(getAnswer);	
		}
		

	});

	$(".imagesBelow").click(function(){
		if(clickCoutner==1)
		{	
			clickCoutner=1;
			rotateThis=$(this).attr('id');
			mangoObj.rotateImage(rotateThis);

			var elementId=$(this).attr('id');
			getAnswer2=$(this).attr('data-imageName');
			correctAnswerArray.push(getAnswer2);
			mangoObj.checkAnswer(elementId);	
		}
		else
		{
		//	console.log('First select object from above');
			if($(this).hasClass('clicked')) //if the images in the bottom row is already clicked
			{
				$("#resultText").html('You have already done it..!!!');
				$('#myModal').modal();
				$.playSound('../sounds/wrong.mp3');
			}
			else
			{
				
				$("#resultText").html('First select an object <br/>from above');
				$('#myModal').modal();
				$.playSound('../sounds/wrong.mp3');
			}
		}
		
	});
}
gameInteractive.prototype.checkAnswer=function(elementId)
{
	if(correctAnswerArray[0]==correctAnswerArray[1])
	{
		//console.log('correctAnswer');
		$("#resultText").html('Correct Answer');
		correctCounter+=1;
		if(correctCounter<7)
		{
			correctAnswerArray=[];
			clickCoutner=0;
			$('#myModal').modal();
			$.playSound('../sounds/button.mp3');
			$('#'+elementId).addClass('clicked');
		}
		else if(correctCounter==7)
		{
			mangoObj.endScreen();
		}
	}
	else if(correctAnswerArray[0]!=correctAnswerArray[1])
	{
		//console.log('Wrong Answer');
		
		var index = correctAnswerArray.indexOf(1);
		correctAnswerArray.splice(index, 1);
		clickCoutner=1;
		$("#resultText").html('Wrong Answer');
		$('#myModal').modal();
		$.playSound('../sounds/wrong.mp3');
	}	

}

gameInteractive.prototype.endScreen=function()
{
	html='';
	$(".screenOne").html(html);

	html='<div class="theEnd">';
		html+='<p>Congratulations..!!! You have completed this activity.</p>';
	html+='</div>';

	html+='<div class="smileyImageHolder"><img class="smileyImage" src="../img/smiley1.png"></img></div>';

	$(".screenOne").html(html);
	$.playSound('../sounds/Hurray.mp3');
}
gameInteractive.prototype.rotateImage=function(rotateThis)
{
	var startRotate=setInterval(function(){
		if(rotateCounter%2==0)
		{
			$("#"+rotateThis).css({
				"transform": "rotate(-10deg)",
			"-ms-transform": "rotate(-10deg)", /* IE 9 */
			"-webkit-transform": "rotate(-10deg)", /* Safari and Chrome */
			 "-o-transform": "rotate(-10deg)", /* Opera */
		   "-moz-transform": "rotate(-10deg)" /* Firefox */
			});

		}
		else if(rotateCounter%2!=0)
		{
			$("#"+rotateThis).css({
				"transform": "rotate(10deg)",
			"-ms-transform": "rotate(10deg)", /* IE 9 */
			"-webkit-transform": "rotate(10deg)", /* Safari and Chrome */
			 "-o-transform": "rotate(10deg)", /* Opera */
		   "-moz-transform": "rotate(10deg)" /* Firefox */
			});			
		}


	},500);
}