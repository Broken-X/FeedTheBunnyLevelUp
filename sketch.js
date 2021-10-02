const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var bubbleImg
var food;
var rabbit;

var bubble;
var button,blower;
var button2, button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var paddle

var canW, canH

var fr,rope2, rope3;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var blower;
function preload()
{
  bg_img = loadImage('background.png');
  bubbleImg = loadImage('bubble.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500, 700);

  frameRate(60);

  bk_song.play();
  bk_song.setVolume(0.15);


  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(85, 350);
  button.size(50,50);
  button.mouseClicked(drop);

  // button2 = createImg('cut_btn.png');
  // button2.position(310, 35);
  // button2.size(50,50);
  // button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(310, 450);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  // blower = createImg('balloon.png');
  // blower.position(10, 250);
  // blower.size(150, 100);
  // blower.mouseClicked(airBlow);

  muteBtn = createImg('mute.png');
  muteBtn.position(450, 20);
  muteBtn.size(40, 40);
  muteBtn.mouseClicked(mute);
  
  rope = new Rope(4,{x: 100,y: 370});
  // rope2 = new Rope(6,{x: 330,y: 50});
  rope3 = new Rope(4,{x: 340,y: 470});
  ground = new Ground(width/2, 690, width, 20);
  paddle = new Ground(420, 270, 150, 10);
  bubble = createSprite(370, 600, 25, 25);
  bubble.addImage(bubbleImg)
  bubble.scale = 0.1;

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(420, 200, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20, {restitution: 0.8});
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  //fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

var flag = true;
function draw() 
{
  background(51);
  imageMode(CENTER);
  image(bg_img, width/2, height/2, width, height);
  //console.log(fruit.position.y)

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  if (fruit != null && bubble != null) {
    var d2 = dist(fruit.position.x, fruit.position.y, bubble.x, bubble.y);
  }

  if (fruit != null && rope.body == null && d2 <= 30 && flag) {
    follow();
    Body.applyForce(fruit, {x: fruit.position.x, y: fruit.position.y}, {x: 0, y: -0.005})
    // flag = false;
    //drop3();
    //frameRate(1);
    //frameRate(5);
  }

  rope.show();
  rope3.show();
  Engine.update(engine);
  ground.show();
  paddle.show();
  //bubble.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  //console.log(fruit.position.y);
  //console.log(rope);
  if(fruit != null && fruit.position.y >= 660 && rope.body == null && rope3.body == null)
  {
    bunny.changeAnimation('crying');
    fruit=null;
    bk_song.stop();
    sad_sound.play();
   }
   
}

function drop()
{
  if (rope != null && fruit_con != null) {
    rope.break();
    fruit_con.detach();
    cut_sound.play();
    fruit_con = null; 
  }
}

function drop3()
{
  if (rope3 != null && fruit_con3 != null) {
    rope3.break();
    fruit_con3.detach();
    cut_sound.play();
    fruit_con3 = null; 
  }
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               bubble.destroy();
               rope3.break();
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow() {
  Matter.Body.applyForce(fruit, {x: 0, y: 0}, {x: 0.01, y: 0});
  air.play();
}

function mute() {
  if (bk_song.isPlaying()) {
    bk_song.stop();
  } else {
    bk_song.play();
  }
}

function follow() {
  bubble.x = fruit.position.x;
  bubble.y = fruit.position.y;
}
