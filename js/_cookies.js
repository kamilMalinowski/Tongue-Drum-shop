const cookies = function () {
  const cookies = document.querySelector(".cookies");
  const cookiesButtonsContainer = document.querySelector(".cookies__buttons");

  const updateCookies = (e) => {
    const clicked = e.target.closest(".cookies__btn");
    if (!clicked) return; //guard clause
    localStorage.setItem("cookies", clicked.getAttribute("data-atribute"));
    cookies.style.display = "none";
  };

  cookiesButtonsContainer.addEventListener("click", updateCookies);
  if (localStorage.getItem("cookies")) cookies.style.display = "none";
};

export { cookies };
