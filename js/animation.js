document.addEventListener("DOMContentLoaded", () => {
  const footerElement = document.getElementById("site-footer");

  const footerObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("footer-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  if (footerElement) {
    footerObserver.observe(footerElement);
  }
});

const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    hamburgerBtn.setAttribute("aria-expanded", !isHidden);
  });

  // Menutup menu jika mengklik di luar area navbar/menu
  document.addEventListener("click", (event) => {
    if (
      !hamburgerBtn.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.add("hidden");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  });
}
