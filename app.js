'use strict'
// cookies
const cookies = document.querySelector('.cookies')
const cookiesButtonsContainer = document.querySelector('.cookies__buttons')
const cookiesButtons = document.querySelectorAll('.cookies__btn')

cookiesButtonsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.cookies__btn')
  if (!clicked) return //guard clause
  localStorage.setItem('cookies', clicked.getAttribute('data-atribute'))
  cookies.style.display = 'none'
  startCountdown()
})

// coupon
const coupon = document.querySelector('.coupon')
const couponBtnClose = document.querySelector('.coupon__btn-close')
const couponCountdown = document.querySelector('.coupon__countdown')
let countdown

const deleteCoupon = function () {
  coupon.style.display = 'none'
  clearInterval(countdown)
}
couponBtnClose.addEventListener('click', deleteCoupon)
const startCountdown = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const sec = String(time % 60).padStart(2, 0)
    couponCountdown.textContent = `${min}:${sec}`
    time--
    console.log(time)
    if (time === 0) {
      deleteCoupon()
    }
  }
  let time = 1800
  tick()
  countdown = setInterval(tick, 1000)
}
