var PLAY=1;
var gameState=PLAY;
var END=0;


var lives=3;
var BG;
var player;
var bgImage,playerImage1,playerImage2;
var zombie,zombieImage,zombieGrp;
var bullet,bulletGrp,bulletImg;
var heart1,heart2,heart3;
var H1,H2,H3;
var PAUSE;
var reset;
var gameover;


function preload(){

  bgImage = loadImage("assets/bg.jpeg");
  playerImage1 = loadImage("assets/shooter_2.png");
  playerImage2 = loadImage("assets/shooter_3.png");
  zombieImage = loadImage("assets/zombie.png");
  bulletImg=loadImage("assets/bullet.png");
  heart1=loadImage("assets/heart_1.png");
  heart2=loadImage("assets/heart_2.png");
  heart3=loadImage("assets/heart_3.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  BG = createSprite(displayWidth-700,displayHeight-300);
  BG.addImage(bgImage);
  BG.scale = 1.1
  
  
  player = createSprite(displayWidth-1200,displayHeight-250);
  player.addImage(playerImage1);
  player.scale=0.5
  
  zombieGrp= new Group();
  bulletGrp= new Group();
  
  H1=createSprite(displayWidth-300,displayHeight-700)
  H1.addImage(heart1);
  H1.scale=0.3
  H1.visible=false;
  
  H2=createSprite(displayWidth-300,displayHeight-700)
  H2.addImage(heart2);
  H2.scale=0.3
  H2.visible=false;
 
  H3=createSprite(displayWidth-300,displayHeight-700)
  H3.addImage(heart3);
  H3.scale=0.3
  
}

function draw() {
  
  background(180);

  //PLAY STATE!
if(gameState===PLAY){
  if(keyWentDown("SPACE")){
    player.addImage(playerImage2);
  }
  
  if(keyWentUp("SPACE")){
    player.addImage(playerImage1);
  }
  spawnZombies()
  if(zombieGrp.isTouching(player)){
    gameState=PAUSE;
  }
 

 if(bulletGrp.isTouching(zombieGrp)){
   for(var i=0;i<zombieGrp.length;i=i+1){
    if(zombieGrp[i].isTouching(bulletGrp)){
      zombieGrp[i].destroy();
      bulletGrp.destroyEach();
    }
   }
    
 }
if(gameState===PAUSE)
{
     
      lives=lives-1;
      if(lives===2){
        H2.visible=true;
        H3.visible=false;
        zombieGrp.destroyEach();
        player.visible=false;
        reset=createSprite(displayWidth/2,displayHeight/2);
        reset.scale=0.5;

      }
      else if(lives===1){
        H2.visible=false;
        H1.visible=true;
        zombieGrp.destroyEach();
        player.visible=false;
        reset=createSprite(displayWidth/2,displayHeight/2);
        reset.scale=0.5;

      }
      else{
        gameState=END;
        H1.visible=false;
        zombieGrp.destroyEach();
        player.destroy();
        gameover=createSprite(displayWidth/2,displayHeight/2);
        gameover.scale=0.75;
       

      }
      
    }
}

if(mousePressedOver(reset)){
  if(lives!==0){
 
  reset.visible=false;
  player.visible=true;
  gameState=PLAY;
  }
  
  
}

drawSprites();
}


 


function spawnZombies(){
  if(frameCount % 80===0){

    zombie=createSprite(displayWidth-200,displayHeight-250)
  zombie.addImage(zombieImage);
  zombie.scale = 0.3
  zombie.velocityX=-7
    zombie.debug=false;
    zombie.setCollider("rectangle",0,0,300,400)
    zombie.lifetime=400
    zombieGrp.add(zombie);
  }
}
 
function mouseClicked(){
  if(gameState!==END){
  bullet=createSprite(displayWidth-1100,displayHeight-295)
  bullet.addImage(bulletImg)
  bullet.scale=0.1
  bullet.velocityX=5
  bulletGrp.add(bullet);
  }
}


