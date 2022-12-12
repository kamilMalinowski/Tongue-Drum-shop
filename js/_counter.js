const counter = function () {
  let count;
  let time = 600;

  const countdown = document.querySelector(".coupon__countdown");
  const startCountdown = function () {
    const tick = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
      countdown.textContent = `${min}:${sec}`;
      time--;
      if (time < 0) {
        document.querySelector(".coupon").style.display = "none";
        clearInterval(count);
        // localStorage.setItem("couponOpen", false);
      }
    };
    tick();
    count = setInterval(tick, 1000);
    if (localStorage.getItem("couponOpen")) {
      clearInterval(count);
      document.querySelector(".coupon").style.display = "none";
    }
  };

  startCountdown();
};

export { counter };
