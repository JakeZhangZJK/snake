//思路：点击开始游戏--> startPage消失--> 游戏开始
//随机出现食物,出现三节蛇并处于运动中
//上下左右--> 改变方向运动
//判断是否吃到食物-->食物消失，蛇加一
//判断游戏结束，弹出框
var content = document.getElementById("content");
var startPage = document.getElementById("startPage");
var snakeMove;
var speed = 500;
init();
function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX  = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[4,3,'head'],[3,3,'body'],[2,3,'body']];
    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    startGame();

}
function startGame() {
    food();
    snake();
snakeMove = setInterval(function () {
    move();
},speed);
bindEvent();
}
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random()*(this.mapW/20));
    this.foodY = Math.floor(Math.random()*(this.mapH/20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class','food');




}
function snake() {
for (var i = 0; i < this.snakeBody.length;i++){
    var snake = document.createElement('div');
    snake.style.width = this.snakeW + 'px';
    snake.style.height = this.snakeH + 'px';
    snake.style.position = 'absolute';
    snake.style.left = this.snakeBody[i][0] * 20 + 'px';
    snake.style.top = this.snakeBody[i][1] * 20 + 'px';
    snake.classList.add(this.snakeBody[i][2]);
    this.mapDiv.appendChild(snake).classList.add('snake');

}
}
function move() {
    for (var i = this.snakeBody.length-1;i > 0;i-- ){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody[0][0] += 1;
                break;
            case 'up':
                this.snakeBody[0][0] -= 1;
                break;
            case 'left':
                this.snakeBody[0][0] -= 1;
                break;
            case 'down':
                this.snakeBody[0][1] += 1;
                break;
            default:
                break;
        }
        removeClass('snake');//删掉原来的蛇
        snake();//生成一条新蛇
    }
}
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}
function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left){
                this.derict = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;

            }
            break;
        case 38:
            if (this.up){
                this.derict = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;

            }
            break;
        case 39:
            if (this.right){
                this.derict = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;

            }
            break;
        case 40:
            if (this.down){
                this.derict = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;

            }
            break;
        default:
            break;
    }
}
function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDerict(code);
    }
}