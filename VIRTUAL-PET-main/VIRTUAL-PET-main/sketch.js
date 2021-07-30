var dog,sadDog,happyDog;
var foodObj;
var foodStock;
var foodS;
var fedTime,lastFed,feed,addFood;
var database;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);

 foodObj=new Food();
  
 foodStock=database.ref('Food');
 foodStock.on("value",readPosition,showError);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  fill(255,255,254);
  textSize(15);
  foodObj.display();
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12 +"PM",350,30);
  }else if(lastFed==0){
    text("Last Feed:12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  drawSprites();
}
function readPosition(data){
 foodS=data.val()
 foodObj.updateFoodStock(foodS);
}
function showError(){
  console.log("ERROR")
}
//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
 }

//function to update food stock.
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()=1);
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}