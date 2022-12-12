const info = function () {
  const infoButtonsContainer = document.querySelector(".info__buttons");
  const infoButtons = document.querySelectorAll(".info__btn");
  const infoSections = document.querySelectorAll(".info__section");
  const infoImageBox = document.querySelector(".info__image-box");
  const infoAudio = document.querySelector(".info__audio");

  infoButtonsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".info__btn");
    const section = document.querySelector(
      `.info__section--${clicked.dataset.tab}`
    );
    if (!clicked) return;
    infoButtons.forEach((iBtn) => iBtn.classList.remove("active-btn"));
    infoSections.forEach((section) =>
      section.classList.remove("active-section")
    );

    clicked.classList.add("active-btn");
    section.classList.add("active-section");
  });

  infoAudio.addEventListener("ended", () => infoImageBox.classList.add("show-mike"));
};
export { info };
