var interactiveObj;
var extraParameters = "";
var userResponse = "";
var correctResponse = "";
var result = 2;
var parameterMissing = false;
var context;
var canvas;
var bcolor;

var html = "";
var html2 = "";
var html3 = "";
var html4 = "";

var hexDigits = new Array
        ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

function rgb2hex(rgb)
{
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    alert();
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}


function questionInteractive()
{

    this.counter = 500;
    this.i = 0;

    if (typeof getParameters['showAnsFlag'] == "undefined")
    {
        this.showAnsFlag = 0;
    }
    else
        this.showAnsFlag = getParameters['showAnsFlag'];


    if (typeof getParameters['numberLanguage'] == "undefined")
    {
        this.parameterNotSetFlag = 1;
        this.numberLanguage = 'english';
    }
    else
        this.numberLanguage = getParameters['numberLanguage'];


    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');

}

questionInteractive.prototype.init = function()
{
    loadXML("xml.xml", function() {
        start();
    });

    $("#container").css('width', '996px');
    $("#container").css('height', '555px');
    containerResize();


    $("#replayButton").delay(100).animate({'opacity': '0'}, 100);


    html += '<p id="text1">' + promptArr['text1'] + '</p>';
    html2 += '<p id="text2">' + promptArr['text2'] + '</p>';



    interactiveObj.bcolor = rgb2hex($("#canvascontainer").css('border-color'));


    if (interactiveObj.showAnsFlag == 1)
    {
        $("#firsttext").html(html);
        colorchange1 = setTimeout("interactiveObj.colorchange();", 1000);

        textchange = setTimeout("interactiveObj.changetext();", 15000);

        drawuppercut1 = setTimeout("interactiveObj.drawuppercut();", 10000);
        drawleft2 = setTimeout("interactiveObj.drawleft2();", 10500);
        drawdown3 = setTimeout("interactiveObj.drawdown3();", 11000);
        drawrightupper4 = setTimeout("interactiveObj.drawrightupper4();", 11500);
        drawleftupper5 = setTimeout("interactiveObj.drawleftupper5();", 12000);
        drawlowerleft6 = setTimeout("interactiveObj.drawlowerleft6();", 12500);
        drawlowerright7 = setTimeout("interactiveObj.drawlowerright7();", 13000);
    }






    interactiveObj.x = 10;
    interactiveObj.y = 10;
    interactiveObj.width = 490;
    interactiveObj.height = 490;

    context.beginPath();
    context.lineWidth = 4;
    if (interactiveObj.showAnsFlag == '1')
        context.strokeStyle = 'blue';
    else
        context.strokeStyle = 'black';
    context.rect(interactiveObj.x, interactiveObj.y, interactiveObj.width, interactiveObj.height) // Draws a rectangular outline
    context.stroke();
    context.closePath();
    //Draws the Inner Square
    context.beginPath();
    context.lineWidth = 3;
    context.moveTo(10, 250);

    context.lineTo(250, 500);
    context.lineTo(500, 250);
    context.lineTo(250, 10);
    context.lineTo(10, 250);

    context.strokeStyle = 'black';

    //Draws the Diagonals

    context.moveTo(132, 127);  // right diagonal
    context.lineTo(375, 375);

    context.moveTo(373, 126);  //left diagonal
    context.lineTo(125, 372);

    context.moveTo(250, 250);   // Inside Cut
    context.lineTo(500, 250);

    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(250, 250);  //colored traingle
    context.lineTo(497, 250);
    context.lineTo(375, 372);
    context.lineTo(254, 250);
    context.fillStyle = "#CAC8C9";
    context.fill();
    context.closePath();

    // Labelling the Triangles

}

