// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const navMobile = document.querySelector(".nav-mobile")

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      navMobile.classList.toggle("active")
      const isOpen = navMobile.classList.contains("active")
      menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>'
      menuToggle.setAttribute("aria-expanded", isOpen)
    })
  }

  // Update copyright year
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
})