//creating variables
var car,road,Car,score=0,carGrp,gameState=-1,Start,startt=true,go,re,high=0,instruction;
function preload(){
  //loading images
  carImg=loadImage("car.png");
  Red=loadImage("red.png");
  White=loadImage("white.png");
  Silver=loadImage("silver.png");
  Grey=loadImage("grey.png");
  roadImg=loadImage("road.jpg");
  driving=loadSound("driving.mp3");
  start=loadImage("start.png");
  startG=loadImage("start-1.png");
  crash=loadSound("crash.mp3");
  gameOver=loadImage("go.png");
  reset=loadImage("re.png");
  ins=loadImage("INS.jpg");
}

function setup() {
  //creating canvas  
  createCanvas(800,windowHeight);
  //creating background
  background("lightblue");
  //creating sprites, sounds, groups
  Start=createSprite(400,height-230,0,0);
  Start.addImage("start",start);
  Start.visible=true;
  instruction=createSprite(400,height-90,0,0);
  instruction.addImage("ins",ins);
  instruction.visible=true;
  if(gameState==1){
    road=createSprite(400,0,0,0);
    road.addImage("road",roadImg);
    road.scale=4;
    road.velocityY=8;
    driving.loop();
    car=createSprite(400,height-100,0,0);
    car.addImage("car",carImg);
    car.scale=0.3;
    car.rotation=90;
    carGrp=new Group();
    go=createSprite(400,height/2-150,0,0);
    go.addImage("go",gameOver);
    go.visible=false;
    re=createSprite(400,(height/2)+150);
    re.addImage("re",reset);
    re.visible=false;
  }
}

function draw() {
  //creating background
  background("lightblue");
  //showing instructions, start
  if(gameState==-1){
     score=0;
     if(mouseIsOver(Start)){
        Start.addImage("start",startG);
        Start.scale=0.75
        if(mouseIsPressed){
           gameState=1;
        }
     }else{
       Start.addImage("start",start);
       Start.scale=1
     }
  }else if(gameState==1){
    /*starting game
    calling cars() here*/
    cars();
    //calling setup() again
    if(startt==true){
       setup();
       startt=false;
    }
    //making road come back
    if(road.y==400){
      road.y=0;
    }
    //moving car when LEFT ARROW or RIGHT ARROW is pressed
    if(keyDown(LEFT_ARROW)){
     car.x=car.x-5;
    }
    if(keyDown(RIGHT_ARROW)){
     car.x=car.x+5;
    }
    //adding score
    score=score+Math.round((frameRate())/62);
    //ending game
    if(carGrp.isTouching(car)||car.x>680||car.x<120){
      crash.play()
      gameState=0;
    }
  }else if(gameState==0){
    //ending game
    road.velocityY=0;
    carGrp.setVelocityYEach(0);
    carGrp.setLifetimeEach(-1);
    driving.stop();
    go.visible=true;
    go.scale=0.2;
    startt=true;
    setup();
    gameState=-1;
  }
  //drawing sprites and scores
  drawSprites();
  if(high<score){
    high=score;
  }
  textSize(20);
  fill("yellow");
  text("Points:"+score,590,50);
  text("High Score:"+high,420,50);
}
function cars(){
  //making cars
  if(frameCount%60==0){
    Car=createSprite(0,-100,0,0);
    position=Math.round(random(1,4));
    type=Math.round(random(1,4));
    if(position==1){
      Car.x=160;
    }else if(position==2){
      Car.x=320;
    }else if(position==3){
      Car.x=480;
    }else if(position==4){
      Car.x=640;
    }
    if(type==1){
      Car.addImage("red",Red);
      Car.scale=0.35;
    }else if(type==2){
      Car.addImage("white",White);
      Car.scale=0.6;
    }else if(type==3){
      Car.addImage("silver",Silver);
      Car.scale=0.3;
    }else if(type==4){
      Car.addImage("grey",Grey);
      Car.scale=0.3;
    }
    Car.depth=go.depth-1;
    carGrp.add(Car);
    Car.velocityY=8+(score*0.1);
    Car.lifetime=(width/Car.velocityY)+20;
  }
}
