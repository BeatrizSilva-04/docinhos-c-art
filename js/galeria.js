document.addEventListener("DOMContentLoaded", () => {
  // Dados dos bolos com os caminhos corretos
  const cakes = [
    {
      id: "1",
      name: "Bolo de Batizado Elegante",
      description: "Belo bolo de batizado com decoração delicada em tons suaves, perfeito para celebrar este momento especial",
      image: "./images/batizados.jpg",
      category: "batizados",
      categoryName: "Batizados",
    },
    {
      id: "2",
      name: "Bentô Cake Minimalista",
      description: "Pequeno bolo individual no estilo coreano, perfeito para celebrações íntimas e presentes especiais",
      image: "./images/bentô-cakes.jpg",
      category: "destaques",
      categoryName: "Destaques",
    },
    {
      id: "3",
      name: "Bolachas Artesanais",
      description: "Deliciosas bolachas decoradas artesanalmente, ideais para festas e eventos especiais",
      image: "./images/bolachas.jpg",
      category: "bolachas",
      categoryName: "Bolachas Decoradas",
    },
    {
      id: "4",
      name: "Bolachas Decoradas com Laços",
      description: "Elegantes bolachas decoradas com laços dourados, perfeitas para ocasiões sofisticadas",
      image: "./images/bolachas-decoradas.jpg",
      category: "bolachas",
      categoryName: "Bolachas Decoradas",
    },
    {
      id: "5",
      name: "Bolo de Aniversário da Minnie",
      description: "Adorável bolo temático da Minnie Mouse em tons de rosa, ideal para festas infantis",
      image: "./images/bolo_aniversario_crianca.jpg",
      category: "infantis",
      categoryName: "Bolos Infantis",
    },
    {
      id: "6",
      name: "Bolo Elegante Dourado",
      description: "Sofisticado bolo branco com detalhes dourados, perfeito para finalistas e eventos especiais",
      image: "./images/bolos-diversos1.jpg",
      category: "finalistas",
      categoryName: "Finalistas",
    },
    {
      id: "7",
      name: "Bolo de Chocolate",
      description: "Irresistível bolo de chocolate com cobertura rica e cremosa, para os amantes de chocolate",
      image: "./images/bolos-divesos.jpg",
      category: "destaques",
      categoryName: "Destaques",
    },
    {
      id: "8",
      name: "Bolo de Primeira Comunhão",
      description: "Bolo branco puro e elegante, decorado especialmente para celebrar a Primeira Comunhão",
      image: "./images/comunhões.jpg",
      category: "comunhoes",
      categoryName: "Comunhões",
    },
    {
      id: "9",
      name: "Cupcake Azul Especial",
      description: "Cupcake artesanal com decoração azul elaborada, perfeito para festas e celebrações",
      image: "./images/cupcake.jpg",
      category: "cupcakes",
      categoryName: "Cupcakes",
    },
    {
      id: "10",
      name: "Smash Cake para Bebé",
      description: "Pequeno bolo especial para sessões de fotos de smash cake, decorado com tema delicado",
      image: "./images/smash-cake.jpg",
      category: "infantis",
      categoryName: "Bolos Infantis",
    }
  ]

  const galleryGrid = document.getElementById("gallery-grid")
  const filterTabs = document.querySelectorAll(".filter-tab")
  const modal = document.getElementById("cake-modal")
  const closeModal = document.querySelector(".close-modal")
  const modalImage = document.getElementById("modal-image")
  const modalTitle = document.getElementById("modal-title")
  const modalCategory = document.getElementById("modal-category")
  const modalDescription = document.getElementById("modal-description")

  // Função para renderizar os bolos
  function renderCakes(category = "todos") {
    galleryGrid.innerHTML = ""

    const filteredCakes = category === "todos" ? cakes : cakes.filter((cake) => cake.category === category)

    if (filteredCakes.length === 0) {
      galleryGrid.innerHTML = '<p class="no-results">Nenhum bolo encontrado nesta categoria.</p>'
      return
    }

    filteredCakes.forEach((cake) => {
      const cakeElement = document.createElement("div")
      cakeElement.className = "gallery-item"
      cakeElement.dataset.id = cake.id

      cakeElement.innerHTML = `
                <div class="gallery-image">
                    <img src="${cake.image}" alt="${cake.name}" onerror="this.src='./images/placeholder.jpg'; this.onerror=null;">
                </div>
                <div class="gallery-info">
                    <h3>${cake.name}</h3>
                    <p>${cake.description}</p>
                    <div class="gallery-footer">
                        <span class="gallery-category">${cake.categoryName}</span>
                        <a href="#" class="gallery-link">Ver detalhes</a>
                    </div>
                </div>
            `

      galleryGrid.appendChild(cakeElement)

      // Adicionar evento de clique para abrir o modal
      const galleryLink = cakeElement.querySelector(".gallery-link")
      galleryLink.addEventListener("click", (e) => {
        e.preventDefault()
        openModal(cake)
      })
    })
  }

  // Função para abrir o modal
  function openModal(cake) {
    modalImage.src = cake.image
    modalImage.alt = cake.name
    modalTitle.textContent = cake.name
    modalCategory.textContent = cake.categoryName

    // Descrição detalhada para o modal
    modalDescription.innerHTML = `
            <p>${cake.description}</p>
            <p>Este bolo artesanal é feito com ingredientes de alta qualidade e decorado à mão com técnicas especializadas de cake design. Perfeito para ocasiões especiais como aniversários, casamentos, batizados e outras celebrações.</p>
            <p>Todos os nossos bolos são personalizáveis em termos de sabor, tamanho, cor e decoração para atender às suas preferências e necessidades específicas.</p>
            
            <h3>Detalhes</h3>
            <ul>
                <li>Disponível em vários sabores</li>
                <li>Decoração personalizada</li>
                <li>Tamanhos variados</li>
                <li>Feito com ingredientes frescos e de qualidade</li>
            </ul>
        `

    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  // Função para fechar o modal
  function closeModalFunc() {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  // Adicionar eventos de filtro
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.dataset.filter

      // Atualizar classe ativa
      filterTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Renderizar bolos filtrados
      renderCakes(category)
    })
  })

  // Evento para fechar o modal
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc)
  }

  // Fechar modal ao clicar fora do conteúdo
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc()
    }
  })

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModalFunc()
    }
  })

  // Renderizar todos os bolos inicialmente
  renderCakes()
})