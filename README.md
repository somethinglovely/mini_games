# mini_games

간단하고 작은 게임을 만들어 모아둡니다.

## shooting_game
*og
  *canvas를 javascript로 작성
    *document.body.appendChild(canvas);
  *class 대신 function 사용
  *list에 element 여러개 저장
  *keyboard 입력 확인
    *document.addEventListner 사용
  *매초 반복
    *const interval = setInterval(function(){/**/},1000);
  *애니메이션
    *requestAnimationFrame(main);


## dino_run
*og
  *class 사용
  *canvas setting에서 window.innerWidth, window.innerHeight 사용
  *element 속성을 미리 object 자료에 정리
  *화면 clear
    *ctx.clearRect(0,0,canvas.width,canvas.height);
  *애니메이션 종료
    *animation = requestAnimationFrame(main);
    *cancelAnimationFrame(animation);
  