questionInteractive.prototype.label = function()
{
    fillbox1 = setTimeout("interactiveObj.fillbox1();", 2000);
    fillbox2 = setTimeout("interactiveObj.fillbox2();", 2500);
    fillbox3 = setTimeout("interactiveObj.fillbox3();", 3000);
    fillbox4 = setTimeout("interactiveObj.fillbox4();", 3500);
    fillbox5 = setTimeout("interactiveObj.fillbox5();", 4000);
    fillbox6 = setTimeout("interactiveObj.fillbox6();", 4500);
    fillbox7 = setTimeout("interactiveObj.fillbox7();", 5000);
    fillbox8 = setTimeout("interactiveObj.fillbox8();", 5500);
    fillbox9 = setTimeout("interactiveObj.fillbox9();", 6000);
    fillbox10 = setTimeout("interactiveObj.fillbox10();", 6500);
    fillbox11 = setTimeout("interactiveObj.fillbox11();", 7000);
    fillbox12 = setTimeout("interactiveObj.fillbox12();", 7500);
    fillbox13 = setTimeout("interactiveObj.fillbox13();", 8000);
    fillbox14 = setTimeout("interactiveObj.fillbox14();", 8500);
    fillbox15 = setTimeout("interactiveObj.fillbox15();", 9500);
    fillbox16 = setTimeout("interactiveObj.fillbox16();", 9000);

    clearTimeout(drawlabel);

    finaltext = setTimeout("interactiveObj.finaltext();", 10000);
}
questionInteractive.prototype.finaltext = function()
{
    html4 += '<p id="text4">' + promptArr['text4'] + '<div class="fraction"><div class="frac numerator">' + changeLanguage(1, interactiveObj.numberLanguage) + '</div><div class="frac">' + changeLanguage(16, interactiveObj.numberLanguage) + '</div></div></p>';

    $("#firsttext").html(html4);
    $("#text4").delay(2000).animate({'opacity': '1'}, 100);
    $(".fraction").delay(2000).animate({'opacity': '1'}, 100);
    $(".frac numerator").delay(2000).animate({'opacity': '1'}, 100);
    $(".frac").delay(2000).animate({'opacity': '1'}, 100);

    $("#replayButton").delay(2200).animate({'opacity': '1'}, 100);


}

questionInteractive.prototype.changetext = function()
{
    html3 += '<p id="text3">' + promptArr['text3'] + '</p>';
    $("#firsttext").html(html3);
    $("#text3").delay(1000).animate({'opacity': '1'}, 100);
    $("#text3").delay(9000).animate({'opacity': '0'}, 100);

    drawlabel = setTimeout("interactiveObj.label();", 700);


}

questionInteractive.prototype.colorchange = function()
{

    $("#text1").delay(10).animate({'opacity': '1'}, 10);



    if (interactiveObj.bcolor == '#FFFFFF' && interactiveObj.i <= 21)
    {
        $("#canvascontainer").css({'border': '0px solid white'});
        interactiveObj.bcolor = '#FFFFFF';


    }
    else
    {
        $("#canvascontainer").css({'border': '0px solid white'});
        interactiveObj.bcolor = '#FFFFFF';


    }
    interactiveObj.i++;

    clearTimeout(colorchange1);

    if (interactiveObj.i <= 21)
    {
        color2 = setTimeout("interactiveObj.colorchange();", 100);
    }
    else {
        clearTimeout(color2);

        $("#text1").delay(2000).animate({'opacity': '1'}, 100);
        $("#text1").delay(100).animate({'opacity': '0'}, 100);

        $("#firsttext").html(html2);
        $("#text2").delay(1500).animate({'opacity': '1'}, 100);
        $("#text2").delay(12500).animate({'opacity': '0'}, 100);

    }

}

questionInteractive.prototype.drawuppercut = function()
{


    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(250, 250);
    context.lineTo(250, 8);

    context.stroke();
    context.closePath();

    clearTimeout(drawuppercut1);
}

questionInteractive.prototype.drawleft2 = function()
{
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(250, 250);
    context.lineTo(10, 250);
    context.stroke();
    context.closePath();

    clearTimeout(drawleft2);

}

questionInteractive.prototype.drawdown3 = function()
{

    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(250, 250);
    context.lineTo(250, 500);
    context.stroke();
    context.closePath();

    clearTimeout(drawdown3);


}
questionInteractive.prototype.drawrightupper4 = function()
{
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(372, 127);
    context.lineTo(500, 10);
    context.stroke();
    context.closePath();

    clearTimeout(drawrightupper4);
}

questionInteractive.prototype.drawleftupper5 = function()
{
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(139, 135);
    context.lineTo(10, 10);
    context.stroke();
    context.closePath();

    clearTimeout(drawleftupper5);
}

questionInteractive.prototype.drawlowerleft6 = function()
{
    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(132, 365);
    context.lineTo(10, 500);
    context.stroke();
    context.closePath();

    clearTimeout(drawlowerleft6);


}

questionInteractive.prototype.drawlowerright7 = function()
{

    context.beginPath();
    context.lineWidth = 3;
    context.strokeStyle = 'black';

    context.moveTo(375, 375);
    context.lineTo(500, 500);
    context.stroke();
    context.closePath();

    clearTimeout(drawlowerright7);


}

