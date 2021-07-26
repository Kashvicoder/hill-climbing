var bg;
var bgimg;
var player;
var playerimg;
var invisibleGround;
var pmushroom,go1,go2,go3;
var birds,b1,b2,b3,b4;
var score=0;
var f1,f2,f3,fuelImg;
var fuelGroup;

function preload() {
 bgimg = loadImage("images/bg.jpeg");
 playerimg = loadImage("images/gc.png");
 go1 = loadImage("images/pmg.png");
 go2 = loadImage("images/bcg.png");
 go3 = loadImage("images/dsg.png");
 b1 = loadImage("images/ybs.png");
 b2 = loadImage("images/pbs.png");
 b3 = loadImage("images/bbs.png");
 b4 = loadImage("images/gbs.png");
 f1 = loadAnimation("images/green.png");
 f2 = loadAnimation("images/yellow.png");
 f3 = loadAnimation("images/red.png");
 fuelImg = loadImage("images/fuel.png");

}


function setup() {
  createCanvas(1000,600);
  bg = createSprite(500, 300, 1000, 600);
 
  bg.addImage(bgimg);
  bg.velocityX = -2 ;
  bg.scale = 0.95;
  player = createSprite(150,450);
  player.addImage("cycling",playerimg);
  player.scale = 0.1;
  invisibleGround = createSprite(500,590,1000,10);
  invisibleGround.visible = false;
  fuelGroup = new Group();
  battery = createSprite(100,100);

}

function draw() {
  background(0); 
  if(bg.x <400 ){
    bg.x = 600;
  } 

  player.velocityY = player.velocityY + 0.5;
  player.collide(invisibleGround);
  console.log(player.y)
  if(keyDown("space") &&player.y>=501){
    player.velocityY = 25;
  }

  score=score+1 
  
  battery.scale = 0.3
  if(score<100){
    battery.addAnimation("green",f1);
    battery.changeAnimation("green");
  }
  
  if(score==100){
    battery.addAnimation("yellow",f2);
    battery.changeAnimation("yellow")
  }
  else if(score==200){
    battery.addAnimation("red",f3);
    battery.changeAnimation("red");
    spawnFuel();
  }
   
   if(fuelGroup.isTouching(player)){
     fuelGroup.destroyEach();
     score = 0;
   }
   spawnGroundObstacles();
   spawnSkyObstacles();
  drawSprites();
}

function spawnGroundObstacles() {

  if(frameCount%200==0){
    pmushroom = createSprite (1000,550);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:pmushroom.addImage(go1);
      pmushroom.scale = 0.2;
      pmushroom.y = 520;
      break;
      case 2:pmushroom.addImage(go2);
      pmushroom.scale = 0.3;
      break;
      case 3:pmushroom.addImage(go3);
      pmushroom.scale = 0.1;
      break;
      default:break;
    }
  
    pmushroom.velocityX = -2;
  }
  

}

function spawnSkyObstacles () {
   
  if(frameCount%300==0){
    birds = createSprite (1000,200);
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1:birds.addImage(b1);
      birds.scale = 0.5;
      break;
      case 2:birds.addImage(b2);
      birds.scale = 0.3;
      break;
      case 3:birds.addImage(b3);
      birds.scale = 0.1;
      break;
      case 4:birds.addImage(b4);
      birds.scale = 0.1;
      break;
      default:break;
    }
  
    birds.velocityX = -2;
  }
}

function spawnFuel(){
 var fuel = createSprite (1000,random(400,500));
 fuel.addImage(fuelImg);
 fuel.velocityX = -2 ;
 fuelGroup.add(fuel);
  
}