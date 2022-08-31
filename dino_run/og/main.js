/*
1. 화면에 네모, 원을 그릴 줄 안다
2. 프레임마다 코드 실행할 줄 안다 (애니메이션)
3. collision check (충돌체크) 할 수 있다.
*/

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 여기까지 canvas 기본 세팅

// ctx.fillStyle ='green';
// ctx.fillRect(10,10,100,100); //네모 만들기
 
var dinoImage = new Image();
dinoImage.src = 'image/dino.png';

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    
    draw(){
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height);
    }
} // 등장 캐릭터의 속성부터 object 자료에 정리해두면 편리
// dino.draw();

var cactusImage = new Image();
cactusImage.src = 'image/cactus.png';

class Cactus { //장애물
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height);
    }
}

// var cactus = new Cactus();
// cactus.draw();

var timer = 0;
var cacti =[];
var jump = false;
var jumptimer = 0;
var animation;

document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jump = true;
    }
})

// function checkHit(dino, cactus){ //왜 안될까?
//     if(dino.x+dino.width > cactus.x && dino.y+dino.width < cactus.y){
//         ctx.clearRect(0,0, canvas.width, canvas.height);
//         cancelAnimationFrame(animation);
//     }
// }

function checkHit(dino, cactus){ //충돌체크!
    var xdiff = cactus.x - (dino.x + dino.width);
    var ydiff = cactus.y - (dino.y + dino.height);
    if(xdiff <0 && ydiff <0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}


function main(){ //프레임마다 실행
    animation = requestAnimationFrame(main);
    timer ++;

    ctx.clearRect(0,0, canvas.width, canvas.height); //지우기

    if(timer % 180 === 0){
        var cactus = new Cactus();
        cacti.push(cactus);
    }

    cacti.forEach((a, i, o)=>{  //current value, index, array
        if(a.x<0){
            o.splice(i,1);
        }
        a.x--;
        checkHit(dino,a);
        a.draw();
    })

    if (jump){
        dino.y--;
        jumptimer++;
    }
    if(!jump){
        if(dino.y<200){
            dino.y++;
            jumptimer = 0;
        }
    }
    if(jumptimer > 100){
        jump = false;
    }
    
    dino.draw();
}

main();