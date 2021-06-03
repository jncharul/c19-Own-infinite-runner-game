var PLAY = 1;
var END = 0;
var gameState = 1 ; 

var gameOver,gameOverImg;

var goldCoin,silverCoin,coinImg1,coinImg2;
var bot,botImg1,botImg2,burst; 
var backGround,backGroundImg;
var points = 0;
var hammer,hammerImg;

function preload(){
  coinImg1 = loadImage("gold_Coin.png");
  coinImg2 = loadImage("silver_Coin.png");
  botImg1 = loadAnimation("Robo_$.png","Robo_%.png");
  botImg2 = loadImage("BurstImg = 2.png");
  backGroundImg = loadImage("#BACKGROUN of OUR OWN INFINITE RUNNER GAME.png");
  gameOverImg = loadImage("GAMEover.png")
  hammerImg = loadImage("Hammer.png")
}


function setup() {
  createCanvas(400,400);
  goldCoinGroup = new Group();
  silverCoinGroup = new Group();
  hammerGroup = new Group();
  
  backGround = createSprite(200,200,400,400);
  backGround.addImage(backGroundImg)
  backGround.scale = 5.3
  backGround.velocityX= -2.5
  
  gameOver = createSprite(200,200)
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2
  
  
 bot = createSprite(35,200,50,50);
  bot.addAnimation("running",botImg1);
  bot.scale = 0.8
  burst = createSprite(35,200,50,50);
  burst.addImage(botImg2);
  burst.scale = 0.8
  
  
  
}

function draw() {
  background("220");
  
  if(gameState === PLAY){
    
   if (backGround.x < 150) {
      backGround.x = 200;
    } 
    edges = createEdgeSprites();
  bot.collide(edges);
    burst.collide(edges);
    
    gameOver.visible = false;
  
  if(keyDown(UP_ARROW)){
     bot.y = bot.y -3
    burst.y = burst.y -3
     }
  if(keyDown(DOWN_ARROW)){
     bot.y = bot.y +3
     burst.y = burst.y +3
     }
  
    burst.visible = false;
    
  if(goldCoinGroup.isTouching(bot)){
    goldCoinGroup.destroyEach();
    points = points+10;
  }
  
  if(silverCoinGroup.isTouching(bot)){
    silverCoinGroup.destroyEach();
    points = points+5;
  }
  
  if(hammerGroup.isTouching(bot)){
   // bot.addImage("burst",botImg2);
    gameState = END
    
  }
  
  
  createCoin();
  createObstacles();
    
  } else {
    if(gameState === END){
     burst.visible = true;
      bot.visible = false;
      
      backGround.velocityX = 0;
      goldCoinGroup.setVelocityXEach  (0);
      silverCoinGroup.setVelocityXEach  (0)
      hammerGroup.destroyEach();
      gameOver.visible = true;
     
    }
    
    
  }
  
  
  
  
  
  
  
    
  
  drawSprites();
  
  textSize(25);
  fill(255);
  text("points: " + points, 150, 30);
  
}

function createCoin(){
   if (frameCount % 370 === 0){
    goldCoin = createSprite(401,random(50,350),20,20);
     goldCoin.velocityX=-3;
     goldCoin.addImage(coinImg1);
     goldCoin.scale = 0.35
     goldCoinGroup.add(goldCoin)
  }
  if (frameCount % 180 === 0){
    silverCoin = createSprite(401,random(50,350),20,20);
     silverCoin.velocityX=-3.5;
     silverCoin.addImage(coinImg2);
     silverCoin.scale = 0.25
    silverCoinGroup.add(silverCoin)
  }
}

function createObstacles(){
  if (frameCount % 390 === 0){
  hammer = createSprite(401,random(70,330));
   hammer.addImage(hammerImg);
    hammer.velocityX=-4;
   hammer.lifetime = 250
     hammer.scale = 0.6
    hammerGroup.add(hammer)
}
}
