'use strict'
// elements
const cookies = document.querySelector('.cookies')
const cookiesButtonsContainer = document.querySelector('.cookies__buttons')
const cookiesButtons = document.querySelectorAll('.cookies__btn')
const coupon = document.querySelector('.coupon')
const couponBtnClose = document.querySelector('.coupon__btn-close')
const couponCountdown = document.querySelector('.coupon__countdown')
const nav = document.querySelector('.nav')
const navBtnClose = document.querySelector('.nav__btn-close')
const navBackdrop = document.querySelector('.nav__backdrop')
const hamburgerBtn = document.querySelector('.header__hamburger-btn')
const header = document.querySelector('.header')
const billboard = document.querySelector('.billboard')
const body = document.querySelector('.body')

let countdown

// cookies
cookiesButtonsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.cookies__btn')
  if (!clicked) return //guard clause
  localStorage.setItem('cookies', clicked.getAttribute('data-atribute'))
  cookies.style.display = 'none'
  startCountdown()
})

// coupon
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
    if (time === 0) {
      deleteCoupon()
    }
  }
  let time = 1800
  tick()
  countdown = setInterval(tick, 1000)
}

// navigation
const hideNavigation = function () {
  nav.classList.remove('active-nav')
  navBackdrop.classList.remove('active-nav')
  body.classList.remove('stop-body')
}
hamburgerBtn.addEventListener('click', function () {
  nav.classList.add('active-nav')
  navBackdrop.classList.add('active-nav')
  body.classList.add('stop-body')
})

navBtnClose.addEventListener('click', hideNavigation)
navBackdrop.addEventListener('click', hideNavigation)

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
}
const observerCallback = function (entries) {
  const [entry] = entries
  !entry.isIntersecting
    ? header.classList.add('fixed-header')
    : header.classList.remove('fixed-header')
}

const observer = new IntersectionObserver(observerCallback, observerOptions)

observer.observe(billboard)

//lazy loading images
const imageTargets = document.querySelectorAll('img[data-src]')

imageTargets.forEach((entry) =>  {
  console.log(entry)
  entry.src = entry.dataset.src

  entry.addEventListener('load', () =>
    entry.classList.remove('filter'),
  )
})
const lazyImgOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
}
const lazyImgCallback = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  console.table('lazy: ' + entry)
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('filter'),
  )
}

const lazyImgObserver = new IntersectionObserver(
  lazyImgCallback,
  lazyImgOptions,
)

imageTargets.forEach((img) => lazyImgObserver.observe(img))
