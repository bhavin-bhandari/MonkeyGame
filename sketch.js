var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  //Ground
  ground = createSprite(70, 395, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;


}


function draw() {
  background(180);

  
  
  score = score + Math.round(getFrameRate() / 60);

  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -12;
  }


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  obstacles();
  bananas();


  score = 0;


  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }


  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 150, 170);
  }

  drawSprites();
}



function bananas() {
  if (frameCount % 80 === 0) {

    banana = createSprite(200, 170)
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + score);
    banana.lifetime = 220;
    bananaGroup.add(banana);



  }



}

function obstacles() {
  if (frameCount % 200 === 0) {

    obstacle = createSprite(620, 370, 50, 50);
    obstacle.addImage("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4 + score * 1.5 / 100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);

  }


}