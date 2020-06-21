document.addEventListener("DOMContentLoaded", function (event) {
  let progress = 0;
  let startProgress = 0;
  let step = 50;

  const time = document.querySelector(".screenHall__time");
  elementRotate = document.querySelector(".screenHall__time");
  progress = 0;
  elementRotate.style.transform = "rotate(0deg)";

  elementRotate.addEventListener("touchstart", touchStart);
  elementRotate.addEventListener("touchend", touchEnd);

  let Nex;
  let degree_angle;
  let val = 0;

  let swipe;
  let startSwaip;
  let stopSwaip;
  let startMouse;

  // ------------------------------------- TOUCHSTART
  function touchStart(event) {
    elementRotate.style.transition = "0s";

    startSwaip = new Date().getTime();
    initialPoint = event.changedTouches[0];
    startProgress = progress;
    Nex = elementRotate.style.transform; // Nex  -  текущий градус поворода при touchstart
    Nex = parseFloat(Nex.slice(7));

    startMouse = {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
    elementRotate.addEventListener("touchmove", touchMove);
  }

  // ------------------------------------- TOUCHMOVE
  function touchMove(event) {
    let mouse = {
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY
    };
    let center = {
      x: elementRotate.offsetLeft + elementRotate.offsetWidth / 2,
      y: elementRotate.offsetTop + elementRotate.offsetHeight / 2
    };
    Dist = Math.atan2(
      (center.x - mouse.x) * (center.y - startMouse.y) -
      (center.y - mouse.y) * (center.x - startMouse.x),
      (center.x - mouse.x) * (center.x - startMouse.x) +
      (center.y - mouse.y) * (center.y - startMouse.y)
    );

    Dist *= -1;

    degree_angle = Dist * (180 / Math.PI);
    val = degree_angle + Nex;
    elementRotate.style.transform = "rotate(" + val + "deg)";
  }

  // ------------------------------------- TOUCHEND
  // endDeg = 100;

  function touchEnd(event) {
    let delay = "500ms"; // время доводки

    stopSwaip = new Date().getTime();
    let totalTimeSwipe = stopSwaip - startSwaip;

    console.clear();
    console.log("всего прошло: " + totalTimeSwipe);

    if (totalTimeSwipe <= 200) {
      if (degree_angle > 0) {
        console.log(`totalTimeSwipe < 200`);

        elementRotate.style.transition = "0.5s";
        elementRotate.style.transform = `rotate(${
          Math.trunc(val / 90) * 90 + 180
          }deg)`;
      } else {
        elementRotate.style.transition = "0.5s";
        elementRotate.style.transform = `rotate(${
          Math.trunc(val / 90) * 90 - 180
          }deg)`;
      }
    }

    // доводка
    else {
      swipe = Math.round(val / 90) * 90; // step - шаг доводки доводится если значение шага больше 50%
      elementRotate.style.transition = delay;
      elementRotate.style.transform = "rotate(" + swipe + "deg)";
    }
  }
});
