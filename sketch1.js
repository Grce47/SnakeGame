let snake;
let food;
let size = 20;
let x,y;
let score = 0;
let f =0;
let m=1;
function setup() {
  createCanvas(600,600);
  frameRate(15);
  snake = new Snake(size/2,size/2);
  x = getRandon(width,size);
  y = getRandon(height,size);
  food = new Food(x,y);
}

function draw() {
  if(m)
  {
    drawFunc();
  }
  else
  {
    m=1;
  }
}
function drawFunc()
{
  background(41,70,70);
  if(snake.alive)
  {
    snake.show();
    food.show();
    snake.move();
    if(f)
    {
      snake.addBody();
      f=0;
    }
    f=0;
    if(checkEat(food,snake)){
      // console.log("done");
      x = getRandon(width,size);
      y = getRandon(height,size);
      food = new Food(x,y);
      score++;
      f = 1;
    }
  }
  else
  {
    score = 0;
    snake = new Snake(size/2,size/2);
  }
  document.getElementById("score").innerHTML = score;
}
function keyPressed()
{
  if(keyCode == LEFT_ARROW && snake.dir !== "R")
  {
    snake.dir = "L";
    drawFunc();
    m=0;
  }
  else if(keyCode == RIGHT_ARROW && snake.dir !== "L")
  {
    snake.dir = "R";
    drawFunc();
    m=0;
  }
  else if(keyCode == UP_ARROW && snake.dir !== "D")
  {
    snake.dir = "U";
    drawFunc();
    m=0;
  }
  else if(keyCode == DOWN_ARROW && snake.dir !== "U")
  {
    snake.dir = "D";
    drawFunc();
    m=0;
  }
}
function checkEat(f,s){
  if(f.x == s.arr[0] && f.y == s.arr[1])
  {
    return true;
  }
  else
  {
    return false;
  }
}
function getRandon(x,s)
{
  let ans;
  let n = x/s;
  ans =  (s/2) + (floor(random(0,n))*(s));
  return ans;
}
function drawRedBox(x,y){
  fill(253,89,4);
  rectMode(CENTER);
  noStroke();
  rect(x,y,size,size);
}
function drawBlueBox(x,y){
  fill(92,224,92);
  rectMode(CENTER);
  noStroke();
  rect(x,y,size,size);
}
class Food
{
  constructor(px,py){
    this.x = px;
    this.y = py;
  }
  show(){
    drawBlueBox(this.x,this.y);
  }
}
class Snake
{
  constructor(px,py){
    this.arr = [px,py];
    this.dir = "N";
    this.alive = true;
  }
  addBody()
  {
    var cx = this.arr[0];
    var cy = this.arr[1];
    if(this.dir == "R")
    {
      cx += size;
    }
    else if(this.dir == "L")
    {
      cx -= size;
    }
    else if(this.dir == "U")
    {
      cy -= size;
    }
    else if(this.dir == "D")
    {
      cy += size;
    }
    this.arr.splice(0,0,cx,cy);
  }
  show(){
    for(var i =0;i<this.arr.length;i+=2)
    {
      drawRedBox(this.arr[i],this.arr[i+1]);
    }
  }
  move()
  {
    var tmx = this.arr[0];
    var tmy = this.arr[1];
    if(this.dir == "R")
    {
      this.arr[0] += size;
    }
    else if(this.dir == "U")
    {
      this.arr[1] -= size;
    }
    else if(this.dir == "L")
    {
      this.arr[0] -= size;
    }
    else if(this.dir == "D")
    {
      this.arr[1] += size;
    }
    if(this.arr.length > 2)
    {
      this.update(tmx,tmy);
      this.checkself();
    }
    this.check();
  }
  checkself(){
    var x = this.arr[0];
    var y = this.arr[1];
    for(var i = 2;i<this.arr.length;i+=2)
    {
      if(x == this.arr[i] && y == this.arr[i+1])
      {
        this.alive = false;
      }
    }
  }
  update(tmx,tmy)
  {
    var sx,sy;
    for(var i=2;i<this.arr.length;i+=2)
    {
      sx = this.arr[i];
      sy = this.arr[i+1];
      this.arr[i] = tmx;
      this.arr[i+1] = tmy;
      tmx = sx;
      tmy = sy;
    }
  }
  check()
  {
    if(this.arr[0]>=width || this.arr[0]<=0 || this.arr[1]>=height || this.arr[1]<=0)
    {
      this.alive = false;
    }
  }
}