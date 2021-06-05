var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obG
var foodGroup, bananaImage;
var ob1,ob2,ob3,ob4,ob5,ob6
var gameOver;
var score=0;
var rand
var gameState ="ingame"
var no
var player2


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  gameOver = loadImage("gameOver.png")
 no = loadImage("Monkey_01.png")
  bananaImage = loadImage("Banana.png");
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  player2 = createSprite(-200,320,20,20)
  player2.addImage(no)
  player2.scale = 0.1
  
  ground = createSprite(400,350,800,10);
  ground.visible = false
  foodGroup = new Group();
  obG = new Group();
  score = 0;
}

function draw() {
  if(gameState =="ingame"){
    backgr.velocityX=-4;
  ground.velocityX=-4;
  spawnFood();
    spawnOb()
    
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
  }else{
    backgr.velocityX=0;
  ground.velocityX=0;
  backgr.x = 400
  backgr.y = 200
  backgr.addImage(gameOver)
  }
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  for(var i = 0;i<foodGroup.length;i++){
    if(foodGroup.get(i).isTouching(player)){
      foodGroup.get(i).destroy();
    score = score + 2;
    }
  }
  for(var j = 0;j<obG.length;j++){
    if(obG.get(j).isTouching(player)){
      obG.get(j).velocityX =0
      obG.get(j+1).velocityX = 0
      obG.get(j).lifetime =-1
      obG.get(j+1).lifetime =-1
      
      foodGroup.destroyEach()
      gameState ="end"
      player2.x = 100
      player.x = -200
    }
  }
    
    switch(score){
        case 8: player.scale=0.12;
                break;
        case 16: player.scale=0.14;
                break;
        case 24: player.scale=0.16;
                break;
        case 32: player.scale=0.18;
                break;
        default: break;
    }
  
    
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
 
   
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    foodGroup.add(banana);
  }
}
function spawnOb() {
  //write code here to spawn the food
  if (frameCount % 70 === 0) {
    rand = Math.round(random(1,6))
    var ob = createSprite(600,320,40,10); 
    if(rand == 1){
      ob.addImage(ob1);
    }if(rand == 2){
      ob.addImage(ob2);
    }if(rand == 3){
      ob.addImage(ob3);
    }if(rand == 4){
      ob.addImage(ob4);
    }if(rand == 5){
      ob.addImage(ob5);
    }else{
      ob.addImage(ob6)
    }  
    ob.scale = 0.65;
    if(gameState == "ingame"){
      ob.velocityX = -5;
    }else{
      ob.velocityX =0
    }
    
     //assign lifetime to the variable
    ob.lifetime = 300;
    player.depth = ob.depth + 1;
    
    //add each banana to the group
    obG.add(ob);
  }
}