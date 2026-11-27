// Toggle the mobile navigation menu and close it after choosing a section.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Show helpful validation messages directly beneath the form fields.
const joinForm = document.querySelector("#join-form");
const successMessage = document.querySelector("#form-success");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const showError = (fieldName, message) => {
  const field = joinForm.elements[fieldName];
  const error = document.querySelector(`#${fieldName}-error`);

  field.setAttribute("aria-invalid", message ? "true" : "false");
  error.textContent = message;
};

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.textContent = "";

  const name = joinForm.elements.name.value.trim();
  const email = joinForm.elements.email.value.trim();
  const department = joinForm.elements.department.value;
  const year = joinForm.elements.year.value;

  showError("name", name ? "" : "Please enter your name.");
  showError("email", emailPattern.test(email) ? "" : "Please enter a valid email address.");
  showError("department", department ? "" : "Please choose your department.");
  showError("year", year ? "" : "Please choose your year of study.");

  const hasErrors = joinForm.querySelector('[aria-invalid="true"]');
  if (hasErrors) {
    hasErrors.focus();
    return;
  }

  joinForm.reset();
  joinForm.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  successMessage.textContent = "Thanks for signing up! We’ll be in touch soon.";
});

// Clear each field's error as the visitor corrects that field.
joinForm.querySelectorAll("input, select").forEach((field) => {
  field.addEventListener("input", () => {
    showError(field.name, "");
  });
  field.addEventListener("change", () => {
    showError(field.name, "");
  });
});
