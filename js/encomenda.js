document.addEventListener("DOMContentLoaded", () => {
  // Inicializar o seletor de data com Flatpickr
  if (typeof flatpickr !== "undefined") {
    flatpickr("#data-evento", {
      dateFormat: "d/m/Y",
      minDate: "today",
      locale: "pt",
      disableMobile: "true",
    })
  }

  const orderForm = document.getElementById("order-form")

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
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
        alertElement.textContent =
          "Pedido de orçamento enviado com sucesso! Entraremos em contacto em breve para confirmar os detalhes."

        // Rolar para o topo do formulário
        window.scrollTo({
          top: orderForm.offsetTop - 100,
          behavior: "smooth",
        })

        // Inserir o alerta antes do formulário
        orderForm.parentNode.insertBefore(alertElement, orderForm)

        // Restaurar o botão
        submitButton.disabled = false
        submitButton.textContent = originalText

        // Limpar o formulário
        orderForm.reset()

        // Remover o alerta após alguns segundos
        setTimeout(() => {
          alertElement.remove()
        }, 7000)
      }, 2000)
    })
  }
})