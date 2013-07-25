var html='';
var html2='';
var imageArray=['ball.png','ball.png','pinkBottle.png','pinkBottle.png','bean.png','bean.png','mug.png','mug.png','pencil.png','pencil.png','flower.png','flower.png','blueBall.png','blueBall.png'];
var questionArray=['flower.png','pinkBottle.png','mug.png','pencil.png','bean.png','blueBall.png'];
var correctCounter=0;
function gameInteractive()
{
	this.count=parseInt(20);
	this.i=1;
	this.questionCount=parseInt(6);

	this.counter=1;
}
gameInteractive.prototype.init = function()
{
	
	imageArray=shuffle(shuffle(imageArray));
	var length=parseInt(imageArray.length)-1;

	html='';

	html='<div class="rightSegment"></div>';  //right and 
	html+='<div class="leftSegment"></div>';  // left frame loaded

	$("#container").html(html);

	//inserting contents into right segment,which would contain the images
	//from the imageArray
	html=''; //cleaing html variable for resuse.
	//filling up the right segment	
	html+='<div  class=imageHolder>';
	
	for(mangoObj.i=0;mangoObj.i<=length;mangoObj.i++)
	{ 
		html+='<div id='+mangoObj.i+' class="images" data-droponClass='+imageArray[mangoObj.i]+'><img src=../img/'+imageArray[mangoObj.i]+' style="max-width:70px;max-height:70px;"></img></div>';	
	}		
	html+='</div>';
	$(".rightSegment").html(html);

	html='';//clean the html varible for reuse

	//filling up the left segment with the questions
	mangoObj.getDemo();

}
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
gameInteractive.prototype.loadleftSegment=function()
{
	$(".images").draggable({containment:"#container",
	revert:"invalid",
	opacity:0.5});

	html+='<div class="questionHolder">';

	for(mangoObj.i=0;mangoObj.i<mangoObj.questionCount;mangoObj.i++)
	{
		html+='<div id="question'+mangoObj.i+'" class="questions" data-acceptableClass='+questionArray[mangoObj.i]+'>';
			html+='<div class="groupImage"><img src=../img/'+questionArray[mangoObj.i]+' style="max-width:70px;max-height:70px;"></div>';

			html+='<div class="answerField ans'+mangoObj.i+'"></div>';  //answer fields
			html+='<div class="answerField ans'+mangoObj.i+'" style="margin-left:10px;"></div>';	 // answer fields

		html+='</div>';	
	}
	html+='</div>';

	$(".leftSegment").html(html);

	$(".ans0").droppable({
	    accept: function(d)
	    { 
	        if(d.attr("data-droponClass")=="flower.png")
	        { 
	            return true;
	        }
	    }
	});

	$(".ans1").droppable(
	{
	    accept: function(d) { 
	        if(d.attr("data-droponClass")=="pinkBottle.png")
	        { 
	            return true;
	        }
	    }
	});

	$(".ans2").droppable({
	    accept: function(d) { 
	        if(d.attr("data-droponClass")=="mug.png")
	        { 
	            return true;
	        }
	    }
	});

	$(".ans3").droppable({
	    accept: function(d) { 
	        if(d.attr("data-droponClass")=="pencil.png")
	        { 
	            return true;
	        }
	    }
	});

	$(".ans4").droppable({
	    accept: function(d) { 
	        if(d.attr("data-droponClass")=="bean.png")
	        { 
	            return true;
	        }
	    }
	});

	$(".ans5").droppable({
	    accept: function(d) { 
	        if(d.attr("data-droponClass")=="blueBall.png")
	        { 
	            return true;
	        }
	    }
	});	
}
gameInteractive.prototype.getDemo=function()
{
	html+='<div class="questionHolder">';
	html+='<div class=demoText></div>';
	html+='</div>';
	$(".leftSegment").html(html);
	html='';
	var demoHeight=0;
	
	var increaseHeight=setTimeout('mangoObj.increaseHeight('+demoHeight+')',200);
}
gameInteractive.prototype.increaseHeight=function(demoHeight)
{
	if(demoHeight<250)
	{
	$(".demoText").css('height',demoHeight+"px");	
	demoHeight+=1;
		increaseHeight=setTimeout('mangoObj.increaseHeight('+demoHeight+')',10);	
	}
	else
	{
		clearTimeout(increaseHeight);

		html='<span class="text">Try grouping <br/> similar objects together.Just drag and drop..!!</span><br/>';
		html+='<span class="exampleOne"><img src=../img/sampleOne.jpg style="max-width:120px;max-height:120px;"></img></span>';
		html+='&nbsp;&nbsp;<span class="exampleTwo"><img src=../img/sampleTwo.jpg style="max-width:120px;max-height:120px;"></img></span>';

		$(".demoText").html(html);
		html='';

		$(".demoText").delay(1000).animate({'opacity':'1'},100);
		var clearDemotext=setTimeout("mangoObj.loadleftSegment()",5000);
	}
}
