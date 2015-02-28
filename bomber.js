function Simulation(c)
{
var canvas = c;
var width, height;
var ctx;
var timer;
var blobs = [];
var springs = [];
var gman;

width = canvas.width;
height = canvas.height;
ctx = canvas.getContext("2d");


function Blob (x, y)
{
this.x = x;
this.y = y;
this.vx = 0.0;
this.vy = 0.0;
this.mass = 2;
this.isAnchor = false;
}

function Man (x, y)
{
this.x = x;
this.y = y;
this.vx = 0.0;
this.vy = 0.0;

}



function Spring(b1, b2, restlength, k)
{
this.b1 = b1;
this.b2 = b2;
this.restlength = restlength;
this.k = k;
}

function drawSpring(s)
{
ctx.fillStyle = "#000000";
ctx.beginPath();
ctx.moveTo(s.b1.x, s.b1.y);
ctx.lineTo(s.b2.x, s.b2.y);
ctx.stroke();
}

function drawSquare()
{
ctx.fillStyle = "#339f33";
ctx.beginPath();
ctx.moveTo(10,10);
ctx.lineTo(410,10);
//ctx.stroke();
ctx.lineTo(410,410);
//ctx.stroke();
ctx.lineTo(10,410);
//ctx.stroke();
ctx.lineTo(10,10);
ctx.stroke();
}


function drawMan()
{
ctx.fillStyle = "#339f33";
ctx.beginPath();
//ctx.moveTo(gman.x, gman.y);
ctx.arc(gman.x,gman.y,20,0,2*Math.PI);
//ctx.stroke();
//ctx.lineTo(110,110);
//ctx.stroke();
//ctx.lineTo(10,110);
//ctx.stroke();
//ctx.lineTo(10,10);
ctx.stroke();
}

function drawBlob(blob)
{
ctx.fillStyle = "#339f33";
ctx.fillRect(blob.x, blob.y, 5, 5);
}

function draw()
{
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0, width, height);

blobs.map(drawBlob);
drawSquare();
drawMan();
}

function update(dt)
{

gman.x += gman.vx*10;
gman.y += gman.vy*10;
gman.vx = 0;
gman.vy = 0;

blobs.forEach(function (blob) {

var ay, ax=0.0;
if (!blob.isAnchor) {
ay = 9.8

} else {
ay = 0.0;
}

blob.vy += ay*dt;
blob.y += blob.vy*dt;

blob.vx += ax*dt;
blob.x += blob.vx*dt;

});

}

function pressS(){

gman.vy=1;

}

function pressD(){

	gman.vx = 1;
}

function pressA(){

gman.vx=-1;

}

function pressW(){

	gman.vy = -1;
}

function init()
{
var a1 = new Blob(20,20);
a1.mass = Infinity;
a1.isAnchor = true;
blobs.push(a1);
gman = new Man(30,30);
}

function start()
{
var lastFrame = +new Date;

timer = setInterval(function() {
var now = +new Date;
var deltaT = now - lastFrame;
lastFrame = now;

// update
update( deltaT * 0.01);
// draw
draw();

}, 10);

}

function stop()
{
clearInterval( timer );
}

function addBlob(x,y)
{
var newblob = new Blob(x,y);

blobs.push(newblob);

draw();
}

return {
start: start,
stop: stop,
init: init,
addBlob: addBlob,
pressD: pressD,
pressS: pressS,
pressA: pressA,
pressW: pressW
}

}
$(document).ready( function () {

var canvas = $("#mycanvas")[0];
var sim = Simulation(canvas);

sim.init();
sim.start();

$(document).on("keydown", function(event) {
var x, y, rect;
if(event.which===83)
sim.pressS();
if(event.which===68){
//sim.pressD();
sim.pressD();}
if(event.which===65)
sim.pressA();
if(event.which===87){
//sim.pressD();
sim.pressW();}

});

$("#mycanvas").on("click", function(event) {
var x, y, rect;
rect = canvas.getBoundingClientRect();
x = event.clientX - rect.left;
y = event.clientY - rect.top;

sim.addBlob(x,y);
});



});
