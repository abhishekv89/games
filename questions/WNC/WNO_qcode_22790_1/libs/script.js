var interactiveObj;
var extraParameters="";
var userResponse="";
var correctResponse="";
var result=2;
var parameterMissing = false;
    var html="";

function questionInteractive()
{
     
    if(typeof getParameters['number']=="undefined")
    {
        alert('Parameter needed: number'); 
        parameterMissing=true;
        $("#body").html("<h2><center>Parameter Not Set</center></h2>");
        return;
    }
    else this.number = getParameters['number'].split("|");
  
    if(typeof getParameters['names']=="undefined")
    {
        alert('Parameter needed: names'); 
        parameterMissing=true;
        $("#body").html("<h2><center>Parameter names Not Set</center></h2>");
        return;
    }
    else this.names = getParameters['names'].split("|");
  
 
  if(typeof getParameters['sequence']=="undefined")
    {
        alert('Parameter needed: sequence'); 
        parameterMissing=true;
        $("#body").html("<h2><center>Parameter sequence Not Set</center></h2>");
        return;
    }
    else this.sequence = getParameters['sequence'].split("|");
	
	
	
     if (typeof getParameters['numberLanguage'] == "undefined")
    {
        this.numberLanguage = 'english';
    }
    else
        this.numberLanguage = getParameters['numberLanguage'];

    if (typeof getParameters['language'] == "undefined")
    {
        this.language = 'english';
    }
    else
        this.language = getParameters['language'];


}
		

