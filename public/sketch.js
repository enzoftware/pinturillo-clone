var socket;
var canvas;

function setup(){
    canvas = createCanvas($('#container').width() , 350);
    canvas.parent('canvasContainer');
    background(51);
    socket = io.connect('http://localhost:3000');
    var messageForm = $('#send-message');
    var messageBox = $('#message');
    var chat = $('#chat');

    messageForm.submit(function(e){
      //alert("hello");
      e.preventDefault();
      socket.emit('send_message',messageBox.val());
      console.log(messageBox.val());
      messageBox.val('');
    });

    socket.on('mouse',newDrawing);

    socket.on('new_message', reciveMessage);

    function reciveMessage(data){
      console.log(data);
      chat.append(data + '<br/>');
    }

    function newDrawing(data){
        noStroke();
        fill(125);
        ellipse(data.x,data.y,10,10);
    }
}

/*
window.addEventListener('resize',function(){

  canvas.resizeCanvas($(window).width(),100,false);
});*/

function windowResized() {
  canvas.resizeCanvas(10,10,true);
  console.log("resizing window");
}

function draw(){

}

function mouseDragged(){
    console.log("Sending : " +  mouseX + " , "  + mouseY);

    var data = {
        x : mouseX,
        y : mouseY
    };

    socket.emit('mouse',data);

    noStroke();
    fill(255);
    ellipse(mouseX,mouseY,10,10);
}
