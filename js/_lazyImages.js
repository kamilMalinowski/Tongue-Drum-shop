const lazyImages = function () {
  const imageTargets = document.querySelectorAll("img[data-src]");

  const lazyImgOpti = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const lazyImgCall = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () =>
      entry.target.classList.remove("filter")
    );
  };

  const lazyImgObserver = new IntersectionObserver(lazyImgCall, lazyImgOpti);
  imageTargets.forEach((img) => lazyImgObserver.observe(img));
};

export { lazyImages };
