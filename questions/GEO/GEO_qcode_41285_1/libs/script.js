var questionInteractive;
var html='';
var interactiveObj;
var angle=0;
var id='';
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

   

    if(typeof getParameters['countParallel']=="undefined")
    {
        $("#container").html("<h2><center>Parameter countParallel Not Set</center></h2>");
        return;
         
    }
    else this.countParallel=getParameters['countParallel'];

    if(typeof getParameters['name']=="undefined")
    {
         $("#container").html("<h2><center>Parameter lastLevelCleared Not Set</center></h2>");
         return;
         
    }
    else this.name=getParameters['name'].split('|');

    if(typeof getParameters['angle']=="undefined")
    {
         $("#container").html("<h2><center>Parameter name Not Set</center></h2>");
         return;
         
    }
    else this.angle=parseInt(getParameters['angle']);

    if(typeof getParameters['nameTransversal']=="undefined")
    {
      $("#container").html("<h2><center>Parameter nameTransversal Not Set</center></h2>");
      return;
     
    }
    else this.nameTransversal=getParameters['nameTransversal'];

    this.labelArray=new Array();
}

questionInteractive.prototype.init=function()
{
    
    interactiveObj.lineheight=150;
    html='';
    html+='<div id=base>';
    
    for(interactiveObj.i=0;interactiveObj.i<interactiveObj.name.length;interactiveObj.i++)
    {
        interactiveObj.labelArray[interactiveObj.i]=interactiveObj.name[interactiveObj.i];
    }

    html+='<div id="lines">';
    for(interactiveObj.i=0;interactiveObj.i<interactiveObj.countParallel;interactiveObj.i++)
    {

         html+='<div id="line'+interactiveObj.i+'" style="position:relative;top:'+interactiveObj.i*50+'px"><div class=arrowStart></div><div class=lineStatic></div><div class=arrowEnd></div><div class="label">'+interactiveObj.labelArray[interactiveObj.i]+'</div></div>';

        $("#container").html(html);

      
    }
    html+='</div>';

    html+='<div id="lineRotate"><div class="arrow1"></div><div id="lineSegment"></div><div class="arrow2"></div><div id="nameTransversal">'+interactiveObj.nameTransversal+'</div></div>';

    html+='<div id="text1">'+promptArr['txt_1']+'</div>';
    html+='<div id="button"><div class="button1"></div></div>';

    html+='</div>';


    $("#container").html(html);
    $("#lineRotate").draggable();


    $("#lines").css({
        "transform": "rotate("+interactiveObj.angle+"deg)",
    "-ms-transform": "rotate("+interactiveObj.angle+"deg)", /* IE 9 */
"-webkit-transform": "rotate("+interactiveObj.angle+"deg)", /* Safari and Chrome */
     "-o-transform": "rotate("+interactiveObj.angle+"deg)", /* Opera */
   "-moz-transform": "rotate("+interactiveObj.angle+"deg)" /* Firefox */
    });


var timer1;
    $(".button1").on('mousedown touchstart',function() {
     timer1 = setInterval("interactiveObj.rotateClockwise();",50);
    }).on('mouseup touchend',function() {
      clearInterval(timer1);  
    }).on('mouseout touchout',function() {
      clearInterval(timer1);  
    })


$(".button1").on('mouseenter touchstart',function(){
    $("#text1").animate({"opacity": "1"},200);
    });
    $(".button1").on('mouseleave touchout',function(){
      $("#text1").animate({"opacity": "0"},200);
    });    



}
questionInteractive.prototype.rotateClockwise=function()
{
    //turn 1degree anticlockwise
    angle+=1;
    rotate("#lineRotate",angle);
    
}
function rotate(id,angle)
{

    $(id).css({
        "transform": "rotate("+angle+"deg)",
    "-ms-transform": "rotate("+angle+"deg)", /* IE 9 */
"-webkit-transform": "rotate("+angle+"deg)", /* Safari and Chrome */
     "-o-transform": "rotate("+angle+"deg)", /* Opera */
   "-moz-transform": "rotate("+angle+"deg)" /* Firefox */
    });


}