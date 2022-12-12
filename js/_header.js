const header = function () {
  const nav = document.querySelector(".nav");
  const navBtnClose = document.querySelector(".nav__btn-close");
  const navBackdrop = document.querySelector(".nav__backdrop");
  const hamburgerBtn = document.querySelector(".header__hamburger-btn");
  const header = document.querySelector(".header");
  const billboard = document.querySelector(".billboard");
  const body = document.querySelector(".body");
  // navigation
  function hideNavigation() {
    nav.classList.remove("active-nav");
    navBackdrop.classList.remove("active-nav");
    body.classList.remove("stop-body");
  }

  hamburgerBtn.addEventListener("click", function () {
    nav.classList.add("active-nav");
    navBackdrop.classList.add("active-nav");
    body.classList.add("stop-body");
  });

  navBtnClose.addEventListener("click", hideNavigation);
  navBackdrop.addEventListener("click", hideNavigation);

  // active links
  nav.addEventListener("click", (e) => {
    const clicked = e.target.closest(".nav__link");
    if (!clicked) return;
    hideNavigation();
  });

  // header fixed
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
  const observerCallback = function (entries) {
    const [entry] = entries;
    !entry.isIntersecting
      ? header.classList.add("fixed-header")
      : header.classList.remove("fixed-header", "hide-header");
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(billboard);
};

export { header };
