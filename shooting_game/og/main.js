//캔버스세팅

let canvas;
let ctx;

canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

//이미지 불러오기

let backgroundImage;
let spaceshipImage;
let bulletImage;
let enemyImage;
let gameOverImage;

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameOver.png";
}

//우주선 좌표

let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

//총알 (원래는 클래스)

let bulletList = [] //총알을 저장하는 리스트

function Bullet() {
    this.x = 0;
    this.y = 0;

    this.init = function () {
        this.x = spaceshipX + 7;
        this.y = spaceshipY;

        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    };
}

//적군 (원래는 클래스)

let enemyList = [] //적군을 저장하는 리스트

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random() * (max-min)) + min;
    return randomNum;
}

function Enemy() {
    this.x = 0;
    this.y = 0;

    this.init = function () {
        this.x = generateRandomValue(0, canvas.width-64);
        this.y = 0;

        enemyList.push(this);
    };
    this.update = function () {
        this.y += 2;
    };
}

//버튼 누르기

let keysDown = {}

function setupKeyBoardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.key] = true;
        // console.log("지금",keysDown);
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.key];
        if (event.key == " ") {
            createBullet() //총알 생성
        }
    });
}

function createBullet() {
    let b = new Bullet();
    b.init();
}

function createEnemy() {
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
}

function update() {

    if ('ArrowRight' in keysDown) {
        if (spaceshipX < canvas.width - 64) {
            spaceshipX += 5; //우주선의 속도
        }
    } //right
    if ('ArrowLeft' in keysDown) {
        if (spaceshipX > 0) {
            spaceshipX -= 5;
        }
    }//left

    for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].update();
    } //총알 발사!

    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }

}

//이미지 보여주기

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 64, 64);

    for (let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
    }

    for (let i =0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    }
}

function main() {
    update(); // 좌표값 업데이트
    render();
    requestAnimationFrame(main);
}


//함수 부르기

loadImage();
setupKeyBoardListener();
createEnemy();
main();