questionInteractive.prototype.init = function() 
{   
  interactiveObj.numberGeneration();   

    var i;
     loadXML("xml.xml",function(){
        start();
    });
  
//sequence when 0 ==1 or 2 or 3// 	
	
if(interactiveObj.sequence[0]==1)
{
	interactiveObj.num1=interactiveObj.number[0];
	interactiveObj.num2=interactiveObj.n2_S1_tens;
	interactiveObj.num3=interactiveObj.num1;
	interactiveObj.num4=interactiveObj.n2_S1_ones;
}
if(interactiveObj.sequence[0]==2)
{
	interactiveObj.num1=interactiveObj.n1_S2_tens;
	interactiveObj.num2=interactiveObj.n2_S2_tens;
	interactiveObj.num3=interactiveObj.n1_S2_ones;
	interactiveObj.num4=interactiveObj.n2_S2_ones;
}
if(interactiveObj.sequence[0]==3)
{
	interactiveObj.num1=interactiveObj.number[0];
	interactiveObj.num2=interactiveObj.n2_S2_tens;
	interactiveObj.num3=interactiveObj.number[0];
	interactiveObj.num4=interactiveObj.n2_S2_ones;
}

//sequnece when 1==1 or 2 or 3
  
if(interactiveObj.sequence[1]=='1')
{
	interactiveObj.num5=interactiveObj.number[0];
	interactiveObj.num6=interactiveObj.n2_S1_tens;
	interactiveObj.num7=interactiveObj.number[0];
	interactiveObj.num8=interactiveObj.n2_S1_ones;
} 
if(interactiveObj.sequence[1]=='2')
{
	interactiveObj.num5=interactiveObj.n1_S2_tens;
	interactiveObj.num6=interactiveObj.n2_S2_tens;
	interactiveObj.num7=interactiveObj.n1_S2_ones;
	interactiveObj.num8=interactiveObj.n2_S2_ones;
}
if(interactiveObj.sequence[1]=='3')
{
	interactiveObj.num5=interactiveObj.number[0];
	interactiveObj.num6=interactiveObj.n2_S2_tens;
	interactiveObj.num7=interactiveObj.number[0];
	interactiveObj.num8=interactiveObj.n2_S2_ones;
}

//when sequence 2== 1 or 2 or 3 //
if(interactiveObj.sequence[2]==1)
{
	interactiveObj.num9=interactiveObj.number[0];
	interactiveObj.num10=interactiveObj.n2_S3_ones;
	interactiveObj.num11=interactiveObj.number[0];
	interactiveObj.num12=interactiveObj.n2_S3_tens;
}
if(interactiveObj.sequence[2]==2)
{
	interactiveObj.num9=interactiveObj.n1_S2_tens;
	interactiveObj.num10=interactiveObj.n2_S2_tens;
	interactiveObj.num11=interactiveObj.n1_S2_ones;
	interactiveObj.num12=interactiveObj.n2_S2_ones;
}
if(interactiveObj.sequence[2]==3)
{
	interactiveObj.num9=interactiveObj.number[0];
	interactiveObj.num10=interactiveObj.n2_S2_tens;
	interactiveObj.num11=interactiveObj.number[0];
	interactiveObj.num12=interactiveObj.n2_S2_ones;
}

    
 	html='<div id="firstBlock" class="one">';
	html+='<div id="popout1" class="popout1"><blockquote class="oval-thought"><p class="txt1">'+replaceDynamicText(promptArr['text1'],interactiveObj.numberLanguage,"interactiveObj")+'</p></blockquote></div>' ; 
	html+='<div id="girl1"></div>';
	html+='<div class="name1">'+interactiveObj.names[0]+'</div>';
	html+='</div>';
	
	html+='<div id="secondBlock" class="one">';
	html+='<div id="popout1" class="popout1"><blockquote class="oval-thought"><p class="txt1">'+replaceDynamicText(promptArr['text2'],interactiveObj.numberLanguage,"interactiveObj")+'</p></blockquote></div>' ; 
	html+='<div id="girl2"></div>';
	html+='<div class="name1">'+interactiveObj.names[1]+'</div>';
	html+='</div>';
	
	html+='<div id="thirdBlock" class="one">';
	html+='<div id="popout1" class="popout1"><blockquote class="oval-thought"><p class="txt1">'+replaceDynamicText(promptArr['text3'],interactiveObj.numberLanguage,"interactiveObj")+'</p></blockquote></div>' ; 
	html+='<div id="girl3"></div>';
	html+='<div class="name1">'+interactiveObj.names[2]+'</div>';
	html+='</div>';
	
	html+='<div class="replay" id="replayButton" onclick="interactiveObj.showAgain();"><img src="../../../../assets/replay.png" style="width: 28px;"/></div>';

      $("#container").html(html);
	
	containerResize();
	 interactiveObj.animate();


}
questionInteractive.prototype.numberGeneration=function()
{
	//type 1 sequence//
	
	interactiveObj.n1=interactiveObj.number[0];
	interactiveObj.n2=interactiveObj.number[1];
	
	interactiveObj.n2_S1_ones=interactiveObj.n2%10;
	interactiveObj.n2_S1_tens=parseInt(interactiveObj.n2/10);
	
	
	//type 2 sequence //
	
	interactiveObj.n1_S2_ones=interactiveObj.n1%10;
	interactiveObj.n1_S2_tens=parseInt(interactiveObj.n1/10);	
	
	interactiveObj.n2_S2_ones=interactiveObj.n2%10;
	interactiveObj.n2_S2_tens=parseInt((interactiveObj.n2/10))*10;

	//type 3 sequence //
	
	interactiveObj.n2_S3_ones=parseInt(interactiveObj.n2/10);
	interactiveObj.n2_S3_tens=parseInt((interactiveObj.n2%10));

}

                    
questionInteractive.prototype.animate = function()
 {
	$("#firstBlock").delay(500).animate({'opacity':'1'},500);
	$("#secondBlock").delay(1500).animate({'opacity':'1'},500);
	$("#thirdBlock").delay(2500).animate({'opacity':'1'},500);

replayCall=setTimeout("interactiveObj.showReplayButton();",3000);

	

}
questionInteractive.prototype.showReplayButton=function()
{
	$("#replayButton").css('visibility','visible').animate({'opacity':'1'},500);
}
questionInteractive.prototype.showAgain=function()
{
	
	clearTimeout(replayCall);
	html="";
	 interactiveObj.init();  

}

function start()
{
    return ;  
    
}
