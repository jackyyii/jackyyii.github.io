const topnav = document.getElementById("topnav");
const topnavToggle = topnav.querySelector(".menu-toggle");

function openMobileNavbar() {
  topnav.classList.add("opened");
  topnavToggle.setAttribute("aria-label", "Close navigation menu.");
}

function closeMobileNavbar() {
  topnav.classList.remove("opened");
  topnavToggle.setAttribute("aria-label", "Open navigation menu.");
}

topnavToggle.addEventListener("click", () => {
  if (topnav.classList.contains("opened")) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});

const topnavMenu = topnav.querySelector(".nav-menu");
const topnavLinks = topnav.querySelector(".nav-links");

topnavLinks.addEventListener("click", (clickEvent) => {
  clickEvent.stopPropagation();
});

topnavMenu.addEventListener("click", closeMobileNavbar);