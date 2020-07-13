var PLAY = 1;
var END = 0;
var gameState = PLAY;     
var trex,trexrunning;
var ground,groundimage,invisibleGround;
var cloudImage,cloudGroup;
var obg1,obg2,obg3,obg4,obg5,obg6,obstaclesGroup;
var
  gameOver,gameOverimage,restart,restartimage,trexCollide;
var score=0;
var highscore=0;
var jump,die,checkpoint;

function preload() {
  trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obg1=loadImage("obstacle1.png");
  obg2=loadImage("obstacle2.png");
  obg3=loadImage("obstacle3.png");
  obg4=loadImage("obstacle4.png");
  obg5=loadImage("obstacle5.png");
  obg6=loadImage("obstacle6.png");
  gameOverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  trexCollided=loadImage("trex_collided.png")
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,10,0);
  trex.addAnimation("running",trexrunning);
  trex.addAnimation("trex_collide",trexCollided)
  trex.scale=0.5;
  
  ground=createSprite(300,180,600,10);
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(300,185,600,5);
  invisibleGround.visible=false;
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
  gameOver=createSprite(300,100);
  gameOver.addImage("gameOver",gameOverimage);
  gameOver.scale=0.9;
  gameOver.visible=false;
  
  restart=createSprite(300,140);
  restart.addImage("restart",restartimage);
  restart.scale=0.5;
  restart.visible=false;
  
}

function draw() {
  background(180);
  text("Score: "+score,500,50);
  text("High Score: "+highscore,420,50);
  if(gameState==PLAY){
      ground.velocityX=-10;
    score=score+Math.round(getFrameRate()/48);
  if(keyDown("space")&&trex.y>=159){
    trex.velocityY=-12;
    jump.play();
  }
    trex.velocityY=trex.velocityY + 0.8;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    spawnClouds();
    spawnObstacle();
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
      die.play();
    }
    if(score>0 && score%100==0){
      checkPoint.play();
       }
  }
  else if (gameState==END){
    ground.velocityX=0;
    trex.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("trex_collide",trexCollided);
    gameOver.visible=true;
    restart.visible=true;
  }
  if(mousePressedOver(restart)){
    gameState=PLAY;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trexrunning);
    gameOver.visible=false;
    restart.visible=false;
    if(highscore<score){
    highscore=score;
    }
    score=0;
  }

     
  trex.collide(invisibleGround);
 
  drawSprites();
}
function spawnClouds(){
if(World.frameCount%60==0){
  var cloud = createSprite(600,120,40,10);          
  cloud.scale=0.5;
  cloud.y=random(70,120);
  cloud.lifetime=200;
  cloud.velocityX=-3;
  cloud.addImage("cloud",cloudImage);
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudGroup.add(cloud);
}
  }
function spawnObstacle(){
  if(World.frameCount%60==0){
    var obstacle = createSprite(600,165,40,10);
    obstacle.velocityX=-6;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obg1);
      break;
      case 2:obstacle.addImage(obg2);
      break;
      case 3:obstacle.addImage(obg3);
      break;
      case 4:obstacle.addImage(obg4);
      break;
      case 5:obstacle.addImage(obg5);
      break;
      case 6:obstacle.addImage(obg6);
      break;
      default : break;
    }
    obstacle.scale=0.5;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
   }
}