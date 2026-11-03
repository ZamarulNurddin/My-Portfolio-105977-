// Create and insert hamburger menu toggle button
(function createMenuToggle() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const menuToggle = document.createElement("div");
  menuToggle.id = "menu-toggle";
  menuToggle.setAttribute("aria-label", "Toggle menu");
  menuToggle.setAttribute("role", "button");
  menuToggle.setAttribute("tabindex", "0");
  menuToggle.innerHTML = "<span></span><span></span><span></span>";

  nav.insertBefore(menuToggle, nav.firstChild);

  const navLinks = nav.querySelector(".nav-links");

  // Click toggles menu on small screens
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Allow Enter/Space keys to toggle menu for accessibility
  menuToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navLinks.classList.toggle("active");
    }
  });

  // Close menu when a nav link is clicked (for mobile UX)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
})();

// Highlight current page nav link
(function highlightNavLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    if (
      link.getAttribute("href") === currentPage ||
      (currentPage === "" && link.getAttribute("href") === "index.html")
    ) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
})();

// Contact form validation and feedback
(function contactFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = form.name;
  const emailInput = form.email;
  const messageInput = form.message;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formStatus = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";
    formStatus.style.color = "";

    // Validate name
    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name.";
      valid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Please enter your email.";
      valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
      messageError.textContent = "Please enter a message.";
      valid = false;
    }

    if (valid) {
      // Normally, you would submit the form here.
      // Since this is frontend only, just simulate success message:
      formStatus.style.color = "green";
      formStatus.textContent =
        "Thank you for reaching out! (Form submission demo only)";
      form.reset();
    }
  });

  // Simple email validation helper
  function validateEmail(email) {
    // Basic pattern for demonstration — simple "@" and "." check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
})();
document.querySelectorAll(".toggle-details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const detailsId = button.getAttribute("aria-controls");
    const details = document.getElementById(detailsId);

    if (!details) return;

    const isHidden = details.hasAttribute("hidden");

    if (isHidden) {
      details.removeAttribute("hidden");
      button.setAttribute("aria-expanded", "true");
      button.textContent = "Hide Project";
    } else {
      details.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "View Project";
    }
  });
});
