
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = navLinks.querySelectorAll("a");
const sections = document.querySelectorAll("section[id]");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);

    let current = "";
    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute("id");
    });

    navAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
});

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get("name");
    alert(`Thanks, ${name}! Connect this form to a service to send messages for real.`);
    contactForm.reset();
});