//------------------LABELLING THE BOXES FROM HERE-------------------------------//

questionInteractive.prototype.fillbox1 = function()
{
    interactiveObj.text1 = changeLanguage(1, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text1, 345, 200);
    context.stroke();
    //context.fillColor='red';
    context.fill();
    context.closePath();

    clearTimeout(fillbox1);
}

questionInteractive.prototype.fillbox2 = function()
{

    interactiveObj.text2 = changeLanguage(2, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text2, 445, 140);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox2);


}

questionInteractive.prototype.fillbox3 = function()
{

    interactiveObj.text3 = changeLanguage(3, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text3, 360, 60);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox2);


}
questionInteractive.prototype.fillbox4 = function()
{

    interactiveObj.text4 = changeLanguage(4, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text4, 270, 120);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox2);


}

//-------------------------XXXXXX--------------------------//

questionInteractive.prototype.fillbox5 = function()
{

    interactiveObj.text5 = changeLanguage(5, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text5, 200, 130);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox2);


}

questionInteractive.prototype.fillbox6 = function()
{

    interactiveObj.text6 = changeLanguage(6, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text6, 120, 70);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox6);


}

questionInteractive.prototype.fillbox7 = function()
{

    interactiveObj.text7 = changeLanguage(7, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text7, 60, 120);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox7);


}

questionInteractive.prototype.fillbox8 = function()
{

    interactiveObj.text8 = changeLanguage(8, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text8, 120, 220);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox8);


}

//--------------------lower Boxes...........................//


questionInteractive.prototype.fillbox9 = function()
{

    interactiveObj.text9 = changeLanguage(9, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text9, 120, 320);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox9);


}

questionInteractive.prototype.fillbox10 = function()
{

    interactiveObj.text10 = changeLanguage(10, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text10, 180, 370);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox10);


}

questionInteractive.prototype.fillbox11 = function()
{

    interactiveObj.text11 = changeLanguage(11, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text11, 120, 450);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox11);


}

questionInteractive.prototype.fillbox12 = function()
{

    interactiveObj.text12 = changeLanguage(12, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text12, 40, 410);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox12);


}

//----------------lower Right boxes-----------------//

questionInteractive.prototype.fillbox13 = function()
{

    interactiveObj.text13 = changeLanguage(13, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text13, 285, 360);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox13);


}
questionInteractive.prototype.fillbox14 = function()
{

    interactiveObj.text14 = changeLanguage(14, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text14, 360, 460);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox14);


}
questionInteractive.prototype.fillbox15 = function()
{

    interactiveObj.text15 = changeLanguage(16, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text15, 360, 315);
    context.stroke();

    context.closePath();

    clearTimeout(fillbox15);


}

questionInteractive.prototype.fillbox16 = function()
{

    interactiveObj.text16 = changeLanguage(15, interactiveObj.numberLanguage);

    context.beginPath();
    context.fillStyle = 'black';
    context.font = '25px Comic Sans MS ';
    context.fillText(interactiveObj.text16, 440, 400);

    context.stroke();

    context.closePath();

    clearTimeout(fillbox16);


}

questionInteractive.prototype.animate = function()
{

    $("#replayButton").delay(100).animate({'opacity': '0'}, 100);

    clearTimeout(fillbox1);
    clearTimeout(fillbox2);
    clearTimeout(fillbox3);
    clearTimeout(fillbox4);
    clearTimeout(fillbox5);
    clearTimeout(fillbox6);
    clearTimeout(fillbox7);
    clearTimeout(fillbox8);
    clearTimeout(fillbox9);
    clearTimeout(fillbox10);
    clearTimeout(fillbox11);
    clearTimeout(fillbox12);
    clearTimeout(fillbox13);
    clearTimeout(fillbox14);
    clearTimeout(fillbox15);
    clearTimeout(fillbox16);

    clearTimeout(finaltext);
    clearTimeout(drawuppercut1);
    clearTimeout(drawleft2);
    clearTimeout(drawdown3);
    clearTimeout(drawrightupper4);
    clearTimeout(drawleftupper5);
    clearTimeout(drawlowerleft6);
    clearTimeout(drawlowerright7);
    clearTimeout(drawlabel);
    clearTimeout(colorchange1);
    clearTimeout(color2);

    canvas.width = canvas.width;

    interactiveObj = new questionInteractive();
    interactiveObj.init();

}

function start()
{
    return;

}



