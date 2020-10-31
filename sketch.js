var tower,towerImage;
var door,doorGroup,doorImage;
 var climber,climberImage,climberGroup;
 var ghost,ghostImage;
var iBlock,iGroup;
var spook;
var gamestate="play";
function preload() {
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spook=loadSound("spooky.wav");
}
function setup() {
  createCanvas(600,600);
  spook.play();
  tower=createSprite(300,300,600,600);
  tower.addImage("moving",towerImage);
  tower.velocityY=1;
  ghost = createSprite(300,300);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  doorGroup = new Group();
  climberGroup = new Group();
  iGroup = new Group();
}
function draw() {
  background("black")
  if(gamestate==="play"){
    
  
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  spawnDoors();
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
    if(iGroup.isTouching(ghost)||ghost.y>600){
      gamestate="end";
    }
  drawSprites();
  }
if(gamestate==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(35);
  text("Game Over",200,300);
}
}
function spawnDoors() {
  if(frameCount%200===0){
    door = createSprite(200,-50,30,30);
    door.addImage(doorImage);
    climber = createSprite(200,20);
    climber.addImage(climberImage);
    iBlock = createSprite(200,25,100,5);
    door.x = Math.round(random(120,400));
    door.velocityY=1;
    climber.x= door.x;
    climber.velocityY=1;
    iBlock.x=door.x;
    iBlock.velocityY=1
    iBlock.lifetime = 800;
    climber.lifetime=800;
    door.lifetime=800;
    iBlock.debug=true;
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    climberGroup.add(climber);
    doorGroup.add(door);
    iGroup.add(iBlock);
  }
}