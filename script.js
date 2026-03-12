const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");


/* =========================
   AOS ANIMATION
========================= */

function initializeAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }
}


/* =========================
   PARTICLE BACKGROUND
   (Neural Network Style)
========================= */

function initializeParticles() {
  if (!window.particlesJS) return;

  particlesJS("particles-js", {

    particles: {

      number: {
        value: 90,
        density: {
          enable: true,
          value_area: 900
        }
      },

      color: {
        value: ["#38bdf8", "#7dd3fc", "#bae6fd"]
      },

      shape: {
        type: "circle"
      },

      opacity: {
        value: 0.6,
        random: true
      },

      size: {
        value: 3,
        random: true
      },

      line_linked: {
        enable: true,
        distance: 140,
        color: "#38bdf8",
        opacity: 0.35,
        width: 1
      },

      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }

    },

    interactivity: {

      detect_on: "canvas",

      events: {

        onhover: {
          enable: true,
          mode: "grab"
        },

        onclick: {
          enable: true,
          mode: "push"
        },

        resize: true

      },

      modes: {

        grab: {
          distance: 180,
          line_linked: {
            opacity: 0.8
          }
        },

        push: {
          particles_nb: 4
        }

      }

    },

    retina_detect: true

  });
}


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

function toggleNavbarState() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  }
}


/* =========================
   MOBILE MENU
========================= */

function closeMobileMenu() {
  if (!navMenu || !menuToggle) return;

  navMenu.classList.remove("open");
  navMenu.classList.add("hidden");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars text-base"></i>';
}

function toggleMobileMenu() {
  if (!navMenu || !menuToggle) return;

  const isOpen = navMenu.classList.contains("open");

  if (isOpen) {
    closeMobileMenu();
    return;
  }

  navMenu.classList.remove("hidden");
  navMenu.classList.add("open");

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.innerHTML = '<i class="fa-solid fa-xmark text-base"></i>';
}


/* =========================
   ACTIVE NAV LINK
========================= */

function setActiveLink() {

  const current = sections.find((section) => {
    const top = window.scrollY + 120;

    return (
      top >= section.offsetTop &&
      top < section.offsetTop + section.offsetHeight
    );
  });

  navLinks.forEach((link) => {

    const isActive =
      current && link.getAttribute("href") === `#${current.id}`;

    link.classList.toggle("active", Boolean(isActive));

  });
}


/* =========================
   CONTACT FORM
========================= */

function handleFormSubmit(event) {

  event.preventDefault();

  if (!contactForm || !formStatus) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name");

  formStatus.textContent =
    `Thanks ${name}. This demo form is ready to connect to EmailJS, Formspree, or your backend endpoint.`;

  contactForm.reset();

}


/* =========================
   EVENT LISTENERS
========================= */

menuToggle?.addEventListener("click", toggleMobileMenu);

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    if (window.innerWidth < 768) {
      closeMobileMenu();
    }

  });

});


window.addEventListener("scroll", () => {

  toggleNavbarState();
  setActiveLink();

});


window.addEventListener("resize", () => {

  if (!navMenu) return;

  if (window.innerWidth >= 768) {

    navMenu.classList.remove("hidden", "open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars text-base"></i>';
    }

  } else if (!navMenu.classList.contains("open")) {

    navMenu.classList.add("hidden");

  }

});


contactForm?.addEventListener("submit", handleFormSubmit);


/* =========================
   INITIALIZE EVERYTHING
========================= */

initializeAOS();
initializeParticles();
toggleNavbarState();
setActiveLink();