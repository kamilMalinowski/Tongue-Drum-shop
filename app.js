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
const imageTargets = document.querySelectorAll('img[data-src]')
const infoButtonsContainer = document.querySelector('.info__buttons')
const infoButtons = document.querySelectorAll('.info__btn')
const infoSections = document.querySelectorAll('.info__section')
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slider__el')
const sliderBtnNext = document.querySelector('.slider__btn--next')
const sliderBtnPrev = document.querySelector('.slider__btn--prev')
const detailBox = document.querySelector('.detail-box')
const detailBtn = document.querySelector('.detail-box__btn-link')
const cartBtnNumber = document.querySelector('.header__btn-number')
const primaryBtn = document.querySelectorAll('[data-btn]')
const form = document.querySelector('.form')
const sectionForm = document.querySelector('.section__form')
const formStepZero = document.querySelector('.step--0')
const steps = document.querySelector('.steps')
const formSteps = document.querySelectorAll('.step')
const stepsBtn = document.querySelector('.steps__btn')
const summary = document.querySelector('.summary')
const summarySectionVisible = document.querySelector(
  '.summary__section--visible',
)
const summarySectionHidden = document.querySelector('.summary__section--hidden')
const summaryBtn = document.querySelector('.summary__btn')

let countdown
let currentSlide = 0
let numberOfProducts = 0
let step = 0

// cookies
cookiesButtonsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.cookies__btn')
  if (!clicked) return //guard clause
  localStorage.setItem('cookies', clicked.getAttribute('data-atribute'))
  cookies.style.display = 'none'
  startCountdown()
})

if (localStorage.getItem('cookies')) {
  cookies.style.display = 'none'
  startCountdown()
}

// coupon
const deleteCoupon = function () {
  coupon.style.display = 'none'
  clearInterval(countdown)
}
couponBtnClose.addEventListener('click', deleteCoupon)

function startCountdown() {
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
const lazyImgOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
}

const lazyImgCallback = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting) return
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

//info
infoButtonsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.info__btn')
  const section = document.querySelector(
    `.info__section--${clicked.dataset.tab}`,
  )
  if (!clicked) return

  infoButtons.forEach((iBtn) => iBtn.classList.remove('active-btn'))
  infoSections.forEach((section) => section.classList.remove('active-section'))

  clicked.classList.add('active-btn')
  section.classList.add('active-section')
})

// slider
const moveToSlide = function (cur) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - cur)}%)`
  })
}

const nextSlide = function () {
  currentSlide == slides.length - 1 ? (currentSlide = 0) : currentSlide++
  moveToSlide(currentSlide)
}

const prevSlide = function () {
  currentSlide == 0 ? (currentSlide = slides.length - 1) : currentSlide--
  moveToSlide(currentSlide)
}

sliderBtnNext.addEventListener('click', nextSlide)
sliderBtnPrev.addEventListener('click', prevSlide)

// form
const addToCard = function (e) {
  e.preventDefault()
  step++

  if (step >= 4) {
    summary.classList.add('active-summary')
  } else {
    numberOfProducts = 1
    detailBox.classList.add('hide-detail-box')
    sectionForm.classList.add('hide-section-form')
    cartBtnNumber.classList.add('added')
    formStepZero.classList.remove('active-step')
    cartBtnNumber.textContent = numberOfProducts
    stepsBtn.textContent = 'NEXT'
    formSteps.forEach((step) => {
      step.classList.remove('active-step')
    })
    document.querySelector(`.step--${step}`).classList.add('active-step')
    document
      .querySelector(`.progress-btn--${step}`)
      .classList.add('active-step-btn')
    scrollToForm()
  }
}

primaryBtn.forEach((btn) => {
  btn.addEventListener('click', addToCard)
})

// summary
const acceptSummary = function () {
  summarySectionVisible.classList.add('hidden-summary-section')
  summarySectionHidden.classList.remove('hidden-summary-section')
  setTimeout(() => {
    location.reload() // temporary solution
  }, 5000)
}

summaryBtn.addEventListener('click', acceptSummary)

// scroll
function scrollToForm() {
  steps.getBoundingClientRect()
  steps.scrollIntoView({ behavior: 'smooth' })
  header.classList.remove('fixed-header')
}
