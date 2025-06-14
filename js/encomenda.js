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

      // Validar campos obrigatórios
      const requiredFields = [
        "nome",
        "email",
        "telefone",
        "cidade",
        "sabor",
        "recheio",
        "tamanho",
        "formato",
        "data-evento",
      ]
      let isValid = true

      requiredFields.forEach((fieldName) => {
        const field = document.getElementById(fieldName)
        if (!field.value.trim()) {
          field.style.borderColor = "#e74c3c"
          isValid = false
        } else {
          field.style.borderColor = "#ddd"
        }
      })

      if (!isValid) {
        showAlert("Por favor, preencha todos os campos obrigatórios.", "error")
        return
      }

      // Validar email
      const email = document.getElementById("email").value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        document.getElementById("email").style.borderColor = "#e74c3c"
        showAlert("Por favor, insira um email válido.", "error")
        return
      }

      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.disabled = true
      submitButton.textContent = "A enviar..."

      // Preparar dados do formulário
      const formData = new FormData(this)

      // Enviar via AJAX
      fetch("enviar-encomenda.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showAlert(data.message, "success")
            orderForm.reset()

            // Scroll para o topo
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          } else {
            showAlert(data.message, "error")
          }
        })
        .catch((error) => {
          console.error("Erro:", error)
          showAlert("Erro de conexão. Tente novamente ou contacte-nos diretamente.", "error")
        })
        .finally(() => {
          submitButton.disabled = false
          submitButton.textContent = originalText
        })
    })
  }

  // Função para mostrar alertas
  function showAlert(message, type) {
    // Remover alertas existentes
    const existingAlerts = document.querySelectorAll(".alert")
    existingAlerts.forEach((alert) => alert.remove())

    // Criar novo alerta
    const alertElement = document.createElement("div")
    alertElement.className = `alert alert-${type}`

    const alertStyles = {
      padding: "1rem 1.5rem",
      borderRadius: "0.5rem",
      marginBottom: "1rem",
      fontWeight: "500",
      position: "relative",
      border: "1px solid",
    }

    if (type === "success") {
      Object.assign(alertStyles, {
        backgroundColor: "#d4edda",
        color: "#155724",
        borderColor: "#c3e6cb",
      })
    } else {
      Object.assign(alertStyles, {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderColor: "#f5c6cb",
      })
    }

    Object.assign(alertElement.style, alertStyles)
    alertElement.textContent = message

    // Inserir o alerta no topo da página
    const container = document.querySelector(".container")
    if (container) {
      container.insertBefore(alertElement, container.firstChild)
    }

    // Remover o alerta após 7 segundos
    setTimeout(() => {
      alertElement.remove()
    }, 7000)
  }

  // Validação em tempo real
  const inputs = document.querySelectorAll("input[required], select[required]")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim()) {
        this.style.borderColor = "#28a745"
      } else {
        this.style.borderColor = "#e74c3c"
      }
    })

    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgb(231, 76, 60)") {
        this.style.borderColor = "#ddd"
      }
    })
  })
})
