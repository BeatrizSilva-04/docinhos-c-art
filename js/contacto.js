document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulação de envio de formulário
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.disabled = true
      submitButton.textContent = "A enviar..."

      // Simular um atraso de envio
      setTimeout(() => {
        // Criar um elemento de alerta
        const alertElement = document.createElement("div")
        alertElement.className = "alert alert-success"
        alertElement.style.backgroundColor = "#d4edda"
        alertElement.style.color = "#155724"
        alertElement.style.padding = "1rem"
        alertElement.style.borderRadius = "0.25rem"
        alertElement.style.marginBottom = "1rem"
        alertElement.textContent = "Mensagem enviada com sucesso! Entraremos em contacto em breve."

        // Inserir o alerta antes do formulário
        contactForm.parentNode.insertBefore(alertElement, contactForm)

        // Restaurar o botão
        submitButton.disabled = false
        submitButton.textContent = originalText

        // Limpar o formulário
        contactForm.reset()

        // Remover o alerta após alguns segundos
        setTimeout(() => {
          alertElement.remove()
        }, 5000)
      }, 1500)
    })
  }
})